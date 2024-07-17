import React, { useCallback, useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView, Text, View } from "@/components/Global/Themed";
import { useSession } from "@/context/ctx";
import { InputLabel } from "@/components/Global/InputLabel";
import { Button } from "@/components/Global/Button";
import { loginApi } from "@/api/auth";
import * as Haptics from "expo-haptics";

const logIn = () => {
  const { login } = useSession();
  const [username, setUsername] = useState("_wjsdx");
  const [password, setPassword] = useState("SamT0710");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleLogin = useCallback(async () => {
    try {
      setLoading(true);
      const data = await loginApi(username, password);
      const { user, token } = data;
      login(user, token);
      router.replace("/");
    } catch (error: any) {
      const { message } = error;
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <SafeAreaView className="flex h-full items-center justify-center gap-y-4">
      <Text className="text-4xl p-3 mb-10" style={{ fontFamily: "Pacifico" }}>
        Feedgames
      </Text>
      <View className="flex-col gap-y-4 w-full px-5" style={{ rowGap: 16 }}>
        <InputLabel
          error={error}
          label="Nombre de usuario"
          text={username}
          setText={setUsername}
          secure={false}
        />
        <InputLabel
          error={error}
          label="Contraseña"
          text={password}
          setText={setPassword}
          secure
        />
        <Button
          onPress={handleLogin}
          h="12"
          loading={loading}
          text="Continuar"
        ></Button>
        <View className="flex-row items-center justify-center gap-x-4">
          <Link href="/register/">
            <Text className="text-xs font-semibold">¿No tienes cuenta?</Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default logIn;
