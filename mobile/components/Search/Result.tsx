import React, { useCallback } from "react";
import { Text, View } from "../Global/Themed";
import { User } from "@/interfaces/User";
import { ProfilePicture } from "../Profile/ProfilePicture";
import { Keyboard, Pressable } from "react-native";
import { usePathname } from "expo-router";
import { goToProfile } from "@/functions/navigation";

interface Props {
  data: User;
}

export const Result: React.FC<Props> = React.memo(({ data }) => {
  const { id, username, name, pfp } = data;
  const pathName = usePathname();
  const mainPath = pathName.split("/")[1];

  const handleProfilePress = useCallback(() => {
    goToProfile(mainPath, { id });
  }, [mainPath, id]);

  return (
    <Pressable
      onPress={handleProfilePress}
      className="flex flex-row w-full p-3 border-b border-light-gray dark:border-dark-gray"
      style={{ columnGap: 10 }}
    >
      <ProfilePicture h="h-10" w="w-10" src={pfp} />
      <View className="flex flex-col">
        <Text className="font-semibold">{username}</Text>
        <Text className="text-gray-uni">{name}</Text>
      </View>
    </Pressable>
  );
});
