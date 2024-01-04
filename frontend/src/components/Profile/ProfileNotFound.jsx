import React from "react";

export const ProfileNotFound = () => {
  return (
    <section className="flex flex-col items-center max-w-sm justify-center gap-y-7">
      <h1 className="text-4xl font-montserrat">Este perfil no existe.</h1>
      <p className="font-rubik text-sm text-center md:text-base">
        Es posible que el enlace que hayas seguido sea incorrecto o que el
        perfil se haya eliminado
      </p>
      <Button onClick={() => (window.location.href = "/")}>
        Volver a CraftFeed
      </Button>
    </section>
  );
};
