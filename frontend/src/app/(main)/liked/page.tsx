import { Metadata } from "next";
import SavedPage from "./LikedPage";

export const metadata: Metadata = {
  title: "Me gusta • Feedgames",
};

export default function Page() {
  return <SavedPage />;
}
