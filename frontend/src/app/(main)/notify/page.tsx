import { Metadata } from "next";
import AlertPage from "./AlertPage";

export const metadata: Metadata = {
  title: "Notificaciones • Feedgames",
};

export default function Page() {
  return <AlertPage />;
}
