import Chat from "@/components/Party/Chat";
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
    return <Chat {...party} />;
  } catch (error) {
    return <Chat {...defaultParty} error />;
  }
}
