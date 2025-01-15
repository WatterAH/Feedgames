import Logo from "./Logo";
import MenuItems from "./MenuItems";
import UserDropdown from "./UserDropdown";
import { useUser } from "@/context/AuthContext";
import { defaultUser } from "@/interfaces/User";
import { useAuthReminder } from "@/context/AuthReminderProvider";

interface Props {
  setCreating: React.Dispatch<React.SetStateAction<boolean>>;
}

const Menu: React.FC<Props> = ({ setCreating }) => {
  const { user } = useUser();
  const { triggerAlert } = useAuthReminder();

  const handleCreating = () => {
    if (user.id === defaultUser.id) {
      return triggerAlert("cantCreate");
    }
    setCreating(true);
  };

  return (
    <>
      <nav className="w-full lg:w-20 bottom-0 fixed left-0 lg:top-0 px-3 z-50 h-14 lg:h-full flex flex-col justify-center lg:justify-between lg:py-4 lg:items-center duration-500 bg-[rgba(var(--blur),0.8)] lg:bg-background backdrop-blur-[10px]">
        <Logo />
        <MenuItems create={handleCreating} />
        <UserDropdown />
      </nav>
    </>
  );
};

export default Menu;
