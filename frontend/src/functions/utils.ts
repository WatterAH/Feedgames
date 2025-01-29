import shortUUID from "short-uuid";
import copy from "clipboard-copy";
import React, { MouseEvent } from "react";
import { toast } from "sonner";
import { PostInterface } from "@/interfaces/Post";
import { Notification } from "@/interfaces/Notification";

const translator = shortUUID();

export const isImage = (file: File): boolean => {
  const extensionList: string[] = ["jpg", "jpeg", "gif", "png", "webp", "heic"];
  const extension = file.name?.split(".").pop()?.toLocaleLowerCase() as string;
  return extensionList.indexOf(extension) == -1 ? false : true;
};

export const handleImageChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  callback: (file: File, readerResult?: string) => void
) => {
  if (!e.target.files) return;

  const file = e.target.files[0];
  if (!isImage(file)) return toast.warning("Solo se permiten imágenes");

  if (callback.length === 1) return callback(file);

  const reader = new FileReader();
  reader.onload = () => callback(file, reader.result as string);
  reader.readAsDataURL(file);
};

export const stopPropagation = (e: MouseEvent) => {
  e.stopPropagation();
};

export const allowedPath = (pathname: string) => {
  const allowedPaths = ["/p", "/u", "/search", "/home", "/"];
  return allowedPaths.some(
    (allowedPath) =>
      pathname === allowedPath || pathname.startsWith(`${allowedPath}/`)
  );
};

export const share = (content: "u" | "p", id: string) => {
  if (navigator.share) {
    navigator.share({
      url: `https://feedgames.vercel.app/${content}/${id}`,
    });
  } else {
    copy(`https://feedgames.vercel.app/${content}/${id}`);
    toast.success("Se copió al portapapeles");
  }
};

export const processPost = (post: PostInterface | any) => {
  const { id, user, user_id, content, ...rest } = post;
  const { followers, ...userRest } = user;

  const userIdParsed = translator.fromUUID(user_id);

  return {
    id: translator.fromUUID(id),
    user_id: userIdParsed,
    user: {
      id: userIdParsed,
      followers: followers[0].count,
      ...userRest,
    },
    content: { type: content[0].type, data: content[0].data },
    liked: 0,
    saved: 0,
    responsed: 0,
    ...rest,
  };
};

export const processNotify = (notify: Notification) => {
  const { user, ...rest } = notify;
  const { id, ...userRest } = user;
  return {
    user: {
      id: translator.fromUUID(id),
      ...userRest,
    },
    ...rest,
  };
};
