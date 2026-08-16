import { Model } from "@nozbe/watermelondb";
import { field, date } from "@nozbe/watermelondb/decorators";

export default class Post extends Model {
  static table = "posts";

  @field("server_id") serverId!: string;
  @field("content") content!: string;
  @field("image_url") imageUrl?: string;
  @field("video_url") videoUrl?: string;
  @field("author_id") authorId!: string;
  @field("author_name") authorName!: string;
  @field("author_avatar") authorAvatar?: string;
  @field("likes_count") likesCount?: number;
  @field("comments_count") commentsCount?: number;
  @field("reposts_count") repostsCount?: number;
  @field("is_liked") isLiked?: boolean;
  @date("created_at") createdAt!: Date;
  @date("updated_at") updatedAt!: Date;
}
