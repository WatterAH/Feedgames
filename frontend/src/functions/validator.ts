import { User } from "@/interfaces/User";
import jwt from "jsonwebtoken";

export const isImage = (file: File): boolean => {
  const extensionList: string[] = ["jpg", "jpeg", "gif", "png", "webp", "heic"];
  let extension = file.name?.split(".").pop()?.toLocaleLowerCase() as string;
  return extensionList.indexOf(extension) == -1 ? false : true;
};

export const validateToken = (
  token: string | null,
  JWT_KEY: string
): Promise<User | null> => {
  return new Promise((resolve) => {
    if (!token) {
      return resolve(null);
    }
    jwt.verify(token, JWT_KEY, (err, decoded) => {
      if (err) {
        return resolve(null);
      }
      var user = decoded as User;
      return resolve(user);
    });
  });
};
