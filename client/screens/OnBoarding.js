import { I18nManager } from "react-native";
import React, { useEffect } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";

import CustomeBackHeader from "../components/Header/CustomBackHeader";

import baladieh from "../assets/images/baladieh.jpeg";
import { useSelector } from "react-redux";

const OnBoarding = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({ headerLeft: () => <CustomeBackHeader navigation={navigation} screenName="chooseLanguage" /> });
  }, []);

  const translateText = (englishText, arabicText) => {
    return I18nManager.isRTL ? arabicText : englishText;
  };

  return (
    <View className="bg-white flex-1">
      <View className="w-full flex-1">
        <View className="w-full flex justify-center items-center mb-10">
          <Text className="text-5xl text-[#FE6F07] font-garamond-bold">Waazefuk</Text>
        </View>

        <View className="w-[80%] self-center aspect-square mb-24">
          <Image source={baladieh} className="w-full h-full" />
        </View>
      </View>

      <View className="w-full flex justify-center items-center mb-10">
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("login");
          }}
          className="w-[90%] bg-[#FE6F07] py-3 rounded-3xl flex justify-center items-center mb-5"
        >
          <Text className="text-white font-garamond-bold text-xl">{translateText("Log In", "تسجيل الدخول")}</Text>
        </TouchableOpacity>

        <View className={`flex flex-row    justify-center items-center `}>
          <Text className="font-garamond">{translateText("Don't have an account?", "ليس لديك حساب؟")}</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("signUp");
            }}
          >
            <Text className="font-garamond">{translateText("Sign Up", "سجل الآن")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default OnBoarding;
