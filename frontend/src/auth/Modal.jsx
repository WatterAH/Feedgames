import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Button } from "../components/Button";

export const Modal = () => {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <button onClick={openModal} type="button">
        <FontAwesomeIcon icon={faCircleInfo} className="text-teal-800 h-5" />
      </button>

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
                <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    <h1 className="font-montserrat text-lg">
                      ¿Problemas al Iniciar Sesión?
                    </h1>
                  </Dialog.Title>
                  <div className="mt-4">
                    <p className="text-base text-gray-500">
                      Los usuarios de iOS pueden experimentar problemas al
                      iniciar sesión debido a una configuración específica de
                      Safari. Puedes evitar esto siguiendo estos pasos:
                    </p>
                    <ul className="text-gray-500 list-disc mt-2 pl-4">
                      <li>Dirígete a Configuración</li>
                      <li>
                        Busca la applicación Safari (o tu navegador
                        predeterminado)
                      </li>
                      <li>
                        Desactiva la opción "Evitar rastreo entre sitios".
                      </li>
                    </ul>
                  </div>
                  <div className="mt-4">
                    <Button type="button" onClick={closeModal}>
                      Lo tengo
                    </Button>
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
