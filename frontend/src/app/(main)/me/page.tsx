import { Metadata } from "next";
import MyPage from "./MyPage";
import { getUserCookie } from "@/lib/client";
import userRouter from "@/routes/profile";
import { defaultUser } from "@/interfaces/User";

export async function generateMetadata(): Promise<Metadata> {
  const userId = await getUserCookie();

  try {
    const user = await userRouter.find(userId, "");
    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_SERVER_HOST;

    const imgId = user?.pfp;
    const src = imgId
      ? `${process.env.NEXT_PUBLIC_IMAGES}/${imgId}`
      : `${siteUrl}/default.png`;

    let text = "";
    let description = "";

    if (!user) {
      text = "Perfil no encontrado";
      description = "Este perfil no existe o fue eliminado.";
    } else {
      text = `${user.name} (@${user.username}) • Feedgames`;
      description =
        user.bio ||
        `Mira el perfil de ${user.username} y sus mejores partidas en Feedgames.`;
    }

    return {
      title: text,
      description: description,
      openGraph: {
        title: text,
        description: description,
        type: "profile",
        images: [src],
      },
      twitter: {
        title: text,
        description: description,
        card: "summary",
        images: [src],
      },
    };
  } catch (error) {
    return {
      title: "Jugador no encontrado",
      description: "Este perfil no existe o fue eliminado.",
    };
  }
}

export default async function Page() {
  const userId = await getUserCookie();

  try {
    const data = await userRouter.find(userId, "");
    return <MyPage {...data} />;
  } catch (error) {
    return <MyPage error={true} {...defaultUser} />;
  }
}
