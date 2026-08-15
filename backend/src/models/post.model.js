import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      maxLength: 280,
    },
    image: {
      type: String,
      default: "",
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    repostOf: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      default: null,
    },
    repostCount: {
      type: Number,
      default: 0,
    },
    type: {
      type: String,
      enum: ["normal", "event", "poll", "job"],
      default: "normal",
    },
    eventDetails: {
      locationCoords: {
        type: {
          type: String,
          enum: ["Point"],
        },
        coordinates: {
          type: [Number], // [longitude, latitude]
        },
      },
      radius: {
        type: Number, // in kilometers
        default: 30,
      },
      eventDate: {
        type: Date,
      },
    },
  },
  { timestamps: true },
);

postSchema.index({ createdAt: -1 });
postSchema.index({ user: 1, createdAt: -1 });
postSchema.index({ user: 1, repostOf: 1 });
postSchema.index({ "eventDetails.locationCoords": "2dsphere" });


const Post = mongoose.model("Post", postSchema);

export default Post;
