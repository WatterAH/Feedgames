// PROFILE THEMES

export type Theme =
  | "default"
  | "zelda"
  | "link"
  | "minecraft"
  | "cherry-leaves"
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
  { src: "/killjoy.mp4", theme: "Killjoy", value: "killjoy" },
  { src: "/jett.mp4", theme: "Jett", value: "jett" },
];

export const themes: ThemesDictionary = {
  default: {
    backGround: "",
    usernameClass: "text-text",
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

// GLOBAL THEMES

export const appareances = [
  {
    name: "White",
    classname: "theme-default",
    colors: {
      background: "#fafafa",
      foreground: "#ffffff",
    },
  },

  {
    name: "Mint",
    classname: "theme-menta",
    colors: {
      background: "#e1f7f3",
      foreground: "#f4fdf9",
    },
  },
  {
    name: "Cherry",
    classname: "theme-cherry",
    colors: {
      background: "#ffe4e6",
      foreground: "#fff7f9",
    },
  },
  {
    name: "Vanilla",
    classname: "theme-vanilla",
    colors: {
      background: "#fef7e3",
      foreground: "#fffdf4",
    },
  },
  {
    name: "Dark",
    classname: "theme-dark",
    colors: {
      background: "#101010",
      foreground: "#202020",
    },
  },
  {
    name: "Fern",
    classname: "theme-fern",
    colors: {
      background: "#212d27",
      foreground: "#2c3b33",
    },
  },
  {
    name: "Nightshade",
    classname: "theme-nightshade",
    colors: {
      background: "#1a0f23",
      foreground: "#26182f",
    },
  },
  {
    name: "Abyss",
    classname: "theme-abyss",
    colors: {
      background: "#0e141b",
      foreground: "#18232e",
    },
  },
];
