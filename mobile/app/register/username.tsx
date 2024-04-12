import React, { useState } from "react";
import { SafeAreaView, ScrollView, Text } from "@/components/Global/Themed";
import { router, useGlobalSearchParams } from "expo-router";
import { usernameAvailable } from "@/api/auth";
import { Title } from "@/components/Global/Title";
import { Input } from "@/components/Global/Input";
import { Button } from "@/components/Global/Button";

const name = () => {
  const { name } = useGlobalSearchParams();
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const disabled = username.trim().length == 0;
  const params = { name, username: username.trim() };

  const handlePress = async () => {
    try {
      setLoading(true);
      if (await usernameAvailable(username)) {
        router.push({
          pathname: "/register/details",
          params,
        });
      }
    } catch (error: any) {
      const { message } = error;
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-col h-full items-center justify-start">
      <ScrollView
        keyboardShouldPersistTaps="always"
        className="flex-col gap-y-4 w-full px-5 mt-5"
        style={{ rowGap: 6 }}
      >
        <Title label="Vamos a crear un usuario único" />
        <Input
          autoFocus
          error={false}
          placeholder="Usuario"
          value={username}
          onChangeText={setUsername}
        />
        {errorMessage.length > 0 && (
          <Text className="text-red-500">{errorMessage}</Text>
        )}
        <Button
          onPress={handlePress}
          h="12"
          loading={loading}
          text="Continuar"
          style={{ opacity: disabled ? 0.5 : 1 }}
          disabled={disabled}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default name;
