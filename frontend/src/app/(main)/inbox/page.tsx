import { Metadata } from "next";
import InboxPage from "./InboxPage";

export const metadata: Metadata = {
  title: "Chats • Feedgames",
};

export default function Page() {
  return <InboxPage />;
}
