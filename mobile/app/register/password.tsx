import React from "react";
import { SafeAreaView } from "@/components/Global/Themed";
import { router } from "expo-router";
import { FormStep } from "@/components/Register/FormStep";

const password = () => {
  return (
    <SafeAreaView className="flex-col h-full items-center justify-start">
      <FormStep
        label="Forja una contraseña a prueba de todo"
        placeholder="Contraseña"
        textButton="Continuar"
        onSubmit={() => router.navigate("/register/image")}
      />
    </SafeAreaView>
  );
};

export default password;
