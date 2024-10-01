"use client";
import PageLoader from "@/components/Global/PageLoader";
import { useToken } from "@/hooks/useToken";
import { useState } from "react";

export default async function Home() {
  const { loading } = useToken();
  const [page, setPage] = useState(0);

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
