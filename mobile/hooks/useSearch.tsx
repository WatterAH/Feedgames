import { searchPost, searchUser } from "@/api/actions";
import { PostInterface } from "@/interfaces/Post";
import { User } from "@/interfaces/User";
import { useCallback, useEffect, useState } from "react";

export const useSearch = (
  userId: string | undefined,
  type: "user" | "post",
  searchTerm?: string
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const search = useCallback(async () => {
    if (!userId || !searchTerm) return;
    setLoading(true);
    try {
      if (type == "post") {
        const data = await searchPost(userId, searchTerm);
        setPosts(data);
      } else {
        const data = await searchUser(searchTerm);
        setUsers(data);
      }
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [userId, searchTerm, type]);

  useEffect(() => {
    search();
  }, [searchTerm, userId, type]);

  return { loading, error, posts, users };
};
