import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import { schema } from "./schema";
import { migrations } from "./migrations";
import Post from "./models/Post";
import Conversation from "./models/Conversation";
import Message from "./models/Message";

const adapter = new SQLiteAdapter({
  schema,
  migrations,
  jsi: true,
  onSetUpError: (error) => {
    console.log("Database setup error: ", error);
  },
});

export const database = new Database({
  adapter,
  modelClasses: [Post, Message, Conversation],
});
