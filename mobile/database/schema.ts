import { appSchema, tableSchema } from "@nozbe/watermelondb";

export const schema = appSchema({
  version: 2,
  tables: [
    tableSchema({
      name: "posts",
      columns: [
        { name: "server_id", type: "string", isIndexed: true },
        { name: "content", type: "string" },
        { name: "image_url", type: "string", isOptional: true },
        { name: "video_url", type: "string", isOptional: true },
        { name: "author_id", type: "string", isIndexed: true },
        { name: "author_name", type: "string" },
        { name: "author_avatar", type: "string", isOptional: true },
        { name: "likes_count", type: "number", isOptional: true },
        { name: "comments_count", type: "number", isOptional: true },
        { name: "reposts_count", type: "number", isOptional: true },
        { name: "is_liked", type: "boolean", isOptional: true },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),
    tableSchema({
      name: "messages",
      columns: [
        { name: "server_id", type: "string", isIndexed: true },
        { name: "sender_id", type: "string", isIndexed: true },
        { name: "receiver_id", type: "string", isIndexed: true },
        { name: "text", type: "string" },
        { name: "created_at", type: "number" },
        { name: "is_synced", type: "boolean" },
      ],
    }),

    tableSchema({
      name: "conversations",
      columns: [
        { name: "participant_id", type: "string", isIndexed: true },
        { name: "participant_name", type: "string" },
        { name: "participant_avatar", type: "string", isOptional: true },
        { name: "last_message", type: "string", isOptional: true },
        { name: "last_message_time", type: "number", isOptional: true },
        { name: "unread_count", type: "number", isOptional: true },
        { name: "updated_at", type: "number" },
      ],
    }),
  ],
});
