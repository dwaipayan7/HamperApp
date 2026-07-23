import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import Comment from "../models/comment.model.js";
import Notification from "../models/notification.model.js";
import cloudinary from "../config/cloudinary.js";
import { enqueueNotification } from "../queue/index.js";
import { getCache, setCache, deleteCache } from "../helpers/cache.js";
import { cacheClient } from "../helpers/redis.js";
import { logger } from "../config/logger.js";

const deleteFeedCache = async () => {
  let cursor = "0";
  do {
    const [nextCursor, keys] = await cacheClient.scan(
      cursor,
      "MATCH",
      "posts:feed:*",
      "COUNT",
      50,
    );
    cursor = nextCursor;
    if (keys.length > 0) await deleteCache(...keys);
  } while (cursor !== "0");
};

const TTL = {
  FEED: 30,
  POST: 60,
  USER_POSTS: 45,
};

const DEFAULT_PAGE_LIMIT = 20;

// Cache key helpers
const KEYS = {
  feed: (page, limit) => `posts:feed:page:${page}:limit:${limit}`,
  post: (id) => `post:${id}`,
  userPosts: (username) => `posts:user:${username}`,
  // Used for bulk invalidation — we track all feed page keys separately
  feedInvalidate: () => "posts:feed:*",
};

const POPULATE_USER = "username firstName lastName profilePicture";

/**
 * Returns a paginated feed of all posts.
 * @param {number} page - 1-indexed page number (default: 1)
 * @param {number} limit - posts per page (default: 20, max: 50)
 */
export const getAllPosts = async (page = 1, limit = DEFAULT_PAGE_LIMIT) => {
  const safeLimit = Math.min(Number(limit) || DEFAULT_PAGE_LIMIT, 50);
  const safePage = Math.max(Number(page) || 1, 1);
  const skip = (safePage - 1) * safeLimit;

  const cacheKey = KEYS.feed(safePage, safeLimit);

  const cached = await getCache(cacheKey);
  if (cached) return cached;

  const [posts, total] = await Promise.all([
    Post.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(safeLimit)
      .populate("user", POPULATE_USER)
      .populate({
        path: "comments",
        populate: { path: "user", select: POPULATE_USER },
      })
      .populate({
        path: "repostOf",
        populate: { path: "user", select: POPULATE_USER },
      })
      .lean(),
    Post.countDocuments(),
  ]);

  const result = {
    posts,
    pagination: {
      page: safePage,
      limit: safeLimit,
      total,
      totalPages: Math.ceil(total / safeLimit),
      hasNextPage: safePage * safeLimit < total,
    },
  };

  await setCache(cacheKey, result, TTL.FEED);
  return result;
};

// getById
export const getPostById = async (postId) => {
  const cacheKey = KEYS.post(postId);

  const cached = await getCache(cacheKey);
  if (cached) {
    logger.debug({ cacheKey }, "Cache hit");
    return cached;
  }

  logger.debug({ cacheKey }, "Cache miss");
  const post = await Post.findById(postId)
    .populate("user", POPULATE_USER)
    .populate({
      path: "repostOf",
      populate: { path: "user", select: POPULATE_USER },
    })
    .lean();

  if (post) await setCache(cacheKey, post, TTL.POST);
  return post;
};

export const getPostWithComments = async (postId) => {
  return Post.findById(postId)
    .populate("user", POPULATE_USER)
    .populate({
      path: "comments",
      populate: { path: "user", select: POPULATE_USER },
    })
    .lean();
};

export const getUserPostsByUsername = async (username) => {
  const cacheKey = KEYS.userPosts(username);

  const cached = await getCache(cacheKey);
  if (cached) {
    logger.debug({ cacheKey }, "Cache hit");
    return cached;
  }

  logger.debug({ cacheKey }, "Cache miss");
  const user = await User.findOne({ username }).lean();
  if (!user) return null;

  const posts = await Post.find({ user: user._id })
    .sort({ createdAt: -1 })
    .populate("user", POPULATE_USER)
    .populate({
      path: "comments",
      populate: { path: "user", select: POPULATE_USER },
    })
    .lean();

  await setCache(cacheKey, posts, TTL.USER_POSTS);
  return posts;
};

export const createPost = async (clerkId, content, imageFile) => {
  const user = await User.findOne({ clerkId });
  if (!user) return null;

  let imageUrl = "";
  if (imageFile) {
    const base64Image = `data:${imageFile.mimetype};base64,${imageFile.buffer.toString("base64")}`;
    const uploaded = await cloudinary.uploader.upload(base64Image, {
      folder: "social_media_posts",
      resource_type: "image",
      transformation: [
        { width: 800, height: 600, crop: "limit" },
        { quality: "auto" },
        { format: "auto" },
      ],
    });
    imageUrl = uploaded.secure_url;
  }

  const post = await Post.create({
    user: user._id,
    content: content || "",
    image: imageUrl,
  });

  // Invalidate all paginated feed pages + this user's post list
  await Promise.all([
    deleteFeedCache(),
    deleteCache(KEYS.userPosts(user.username)),
  ]);

  return post;
};

// Notification is enqueued async (non-blocking)

export const likePost = async (clerkId, postId) => {
  // Run both DB lookups in parallel for speed
  const [user, post] = await Promise.all([
    User.findOne({ clerkId }),
    Post.findById(postId),
  ]);

  if (!user || !post) return null;

  const isLiked = post.likes.some(
    (id) => id.toString() === user._id.toString(),
  );

  if (isLiked) {
    await Post.findByIdAndUpdate(postId, { $pull: { likes: user._id } });
  } else {
    await Post.findByIdAndUpdate(postId, { $push: { likes: user._id } });

    if (post.user.toString() !== user._id.toString()) {
      // Create DB notification record
      await Notification.create({
        from: user._id,
        to: post.user,
        type: "like",
        post: postId,
      });

      // Enqueue FCM push — non-blocking, retried by BullMQ if Firebase fails
      const postOwner = await User.findById(post.user)
        .select("fcmToken")
        .lean();
      if (postOwner?.fcmToken) {
        await enqueueNotification({
          token: postOwner.fcmToken,
          title: "New Like",
          body: `${user.firstName} ${user.lastName} liked your post`,
          data: { type: "like", postId: postId.toString() },
        });
      }
    }
  }

  // Invalidate this post's cache + all feed pages (likes count changed)
  await Promise.all([deleteCache(KEYS.post(postId)), deleteFeedCache()]);

  return { isLiked };
};

export const deletePost = async (clerkId, postId) => {
  const [user, post] = await Promise.all([
    User.findOne({ clerkId }),
    Post.findById(postId),
  ]);

  if (!user || !post) return { error: "User Not found" };
  if (post.user.toString() !== user._id.toString())
    return { error: "forbidden" };

  await Promise.all([
    Comment.deleteMany({ post: postId }),
    Post.findByIdAndDelete(postId),
  ]);

  await Promise.all([
    deleteCache(KEYS.post(postId), KEYS.userPosts(user.username)),
    deleteFeedCache(),
  ]);

  return { success: true };
};

export const repostPost = async (clerkId, postId, content) => {
  const user = await User.findOne({ clerkId });
  if (!user) return { error: "user_not_found" };

  const originalPost = await Post.findById(postId);
  if (!originalPost) return { error: "post_not_found" };

  const existingRepost = await Post.findOne({
    user: user._id,
    repostOf: originalPost._id,
  });
  if (existingRepost) return { error: "already_reposted" };

  // increment counter in parallel
  const [repost] = await Promise.all([
    Post.create({
      user: user._id,
      repostOf: originalPost._id,
      content: content?.trim()
        ? `${content.trim()}\n\n${originalPost.content}`
        : originalPost.content,
      image: originalPost.image,
    }),
    Post.findByIdAndUpdate(postId, { $inc: { repostCount: 1 } }),
  ]);

  if (originalPost.user.toString() !== user._id.toString()) {
    await Notification.create({
      from: user._id,
      to: originalPost.user,
      type: "repost",
      post: originalPost._id,
    });

    const postOwner = await User.findById(originalPost.user)
      .select("fcmToken")
      .lean();
    if (postOwner?.fcmToken) {
      await enqueueNotification({
        token: postOwner.fcmToken,
        title: "New Repost",
        body: `${user.firstName} ${user.lastName} reposted your post`,
        data: { type: "repost", postId: originalPost._id.toString() },
      });
    }
  }

  await Promise.all([
    deleteCache(KEYS.post(postId), KEYS.userPosts(user.username)),
    deleteFeedCache(),
  ]);

  return { repost };
};
