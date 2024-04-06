import { SafeAreaView } from "@/components/Global/Themed";
import { Profile } from "@/components/Profile/Profile";
import { useSession } from "@/context/ctx";

import React from "react";

const profile = () => {
  const { user } = useSession();
  return (
    <SafeAreaView className="h-full flex-col items-center justify-center">
      {user?.id && <Profile id={user.id} />}
    </SafeAreaView>
  );
};

export default profile;
