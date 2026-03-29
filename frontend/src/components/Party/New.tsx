import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Check, Plus, Search, X } from "lucide-react";
import Label from "../ui/Label";
import SubmitButton from "../Auth/SubmitButton";
import { useSearchUsers } from "@/hooks/useExplorer";
import { useUser } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { User } from "@/interfaces/User";
import ProfilePicture from "../Profile/ProfilePicture";
import Loader from "../ui/Loader";
import { toast } from "sonner";
import partyRouter from "@/routes/party";
import { BProgress } from "@bprogress/core";
import { useRouter } from "next/navigation";

const New = () => {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<string[]>([]);
  const router = useRouter();
  const { resultsUsers, loadUsers } = useSearchUsers(
    searchTerm,
    user.id,
    undefined,
    3,
  );

  const setUser = (id: string) => {
    if (users.includes(id)) {
      return setUsers(users.filter((userId) => userId !== id));
    }
    setUsers([...users, id]);
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setLoading(true);
      const id = await partyRouter.create(user.id, users);
      toast.success("Grupo creado exitosamente");
      setUsers([]);
      setSearchTerm("");
      setOpen(false);
      BProgress.start();
      router.push(`/inbox/${id}`);
    } catch (error: any) {
      toast.error(error.message || "Error al crear el grupo");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="py-2 px-6 text-sm flex justify-center items-center bg-(--text) rounded-xl text-(--foreground) w-full font-inter active:scale-95 transition-transform">
        <Plus />
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader className="border-b flex items-center py-4 px-3 w-full relative">
          <DialogTitle>Nuevo grupo</DialogTitle>
          <button
            onClick={() => setOpen(false)}
            className="rounded-full hover:bg-(--hover) p-2 transition-all duration-500 absolute right-3 top-1"
          >
            <X />
          </button>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="w-full px-4 pb-7 flex flex-col items-center gap-y-3"
        >
          <div className="flex flex-col gap-y-2 w-full">
            <div className="flex items-center justify-between">
              <Label>Miembros</Label>
              {users.length > 0 && (
                <span className="text-(--placeholder) text-xs">
                  {users.length} seleccionados
                </span>
              )}
            </div>
            <div className="relative w-full">
              <Search className="text-(--placeholder) size-5 absolute top-3 left-4" />
              <input
                type="text"
                className="py-3 text-base sm:text-sm px-11 outline-none border border-(--border) rounded-2xl w-full bg-(--background) placeholder-(--placeholder) text-(--text)"
                value={searchTerm}
                maxLength={30}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar miembros..."
              />
              <div className="absolute right-4 top-3">
                {loadUsers && <Loader color="dark" size="small" />}
              </div>
            </div>
          </div>

          <div
            className={cn(
              "grid transition-all duration-300 ease-in-out w-full",
              resultsUsers.length > 0 ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
            )}
          >
            <div className="overflow-hidden">
              <div className="bg-(--background) border border-(--border) rounded-2xl mt-2 p-2 space-y-2">
                {resultsUsers.map((user) => (
                  <UserResult
                    key={user.id}
                    {...user}
                    users={users}
                    callback={setUser}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="w-full mt-2">
            <SubmitButton
              loading={loading}
              text="Crear grupo"
              disabled={false}
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const UserResult: React.FC<
  User & { callback: (id: string) => void; users: string[] }
> = (data) => {
  const { user } = useUser();
  const { id, pfp, username, name } = data;
  const selected = data.users.includes(id);
  const sameUser = user.id === id;

  return (
    <div
      className={cn(
        "flex items-center justify-between w-full py-3 px-5 hover:cursor-pointer",
        selected && "bg-(--accent) text-(--accent-foreground) rounded-xl",
      )}
      onClick={() => {
        if (sameUser) return;
        data.callback(id);
      }}
    >
      <div className="flex items-center gap-x-3">
        <ProfilePicture userId={id} h={40} w={40} src={pfp} />
        <div className="">
          <span className="flex items-center">
            <p className="font-semibold text-(--text)">{username}</p>
          </span>
          <p className="text-(--placeholder) text-sm">{name}</p>
        </div>
      </div>

      {!sameUser && (
        <div
          className={cn(
            "rounded-full transition-colors size-5 text-(--foreground) border border-(--border) flex items-center justify-center",
            selected && "bg-(--text)",
          )}
        >
          {selected && <Check size={12} />}
        </div>
      )}
    </div>
  );
};

export default New;
