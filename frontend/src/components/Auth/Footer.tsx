import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full flex mt-5 sm:mt-0 mb-4 justify-center items-center gap-x-4 font-raleway">
      <Link href={"/terms-of-service"} className="text-gray-400 text-xs">
        Términos de Servicio
      </Link>
      <Link href={"/privacy-policy"} className="text-gray-400 text-xs">
        Política de Privacidad
      </Link>
    </footer>
  );
};

export default Footer;
