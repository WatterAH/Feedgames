import { Metadata } from "next";
import SavedPage from "./HomePage";

export const metadata: Metadata = {
  title: "Inicio • Feedgames",
};

export default function Page() {
  return <SavedPage />;
}
