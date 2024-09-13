import React, { useCallback } from "react";
import { UserIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

interface Props {
  link: string;
  Icon: typeof UserIcon;
  text: "Inicio" | "Crear" | "Notificaciones" | "Explorar" | "Tú";
  isActive: boolean;
}

const MenuItem: React.FC<Props> = ({ link, Icon, text, isActive }) => {
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <Link to={link} onClick={scrollToTop}>
      <li
        className={`flex items-center gap-x-2 rounded-xl hover:bg-gray-100 transition-transform duration-500 p-3 ${
          isActive ? "bg-gray-200 lg:bg-gray-100" : ""
        }`}
      >
        <Icon className="h-7 w-7 lg:h-8 lg:w-8 text-neutral-800" aria-hidden />
        <p
          className={`hidden lg:block font-montserrat ${
            isActive && "font-semibold"
          }`}
        >
          {text}
        </p>
      </li>
    </Link>
  );
};

export default MenuItem;
