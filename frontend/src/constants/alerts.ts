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
      "Con FeedGames, podrás interactuar con publicaciones y mostrar tu apoyo con un me gusta.",
    Icon: Heart,
  },
  cantSave: {
    to: "no perder el hilo",
    details:
      "Con FeedGames, podrás guardar tus publicaciones favoritas y acceder a ellas fácilmente.",
    Icon: Bookmark,
  },
  cantCreate: {
    to: "publicar contenido",
    details:
      "Conéctate a FeedGames, comparte tus mejores jugadas, desafía a la comunidad y publica todo lo que tu mente gamer pueda imaginar.",
    Icon: PenSquareIcon,
  },
  cantNotify: {
    to: "interactuar con otros",
    details:
      "Revisa tus notificaciones para estar al tanto de lo que sucede en FeedGames: interacciones, nuevos seguidores y más.",
    Icon: Bell,
  },
  cantProfile: {
    to: "expresarte con Feedgames",
    details:
      "Crea tu perfil y muestra al mundo tus estadísticas, publicaciones y logros más épicos.",
    Icon: User,
  },
  cantFollow: {
    to: "seguir",
    details:
      "Con FeedGames, podrás seguir a tus jugadores favoritos y estar al tanto de todas sus publicaciones.",
    Icon: UserPlus,
  },
};
