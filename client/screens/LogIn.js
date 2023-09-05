import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { useDispatch } from "react-redux";

import blobleft from "../assets/images/blobleft.png";
import phone from "../assets/images/phone.png";
import key from "../assets/images/key.png";

import RenderTextInput from "../components/RenderTextInput";
import { login } from "../redux/User";

const LogIn = ({ navigation }) => {
  const dispatch = useDispatch();

  const [telephone, setTelephone] = useState("");
  const [password, setPassword] = useState("");

  const [telephoneError, setTelephoneError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleLogIn = () => {
    let error = false;

    if (telephone === "") {
      setTelephoneError(true);
      error = true;
    }
    if (password === "") {
      setPasswordError(true);
      error;
    }

    if (!error) {
      login({ telephone: telephone, password: password }, navigation, dispatch);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white " contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}>
      <Image source={blobleft} className="absolute right-0 -top-72 " />

      <View className="flex-1 w-[90%]">
        <Text
          style={{ textShadowColor: "rgba(0, 0, 0, 0.75)", textShadowOffset: { width: -1, height: 1 }, textShadowRadius: 10 }}
          className="relative top-12 text-[40px] text-white font-garamond-bold w-[70%]"
        >
          Welcome Back
        </Text>

        <View className="mt-48">
          <View className="mb-10">
            <View className="mb-4">
              <RenderTextInput
                isForm={false}
                isNumpad={true}
                isMultiline={false}
                icon={phone}
                value={telephone}
                setValue={setTelephone}
                placeholder="Phone Number"
                isError={telephoneError}
                setIsError={setTelephoneError}
                errorMessage="This field can not be empty"
              />
            </View>

            <View className="mb-4">
              <RenderTextInput
                isForm={false}
                isNumpad={false}
                isMultiline={false}
                icon={key}
                value={password}
                setValue={setPassword}
                placeholder="Password"
                isError={passwordError}
                setIsError={setPasswordError}
                errorMessage="This field can not be empty"
              />
            </View>

            <View className="w-full flex justify-end items-end">
              <TouchableOpacity className=" opacity-60">
                <Text className=" font-garamond border-b-[1px]">Forgot Password</Text>
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
              <Text className="text-white font-garamond-bold text-xl">Log In</Text>
            </TouchableOpacity>

            <View className=" relative flex justify-center items-center w-full my-4">
              <Text className="text-opacity-50 font-garamond bg-white px-1 py-1 z-10">or</Text>
              <View className="opacity-50 absolute w-full border-b-[1px] "></View>
            </View>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate("signUp");
              }}
              className="bg-white border-[1px] border-gray-400 w-full py-3 rounded-3xl flex justify-center items-center"
            >
              <Text className=" font-garamond-bold text-xl">Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default LogIn;
