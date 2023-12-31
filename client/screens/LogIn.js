import React, { useEffect, useState } from "react";
import { I18nManager, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import blobleft from "../assets/images/blobleft.png";
import key from "../assets/images/key.png";
import phone from "../assets/images/phone.png";

import RenderTextInput from "../components/RenderTextInput";
import Spinner from "../components/Spinner";
import { login } from "../redux/User";

const LogIn = ({ navigation }) => {
  const dispatch = useDispatch();

  const pending = useSelector((state) => state.user.pending);
  const [errorType, setErrorType] = useState(null);

  const [telephone, setTelephone] = useState("");
  const [password, setPassword] = useState("");

  const [telephoneError, setTelephoneError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {
    if (errorType === "User doesn't exist") {
      setTelephoneError(true);
    } else {
      setTelephoneError(false);
    }

    if (errorType === "Invalid password") {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  }, [errorType]);
  const handleLogIn = async () => {
    if (telephone === "") {
      setTelephoneError(true);
    } else {
      setTelephoneError(false);
    }

    if (password === "") {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }

    if (password !== "" && telephone !== "") {
      const res = await login({ telephone: telephone, password: password }, navigation, dispatch);

      console.log("res: ", res);
      setErrorType(res);
    }
  };

  const translateText = (englishText, arabicText) => {
    return I18nManager.isRTL ? arabicText : englishText;
  };

  return (
    <View className="flex-1 justify-center bg-white">
      <View className={`${pending ? "z-30 absolute w-full h-full justify-center items-center" : "hidden"}`}>
        <Spinner />
      </View>
      <View className={`${pending ? " bg-white z-20 absolute h-full w-full opacity-50 " : "hidden"}`}></View>
      <ScrollView className="flex-1 bg-white " contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}>
        <Image source={blobleft} className="absolute right-0 -top-72 " />

        <View className="flex-1 w-[90%]">
          <Text
            style={{ textShadowColor: "rgba(0, 0, 0, 0.75)", textShadowOffset: { width: -1, height: 1 }, textShadowRadius: 10 }}
            className="relative top-12 text-[40px] text-white font-garamond-bold w-[50%]"
          >
            {translateText("Welcome Back", "مرحبًا بعودتك")}
          </Text>

          <View className="mt-48">
            <View className="mb-10">
              <View className="mb-4">
                <RenderTextInput
                  isNumpad={true}
                  isMultiline={false}
                  icon={phone}
                  value={telephone}
                  setValue={setTelephone}
                  placeholder={translateText("Phone Number", "رقم الهاتف")}
                  isError={telephoneError}
                  setIsError={setTelephoneError}
                  errorMessage={
                    errorType === "User doesn't exist"
                      ? translateText("User doesn't exist", "المستخدم غير موجود")
                      : telephone === "" && translateText("This field can not be empty", "هذا الحقل لا يمكن أن يكون فارغًا")
                  }
                  isArabic={I18nManager.isRTL && true}
                />
              </View>

              <View className="mb-4">
                <RenderTextInput
                  isNumpad={false}
                  isMultiline={false}
                  icon={key}
                  value={password}
                  setValue={setPassword}
                  placeholder={translateText("Password", "كلمة المرور")}
                  isError={passwordError}
                  setIsError={setPasswordError}
                  errorMessage={
                    errorType === "Invalid password"
                      ? translateText("Invalid password", "رمز مرور خاطئ")
                      : password === "" && translateText("This field can not be empty", "هذا الحقل لا يمكن أن يكون فارغًا")
                  }
                  isArabic={I18nManager.isRTL && true}
                />
              </View>

              <View className="w-full flex justify-end items-end">
                <TouchableOpacity className=" opacity-60">
                  <Text className=" font-garamond border-b-[1px]">{translateText("Forgot Password", "نسيت كلمة السر")}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View>
              <TouchableOpacity
                onPress={() => {
                  handleLogIn();
                }}
                className="bg-[#FE6F07] w-full py-3 rounded-3xl flex justify-center items-center"
              >
                <Text className="text-white font-garamond-bold text-xl"> {translateText("Log In", "تسجيل الدخول")}</Text>
              </TouchableOpacity>

              <View className=" relative flex justify-center items-center w-full my-4">
                <Text className="text-opacity-50 font-garamond bg-white px-1 py-1 z-10">{translateText("or", "او")}</Text>
                <View className="opacity-50 absolute w-full border-b-[1px] "></View>
              </View>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("signUp");
                }}
                className="bg-white border-[1px] border-gray-400 w-full py-3 rounded-3xl flex justify-center items-center"
              >
                <Text className=" font-garamond-bold text-xl">{translateText("Sign Up", "سجل")}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default LogIn;
