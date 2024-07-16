import React from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "@/components/Global/Themed";
import { InputSearch } from "@/components/Search/InputSearch";

const index = () => {
  return (
    <SafeAreaView className="flex-col h-full">
      <ScrollView className="p-4 h-full" showsVerticalScrollIndicator={false}>
        <InputSearch />
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;
