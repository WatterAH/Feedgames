import React, { useState } from "react";
import { SafeAreaView, ScrollView } from "@/components/Global/Themed";
import { router, useGlobalSearchParams } from "expo-router";
import { Title } from "@/components/Global/Title";
import { Button } from "@/components/Global/Button";
import { Input } from "@/components/Global/Input";

const details = () => {
  const { name, username } = useGlobalSearchParams();
  const [details, setDetails] = useState("");
  const disabled = details.trim().length == 0;
  const params = { name, username, details };
  const handlePress = () =>
    router.push({ pathname: "/register/password", params });

  return (
    <SafeAreaView className="flex-col h-full items-center justify-start">
      <ScrollView
        keyboardShouldPersistTaps="always"
        className="flex-col gap-y-4 w-full px-5 mt-5"
        style={{ rowGap: 6 }}
      >
        <Title label="¿Qué nos puedes contar sobre ti?" />
        <Input
          autoFocus
          error={false}
          placeholder="Hola, me llamo Sam y me gusta Minecraft"
          value={details}
          onChangeText={setDetails}
        />
        <Button
          onPress={handlePress}
          h="12"
          loading={false}
          text="Continuar"
          style={{ opacity: disabled ? 0.5 : 1 }}
          disabled={disabled}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default details;
