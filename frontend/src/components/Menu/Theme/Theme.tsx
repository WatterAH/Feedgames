interface AppareanceProps {
  name: string;
  classname: string;
  colors: {
    background: string;
    foreground: string;
  };
}

const Theme: React.FC<AppareanceProps> = ({ name, colors, classname }) => {
  const onSelectTheme = (themeClass: string) => {
    const currentTheme = localStorage.getItem("theme") || "theme-default";
    if (currentTheme === themeClass) return;

    document.body.classList.remove(currentTheme);
    document.body.classList.add(themeClass);

    localStorage.setItem("theme", themeClass);
  };

  return (
    <div
      key={name}
      onClick={() => onSelectTheme(classname)}
      className="w-20 h-20 cursor-pointer relative overflow-hidden rounded-md shadow-lg border"
      style={{
        borderColor: colors.foreground,
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${colors.background} 50%, ${colors.foreground} 50%)`,
        }}
      ></div>
      <span className="absolute bottom-1 right-1 text-xs font-medium bg-black/40 text-white px-1 py-0.5 rounded-md">
        {name}
      </span>
    </div>
  );
};

export default Theme;
