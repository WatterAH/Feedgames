import express from "express";
import cors, { CorsOptions } from "cors";
import nodemailer from "nodemailer";

const app = express();

const corsOptions: CorsOptions = {
  origin: [
    "http://localhost:3000",
    "http://192.168.0.3:3000",
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
    user: "samueltlahuel.m@gmail.com",
    pass: "aezs rnco xerx uzee",
  },
  secure: true,
});

app.use("*", cors(corsOptions));
app.use(express.json());

export { app as config };
