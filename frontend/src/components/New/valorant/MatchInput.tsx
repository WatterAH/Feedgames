import React, { useEffect, useRef, useState } from "react";
import ValMatch from "./ValMatch";
import Tooltip from "@/components/Global/Tooltip";
import { Match, MatchShowCase } from "@/interfaces/Valorant";
import { Gamepad2 } from "lucide-react";
import { useUser } from "@/context/AuthContext";

interface Props {
  setValMatch: React.Dispatch<React.SetStateAction<MatchShowCase | null>>;
  setPreview: React.Dispatch<
    React.SetStateAction<string | MatchShowCase | null>
  >;
  matches: Match[];
  riotId: object | null;
}

const MatchInput: React.FC<Props> = ({
  setValMatch,
  setPreview,
  matches,
  riotId,
}) => {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const setVal = (stats: MatchShowCase) => {
    setValMatch(stats);
    setPreview(stats);
    setIsOpen(false);
  };

  return riotId && matches.length > 0 ? (
    <div className="relative">
      <button onClick={handleClick}>
        <Gamepad2 className="text-secondaryicon h-5" />
      </button>
      {isOpen && (
        <ul
          ref={dropdownRef}
          className="absolute ml-2 left-full bottom-1/4 mt-2 z-20 w-72 h-20 overflow-y-scroll rounded-md"
        >
          {matches.map((match, i) => (
            <ValMatch
              key={i}
              setVal={setVal}
              match={match}
              riotId={user.riotId}
            />
          ))}
        </ul>
      )}
    </div>
  ) : (
    <Tooltip
      text={matches.length == 0 ? "No hay partidos" : "Vincula con Riot"}
    >
      <Gamepad2 className="text-gray-200 h-5" />
    </Tooltip>
  );
};

export default MatchInput;
