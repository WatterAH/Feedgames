import { Metadata } from "next";
import SavedPage from "./SavedPage";

export const metadata: Metadata = {
  title: "Guardado • Feedgames",
};

export default function Page() {
  return <SavedPage />;
}
