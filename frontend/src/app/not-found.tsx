import Link from "next/link";

export default function Example() {
  return (
    <main className="grid h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-threads">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Página no encontrada
        </h1>
        <p className="mt-6 text-base leading-7 text-placeholder">
          Lo sentimos, no pudimos encontrar la página que estás buscando.
        </p>
        <p className="mt-6 text-base leading-7 text-placeholder">
          Pero no te preocupes, ¡puedes seguir explorando{" "}
          <Link href={"/home"} className="font-pacifico">
            FeedGames
          </Link>{" "}
          y encontrar algo increíble!
        </p>
      </div>
    </main>
  );
}
