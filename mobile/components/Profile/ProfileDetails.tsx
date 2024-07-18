import React, { useState } from "react";
import { Text, View } from "../Global/Themed";
import { ProfilePicture } from "./ProfilePicture";
import { User } from "@/interfaces/User";
import { StyleSheet } from "react-native";
import { FollowButton } from "./Actions/FollowButton";
import { ShareProfile } from "./Actions/ShareProfile";
import { useSession } from "@/context/ctx";
import * as Haptics from "expo-haptics";

interface Props {
  data: User;
}

export const ProfileDetails: React.FC<Props> = ({ data }) => {
  const { user } = useSession();
  const { id, username, name, pfp, details, followers, followed, follow } =
    data;
  const [isFollowed, setIsFollowed] = useState(follow);

  const handleFollow = async () => {
    setIsFollowed(!isFollowed);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  return (
    <View className="flex-col gap-y-3 px-4">
      <View className="flex-row justify-between items-center gap-x-2">
        <View className="flex-col gap-y-1">
          <Text className="text-2xl" style={styles.name}>
            {name}
          </Text>
          <Text className="text-base" style={styles.username}>
            {username}
          </Text>
        </View>
        <ProfilePicture h="h-16" w="w-16" src={pfp} />
      </View>
      <Text className="text-sm">{details}</Text>
      <View className="flex-row items-center gap-x-2">
        <Text className="text-gray-uni">
          {followers} {followers == 1 ? "seguidor" : "seguidores"}
        </Text>
        <Text className="text-gray-uni">·</Text>
        <Text className="text-gray-uni">
          {followed} {followed == 1 ? "seguido" : "seguidos"}
        </Text>
      </View>
      <View
        style={{
          flex: 2,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          columnGap: 10,
        }}
      >
        <FollowButton
          onPress={user?.id != id ? handleFollow : null}
          follow={isFollowed}
          text={
            user?.id == id
              ? "Editar perfil"
              : user?.id != id && isFollowed
              ? "Siguiendo"
              : "Seguir"
          }
        />
        <ShareProfile data={data} text="Compartir perfil" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  name: {
    fontWeight: "600",
  },
  username: {},
});
