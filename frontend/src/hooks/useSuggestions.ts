import { useEffect, useState } from "react";
import { User } from "../interfaces/User";
import { getPopularUsers } from "../Api/suggestions";

export const useSuggestions = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const popularUsers = async () => {
    try {
      setLoading(true);
      const data = await getPopularUsers();
      setUsers(data);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    popularUsers();
  }, []);

  return { users, loading, error };
};
