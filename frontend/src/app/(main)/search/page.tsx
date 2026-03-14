import { Metadata } from "next";
import SavedPage from "./SearchPage";

export const metadata: Metadata = {
  title: "Buscar • Feedgames",
};

export default function Page() {
  return <SavedPage />;
}
