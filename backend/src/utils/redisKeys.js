export const TTL = {
  FEED: 30,
  POST: 60,
  USER_POSTS: 45,
};

export const REDIS_KEYS = {
  feed: (page, limit) => `posts:feed:page:${page}:limit:${limit}`,

  post: (id) => `post:${id}`,

  userPosts: (username) => `posts:user:${username}`,

  feedPattern: () => `posts:feed:*`,
};
