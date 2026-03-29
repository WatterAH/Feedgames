import InboxPage from "@/components/Layout/InboxPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chats • Feedgames",
};

export default function Page() {
  return <InboxPage />;
}
