import { Metadata } from "next";
import HomePage from "./HomePage";

export const metadata: Metadata = {
  title: "Inicio • Feedgames",
};

export default function Page() {
  return <HomePage />;
}
