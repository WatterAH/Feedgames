import express from "express";
import cors, { CorsOptions } from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const corsOptions: CorsOptions = {
  origin: [
    "http://localhost:3000",
    "http://192.168.0.6:3000",
    "https://feedgames.vercel.app",
    "http://192.168.1.70:19006",
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

export const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  secure: true,
});

app.use("*", cors(corsOptions));
app.use(express.json());

export { app as config };
