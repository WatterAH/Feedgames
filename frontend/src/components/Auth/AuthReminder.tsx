import Button from "@/components/ui/MyButton";
import { LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        showCloseButton={false}
        className="bg-(--foreground) px-6 pb-6 pt-5 sm:p-6 sm:pb-6"
      >
        <DialogHeader className="hidden">
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <div className="sm:flex sm:items-start">
          <div className="mt-3 text-center">
            <Icon className="mx-auto h-12 w-12 text-(--text)" />
            <h3 className="text-3xl mt-4 font-extrabold text-(--text)">
              Registrate para {to}
            </h3>
            <div className="mt-3">
              <p className="text-sm text-(--placeholder)">{details}</p>
            </div>
            <div className="mt-6 w-full">
              <Button onClick={handleLogIn}>Entrar al juego</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthReminder;
