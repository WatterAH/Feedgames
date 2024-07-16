import React from "react";
import { ScrollView, View } from "./Themed";

const darkColor = "#181818";
const lightColor = "#eaeaea";

const RegisterLoader = () => {
  return <View className="w-full flex-col gap-y-4 px-3"></View>;
};

export const PostLoader = () => {
  return (
    <View className="w-full gap-x-3 flex-row gap-y-4 mb-10 px-3">
      <View
        darkColor={darkColor}
        lightColor={lightColor}
        className="rounded-full w-10 h-10"
      ></View>
      <View className="flex-col h-20 w-full" style={{ rowGap: 12 }}>
        <View
          darkColor={darkColor}
          lightColor={lightColor}
          className="rounded-full w-24 h-3"
        ></View>
        <View className="flex-col gap-y-2">
          <View
            darkColor={darkColor}
            lightColor={lightColor}
            className="rounded-full h-2 w-3/4"
          ></View>
          <View
            darkColor={darkColor}
            lightColor={lightColor}
            className="rounded-full h-2 w-3/4"
          ></View>
          <View
            darkColor={darkColor}
            lightColor={lightColor}
            className="rounded-full h-2 w-1/2"
          ></View>
          <View
            darkColor={darkColor}
            lightColor={lightColor}
            className="rounded-full h-2 w-1/4"
          ></View>
        </View>
      </View>
    </View>
  );
};

const ProfileLoader = () => {
  return (
    <View className="w-full flex-col gap-y-6 px-3 mb-5">
      <View className="flex-row justify-between items-center gap-x-2">
        <View className="flex-col gap-y-4">
          <View
            darkColor={darkColor}
            lightColor={lightColor}
            className="rounded-full w-24 h-5"
          ></View>
          <View
            darkColor={darkColor}
            lightColor={lightColor}
            className="rounded-full w-16 h-3"
          ></View>
        </View>
        <View
          darkColor={darkColor}
          lightColor={lightColor}
          className="rounded-full h-16 w-16"
        ></View>
      </View>
      <View
        darkColor={darkColor}
        lightColor={lightColor}
        className="rounded-full h-2 w-2/3"
      ></View>
      <View className="flex-row items-center gap-x-2">
        <View
          darkColor={darkColor}
          lightColor={lightColor}
          className="rounded-full h-2 w-20"
        ></View>
        <View
          darkColor={darkColor}
          lightColor={lightColor}
          className="rounded-full h-2 w-2"
        ></View>
        <View
          darkColor={darkColor}
          lightColor={lightColor}
          className="rounded-full h-2 w-20"
        ></View>
      </View>
      <View
        style={{
          flex: 2,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          columnGap: 10,
          paddingHorizontal: 4,
        }}
      >
        <View
          darkColor={darkColor}
          lightColor={lightColor}
          className="rounded-md w-1/2 h-7"
        ></View>
        <View
          darkColor={darkColor}
          lightColor={lightColor}
          className="rounded-md w-1/2 h-7"
        ></View>
      </View>
    </View>
  );
};

export const ProfileSkeleton = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="flex-col w-full h-full py-2"
    >
      <ProfileLoader />
      <View
        className="mb-5"
        style={{ height: 1, width: "100%" }}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <PostLoader />
      <PostLoader />
      <PostLoader />
      <PostLoader />
    </ScrollView>
  );
};

export const PostSkeleton = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="flex-col w-full h-full py-2"
    >
      <PostLoader />
      <PostLoader />
      <PostLoader />
      <PostLoader />
      <PostLoader />
      <PostLoader />
    </ScrollView>
  );
};
