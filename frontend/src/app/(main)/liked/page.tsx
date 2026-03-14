import { Metadata } from "next";
import LikedPage from "./LikedPage";

export const metadata: Metadata = {
  title: "Me gusta • Feedgames",
};

export default function Page() {
  return <LikedPage />;
}
