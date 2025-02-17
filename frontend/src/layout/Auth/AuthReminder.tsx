import Button from "@/components/Global/Button";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { LucideIcon } from "lucide-react";
import { stopPropagation } from "@/functions/utils";
import { useRouter } from "next/navigation";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  to: string;
  Icon: LucideIcon;
  details: string;
}

const AuthReminder: React.FC<Props> = ({
  to,
  Icon,
  details,
  open,
  setOpen,
}) => {
  const router = useRouter();
  const handleLogIn = () => {
    router.push("/login");
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 backdrop-blur-sm bg-black/65 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div
        className="fixed inset-0 z-10 w-screen overflow-y-auto"
        onClick={stopPropagation}
      >
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-3xl bg-foreground text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-md data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-foreground px-6 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center">
                  <Icon className="mx-auto h-12 w-12 text-text" />
                  <DialogTitle
                    as="h3"
                    className="text-3xl mt-4 font-extrabold text-text"
                  >
                    Registrate para {to}
                  </DialogTitle>
                  <div className="mt-3">
                    <p className="text-sm text-placeholder">{details}</p>
                  </div>
                  <div className="mt-6 w-full">
                    <Button onClick={handleLogIn}>Entrar al juego</Button>
                  </div>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default AuthReminder;
