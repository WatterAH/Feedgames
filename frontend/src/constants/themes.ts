export type Theme = "default" | "zelda" | "link" | "ganondorf";
type ThemesDictionary = {
  [key in Theme]: {
    backGround: string;
    usernameClass: string;
    iconClass: string;
    detailsClass: string;
    nameClass: string;
  };
};

export const previewThemes: { src: string; theme: string; value: Theme }[] = [
  { src: "/zelda.gif", theme: "Zelda ToTK", value: "zelda" },
  { src: "/ganon.gif", theme: "Ganon ToTk", value: "ganondorf" },
  { src: "/link.gif", theme: "Link ToTk", value: "link" },
];

export const themes: ThemesDictionary = {
  default: {
    backGround: "",
    usernameClass: "",
    iconClass: "",
    nameClass: "text-secondaryicon",
    detailsClass: "text-secondaryicon",
  },
  zelda: {
    backGround: "/zelda.gif",
    usernameClass: "text-white",
    nameClass: "text-white font-bold",
    iconClass: "text-white",
    detailsClass: "text-white font-bold",
  },
  link: {
    backGround: "/link.gif",
    usernameClass: "text-white",
    nameClass: "text-white font-bold",
    iconClass: "text-white",
    detailsClass: "text-white font-bold",
  },
  ganondorf: {
    backGround: "/ganon.gif",
    usernameClass: "text-white",
    nameClass: "text-white",
    iconClass: "text-white",
    detailsClass: "text-white",
  },
};

type theme = keyof typeof themes;

export function getThemeClasses(theme: theme) {
  return themes[theme];
}
