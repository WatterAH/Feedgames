import ChatPage from "@/components/Party/Chat/ChatPage";
import { defaultParty } from "@/interfaces/Party";
import { getUserCookie } from "@/lib/client";
import partyRouter from "@/routes/party";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const userId = await getUserCookie();
  const { id } = await params;

  try {
    const party = await partyRouter.find(id, userId);
    return <ChatPage {...party} />;
  } catch (error) {
    return <ChatPage {...defaultParty} error />;
  }
}
