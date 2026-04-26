import MyButton from "@/components/ui/MyButton";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  message: string;
}

const WarningOverlay = ({ open, setOpen, message }: Props) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="flex flex-col gap-4" showCloseButton={false}>
        <DialogHeader className="pt-4 px-5 w-full">
          <DialogTitle className="text-2xl">¡Cuidado!</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 px-5 pb-4">
          <p>{message}</p>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="destructive">Entiendo los riesgos</Button>
            <MyButton>Pedir ayuda</MyButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WarningOverlay;
