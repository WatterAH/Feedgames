import React from "react";
import { SafeAreaView, Text, View } from "@/components/Global/Themed";
import { ScrollView, useColorScheme } from "react-native";
import {
  BellIcon,
  BookmarkIcon,
  HeartIcon,
  InformationCircleIcon as InfoIcon,
  LifebuoyIcon,
  LockClosedIcon,
} from "react-native-heroicons/outline";
import { useSession } from "@/context/ctx";
import { Link } from "expo-router";

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
          <View className="w-full flex-row items-center gap-x-3 px-5">
            <BookmarkIcon color={textColor} size={28} />
            <Text className="text-base">Guardado</Text>
          </View>
          <View className="w-full flex-row items-center gap-x-3 px-5">
            <HeartIcon color={textColor} size={28} />
            <Link href="/profile/likes">
              <Text className="text-base">Tus Me gusta</Text>
            </Link>
          </View>
          <View className="w-full flex-row items-center gap-x-3 px-5">
            <LockClosedIcon color={textColor} size={28} />
            <Text className="text-base">Privacidad</Text>
          </View>
          <View className="w-full flex-row items-center gap-x-3 px-5">
            <LifebuoyIcon color={textColor} size={28} />
            <Text className="text-base">Ayuda</Text>
          </View>
          <View className="w-full flex-row items-center gap-x-3 px-5">
            <InfoIcon color={textColor} size={28} />
            <Text className="text-base">Información</Text>
          </View>
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
