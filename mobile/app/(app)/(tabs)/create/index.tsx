import { Create } from "@/components/Create/Create";
import { SafeAreaView } from "@/components/Global/Themed";
import React from "react";

const index = () => {
  return (
    <SafeAreaView className="h-full flex-col justify-center items-center">
      <Create />
    </SafeAreaView>
  );
};

export default index;
