import { Metadata } from "next";
import SavedPage from "./NotifyPage";

export const metadata: Metadata = {
  title: "Notificaciones • Feedgames",
};

export default function Page() {
  return <SavedPage />;
}
