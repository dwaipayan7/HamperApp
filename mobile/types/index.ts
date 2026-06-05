export interface User {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  profilePicture?: string;
  following?: string[];
  followers?: string[];
}

export interface Comment {
  _id: string;
  content: string;
  createdAt: string;
  user: User;
  likes: string[];
}

export interface Post {
  _id: string;
  content: string;
  image?: string;
  createdAt: string;
  user: User;
  likes: string[];
  comments: Comment[];
  repostOf?: Post;
  repostCount?: number;
}

export interface Notification {
  _id: string;
  from: {
    username: string;
    firstName: string;
    lastName: string;
    profilePicture?: string;
  };
  to: string;
  type: "like" | "comment" | "follow" | "repost" | "comment_like";
  post?: {
    _id: string;
    content: string;
    image?: string;
  };
  comment?: {
    _id: string;
    content: string;
  };
  createdAt: string;
}

export type TSnackbarVariant = "success" | "warning" | "error" | "info";

export interface ChatProps {
  receiverId: string;
  text: string;
  senderId: string;
}
