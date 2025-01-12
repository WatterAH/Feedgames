export type Theme =
  | "default"
  | "zelda"
  | "link"
  | "minecraft"
  | "cherry-leaves"
  | "yoru"
  | "killjoy"
  | "jett";
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
  { src: "white", theme: "Default", value: "default" },
  { src: "/zelda.mp4", theme: "Zelda ToTK", value: "zelda" },
  { src: "/link.mp4", theme: "Link ToTk", value: "link" },
  { src: "/minecraft.mp4", theme: "Minecraft", value: "minecraft" },
  { src: "/cherry-leaves.mp4", theme: "Cherry Leaves", value: "cherry-leaves" },
  { src: "/yoru.mp4", theme: "Yoru", value: "yoru" },
  { src: "/killjoy.mp4", theme: "Killjoy", value: "killjoy" },
  { src: "/jett.mp4", theme: "Jett", value: "jett" },
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
    backGround: "/zelda.mp4",
    usernameClass: "text-white",
    nameClass: "text-white font-bold",
    iconClass: "text-white",
    detailsClass: "text-white font-bold",
  },
  link: {
    backGround: "/link.mp4",
    usernameClass: "text-white",
    nameClass: "text-white font-bold",
    iconClass: "text-white",
    detailsClass: "text-white font-bold",
  },
  minecraft: {
    backGround: "/minecraft.mp4",
    usernameClass: "text-white",
    nameClass: "text-white font-bold",
    iconClass: "text-white",
    detailsClass: "text-white font-bold",
  },
  "cherry-leaves": {
    backGround: "/cherry-leaves.mp4",
    usernameClass: "text-white",
    nameClass: "text-white font-bold",
    iconClass: "text-white",
    detailsClass: "text-white font-bold",
  },
  yoru: {
    backGround: "/yoru.mp4",
    usernameClass: "text-white",
    nameClass: "text-white font-bold",
    iconClass: "text-white",
    detailsClass: "text-white font-bold",
  },
  jett: {
    backGround: "/jett.mp4",
    usernameClass: "text-white",
    nameClass: "text-white font-bold",
    iconClass: "text-white",
    detailsClass: "text-white font-bold",
  },
  killjoy: {
    backGround: "/killjoy.mp4",
    usernameClass: "text-white",
    nameClass: "text-white font-bold",
    iconClass: "text-white",
    detailsClass: "text-white font-bold",
  },
};

type theme = keyof typeof themes;

export function getThemeClasses(theme: theme) {
  return themes[theme];
}
