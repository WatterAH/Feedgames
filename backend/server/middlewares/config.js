import express from "express";
import cors from "cors";

const app = express();

// Configuring CORS options to allow requests from the provided URLs.
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://feedgames.vercel.app",
    "http://192.168.1.70:19006",
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

//Configure CORS middleware.
app.use("*", cors(corsOptions));
// Configuring middleware to parse incoming request bodies as JSON.
app.use(express.json());

export { app as config };
