import React from "react";
import {
  Pressable,
  PressableProps,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { Text, View } from "./Themed";
import { Loading } from "./Loading";

interface Props extends PressableProps {
  height: number;
  loading: boolean;
  text: string;
}

export const Button: React.FC<Props> = React.memo((props) => {
  const { height, loading, text } = props;
  const dark = useColorScheme() === "dark";
  const backgroundColor = dark ? "#fff" : "#000";

  return (
    <View darkColor="transparent" lightColor="transparent" style={styles.main}>
      <Pressable
        style={[styles.button, { height, backgroundColor }]}
        {...props}
      >
        <Text darkColor="#000" lightColor="#fff" style={styles.text}>
          {loading ? null : text}
        </Text>
        {loading ? <Loading size="small" bgcolor /> : null}
      </Pressable>
    </View>
  );
});

const styles = StyleSheet.create({
  main: {
    position: "relative",
  },
  button: {
    paddingHorizontal: 12,
    fontSize: 14,
    lineHeight: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
  },
  text: {
    fontWeight: 600,
  },
});
