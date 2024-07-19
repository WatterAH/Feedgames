import React from "react";
import { useGlobalSearchParams } from "expo-router";
import { SafeAreaView } from "@/components/Global/Themed";
import { Profile } from "@/components/Profile/Profile";

export default function exploreProfile() {
  const { id } = useGlobalSearchParams();

  return (
    <SafeAreaView className="h-full flex-col items-center justify-center">
      <Profile id={id as string} />
    </SafeAreaView>
  );
}
