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
          Las contraseñas están encriptadas y todas las medidas de seguridad
          están implementadas para proteger los datos.
        </li>
        <li>
          Los jugadores deben optar por participar en nuestro servicio para
          compartir sus estadísticas y datos de juego.
        </li>
        <li>
          Solo se recopilan los datos necesarios para generar un perfil público,
          los cuales incluyen: nombre de usuario y un nombre. Los detalles y la
          foto de perfil son opcionales.
        </li>
        <li>
          Los jugadores deben optar por participar en nuestro servicio para
          compartir sus estadísticas y datos de juego. Sin registro, la opción
          de compartir no estará disponible.
        </li>
        <li>
          No compartimos datos de usuarios con terceros, pero ten en cuenta que
          Feedgames es una red pública y cualquier usuario registrado puede ver
          tu perfil.
        </li>
        <li>
          Utilizamos una cookie para guardar la sesión del usuario, con una
          duración de 31 días.
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
          Los usuarios deben utilizar la red social de acuerdo con su uso
          previsto, publicando preguntas, encuestas, imágenes relacionadas con
          videojuegos o cualquier otro contenido que deseen, siempre y cuando no
          promueva la discriminación racial, sexual u otros tipos de
          discriminación.
        </li>
        <li>
          Esta plataforma esta en constante crecimiento, lo que pueden incluir
          mejoras en los requisitos, interfaces y funciones. Sin embargo, nos
          comprometemos a garantizar la seguridad y protección de los datos de
          los usuarios, por lo que no deben preocuparse por la pérdida de sus
          datos durante estos cambios.
        </li>
        <li>
          El contenido compartido en la red social pertenece a los usuarios, y
          nosotros lo utilizamos únicamente para mejorar y hacer crecer la
          plataforma. Los usuarios retienen los derechos de propiedad sobre su
          contenido.
        </li>
      </ul>
      <p className="text-base text-gray-500 mt-4">
        Estos Términos de Servicio están sujetos a cambios en cualquier momento
        sin previo aviso. Se te notificarán los cambios mediante la publicación
        de los nuevos Términos de Servicio en esta página.
      </p>
    </>
  );
};
