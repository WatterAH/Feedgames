import React, { useState } from "react";
import { SafeAreaView, ScrollView } from "@/components/Global/Themed";
import { router, useGlobalSearchParams } from "expo-router";
import { Title } from "@/components/Global/Title";
import { Input } from "@/components/Global/Input";
import { Button } from "@/components/Global/Button";

const password = () => {
  const { name, username, details } = useGlobalSearchParams();
  const [password, setPassword] = useState("");
  const disabled = password.trim().length == 0;
  const params = { name, username, details, password };
  const handlePress = () =>
    router.push({ pathname: "/register/image", params });

  return (
    <SafeAreaView className="flex-col h-full items-center justify-start">
      <ScrollView
        keyboardShouldPersistTaps="always"
        className="flex-col gap-y-4 w-full px-5 mt-5"
        style={{ rowGap: 6 }}
      >
        <Title label="Crea una contraseña a prueba de todo" />
        <Input
          autoFocus
          error={false}
          placeholder="Hola, me llamo Sam y me gusta Minecraft"
          value={password}
          onChangeText={setPassword}
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

export default password;
