import React from "react";

export const ModalContent = ({ content }: { content: string }) => {
  const renderContent = () => {
    switch (content) {
      case "Privacy":
        return <Privacy />;
      case "TermsOfService":
        return <TermsOfService />;
      default:
        return <TermsOfService />;
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
          Las contraseñas se encuentran encriptadas y se han implementado todas
          las medidas de seguridad necesarias para salvaguardar los datos.
        </li>
        <li>
          Únicamente se recopilan los datos indispensables para la creación de
          un perfil público, los cuales incluyen: nombre de usuario y nombre.
          Los detalles adicionales y la foto de perfil son opcionales.
        </li>
        <li>
          Los jugadores deben optar por participar en nuestro servicio para
          compartir sus estadísticas y datos de juego. Sin un registro completo,
          la opción de compartir no estará disponible.
        </li>
        <li>
          No compartimos los datos de nuestros usuarios con terceros. Sin
          embargo, es importante tener en cuenta que Feedgames es una red
          pública y cualquier usuario registrado puede acceder a tu perfil.
        </li>
        <li>
          Utilizamos cookies para gestionar las sesiones de forma eficiente.
        </li>
      </ul>
    </>
  );
};

const TermsOfService = () => {
  return (
    <>
      <p className="text-base text-gray-500">
        Al utilizar nuestra aplicación, aceptas los siguientes Términos de
        Servicio:
      </p>
      <ul className="text-gray-500 list-disc mt-2 pl-4">
        <li>
          Los usuarios deben utilizar la red social conforme a su propósito
          original, publicando preguntas, encuestas, imágenes relacionadas con
          videojuegos u otro contenido pertinente, siempre y cuando no promueva
          la discriminación racial, sexual u otras formas de discriminación.
        </li>
        <li>
          Esta plataforma se encuentra en constante evolución, lo que puede
          implicar mejoras en los requisitos, interfaces y funcionalidades. No
          obstante, nos comprometemos a salvaguardar la seguridad y protección
          de los datos de los usuarios, por lo que no deberían preocuparse por
          la pérdida de sus datos durante estos cambios.
        </li>
        <li>
          El contenido compartido en la red social pertenece a los usuarios y
          nosotros lo utilizamos exclusivamente para mejorar y hacer crecer la
          plataforma. Los usuarios conservan los derechos de propiedad sobre su
          contenido.
        </li>
      </ul>
    </>
  );
};
