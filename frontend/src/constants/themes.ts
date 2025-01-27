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
  { src: "/cherry-leaves.mp4", theme: "Cherry Leaves", value: "cherry-leaves" },
  { src: "/minecraft.mp4", theme: "Minecraft", value: "minecraft" },
  { src: "/link.mp4", theme: "Link ToTk", value: "link" },
  { src: "/zelda.mp4", theme: "Zelda ToTK", value: "zelda" },
  { src: "/killjoy.mp4", theme: "Killjoy", value: "killjoy" },
  { src: "/jett.mp4", theme: "Jett", value: "jett" },
];

export const themes: ThemesDictionary = {
  default: {
    backGround: "",
    usernameClass: "text-text",
    iconClass: "text-text",
    nameClass: "text-text",
    detailsClass: "text-text",
  },
  zelda: {
    backGround: "/zelda.mp4",
    usernameClass: "text-white text-shadow-xl",
    nameClass: "text-white font-bold text-shadow-xl",
    iconClass: "text-white text-shadow-xl",
    detailsClass: "text-white font-bold text-shadow-xl",
  },
  link: {
    backGround: "/link.mp4",
    usernameClass: "text-white text-shadow-xl",
    nameClass: "text-white font-bold text-shadow-xl",
    iconClass: "text-white text-shadow-xl",
    detailsClass: "text-white font-bold text-shadow-xl",
  },
  minecraft: {
    backGround: "/minecraft.mp4",
    usernameClass: "text-white text-shadow-xl",
    nameClass: "text-white font-bold text-shadow-xl",
    iconClass: "text-white text-shadow-xl",
    detailsClass: "text-white font-bold text-shadow-xl",
  },
  "cherry-leaves": {
    backGround: "/cherry-leaves.mp4",
    usernameClass: "text-white text-shadow-xl",
    nameClass: "text-white font-bold text-shadow-xl",
    iconClass: "text-white text-shadow-xl",
    detailsClass: "text-white font-bold text-shadow-xl",
  },
  jett: {
    backGround: "/jett.mp4",
    usernameClass: "text-white text-shadow-xl",
    nameClass: "text-white font-bold text-shadow-xl",
    iconClass: "text-white text-shadow-xl",
    detailsClass: "text-white font-bold text-shadow-xl",
  },
  killjoy: {
    backGround: "/killjoy.mp4",
    usernameClass: "text-white text-shadow-xl",
    nameClass: "text-white font-bold text-shadow-xl",
    iconClass: "text-white text-shadow-xl",
    detailsClass: "text-white font-bold text-shadow-xl",
  },
};

type theme = keyof typeof themes;

export function getThemeClasses(theme: theme) {
  return themes[theme];
}

// GLOBAL THEMES

interface ThemeColors {
  background: string;
  foreground: string;
  placeholder: string;
}

interface AppTheme {
  name: string;
  classname: string;
  colors: ThemeColors;
}

export const appareances = [
  {
    name: "White",
    classname: "theme-default",
    colors: {
      background: "#fafafa",
      foreground: "#ffffff",
      placeholder: "999999",
    },
  },
  {
    name: "Mint",
    classname: "theme-menta",
    colors: {
      background: "#b4f1eb",
      foreground: "#e0f9f6",
      placeholder: "75b09e",
    },
  },
  {
    name: "Cherry",
    classname: "theme-cherry",
    colors: {
      background: "#ffcbd2",
      foreground: "#ffd9e3",
      placeholder: "d68b9a",
    },
  },
  {
    name: "Vanilla",
    classname: "theme-vanilla",
    colors: {
      background: "#f3e6c2",
      foreground: "#fff7dd",
      placeholder: "c6a778",
    },
  },
  {
    name: "Dark",
    classname: "theme-dark",
    colors: {
      background: "#101010",
      foreground: "#202020",
      placeholder: "999999",
    },
  },
  {
    name: "Fern",
    classname: "theme-fern",
    colors: {
      background: "#212d27",
      foreground: "#2c3b33",
      placeholder: "9a9f8b",
    },
  },
  {
    name: "Shade",
    classname: "theme-shade",
    colors: {
      background: "#1a0f23",
      foreground: "#26182f",
      placeholder: "a07fa5",
    },
  },
  {
    name: "Abyss",
    classname: "theme-abyss",
    colors: {
      background: "#0e141b",
      foreground: "#18232e",
      placeholder: "8b9cb3",
    },
  },
];

export const getThemeColors = (classname: string): ThemeColors => {
  const theme: AppTheme | undefined = appareances.find(
    (theme) => theme.classname === classname
  );

  return (
    theme?.colors ??
    appareances.find((theme) => theme.classname == "theme-default")?.colors ?? {
      background: "",
      foreground: "",
      placeholder: "b3b3b3",
    }
  );
};
