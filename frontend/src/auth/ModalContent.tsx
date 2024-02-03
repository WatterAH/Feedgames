import React from "react";

export const ModalContent = ({ content }: { content: string }) => {
  const renderContent = () => {
    switch (content) {
      case "Privacy":
        return <Privacy />;
      case "About":
        return <About />;
      default:
        return <About />;
    }
  };

  return renderContent();
};

const Privacy = () => {
  return (
    <>
      <p className="text-base text-gray-500">
        Este Aviso de Privacidad describe cómo Feedgames recopila, utiliza y
        protege la información que proporcionas al utilizar nuestra aplicación.
      </p>
      <ul className="text-gray-500 list-disc mt-2 pl-4">
        <li>
          Todas las contraseñas están encriptadas para garantizar su
          confidencialidad y seguridad.
        </li>
        <li>
          Hemos implementado medidas de seguridad avanzadas para prevenir
          ataques de inyección SQL y proteger la integridad de nuestros
          sistemas.
        </li>
        <li>
          Monitoreamos las 24 horas del día todos los posts y actividades en la
          aplicación para asegurar un entorno seguro y respetuoso.
        </li>
      </ul>
    </>
  );
};

const About = () => {
  return (
    <p className="text-base text-gray-500">
      Explora un mundo de videojuegos en nuestra red social. Sigue a tus
      creadores de contenido favoritos, interactúa con likes y comentarios, y
      guarda publicaciones para no perderte nada emocionante. Únete a la
      conversación y lleva tu experiencia de juego al siguiente nivel.
      ¡Descubre, conecta y comparte tu pasión por los videojuegos como nunca
      antes! 🎮
    </p>
  );
};
