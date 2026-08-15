import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import Comment from "../models/comment.model.js";
import Notification from "../models/notification.model.js";
import cloudinary from "../config/cloudinary.js";
import { enqueueNotification } from "../queue/index.js";
import { getCache, setCache, deleteCache } from "../helpers/cache.js";
import { cacheClient } from "../helpers/redis.js";
import { REDIS_KEYS, TTL } from "../utils/redisKeys.js";
import { logger } from "../config/logger.js";

const deleteFeedCache = async () => {
  let cursor = "0";
  do {
    const [nextCursor, keys] = await cacheClient.scan(
      cursor,
      "MATCH",
      REDIS_KEYS.feedPattern(),
      "COUNT",
      50,
    );
    cursor = nextCursor;
    if (keys.length > 0) await deleteCache(...keys);
  } while (cursor !== "0");
};

const DEFAULT_PAGE_LIMIT = 20;

const POPULATE_USER = "username firstName lastName profilePicture";

export const getAllPosts = async (page = 1, limit = DEFAULT_PAGE_LIMIT) => {
  const safeLimit = Math.min(Number(limit) || DEFAULT_PAGE_LIMIT, 50);
  const safePage = Math.max(Number(page) || 1, 1);
  const skip = (safePage - 1) * safeLimit;

  const cacheKey = REDIS_KEYS.feed(safePage, safeLimit);

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
  const cacheKey = REDIS_KEYS.post(postId);

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
  const cacheKey = REDIS_KEYS.userPosts(username);

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

export const createPost = async (
  clerkId,
  content,
  imageFile,
  type = "normal",
  eventDetails = null,
) => {
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

  const postData = {
    user: user._id,
    content: content || "",
    image: imageUrl,
    type,
  };

  if (type === "event" && eventDetails) {
    postData.eventDetails = {
      locationCoords: {
        type: "Point",
        coordinates: [eventDetails.lng || 0, eventDetails.lat || 0],
      },
      radius: eventDetails.radius || 30,
      eventDate: eventDetails.eventDate || new Date(),
    };
  }

  const post = await Post.create(postData);

  // If it's an event, send prioritized notifications
  if (type === "event" && eventDetails) {
    const radiusInKm = eventDetails.radius || 30;
    // convert radius to radians for $centerSphere (radius in km / radius of earth in km)
    const radiusInRadians = radiusInKm / 6378.1;
    const lng = eventDetails.lng || 0;
    const lat = eventDetails.lat || 0;

    // Find users within radius
    const usersWithinRadius = await User.find({
      locationCoords: {
        $geoWithin: {
          $centerSphere: [[lng, lat], radiusInRadians],
        },
      },
      _id: { $ne: user._id },
      fcmToken: { $ne: "" },
    });

    const insideUserIds = usersWithinRadius.map((u) => u._id);

    // Send immediate push notification for users within radius
    for (const u of usersWithinRadius) {
      if (u.fcmToken) {
        await enqueueNotification({
          token: u.fcmToken,
          title: "New Event Nearby!",
          body: `${user.firstName} posted an event near you.`,
          data: { type: "event", postId: post._id.toString() },
        });
      }
    }

    // Find users outside radius
    const usersOutsideRadius = await User.find({
      _id: { $nin: [...insideUserIds, user._id] },
      fcmToken: { $ne: "" },
    });

    // Send delayed push notification (10 mins) for users outside radius
    const delayMs = 10 * 60 * 1000;
    for (const u of usersOutsideRadius) {
      if (u.fcmToken) {
        await enqueueNotification({
          token: u.fcmToken,
          title: "New Event",
          body: `${user.firstName} posted a new event.`,
          data: { type: "event", postId: post._id.toString() },
          delay: delayMs,
        });
      }
    }
  }

  // Invalidate all paginated feed pages + this user's post list
  await Promise.all([
    deleteFeedCache(),
    deleteCache(REDIS_KEYS.userPosts(user.username)),
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
  await Promise.all([deleteCache(REDIS_KEYS.post(postId)), deleteFeedCache()]);

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
    deleteCache(REDIS_KEYS.post(postId), REDIS_KEYS.userPosts(user.username)),
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
    deleteCache(REDIS_KEYS.post(postId), REDIS_KEYS.userPosts(user.username)),
    deleteFeedCache(),
  ]);

  return { repost };
};
