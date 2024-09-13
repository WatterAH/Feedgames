import { ListItem } from "./ListItem";
import { LegalPoint } from "./LegalPoint";

export const TOS = () => {
  return (
    <main className="h-full flex justify-center">
      <div className="w-full max-w-3xl py-10 px-5 flex flex-col gap-y-8 h-full">
        <header className="flex flex-col gap-y-5">
          <h1 className="font-pacifico text-5xl text-center mb-8">Feedgames</h1>
          <h1 className="font-bold text-2xl font-inter">
            Términos de Servicio
          </h1>
          <p className="text-gray-500">
            Bienvenido a Feedgames, una plataforma en línea dedicada a conectar
            a entusiastas de los videojuegos de todo el mundo. Antes de unirte a
            nuestra comunidad y utilizar nuestros servicios, te pedimos que leas
            detenidamente estos Términos de Servicio. Estos términos establecen
            las reglas y condiciones que rigen tu uso de la plataforma, así como
            tus derechos y responsabilidades como usuario.
          </p>
          <p className="text-gray-500">
            Fecha de entrada en vigor:{" "}
            <span className="font-bold">22 de abril del 2024</span>
          </p>
        </header>
        <LegalPoint title="Comportamiento de los Usuarios">
          <ListItem
            title="Respeto y convivencia"
            text="En Feedgames, valoramos un ambiente de respeto y convivencia
                entre todos nuestros usuarios. Esperamos que todos los miembros
                de la comunidad interactúen de manera respetuosa, cortés y
                amigable. Cualquier forma de comportamiento agresivo,
                intimidante, abusivo, discriminatorio, amenazante, acosador o
                difamatorio no será tolerada y puede resultar en la suspensión o
                terminación de la cuenta del usuario infractor."
          ></ListItem>
          <ListItem
            title="Interacciones seguras"
            text="Los usuarios deben respetar la privacidad y seguridad de los demás. No se permite el intercambio de información personal sensible, como números de tarjetas de crédito, contraseñas u otros datos personales que puedan comprometer la seguridad de un usuario. Asimismo, cualquier intento de hackeo, phishing o acceso no autorizado a cuentas está estrictamente prohibido."
          ></ListItem>
          <ListItem
            title="Colaboración con la comunidad"
            text="Alentamos a los usuarios a colaborar de manera constructiva con la comunidad. Esto incluye participar en discusiones relevantes, compartir información útil, apoyar a otros miembros, brindar retroalimentación de manera constructiva y contribuir al ambiente positivo y enriquecedor de la plataforma."
          ></ListItem>
        </LegalPoint>
        <LegalPoint title="Propiedad Intelectual">
          <ListItem
            title="Marcas registradas"
            text="Todo el contenido generado por la plataforma, como diseños,
                gráficos, logotipos, textos, videos y sonidos, es propiedad
                exclusiva de Feedgames y está protegido por las leyes de
                propiedad intelectual aplicables. Los usuarios no tienen derecho
                a reproducir, modificar, distribuir o utilizar este contenido
                sin el consentimiento expreso de sus autores."
          ></ListItem>
          <ListItem
            title="Contenido de los usuarios"
            text="Los usuarios conservan todos los derechos de propiedad sobre el
                contenido que publiquen. Al publicar contenido en la plataforma,
                los usuarios otorgan a Feedgames una licencia no exclusiva,
                transferible, sublicenciable, libre de regalías y mundial para
                utilizar, reproducir, modificar, adaptar, publicar, traducir,
                distribuir, ejecutar y mostrar dicho contenido en relación con
                los servicios ofrecidos por Feedgames."
          ></ListItem>
        </LegalPoint>
        <LegalPoint title="Suspensión y Terminación de Cuentas">
          <ListItem
            title="Causas"
            text="Feedgames se reserva el derecho de suspender o terminar tu cuenta en caso de violación de nuestros Términos de Servicio o cualquier otra conducta que consideremos perjudicial para la plataforma o sus usuarios."
          ></ListItem>
          <ListItem
            title="Proceso de revisión"
            text="Antes de suspender o terminar una cuenta, realizaremos una revisión exhaustiva del comportamiento del usuario y evaluaremos si se han infringido nuestras políticas. Si se determina que ha ocurrido una violación, se notificará al usuario y se le proporcionará la oportunidad de responder y apelar la decisión."
          ></ListItem>
          <ListItem
            title="Efectos"
            text="Una vez suspendida o terminada una cuenta, el acceso a sus servicios se restringirá de inmediato. Cualquier contenido asociado con la cuenta podría ser eliminado de la plataforma, y el usuario perderá el acceso a sus contactos, datos y funcionalidades asociadas con la cuenta."
          ></ListItem>
          <ListItem
            title="Derechos"
            text="Si consideras que la suspensión o terminación de tu cuenta ha sido injusta, tienes el derecho de apelar la decisión. Puedes contactar a nuestro equipo de soporte para presentar tu apelación y proporcionar información adicional que respalde tu caso. Revisaremos tu apelación de manera justa y objetiva."
          ></ListItem>
        </LegalPoint>
        <LegalPoint title="Modificaciones de los Términos de Servicio">
          <ListItem
            title="Actualizaciones y modificaciones"
            text="Feedgames puede actualizar o modificar los Términos de Servicio en cualquier momento. Estos cambios serán efectivos después de ser publicados en la plataforma, y al seguir usando Feedgames, aceptas automáticamente los nuevos términos. Te recomendamos revisar los Términos de Servicio regularmente para mantenerte informado sobre cualquier cambio."
          ></ListItem>
          <ListItem
            title="Notificación de cambios"
            text="Notificaremos a los usuarios sobre cambios significativos en los Términos de Servicio a través de mensajes en la plataforma, notificaciones en la aplicación u otros medios adecuados. Sin embargo, es responsabilidad del usuario estar informado y revisar los términos actualizados."
          ></ListItem>
          <ListItem
            title="Derecho a objetar"
            text="Si no estás de acuerdo con los cambios realizados en los Términos de Servicio, tienes el derecho de dejar de utilizar Feedgames y cerrar tu cuenta. El uso continuado de la plataforma después de la entrada en vigencia de los nuevos términos se considerará como tu aceptación de los mismos."
          ></ListItem>
        </LegalPoint>
        <h2 className="text-gray-500 text-center mt-4">
          Al utilizar nuestros servicios, reconoces que has leído, comprendido y
          aceptas regirte por estos términos de servicio.
        </h2>
        <h1 className="font-pacifico text-center text-3xl">Fg</h1>
      </div>
    </main>
  );
};
