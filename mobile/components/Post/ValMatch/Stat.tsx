import { Text, View } from "@/components/Global/Themed";
import React from "react";
import { useColorScheme } from "react-native";
import { UserIcon } from "react-native-heroicons/solid";

interface statProps {
  Icon: typeof UserIcon;
  text: string;
  stat: string | number;
}

interface Props {
  data: statProps;
}

export const Stat: React.FC<Props> = ({ data }) => {
  const { Icon, text, stat } = data;
  const backgroundColor = useColorScheme() === "dark" ? "#202020" : "#eaeaea";
  const iconColor = useColorScheme() === "dark" ? "#ccc" : "#424242";

  return (
    <View
      className="flex-col items-center gap-y-2 w-1/2 p-2"
      style={{ backgroundColor, columnGap: 12 }}
    >
      <View
        className="flex-row gap-x-2 items-center"
        style={{ backgroundColor }}
      >
        <Text className="text-xl font-bold">{stat}</Text>
        <Icon color={iconColor} />
      </View>
      <Text>{text}</Text>
    </View>
  );
};
