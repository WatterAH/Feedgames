import { getUserCookie } from "@/functions/client";
import { defaultUser } from "@/interfaces/User";
import ProfilePage from "@/components/Layout/ProfilePage";
import userRouter from "@/routes/profile";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  try {
    const user = await userRouter.find(id, "");
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

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const userId = await getUserCookie();

  try {
    const user = await userRouter.find(id, userId);
    if (!user) throw new Error("User not found");
    return <ProfilePage {...user} />;
  } catch (error) {
    return <ProfilePage error={true} {...defaultUser} />;
  }
}
