import React, { useEffect, useState, useRef } from "react";
import { View, Image, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ScrollView } from "react-native";

import mail from "../assets/images/mail.png";

const Verification = ({ navigation }) => {
  const [OTP, setOTP] = useState("");
  const otpTextInputRed = useRef(null);

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      otpTextInputRed.current.blur();
    });

    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView behavior="height" enabled className="bg-white flex-1">
      <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: "center", justifyContent: "center" }}>
        <View className={`w-full aspect-[9/7]`}>
          <Image source={mail} style={{ resizeMode: "cover" }} className="w-full h-full" />
        </View>

        <View className="flex justify-center items-center mb-16">
          <Text className="text-[#FE6F07] font-garamond-bold text-4xl">Verification Code</Text>

          <View className="flex justify-center items-center mb-3">
            <Text className=" font-garamond text-[16px]">Please enter the code sent to </Text>
            <Text className=" font-garamond text-[#FE6F07] text-[16px]">76131445</Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("editUser");
            }}
          >
            <Text className=" font-garamond opacity-50 border-b-[0.5px]">Change Phone Number</Text>
          </TouchableOpacity>
        </View>

        <View className="relative w-[70%] mb-12">
          <TouchableWithoutFeedback
            onPress={() => {
              otpTextInputRed.current.focus();
            }}
            className=" mb-5"
          >
            <View className="w-full flex flex-row justify-between items-center">
              <Text className={`${OTP.length > 0 ? "text-[#FE6F07] border-[#FE6F07]" : "text-black border-black"} border-b-[8px] flex justify-center items-center text-3xl font-garamond-bold px-5`}>
                {OTP.toString().substring(0, 1) ? OTP.toString().substring(0, 1) : "  "}
              </Text>
              <Text className={`${OTP.length > 1 ? "text-[#FE6F07] border-[#FE6F07]" : "text-black border-black"} border-b-[8px] flex justify-center items-center text-3xl font-garamond-bold px-5`}>
                {OTP.toString().substring(1, 2) ? OTP.toString().substring(1, 2) : "  "}
              </Text>
              <Text className={`${OTP.length > 2 ? "text-[#FE6F07] border-[#FE6F07]" : "text-black border-black"} border-b-[8px] flex justify-center items-center text-3xl font-garamond-bold px-5`}>
                {OTP.toString().substring(2, 3) ? OTP.toString().substring(2, 3) : "  "}
              </Text>
              <Text className={`${OTP.length > 3 ? "text-[#FE6F07] border-[#FE6F07]" : "text-black border-black"} border-b-[8px] flex justify-center items-center text-3xl font-garamond-bold px-5`}>
                {OTP.toString().substring(3, 4) ? OTP.toString().substring(3, 4) : "  "}
              </Text>
            </View>
          </TouchableWithoutFeedback>

          <TextInput
            ref={otpTextInputRed}
            keyboardType="numeric"
            maxLength={4}
            onChangeText={(text) => {
              setOTP(text.toString());
            }}
            className="h-[1px]"
          ></TextInput>
        </View>

        <View className="relative w-[90%]">
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("CV");
            }}
            className="bg-[#FE6F07] w-full py-3 rounded-3xl flex justify-center items-center mb-3"
          >
            <Text className="text-white font-garamond-bold text-xl">Verify</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-white w-full py-3 rounded-3xl flex justify-center items-center">
            <Text className="text-[#FE6F07] font-garamond-bold text-xl">Resend Code</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Verification;
