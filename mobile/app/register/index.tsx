import { Button } from "@/components/Global/Button";
import { Input } from "@/components/Global/Input";
import { SafeAreaView, ScrollView } from "@/components/Global/Themed";
import { Title } from "@/components/Global/Title";
import { router } from "expo-router";
import { useState } from "react";

const index = () => {
  const [name, setName] = useState("");
  const params = { name: name.trim() };
  const disabled = name.trim().length == 0;
  const handlePress = () =>
    router.push({ pathname: "/register/username", params });

  return (
    <SafeAreaView className="flex-col h-full items-center justify-start">
      <ScrollView
        keyboardShouldPersistTaps="always"
        className="flex-col gap-y-4 w-full px-5 mt-5"
        style={{ rowGap: 6 }}
      >
        <Title label="¿Cuál es tu nombre?" />
        <Input
          autoFocus
          error={false}
          placeholder="Nombre"
          value={name}
          onChangeText={setName}
        />
        <Button
          onPress={handlePress}
          h="12"
          loading={false}
          style={{ opacity: disabled ? 0.5 : 1 }}
          text="Continuar"
          disabled={disabled}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;
