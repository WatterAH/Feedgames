import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const createAccessToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_KEY,
      { expiresIn: "30d" },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
};

export const validateToken = (token) => {
  try {
    return new Promise((resolve, reject) => {
      if (!token) {
        return resolve(null);
      }
      jwt.verify(token, process.env.JWT_KEY, (err, user) => {
        if (err) return reject(null);
        return resolve(user);
      });
    });
  } catch (error) {
    throw new Error(error);
  }
};
