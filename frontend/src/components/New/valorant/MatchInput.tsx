import React, { useState } from "react";
import ValMatch from "./ValMatch";
import { Match, MatchShowCase } from "@/interfaces/Valorant";
import { useUser } from "@/context/AuthContext";
import { ContentObject } from "@/interfaces/Post";
import MatchButton from "./MatchButton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

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
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent showCloseButton={false} className="sm:max-w-sm">
            <DialogHeader className="border-b flex items-center py-3">
              <DialogTitle>
                Valorant Tracker ({user.riotId.gameName})
              </DialogTitle>
              <button
                onClick={() => setIsOpen(false)}
                className="absolute right-2 top-0 hover:bg-(--hover) rounded-full p-2"
              >
                <X />
              </button>
            </DialogHeader>
            <div className="h-[60vh] overflow-y-auto space-y-2">
              {matches.map((match, i) => (
                <ValMatch key={i} match={match} setVal={setVal} />
              ))}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default MatchInput;
