import React, { useCallback } from "react";
import { Text, View } from "../Global/Themed";
import { CommentInterface } from "@/interfaces/Comment";
import { CommentHeader } from "./CommentHeader";
import { usePathname } from "expo-router";
import { ProfilePicture } from "../Profile/ProfilePicture";
import { CommentActions } from "./CommentActions";
import { goToProfile, gotToComment } from "@/functions/navigation";
import { TouchableOpacity } from "react-native";

interface Props {
  data: CommentInterface;
}

export const Comment: React.FC<Props> = React.memo(({ data }) => {
  const pathName = usePathname();
  const mainPath = pathName.split("/")[1];

  const handleCommPress = useCallback(() => {
    gotToComment(mainPath, { data: JSON.stringify(data) });
  }, [mainPath, data]);

  const handleProfilePress = useCallback(() => {
    goToProfile(mainPath, { id: data.id_user });
  }, [mainPath, data]);

  return (
    <TouchableOpacity
      className="w-full border-b border-gray-100 dark:border-neutral-800 flex-row justify-between py-4 px-3"
      onPress={handleCommPress}
      activeOpacity={1}
    >
      <TouchableOpacity
        className="h-10"
        activeOpacity={1}
        onPress={handleProfilePress}
      >
        <ProfilePicture src={data.user.pfp} w={"w-10"} h={"h-10"} />
      </TouchableOpacity>
      <View className="w-full flex-col ml-2 pr-11" style={{ rowGap: 6 }}>
        <CommentHeader data={data} />
        <Text>{data.comment}</Text>
        <CommentActions data={data} />
      </View>
    </TouchableOpacity>
  );
});
