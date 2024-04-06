import { SafeAreaView } from "@/components/Global/Themed";
import { FormStep } from "@/components/Register/FormStep";
import { router } from "expo-router";
import { useState } from "react";

const index = () => {
  const [userName, setUserName] = useState("");

  return (
    <SafeAreaView className="flex-col h-full items-center justify-start">
      <FormStep
        label="¿Cuál es tu nombre?"
        placeholder="Nombre"
        textButton="Continuar"
        onSubmit={() => router.navigate("/register/username")}
      />
    </SafeAreaView>
  );
};

export default index;
