import React, { useState } from "react";
import ValMatch from "./ValMatch";
import Modal from "@/components/Global/Modal";
import { Match, MatchShowCase } from "@/interfaces/Valorant";
import { useUser } from "@/context/AuthContext";
import { ContentObject } from "@/interfaces/Post";
import MatchButton from "./MatchButton";

interface Props {
  setContent: (content: ContentObject) => void;
  matches: Match[];
}

const MatchInput: React.FC<Props> = ({ setContent, matches }) => {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  const setVal = (stats: MatchShowCase) => {
    setContent({ type: "valorant", data: stats });
    setIsOpen(false);
  };

  return (
    <>
      <MatchButton setIsOpen={setIsOpen} matchesLenght={matches.length} />
      {user.riotId && (
        <Modal
          open={isOpen}
          setOpen={setIsOpen}
          title="Valorant Tracker"
          size="sm"
          full={false}
        >
          <div className="absolute top-1 left-3 text-text">
            <button onClick={() => setIsOpen(false)}>Cancelar</button>
          </div>
          <div className="h-[60vh] overflow-y-auto px-3 space-y-2">
            {matches.map((match, i) => (
              <ValMatch key={i} match={match} setVal={setVal} />
            ))}
          </div>
        </Modal>
      )}
    </>
  );
};

export default MatchInput;
