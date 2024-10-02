import { Colors } from "@/constants/Colors";
import GaramondText from "@/components/GaramondText";
import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  Keyboard,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import mail from "@/assets/images/mail.png";
import Spinner from "@/components/Spinner";
import { resendotp, signup } from "@/redux/User";

const Verification = ({ navigation }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.userInfo);
  const pending = useSelector((state) => state.user.pending);
  const phoneNumber = useSelector((state) => state.user.userInfo)?.telephone;

  console.log("pending: ", pending);
  const [OTP, setOTP] = useState("");
  const otpTextInputRed = useRef(null);

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        otpTextInputRed.current.blur();
      }
    );

    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <View className="flex-1 justify-center bg-white">
      <View
        className={`${
          pending
            ? "z-30 absolute w-full h-full justify-center items-center"
            : "hidden"
        }`}
      >
        <Spinner />
      </View>
      <View
        className={`${
          pending
            ? " bg-white z-20 absolute h-full w-full opacity-50 "
            : "hidden"
        }`}
      ></View>
      <ScrollView
        className="bg-white flex-1"
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View className={`w-full aspect-[9/7]`}>
          <Image
            source={mail}
            style={{ resizeMode: "cover" }}
            className="w-full h-full"
          />
        </View>

        <View className="flex justify-center items-center mb-16">
          <GaramondText
            className={`text-[${Colors.primary}] font-garamond-bold text-5xl`}
          >
            Verification Code
          </GaramondText>

          <View className="flex justify-center items-center mb-3">
            <GaramondText className=" text-[16px]">
              Please enter the code sent to
            </GaramondText>
            <GaramondText className={` text-[${Colors.primary}] text-[16px]`}>
              {phoneNumber}
            </GaramondText>
          </View>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("signUp");
            }}
          >
            <GaramondText className=" opacity-50 border-b-[0.5px]">
              Change Phone Number
            </GaramondText>
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
              <GaramondText
                className={`${
                  OTP.length > 0
                    ? `text-[${Colors.primary}] border-[${Colors.primary}]`
                    : "text-black border-black"
                } border-b-[8px] flex justify-center items-center text-3xl font-garamond-bold px-5`}
              >
                {OTP.toString().substring(0, 1)
                  ? OTP.toString().substring(0, 1)
                  : "  "}
              </GaramondText>
              <GaramondText
                className={`${
                  OTP.length > 1
                    ? `text-[${Colors.primary}] border-[${Colors.primary}]`
                    : "text-black border-black"
                } border-b-[8px] flex justify-center items-center text-3xl font-garamond-bold px-5`}
              >
                {OTP.toString().substring(1, 2)
                  ? OTP.toString().substring(1, 2)
                  : "  "}
              </GaramondText>
              <GaramondText
                className={`${
                  OTP.length > 2
                    ? `text-[${Colors.primary}] border-[${Colors.primary}]`
                    : "text-black border-black"
                } border-b-[8px] flex justify-center items-center text-3xl font-garamond-bold px-5`}
              >
                {OTP.toString().substring(2, 3)
                  ? OTP.toString().substring(2, 3)
                  : "  "}
              </GaramondText>
              <GaramondText
                className={`${
                  OTP.length > 3
                    ? `text-[${Colors.primary}] border-[${Colors.primary}]`
                    : "text-black border-black"
                } border-b-[8px] flex justify-center items-center text-3xl font-garamond-bold px-5`}
              >
                {OTP.toString().substring(3, 4)
                  ? OTP.toString().substring(3, 4)
                  : "  "}
              </GaramondText>
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
              signup({ ...user, otp: OTP }, navigation, dispatch);
            }}
            className={`bg-[${Colors.primary}] w-full py-3 rounded-3xl flex justify-center items-center mb-3`}
          >
            <GaramondText className="text-white font-garamond-bold text-xl">
              Verify
            </GaramondText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              resendotp(phoneNumber, dispatch);
            }}
            className="bg-white w-full py-3 rounded-3xl flex justify-center items-center"
          >
            <GaramondText
              className={`text-[${Colors.primary}] font-garamond-bold text-xl`}
            >
              Resend Code
            </GaramondText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Verification;
