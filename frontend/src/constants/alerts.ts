import {
  Bell,
  Bookmark,
  Heart,
  PenSquareIcon,
  User,
  UserPlus,
} from "lucide-react";

export const alerts = {
  cantLike: {
    to: "indicar que te gusta",
    details:
      "¡Ups! Parece que quieres mostrar tu apoyo con un 'me gusta'. Pero sin cuenta, eso no es posible. 😅 ¡Únete a FeedGames y demuestra tu amor por los posts!",
    Icon: Heart,
  },
  cantSave: {
    to: "no perder el hilo",
    details:
      "¿No quieres perder publicaciones geniales? 😬 Únete a FeedGames y guarda tus publicaciones favoritas como un verdadero gamer organizado.",
    Icon: Bookmark,
  },
  cantCreate: {
    to: "publicar contenido",
    details:
      "¡Vaya! Quieres compartir tus jugadas épicas con el mundo, pero sin cuenta no es posible. 💥 ¡Regístrate y conquista FeedGames con tus publicaciones y desafíos!",
    Icon: PenSquareIcon,
  },
  cantNotify: {
    to: "interactuar con otros",
    details:
      "Te están esperando nuevas interacciones, seguidores y mucho más... pero sin cuenta, no podrás verlo. ¡Crea tu perfil en FeedGames y mantente al tanto de todo lo que pasa!",
    Icon: Bell,
  },
  cantMe: {
    to: "expresarte con Feedgames",
    details:
      "Tu perfil de campeón está esperando para ser creado, ¡pero parece que aún no estás registrado! Únete a FeedGames y muestra al mundo tu verdadero poder gamer. 💪",
    Icon: User,
  },
  cantFollow: {
    to: "seguir",
    details:
      "¿Quieres seguir a los mejores jugadores? ¡Sin cuenta no puedes hacerlo! 😅 Regístrate y mantén a tus ídolos al alcance de tu dedo en FeedGames.",
    Icon: UserPlus,
  },
};
