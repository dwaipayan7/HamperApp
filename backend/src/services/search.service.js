import mongoose from "mongoose";
import { elasticClient } from "../config/elasticsearch.js";
import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import { Search } from "../models/search.model.js";

const TERM_USER_KEYWORD = "username.keyword";
export const POPULATE_USER = "username firstName lastName profilePicture";

export const searchUsers = async (query, limit = 20) => {
  const result = await elasticClient.search({
    index: "users",
    size: limit,

    query: {
      bool: {
        should: [
          //exact user name
          {
            term: {
              [TERM_USER_KEYWORD]: {
                value: query.toLowerCase(),
                boost: 10,
              },
            },
          },

          // username starts with query
          {
            match_phrase_prefix: {
              username: {
                query,
                boost: 5,
              },
            },
          },

          //first name
          {
            match_phrase_prefix: {
              firstName: {
                query,
                boost: 3,
              },
            },
          },
          // last name
          {
            match_phrase_prefix: {
              lastName: {
                query,
                boost: 2,
              },
            },
          },
        ],
        minimum_should_match: 1,
      },
    },
  });

  const ids = result.hits.hits.map((hit) => hit._id);

  if (!ids.length) {
    return [];
  }

  const objectIds = ids
    .filter((e) => mongoose.Types.ObjectId.isValid(e))
    .map((e) => new mongoose.Types.ObjectId(e));

  const users = await User.find({
    _id: {
      $in: objectIds,
    },
  })
    .select("username firstName lastName")
    .lean();

  //preserver elastic search ranking

  const userMap = new Map(users.map((user) => [user._id.toString(), user]));

  return ids.map((id) => userMap.get(id)).filter(Boolean);
};

export const searchPosts = async (query, limit = 20) => {
  const result = await elasticClient.search({
    index: "posts",
    size: limit,

    query: {
      multi_match: {
        query,
        fields: ["content^3", "hashtags^2"],
        fuzziness: "AUTO",
      },
    },
  });

  const ids = result.hits.hits.map((hit) => hit._id);

  if (!ids.length) {
    return [];
  }

  const objectIds = ids
    .filter((id) => mongoose.Types.ObjectId.isValid(id))
    .map((id) => new mongoose.Types.ObjectId(id));

  const posts = await Post.aggregate([
    {
      $match: {
        _id: {
          $in: objectIds,
        },
      },
    },
    //lookup user
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        pipeline: [
          {
            $project: {
              username: 1,
              firstName: 1,
              lastName: 1,
              profilePicture: 1,
            },
          },
        ],
        as: "user",
      },
    },

    {
      $unwind: {
        path: "$user",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $addFields: {
        searchOrder: {
          $indexOfArray: [objectIds, "$_id"],
        },
      },
    },
    {
      $sort: {
        searchOrder: 1,
      },
    },
    {
      $project: {
        searchOrder: 0,
      },
    },
  ]);

  return posts;
};

export const globalSearch = async (query, userId) => {
  if (!query?.trim()) {
    return {
      users: [],
      posts: [],
    };
  }

  const [users, posts] = await Promise.all([
    searchUsers(query, 10),
    searchPosts(query, 10),
  ]);

  if (userId) {
    await Search.create({
      user: userId,
      query: query.trim(),
      searchType: "all",
    });
  }

  return {
    users,
    posts,
  };
};

export const getRecentSearches = async (userId, limit = 10) => {
  return Search.find({ user: userId })
    .sort({ createdAt: -1 })
    .limit(limit)
    .populate([
      {
        path: "searchedUser",
        select: "username firstName lastName profilePicture",
      },
      {
        path: "searchedPost",
        select: "title content media",
      },
    ])
    .lean();
};

export const deleteSearchHistory = async (userId) => {
  await Search.deleteMany({
    user: userId,
  });

  return true;
};
