import { URL } from "@/constants/server";
import { PostInterface } from "@/interfaces/Post";
import { MatchShowCase } from "@/interfaces/Valorant";
import { ImagePickerAsset } from "expo-image-picker";

export const fetchPosts = async (
  userId: string,
  page: number,
  limit: number
): Promise<PostInterface[]> => {
  const res = await fetch(
    `${URL}/api/loadPosts?id_user=${userId}&page=${page}&limit=${limit}`
  );
  const resData = await res.json();

  if (res.ok) {
    return resData;
  } else {
    const { message } = resData;
    throw new Error(message);
  }
};

export const getPostById = async (
  id: string,
  userId: string
): Promise<PostInterface | null> => {
  const res = await fetch(
    `${URL}/api/getPost?postId=${encodeURIComponent(
      id
    )}&userId=${encodeURIComponent(userId)}`
  );
  const resData: PostInterface | any = await res.json();
  if (res.ok) {
    return resData;
  } else if (res.status == 404) {
    return null;
  } else {
    const { message } = resData;
    throw new Error(message);
  }
};

export const getTendencyPost = async (
  userId: string
): Promise<PostInterface[]> => {
  const res = await fetch(
    `${URL}/api/loadSuggestions?id_user=${encodeURIComponent(userId)}`
  );
  const resData = await res.json();

  if (res.ok) {
    return resData as PostInterface[];
  } else {
    const { message } = resData;
    throw new Error(message);
  }
};

export const createPost = async (
  user_id: string,
  content: string,
  tags: string[],
  valMatch: MatchShowCase | null,
  image: ImagePickerAsset | null
): Promise<void> => {
  const formData = new FormData();
  formData.append("user_id", user_id);
  formData.append("content", content);
  formData.append("tags", JSON.stringify(tags));
  if (image) {
    //@ts-ignore
    formData.append("image", {
      uri: image.uri,
      name: "image",
      type: image.type,
    });
  }
  formData.append("valMatch", JSON.stringify(valMatch));

  const res = await fetch(`${URL}/api/createNewPost`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  if (!res.ok) {
    const resData = await res.json();
    const { message } = resData;
    throw new Error(message);
  }
  return;
};
