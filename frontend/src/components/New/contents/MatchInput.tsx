import React, { useState } from "react";
import ValMatch from "./ValMatch";
import { MatchShowCase } from "@/interfaces/Valorant";
import { useGetMatches } from "@/hooks/useValorant";
import { Gamepad2 } from "lucide-react";
import { useUser } from "@/context/AuthContext";

interface Props {
  setValMatch: React.Dispatch<React.SetStateAction<MatchShowCase | null>>;
  setPreview: React.Dispatch<
    React.SetStateAction<string | ArrayBuffer | MatchShowCase | null>
  >;
}

const MatchInput: React.FC<Props> = ({ setValMatch, setPreview }) => {
  const { user } = useUser();
  const { matches } = useGetMatches();
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const setVal = (stats: MatchShowCase) => {
    setValMatch(stats);
    setPreview(stats);
    setIsOpen(false);
  };

  return (
    matches.length > 0 && (
      <div className="relative">
        <button onClick={handleClick}>
          <Gamepad2 className="text-secondaryicon h-5" />
        </button>
        {isOpen && (
          <ul className="absolute mt-2 z-20 w-64 h-56 md:h-40 scrollbar-thin overflow-y-auto border rounded-md bg-white shadow-lg">
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
    )
  );
};

export default MatchInput;
