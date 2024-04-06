import React from "react";
import { SafeAreaView } from "@/components/Global/Themed";
import { router } from "expo-router";
import { FormStep } from "@/components/Register/FormStep";

const details = () => {
  return (
    <SafeAreaView className="flex-col h-full items-center justify-start">
      <FormStep
        label="¿Qué nos puedes contar sobre ti?"
        placeholder="Hola, me llamo Sam y me gusta Minecraft"
        textButton="Continuar"
        onSubmit={() => router.navigate("/register/password")}
      />
    </SafeAreaView>
  );
};

export default details;
