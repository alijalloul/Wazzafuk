import React, { useEffect } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";

import CustomeBackHeader from "../components/Header/CustomBackHeader";

import baladieh from "../assets/images/baladieh.jpeg";
import { useSelector } from "react-redux";

const OnBoarding = ({ navigation }) => {
  const appLanguage = useSelector((state) => state.user.appLanguage);

  useEffect(() => {
    navigation.setOptions({ headerLeft: () => <CustomeBackHeader navigation={navigation} screenName="chooseLanguage" /> });
  }, []);

  // Define your text strings for both Arabic and English
  const arabicText = {
    title: "وظفوك",
    loginButton: "تسجيل الدخول",
    signUpText: "ليس لديك حساب؟",
    signUpButton: "سجل الآن",
  };

  const englishText = {
    title: "Waazefuk",
    loginButton: "Log In",
    signUpText: "Don't have an account?",
    signUpButton: "Sign Up",
  };

  const getText = (key) => {
    return appLanguage === "arabic" ? arabicText[key] : englishText[key];
  };

  return (
    <View className="bg-white flex-1">
      <View className="w-full flex-1">
        <View className="w-full flex justify-center items-center mb-10">
          <Text className="text-5xl text-[#FE6F07] font-garamond-bold">{getText("title")}</Text>
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
          <Text className="text-white font-garamond-bold text-xl">{getText("loginButton")}</Text>
        </TouchableOpacity>

        <View className={`flex flex-${appLanguage === "arabic" ? "row-reverse" : "row"} justify-center items-center `}>
          <Text className="font-garamond">{getText("signUpText")}</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("signUp");
            }}
          >
            <Text className="font-garamond">{getText("signUpButton")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default OnBoarding;
