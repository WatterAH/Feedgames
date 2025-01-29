import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../interfaces/User";
dotenv.config();
var JWT_KEY: Secret = process.env.JWT_KEY as string;

export const createAccessToken = (
  payload: any,
  expiresIn: string = "30d"
): Promise<string | undefined> => {
  return new Promise(function (resolve, reject) {
    jwt.sign(payload, JWT_KEY, { expiresIn: expiresIn }, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
};

export const validateToken = (token: string): Promise<User | null> => {
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

export const decodeToken = (token: string) => {
  const base64Payload = token.split(".")[1];
  const decodedPayload = Buffer.from(base64Payload, "base64").toString("utf-8");
  return JSON.parse(decodedPayload);
};
