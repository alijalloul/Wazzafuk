import React from "react";
import { TouchableOpacity, Text, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CustomBackHeader = ({ navigation, screenName }) => {
  const handleBackPress = async () => {
    if (screenName === "onBoarding") {
      // Display a confirmation popup
      Alert.alert(
        "Logout Confirmation",
        "Are you sure you want to go back? You will be logged out.",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Logout",
            onPress: async () => {
              navigation.navigate(screenName);
              await AsyncStorage.clear();
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      navigation.navigate(screenName);
    }
  };

  return (
    <TouchableOpacity onPress={handleBackPress} style={{ flexDirection: "row", alignItems: "center" }}>
      <Ionicons name="arrow-back" size={24} color="black" />
    </TouchableOpacity>
  );
};

export default CustomBackHeader;
