import { useEffect } from "react";
import { usePathname } from "next/navigation";

export const ScrollRestoration = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;

    const validpaths = ["/me", "/home", "/notify", "/search"];
    if (!validpaths.includes(pathname)) return;

    const saveScrollPosition = () => {
      sessionStorage.setItem(pathname, window.scrollY.toString());
    };

    const restoreScrollPosition = () => {
      const savedScrollPosition = sessionStorage.getItem(pathname);
      if (savedScrollPosition) {
        window.scrollTo(0, parseInt(savedScrollPosition, 10));
      }
    };

    restoreScrollPosition();

    window.addEventListener("scroll", saveScrollPosition);

    return () => {
      window.removeEventListener("scroll", saveScrollPosition);
    };
  }, [pathname]);

  return null;
};
