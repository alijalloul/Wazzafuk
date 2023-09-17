import { I18nManager } from "react-native";
import React from "react";
import { View, ActivityIndicator } from "react-native";

const Spinner = () => {
  return (
    <View className="flex-1 justify-center item-center">
      <ActivityIndicator size="large" color="#007AFF" />
    </View>
  );
};

export default Spinner;
