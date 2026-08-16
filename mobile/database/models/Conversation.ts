import { Model } from "@nozbe/watermelondb";
import { field, date } from "@nozbe/watermelondb/decorators";

export default class Conversation extends Model {
  static table = "conversations";

  @field("participant_id") participantId!: string;
  @field("participant_name") participantName!: string;
  @field("participant_avatar") participantAvatar?: string;
  @field("last_message") lastMessage?: string;
  @date("last_message_time") lastMessageTime?: Date;
  @field("unread_count") unreadCount?: number;
  @date("updated_at") updatedAt!: Date;
}
