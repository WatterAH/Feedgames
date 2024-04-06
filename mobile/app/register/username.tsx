import React from "react";
import { SafeAreaView } from "@/components/Global/Themed";
import { router } from "expo-router";
import { FormStep } from "@/components/Register/FormStep";

const name = () => {
  return (
    <SafeAreaView className="flex-col h-full items-center justify-start">
      <FormStep
        label="Deja tu huella con un nombre de usuario único"
        placeholder="Usuario"
        textButton="Continuar"
        onSubmit={() => router.navigate("/register/details")}
      />
    </SafeAreaView>
  );
};

export default name;
