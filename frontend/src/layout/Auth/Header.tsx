import { Gamepad2, Share2, Users } from "lucide-react";

const Header = () => {
  return (
    <header className="flex flex-col gap-y-6 justify-center items-center mb-1">
      <section className="flex items-center">
        <h1 className="text-4xl font-pacifico text-text">Feedgames</h1>
      </section>
      <section className="flex justify-around w-full text-gray-400">
        <span className="flex items-center gap-x-2 md:gap-x-0">
          <Gamepad2 className="md:h-4" />
          <p className="font-raleway md:text-xs">Juega</p>
        </span>
        <span className="flex items-center gap-x-2 md:gap-x-0">
          <Share2 className="md:h-4" />
          <p className="font-raleway md:text-xs">Comparte</p>
        </span>
        <span className="flex items-center gap-x-2 md:gap-x-0">
          <Users className="md:h-4" />
          <p className="font-raleway md:text-xs">Conecta</p>
        </span>
      </section>
    </header>
  );
};

export default Header;
