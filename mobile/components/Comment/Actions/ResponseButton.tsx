import { gotToComment } from "@/functions/navigation";
import { CommentInterface } from "@/interfaces/Comment";
import { Link, usePathname } from "expo-router";
import React, { useCallback } from "react";
import { Pressable, useColorScheme } from "react-native";
import { ArrowUturnLeftIcon } from "react-native-heroicons/outline";

interface Props {
  data: CommentInterface;
}

export const ResponseButton: React.FC<Props> = ({ data }) => {
  const pathName = usePathname();
  const mainPath = pathName.split("/")[1];

  const handlepress = useCallback(() => {
    gotToComment(mainPath, { data: JSON.stringify(data) });
  }, []);

  return (
    <Pressable onPress={handlepress}>
      <ArrowUturnLeftIcon size={26} color="#777" />
    </Pressable>
  );
};
