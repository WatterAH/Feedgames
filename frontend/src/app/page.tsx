"use client";
import PageLoader from "@/components/Global/PageLoader";
import { useToken } from "@/hooks/useToken";

export default function Home() {
  const { loading } = useToken();

  return loading ? (
    <div className="h-screen flex items-center justify-center">
      <PageLoader />
    </div>
  ) : (
    <div className="h-screen flex items-center justify-center">
      <h1></h1>
    </div>
  );
}
