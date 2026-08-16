import Post from "@/database/models/Post";
import Message from "@/database/models/Message";
import Conversation from "@/database/models/Conversation";
import { Q } from "@nozbe/watermelondb";
import { database } from "@/database";

// POST OPERATIONS
export const savePosts = async (postsData: any[]) => {
  const postsCollection = database.get("posts");
  await database.write(async () => {
    for (const post of postsData) {
      const existing = await postsCollection
        .query(Q.where("server_id", post._id))
        .fetch();

      if (existing.length > 0) {
        await existing[0].update((p) => {
          p.likesCount = post.likes?.length || 0;
          p.commentsCount = post.comments?.length || 0;
          p.repostsCount = post.reposts?.length || 0;
          p.isLiked = post.isLiked || false;
        });
      } else {
        await postsCollection.create((post_model: any) => {
          post_model.serverId = post._id;
          post_model.content = post.content;
          post_model.imageUrl = post.image?.[0];
          post_model.videoUrl = post.video?.[0];
          post_model.authorId = post.author._id;
          post_model.authorName = `${post.author.firstName} ${post.author.lastName}`;
          post_model.authorAvatar = post.author.profilePicture;
          post_model.likesCount = post.likes?.length || 0;
          post_model.commentsCount = post.comments?.length || 0;
          post_model.repostsCount = post.reposts?.length || 0;
          post_model.isLiked = post.isLiked || false;
          post_model.createdAt = new Date(post.createdAt);
          post_model.updatedAt = new Date(post.updatedAt);
        });
      }
    }
  });
};

export const getPostsFromDb = async (): Promise<Post[]> => {
  const postsCollection = database.get("posts");
  return await postsCollection.query().fetch();
};

export const getPostsByAuthor = async (authorId: string): Promise<Post[]> => {
  const postsCollection = database.get("posts");
  return await postsCollection.query(Q.where("author_id", authorId)).fetch();
};

export const clearPosts = async () => {
  const postsCollection = database.get("posts");
  await database.write(async () => {
    const allPosts = await postsCollection.query().fetch();
    for (const post of allPosts) {
      await post.destroyPermanently();
    }
  });
};

// MESSAGE OPERATIONS
export const saveMessages = async (messagesData: any[], receiverId: string) => {
  const messagesCollection = database.get("messages");
  await database.write(async () => {
    for (const msg of messagesData) {
      const existing = await messagesCollection
        .query(Q.where("server_id", msg._id))
        .fetch();

      if (existing.length === 0) {
        await messagesCollection.create((message_model) => {
          message_model.serverId = msg._id;
          message_model.senderId = msg.sender._id;
          message_model.receiverId = msg.receiver._id;
          message_model.text = msg.text;
          message_model.createdAt = new Date(msg.createdAt);
          message_model.isSynced = true;
        });
      }
    }
  });
};

export const getMessagesByReceiver = async (
  receiverId: string,
): Promise<Message[]> => {
  const messagesCollection = database.get("messages");
  return await messagesCollection
    .query(
      Q.or(
        Q.where("receiver_id", receiverId),
        Q.where("sender_id", receiverId),
      ),
    )
    .fetch();
};

export const getMessagesByConversation = async (
  receiverId: string,
): Promise<Message[]> => {
  const messagesCollection = database.get("messages");
  return await messagesCollection
    .query(
      Q.or(
        Q.where("receiver_id", receiverId),
        Q.where("sender_id", receiverId),
      ),
    )
    .fetch();
};

export const clearMessages = async () => {
  const messagesCollection = database.get("messages");
  await database.write(async () => {
    const allMessages = await messagesCollection.query().fetch();
    for (const msg of allMessages) {
      await msg.destroyPermanently();
    }
  });
};

// CONVERSATION OPERATIONS
export const saveConversations = async (conversationsData: any[]) => {
  const conversationsCollection = database.get("conversations");
  await database.write(async () => {
    for (const convo of conversationsData) {
      // Handle both API formats: { user: {...} } and { participant: {...} }
      const participant = convo.user || convo.participant;

      if (!participant || !participant._id) {
        console.warn("Skipping conversation with invalid participant:", convo);
        continue;
      }

      const existing = await conversationsCollection
        .query(
          Q.where("participant_id", convo.participantId || participant._id),
        )
        .fetch();

      if (existing.length > 0) {
        await existing[0].update((c) => {
          c.lastMessage = convo.lastMessage?.text || convo.lastMessage || "";
          c.lastMessageTime = new Date(
            convo.lastMessage?.createdAt || convo.lastMessageTime || Date.now(),
          );
          c.unreadCount = convo.unreadCount || 0;
          c.updatedAt = new Date();
        });
      } else {
        await conversationsCollection.create((convo_model) => {
          convo_model.participantId = participant._id;
          convo_model.participantName = `${participant.firstName} ${participant.lastName}`;
          convo_model.participantAvatar = participant.profilePicture;
          convo_model.lastMessage =
            convo.lastMessage?.text || convo.lastMessage || "";
          convo_model.lastMessageTime = new Date(
            convo.lastMessage?.createdAt || convo.lastMessageTime || Date.now(),
          );
          convo_model.unreadCount = convo.unreadCount || 0;
          convo_model.updatedAt = new Date();
        });
      }
    }
  });
};

export const getConversations = async (): Promise<Conversation[]> => {
  const conversationsCollection = database.get("conversations");
  return await conversationsCollection.query().fetch();
};

export const clearConversations = async () => {
  const conversationsCollection = database.get("conversations");
  await database.write(async () => {
    const allConversations = await conversationsCollection.query().fetch();
    for (const convo of allConversations) {
      await convo.destroyPermanently();
    }
  });
};
