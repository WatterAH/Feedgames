import { useEffect } from "react";
import { usePathname } from "next/navigation";

export const ScrollRestoration = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;

    const validpaths = ["/me", "/home", "/notify", "/search"];
    if (!validpaths.includes(pathname)) return;

    const saveScrollPosition = () => {
      sessionStorage.setItem(`scroll-${pathname}`, window.scrollY.toString());
    };

    const restoreScrollPosition = () => {
      const savedPosition = sessionStorage.getItem(`scroll-${pathname}`);
      if (savedPosition) {
        window.scrollTo({
          top: parseInt(savedPosition, 10),
          behavior: "instant",
        });
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
