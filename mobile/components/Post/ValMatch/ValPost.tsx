import { MatchShowCase } from "@/interfaces/Valorant";
import React, { useEffect, useState } from "react";
import { getCharacterIcon } from "@/api/valorant";
import { FlatList, Image, useColorScheme } from "react-native";
import valorant from "../../../assets/images/val.png";
import {
  UserIcon,
  ReceiptPercentIcon,
  CurrencyDollarIcon,
  ShieldExclamationIcon as Shield,
  ChartPieIcon,
  UserMinusIcon,
} from "react-native-heroicons/outline";
import { Stat } from "./Stat";
import { Text, View } from "@/components/Global/Themed";

interface MatchProps {
  stats: MatchShowCase;
}

export const ValPost: React.FC<MatchProps> = ({ stats }) => {
  const [characterIcon, setCharacterIcon] = useState("");
  const backgroundColor = useColorScheme() === "dark" ? "#343A40" : "#c0c0c0";
  const statsBg = useColorScheme() === "dark" ? "#202020" : "#eaeaea";

  const data = [
    { Icon: UserIcon, text: "KDA", stat: stats.kda },
    { Icon: ChartPieIcon, text: "Puntaje", stat: stats.scorePerRound },
    { Icon: ReceiptPercentIcon, text: "Headshot %", stat: stats.hsPercentage },
    { Icon: CurrencyDollarIcon, text: "Economia", stat: stats.economyRatio },
    { Icon: Shield, text: "Daño por ronda", stat: stats.damagePerRound },
    { Icon: UserMinusIcon, text: "Kills por ronda", stat: stats.killsPerRound },
  ];

  useEffect(() => {
    const fetchIcons = async () => {
      const iconFetched = await getCharacterIcon(stats.characterId);
      setCharacterIcon(iconFetched);
    };
    fetchIcons();
  }, []);

  return (
    <View className="w-full h-54 mt-2">
      <View
        className="flex-row relative items-center rounded-t-md py-4 justify-center"
        style={{ backgroundColor, columnGap: 12 }}
      >
        <Image
          source={valorant}
          className="absolute top-2 right-2"
          style={{ height: 18, width: 18 }}
        />
        {characterIcon && (
          <Image
            style={{ height: 48, width: 48 }}
            className="rounded-full w-12 h-10"
            source={{ uri: characterIcon }}
          />
        )}
        <View className="flex-col" style={{ backgroundColor, rowGap: 5 }}>
          <Text className="text-xl font-bold">{stats.gameName}</Text>
          <View
            className="flex-row gap-x-3 items-center"
            style={{ backgroundColor }}
          >
            <Text className="font-semibold">
              {stats.playerStats.kills}/{stats.playerStats.deaths}/
              {stats.playerStats.assists}
            </Text>
            <Text className="font-semibold">
              {stats.roundsWon}:{stats.roundsLoose}
            </Text>
          </View>
        </View>
      </View>
      <FlatList
        className="flex py-2 rounded-b-md w-full"
        style={{ backgroundColor: statsBg, rowGap: 12 }}
        data={data}
        numColumns={2}
        renderItem={({ item }) => <Stat data={item} />}
        scrollEnabled={false}
      />
    </View>
  );
};
