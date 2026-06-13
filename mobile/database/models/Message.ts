import { Model } from "@nozbe/watermelondb";
import { field, date } from "@nozbe/watermelondb/decorators";

export default class Message extends Model {
  static table = "messages";

  @field("server_id") serverId!: string;
  @field("sender_id") senderId!: string;
  @field("receiver_id") receiverId!: string;
  @field("text") text!: string;
  @date("created_at") createdAt!: Date;
  @field("is_synced") isSynced!: boolean;
}
