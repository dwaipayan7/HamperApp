import mongoose from "mongoose";

const searchSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    query: {
      type: String,
      required: true,
      trim: true,
    },

    searchType: {
      type: String,
      enum: ["user", "post", "hashtag", "all"],
      default: "all",
    },

    searchedUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    searchedPost: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

searchSchema.index({
  user: 1,
  createdAt: -1,
});

export const Search = mongoose.model("Search", searchSchema);
