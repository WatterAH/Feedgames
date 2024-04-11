import React from "react";
import { useGlobalSearchParams } from "expo-router";
import { SafeAreaView } from "@/components/Global/Themed";
import { Profile } from "@/components/Profile/Profile";

const exploreProfile = () => {
  const { id } = useGlobalSearchParams();

  return (
    <SafeAreaView className="h-full flex-col items-center justify-center">
      <Profile id={id as string} />
    </SafeAreaView>
  );
};

export default exploreProfile;
