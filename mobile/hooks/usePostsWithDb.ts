import { database } from "@/database";
import { Post } from "@/types";
import { Q } from "@nozbe/watermelondb";
import { withObservables } from "@nozbe/with-observables";
import { useMemo } from "react";

const enhanceWithPosts = withObservables(
  ["username"],
  ({ username }: { username?: string }) => ({
    posts: username
      ? database.get("posts").query(Q.where("author_id", username)).observe()
      : database.get("posts").query().observe(),
  }),
);

export const usePostsWithDb = (username?: string) => {
  const ObservedComponent = useMemo(
    () =>
      enhanceWithPosts(({ posts }: { posts: Post[] }) => ({
        posts: posts || [],
      })),
    [],
  );

  return ObservedComponent({ username });
};
