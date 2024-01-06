import React from "react";

export const ModalContent = ({ content }) => {
  const renderContent = () => {
    switch (content) {
      case "Issues":
        return <Issues />;
      case "About":
        return <About />;
      default:
        return <About />;
    }
  };

  return renderContent();
};

const Issues = () => {
  return (
    <>
      <p className="text-base text-gray-500">
        Los usuarios de iOS pueden experimentar problemas al iniciar sesión
        debido a una configuración específica de Safari. Puedes evitar esto
        siguiendo estos pasos:
      </p>
      <ul className="text-gray-500 list-disc mt-2 pl-4">
        <li>Dirígete a Configuración</li>
        <li>Busca la applicación Safari (o tu navegador predeterminado)</li>
        <li>Desactiva la opción "Evitar rastreo entre sitios"</li>
        <li>Recuerda activarla de nuevo cuando salgas de Feedgames</li>
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
