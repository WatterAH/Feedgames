import { Create } from "@/components/Create/Create";
import { SafeAreaView, Text, View } from "@/components/Global/Themed";
import React from "react";
import { KeyboardAvoidingView } from "react-native";

const modal = () => {
  return (
    <SafeAreaView className="h-full flex-col justify-center items-center">
      <Create />
    </SafeAreaView>
  );
};

export default modal;
