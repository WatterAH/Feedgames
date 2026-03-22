import { useUser } from "@/context/AuthContext";
import { getExpirationDate } from "@/lib/date";
import { Match } from "@/interfaces/Valorant";
import { getMatchByUuid, getMatchesList } from "@/routes/valorant";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "sonner";
import { jwtDecode } from "jwt-decode";
import { User } from "@/interfaces/User";

export const useRiotToken = () => {
  const { login, user } = useUser();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [, setCookie] = useCookies();

  function handleToken(token: string) {
    try {
      const userData: User = jwtDecode(token);
      login(userData);
      console.log(token);

      setCookie("token", token, {
        expires: getExpirationDate(),
      });

      if (user.riotId) toast.success(`Hola ${user.riotId.gameName}!`);
    } catch (error) {
      toast.error("No pudimos vincular tu cuenta de Riot");
    } finally {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }

  useEffect(() => {
    if (!token || !user.id) return;

    handleToken(token);
  }, [token, user.id, login, setCookie]);
};

export const useGetMatches = (puuid: string | undefined) => {
  const [matches, setMatches] = useState<Match[]>([]);

  const fetchMatches = useCallback(async () => {
    if (!puuid) return;

    try {
      const matchsIds = await getMatchesList(puuid);
      const promises = matchsIds.history.map((match) =>
        getMatchByUuid(match.matchId, puuid),
      );
      const matchesList = await Promise.all(promises);
      setMatches(matchesList);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }, [puuid]);

  useEffect(() => {
    fetchMatches();
  }, [fetchMatches]);

  return { matches };
};
