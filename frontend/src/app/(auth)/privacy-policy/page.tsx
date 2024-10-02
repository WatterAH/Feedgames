import LegalPoint from "@/components/Auth/LegalPoint";
import ListItem from "@/components/Auth/LegalItem";

export default function PrivacyPolicy() {
  return (
    <main className="h-full flex justify-center bg-barcelona">
      <div className="w-full max-w-3xl py-10 px-5 flex flex-col gap-y-8 h-full">
        <header className="flex flex-col gap-y-5">
          <h1 className="font-pacifico text-5xl text-center mb-8 text-threads">
            Feedgames
          </h1>
          <h1 className="font-bold text-2xl font-inter text-threads">
            Política de Privacidad
          </h1>
          <p className="text-gray-500">
            Este Aviso de Privacidad describe cómo Feedgames recopila, utiliza y
            protege la información que proporcionas al utilizar nuestra
            aplicación. Nuestro compromiso es garantizar la privacidad y
            seguridad de tus datos personales. Te invitamos a revisar
            detenidamente esta política para entender cómo manejamos tu
            información y protegemos tu privacidad mientras disfrutas de
            nuestros servicios.
          </p>
          <p className="text-gray-500">
            Fecha de entrada en vigor:{" "}
            <span className="font-bold">22 de abril del 2024</span>
          </p>
        </header>
        <LegalPoint title="Información Recopilada">
          <ListItem
            title="Datos de registro"
            text="Al registrarte en Feedgames, recopilamos cierta información básica de perfil, que incluye tu nombre, nombre de usuario y una imagen de perfil. Esta información es necesaria para crear y gestionar tu cuenta en nuestra plataforma. No recopilamos información sensible."
          ></ListItem>
          <ListItem
            title="Tus contraseñas"
            text="La contraseña que proporcionas al crear tu cuenta en Feedgames se encripta utilizando un método seguro que no se puede desencriptar de regreso. Esto garantiza la seguridad de tus credenciales de inicio de sesión y protege tu cuenta contra accesos no autorizados."
          ></ListItem>
          <ListItem
            title="Opcionalidad del nombre real y la imagen"
            text="Queremos que te sientas cómodo en Feedgames, por lo que no estás obligado a proporcionar tu nombre real o una imagen de perfil que te identifique personalmente. Puedes elegir un nombre de usuario y una imagen que reflejen tu identidad digital según tus preferencias."
          ></ListItem>
          <ListItem
            title="Uso de Cookies"
            text="También utilizamos cookies y tecnologías similares para recopilar información sobre tu actividad de navegación en Feedgames, mejorar la funcionalidad de la plataforma y personalizar la experiencia del usuario. Puedes gestionar tus preferencias de cookies en la configuración de tu navegador."
          ></ListItem>
        </LegalPoint>
        <LegalPoint title="Seguridad de la Cuenta">
          <ListItem
            title="Perfiles públicos"
            text="Ten en cuenta que Feedgames es un lugar público donde los perfiles de los usuarios son visibles para otros usuarios registrados en la plataforma. Esto significa que tu nombre de usuario, imagen de perfil y cierta información básica pueden ser vistos por otros usuarios de Feedgames."
          ></ListItem>
          <ListItem
            title="No compartimos datos con terceros"
            text="Es importante destacar que, aunque los perfiles son visibles para otros usuarios registrados, no compartimos tus datos personales con terceros sin tu consentimiento. Tu información se mantiene dentro de la plataforma y solo se utiliza para fines relacionados con la experiencia del usuario."
          ></ListItem>
          <ListItem
            title="Privacidad de la información"
            text="Aunque los perfiles son públicos dentro de la plataforma, te recordamos la importancia de proteger tu privacidad y no compartir información sensible o personalmente identificable en tus publicaciones, comentarios u otras interacciones en Feedgames."
          ></ListItem>
        </LegalPoint>
        <LegalPoint title="Privacidad de Menores">
          <ListItem
            title="Reconocimiento de Edad"
            text="En Feedgames, reconocemos la importancia de proteger la privacidad de los usuarios menores de 18 años, que según la legislación mexicana se consideran menores. Al registrarte y utilizar nuestros servicios, declaras y garantizas que tienes al menos 15 años de edad"
          ></ListItem>
          <ListItem
            title="Consentimiento de padres o tutores"
            text="Si un usuario tiene entre 15 y 17 años y desea utilizar nuestros servicios, requerimos el consentimiento expreso de un padre o tutor legal antes de recopilar, utilizar o compartir cualquier información personal del usuario."
          ></ListItem>
        </LegalPoint>
        <h2 className="text-gray-500 text-center mt-4">
          Al utilizar nuestros servicios, reconoces que has leído, comprendido y
          aceptas nuestra política de privacidad.
        </h2>
        <h1 className="font-pacifico text-center text-3xl text-threads">Fg</h1>
      </div>
    </main>
  );
}
