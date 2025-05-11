import { useEffect } from "react";
import { usePathname } from "next/navigation";

export const ScrollRestoration = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;

    const validpaths = ["/me", "/home", "/notify", "/search"];
    if (!validpaths.includes(pathname)) return;

    const main = document.getElementById("main");

    if (!main) return;

    const saveScrollPosition = () => {
      sessionStorage.setItem(pathname, main.scrollTop.toString());
    };

    const restoreScrollPosition = () => {
      const savedScrollPosition = sessionStorage.getItem(pathname);
      if (savedScrollPosition) {
        main.scrollTop = parseInt(savedScrollPosition, 10);
      }
    };

    restoreScrollPosition();

    main.addEventListener("scroll", saveScrollPosition);

    return () => {
      main.removeEventListener("scroll", saveScrollPosition);
    };
  }, [pathname]);

  return null;
};
