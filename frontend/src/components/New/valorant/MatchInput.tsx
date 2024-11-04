import React, { useEffect, useRef, useState } from "react";
import ValMatch from "./ValMatch";
import Tooltip from "@/components/Global/Tooltip";
import Modal from "@/components/Global/Modal";
import Image from "next/image";
import { Match, MatchShowCase } from "@/interfaces/Valorant";
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
    <>
      <button onClick={handleClick}>
        <Image
          src="https://img.icons8.com/?size=100&id=GSHWFnD9x56D&format=png&color=999999"
          alt="val"
          height={20}
          width={20}
        />
      </button>
      <Modal open={isOpen} setOpen={setIsOpen} title="Valorant Tracker">
        <div className="absolute top-1 left-3 text-darkgray">
          <button onClick={() => setIsOpen(false)}>Cancelar</button>
        </div>
        <div className="h-[80vh] overflow-y-auto px-3">
          {matches.map((match, i) => (
            <ValMatch
              key={i}
              match={match}
              riotId={user.riotId}
              setVal={setVal}
            />
          ))}
        </div>
      </Modal>
    </>
  ) : (
    <Tooltip
      text={matches.length == 0 ? "No hay partidos" : "Vincula con Riot"}
    >
      <Image
        src="https://img.icons8.com/?size=100&id=GSHWFnD9x56D&format=png&color=e5e7eb"
        alt="val"
        height={20}
        width={20}
      />
    </Tooltip>
  );
};

export default MatchInput;
