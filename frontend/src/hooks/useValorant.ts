import { useUser } from "@/context/AuthContext";
import { getExpirationDate } from "@/functions/date";
import { Match } from "@/interfaces/Valorant";
import { getMatchByUuid, getMatchesList, setRiotId } from "@/routes/valorant";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

export const useRiotToken = () => {
  const { login, user } = useUser();
  const searchParams = useSearchParams();
  const riotToken = searchParams.get("riotToken");
  const [, setCookie] = useCookies();

  useEffect(() => {
    if (riotToken && user.id) {
      const setData = async () => {
        toast.promise(setRiotId(riotToken, user.id), {
          loading: "Vinculando...",
          success: (data) => {
            login(data.user);
            setCookie("token", data.token, {
              expires: getExpirationDate(),
            });
            window.history.replaceState(null, "", window.location.pathname);
            return "Cuenta de Riot vinculada con éxito.";
          },
          error: (err) => err.message,
        });
      };
      setData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [riotToken, user.id]);
};

export const useGetMatches = (puuid: string | undefined) => {
  const [matches, setMatches] = useState<Match[]>([]);

  const fetchMatches = useCallback(async () => {
    if (!puuid) return;
    try {
      const matchsIds = await getMatchesList(puuid);
      const promises = matchsIds.history.map((match) =>
        getMatchByUuid(match.matchId, puuid)
      );
      const matchesList = await Promise.all(promises);
      setMatches(matchesList);
    } catch (error: any) {
      toast.error("Algo salió mal");
      throw new Error(error.message);
    }
  }, [puuid]);

  useEffect(() => {
    fetchMatches();
  }, [fetchMatches]);

  return { matches };
};
