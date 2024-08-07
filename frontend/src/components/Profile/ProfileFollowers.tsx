import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { User } from "../../interfaces/User";
import { getFollowersById } from "../../Api/actions";
import { Link } from "react-router-dom";
import { LoadingPage } from "../LoadingPage";
import default_pfp from "../../assets/img/default.png";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { toast } from "sonner";

const DisplayUser = ({ userData }: { userData: User }) => {
  const { id, name, username, pfp } = userData;
  userData.follow = true;
  const href = pfp
    ? `https://zptrwdrgobouoriwsfoj.supabase.co/storage/v1/object/public/Images/pfp/${pfp}`
    : default_pfp;
  return (
    <Link to={`/u/${id}`} className="flex items-center gap-2 justify-between">
      <section className="flex items-center gap-2">
        <img src={href} alt="pfp" className="rounded-full w-12 h-12" />
        <span className="flex flex-col font-montserrat">
          <p className="text-gray-700">{username}</p>
          <p className="text-gray-400">{name}</p>
        </span>
      </section>
    </Link>
  );
};

interface Props {
  userData: User;
}

export const ProfileFollowers: React.FC<Props> = ({ userData }) => {
  const { id, followers } = userData;
  const [followersList, setFollowersList] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    getFollowersById(id)
      .then((results) => setFollowersList(results))
      .catch((err: any) => {
        const { message } = err;
        toast.error(message);
      })
      .finally(() => setLoading(false));
  }, []);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <span
        onClick={openModal}
        className="text-xs font-montserrat py-1 px-2 rounded-full bg-gray-200 cursor-pointer"
      >
        {followers} {followers == 1 ? "Seguidor" : "Seguidores"}
      </span>
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
            <div className="flex min-h-full items-center justify-center p-4 text-center">
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
                    Seguidores
                  </Dialog.Title>
                  <div className="mt-2 flex flex-col gap-2 overflow-y-auto px-6 h-72 py-2">
                    {loading ? (
                      <div className="flex items-center justify-center h-full">
                        <LoadingPage />
                      </div>
                    ) : followersList.length == 0 ? (
                      <div className="flex flex-col gap-2 items-center justify-center h-full">
                        <QuestionMarkCircleIcon className="w-14 h-14 text-gray-500" />
                        <p className="font-roboto text-gray-600">
                          Esto está vacío
                        </p>
                      </div>
                    ) : (
                      followersList.map((user) => (
                        <DisplayUser key={user.id} userData={user} />
                      ))
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
