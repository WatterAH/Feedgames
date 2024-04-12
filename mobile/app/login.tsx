import React, { useCallback, useEffect, useState } from "react";
import { Link, SplashScreen, router } from "expo-router";
import { Text, View } from "@/components/Global/Themed";
import { useSession } from "@/context/ctx";
import { InputLabel } from "@/components/Global/InputLabel";
import { useFonts } from "expo-font";
import { Button } from "@/components/Global/Button";
import { loginApi } from "@/api/auth";

const logIn = () => {
  const { login } = useSession();
  const [username, setUsername] = useState("watter.jsdx");
  const [password, setPassword] = useState("SamT0710");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [fontsLoaded, fontError] = useFonts({
    Pacifico: require("@/assets/fonts/Pacifico.ttf"),
    OpenSans: require("@/assets/fonts/OpenSans.ttf"),
    Instagram: require("@/assets/fonts/Instagram.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const handleLogin = async () => {
    try {
      setLoading(true);
      const data = await loginApi(username, password);
      const { user, token } = data;
      login(user, token);
      router.replace("/");
    } catch (error: any) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        rowGap: 4,
      }}
      onLayout={onLayoutRootView}
    >
      <Text className="text-4xl p-3 mb-10" style={{ fontFamily: "Pacifico" }}>
        Feedgames
      </Text>
      <View className="flex-col gap-y-4 w-full px-5" style={{ rowGap: 16 }}>
        <InputLabel
          error={error}
          label="Nombre de usuario"
          text={username}
          setText={setUsername}
        />
        <InputLabel
          error={error}
          label="Contraseña"
          text={password}
          setText={setPassword}
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
    </View>
  );
};

export default logIn;
