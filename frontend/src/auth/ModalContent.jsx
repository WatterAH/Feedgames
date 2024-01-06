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
        <li>Desactiva la opción "Evitar rastreo entre sitios".</li>
      </ul>
    </>
  );
};

const About = () => {
  return (
    <p className="text-base text-gray-500">
      Descubre, comparte y conecta con otros apasionados por los videojuegos en
      nuestra plataforma. Sigue a tus creadores favoritos, da likes, comenta y
      guarda publicaciones para no perderte nada emocionante. Únete a la
      conversación y lleva tu experiencia de juego al siguiente nivel.
    </p>
  );
};
