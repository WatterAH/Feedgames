import React, { useCallback } from "react";
import { Redirect, SplashScreen } from "expo-router";
import { View } from "@/components/Global/Themed";
import { useFonts } from "expo-font";

const Index = () => {
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

  return (
    <View onLayout={onLayoutRootView}>
      <Redirect href="/home/" />
    </View>
  );
};

export default Index;
