import React, { useCallback, useEffect } from "react";
import { Redirect, SplashScreen } from "expo-router";
import { View } from "@/components/Global/Themed";
import { useFonts } from "expo-font";
import { useSession } from "@/context/ctx";
import { checkAuth } from "@/api/auth";

const Index = () => {
  const { session, login } = useSession();
  const [fontsLoaded, fontError] = useFonts({
    Pacifico: require("@/assets/fonts/Pacifico.ttf"),
    OpenSans: require("@/assets/fonts/OpenSans.ttf"),
    Instagram: require("@/assets/fonts/Instagram.ttf"),
  });

  const handleToken = async () => {
    try {
      const data = await checkAuth(session as string);
      const { user, userToken } = data;
      login(user, userToken);
    } catch (error) {
      return <Redirect href="/login" />;
    }
  };

  useEffect(() => {
    handleToken();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View onLayout={onLayoutRootView}>
      <Redirect href="/home/" />
    </View>
  );
};

export default Index;
