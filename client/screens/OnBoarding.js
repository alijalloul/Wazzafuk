import React from "react";
import { View, Image, Text, TouchableOpacity, SafeAreaView } from "react-native";

import baladieh from "../assets/images/baladieh.jpeg";

const OnBoarding = ({ navigation }) => {
  return (
    <SafeAreaView className="bg-white flex-1">
      <View className="w-full flex justify-center items-center mb-10">
        <Text className="text-5xl text-[#FE6F07] font-garamond-bold">Waazefuk</Text>
      </View>

      <View className="w-60 aspect-square mb-24">
        <Image source={baladieh} className="w-full h-full" />
      </View>

      <View className="w-full flex justify-center items-center">
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("login");
          }}
          className="w-[90%] bg-[#FE6F07] py-3 rounded-3xl flex justify-center items-center mb-5"
        >
          <Text className="text-white font-garamond-bold text-xl">Log In</Text>
        </TouchableOpacity>

        <View className="flex flex-row justify-center items-center ">
          <Text className="font-garamond">Don't have an account? </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("signUp");
            }}
          >
            <Text className="font-garamond">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OnBoarding;
