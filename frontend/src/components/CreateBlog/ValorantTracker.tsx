import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { getMatchByUuid, getMatchesList } from "../../Api/valorant";
import { useCookies } from "react-cookie";
import { LoadingPage } from "../LoadingPage";
import { Match, MatchShowCase } from "../../interfaces/Valorant";
import { ValMatch } from "./ValMatch";
import valorant from "../../assets/img/valorant.svg";
import { NoSymbolIcon } from "@heroicons/react/24/outline";
import { useRiot } from "../../context/RiotContext";

const ValError = ({ error }: { error: string }) => {
  return (
    <div className="flex flex-col gap-2 items-center justify-center h-full">
      <NoSymbolIcon className="text-red-400 h-14 w-14" />
      <p className="font-roboto text-gray-600">{error}</p>
    </div>
  );
};

interface Props {
  setPreview: React.Dispatch<
    React.SetStateAction<string | ArrayBuffer | MatchShowCase | null>
  >;
  setValMatch: React.Dispatch<React.SetStateAction<MatchShowCase | null>>;
}
export const ValoranTracker: React.FC<Props> = ({
  setPreview,
  setValMatch,
}) => {
  const { riotUser } = useRiot();
  const [isOpen, setIsOpen] = useState(false);
  const [cookies] = useCookies();
  const [loading, setLoading] = useState(false);
  const [matches, setMatches] = useState<Match[]>([]);
  const [error, setError] = useState("");

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const getMatches = async () => {
    try {
      setLoading(true);
      const matchesFetched = await getMatchesList(cookies.riotToken);
      const promises = matchesFetched.history.map((match) =>
        getMatchByUuid(match.matchId, riotUser.puuid)
      );
      const matchesList = await Promise.all(promises);
      setMatches(matchesList);
    } catch (error: any) {
      const { message } = error;
      if (message == "401") {
        setError("Inicia sesión con Riot para ver tu historial");
      } else if (message == "404") {
        setError("No se encontrarón partidas");
      } else {
        setError("Algo salió mal");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMatches();
  }, []);

  return (
    <>
      <img
        src={valorant}
        alt="."
        className="w-6 h-6 outline-none mb-1 cursor-pointer"
        onClick={openModal}
      />
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 lg:ml-60 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl flex justify-center font-medium leading-6 text-gray-900 p-2 border-b font-montserrat"
                  >
                    Tus partidas
                  </Dialog.Title>
                  <div className="mb-2 h-72 overflow-y-auto flex items-center justify-center">
                    {loading ? (
                      <LoadingPage />
                    ) : error ? (
                      <ValError error={error} />
                    ) : (
                      <div className="w-full h-full flex flex-col gap-2 p-4">
                        {matches.map((match) => (
                          <ValMatch
                            key={match.matchInfo.matchId}
                            match={match}
                            setValMatch={setValMatch}
                            setPreview={setPreview}
                            closeModal={closeModal}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
