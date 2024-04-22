import React from "react";
import { SafeAreaView, Text, View } from "@/components/Global/Themed";
import { Platform, ScrollView, useColorScheme } from "react-native";
import {
  BellIcon,
  BookmarkIcon,
  HeartIcon,
  WrenchScrewdriverIcon as Wrench,
  LifebuoyIcon,
  LockClosedIcon,
} from "react-native-heroicons/outline";
import { useSession } from "@/context/ctx";
import { Link } from "expo-router";
import * as WebBrowser from "expo-web-browser";

const settings = () => {
  const colorScheme = useColorScheme();
  const textColor = colorScheme === "dark" ? "#fff" : "#101010";
  const { logout } = useSession();

  return (
    <SafeAreaView className="h-full flex-col items-center justify-center">
      <ScrollView className="flex-col gap-y-5 w-full h-full">
        <View className="flex-col gap-y-5 w-full">
          <View className="w-full flex-row items-center gap-x-3 px-5">
            <BellIcon color={textColor} size={28} />
            <Text className="text-base">Notificaciones</Text>
          </View>
          <Link href="/profile/saves">
            <View className="w-full flex-row items-center gap-x-3 px-2">
              <BookmarkIcon color={textColor} size={28} />
              <Text className="text-base">Guardado</Text>
            </View>
          </Link>
          <Link href="/profile/likes">
            <View className="w-full flex-row items-center gap-x-3 px-2">
              <HeartIcon color={textColor} size={28} />
              <Text className="text-base">Tus Me gusta</Text>
            </View>
          </Link>
          <Link
            target="_blank"
            href="https://feedgames.vercel.app/privacy-policy"
            onPress={(e) => {
              if (Platform.OS !== "web") {
                e.preventDefault();
                WebBrowser.openBrowserAsync(
                  "https://feedgames.vercel.app/privacy-policy"
                );
              }
            }}
          >
            <View className="w-full flex-row items-center gap-x-3 px-2">
              <LockClosedIcon color={textColor} size={28} />
              <Text className="text-base">Privacidad</Text>
            </View>
          </Link>
          <Link href="/">
            <View className="w-full flex-row items-center gap-x-3 px-2">
              <LifebuoyIcon color={textColor} size={28} />
              <Text className="text-base">Ayuda</Text>
            </View>
          </Link>
          <Link
            target="_blank"
            href="https://feedgames.vercel.app/terms-of-service"
            onPress={(e) => {
              if (Platform.OS !== "web") {
                e.preventDefault();
                WebBrowser.openBrowserAsync(
                  "https://feedgames.vercel.app/terms-of-service"
                );
              }
            }}
          >
            <View className="w-full flex-row items-center gap-x-3 px-2">
              <Wrench color={textColor} size={28} />
              <Text className="text-base">Términos de Servicio</Text>
            </View>
          </Link>
        </View>
        <View
          style={{ height: 1, width: "100%" }}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <View className="w-full flex-row items-center gap-x-3 px-5">
          <Text
            className="text-base"
            style={{ color: "#ff3040" }}
            onPress={() => logout()}
          >
            Salir
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default settings;
