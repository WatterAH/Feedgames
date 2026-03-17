import { getUserCookie } from "@/lib/client";
import { defaultPost } from "@/interfaces/Post";
import PostPage from "@/components/Layout/PostPage";
import postRouter from "@/routes/post";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  try {
    const post = await postRouter.find(id, "");

    let text = "";
    if (post.text.length > 0) {
      text = post.text.split("\n")[0];
    } else {
      text = `${post.user.name} en Feedgames`;
    }

    return {
      title: text,
      description: text,
      openGraph: {
        title: text,
        description: text,
        type: "article",
      },
      twitter: {
        title: text,
        description: text,
        card: "summary_large_image",
      },
    };
  } catch (error) {
    return {
      title: "Post no encontrado",
      description: "Esta publicación no existe.",
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
    const post = await postRouter.find(id, userId);
    return <PostPage {...post} />;
  } catch (error) {
    return <PostPage error={true} {...defaultPost} />;
  }
}
