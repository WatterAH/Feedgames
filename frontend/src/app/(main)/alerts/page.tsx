import { Metadata } from "next";
import AlertPage from "./AlertPage";

export const metadata: Metadata = {
  title: "Notificaciones • Feedgames",
};

export default async function Page() {
  return <AlertPage />;
}
