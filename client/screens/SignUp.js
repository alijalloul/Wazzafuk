import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Image, Text, TouchableOpacity, TextInput, ScrollView } from "react-native";

import blobright from "../assets/images/blobright.png";
import phone from "../assets/images/phone.png";
import key from "../assets/images/key.png";
import user from "../assets/images/userBlack.png";

import RenderTextInput from "../components/RenderTextInput";

import { editUser } from "../redux/User";

const SignUp = ({ navigation }) => {
  console.log("hello");
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);

  const [name, setName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [password, setPassword] = useState("");

  const [nameError, setNameError] = useState(false);
  const [telephoneError, setTelephoneError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleNext = () => {
    let error = false;

    if (name === "") {
      setNameError(true);
      error = true;
    }
    if (telephone === "") {
      setTelephoneError(true);
      error = true;
    }
    if (password === "") {
      setPasswordError(true);
      error = true;
    }

    if (!error) {
      editUser({ ...userInfo, name: name, telephone: telephone, password: password }, dispatch);
      navigation.navigate("choose");
    }
  };
  return (
    <ScrollView className="flex-1 bg-white " contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}>
      <Image source={blobright} className="absolute -left-12 -top-72 " />

      <View className="flex-1 w-[90%]">
        <Text className="pl-5 pt-20 text-[40px] text-white font-garamond w-[70%]">Create Account</Text>

        <View className="mt-36">
          <View className="mb-10">
            <View className="mb-4">
              <RenderTextInput
                isNumpad={false}
                isMultiline={false}
                icon={user}
                value={name}
                setValue={setName}
                placeholder="Full Name"
                isError={nameError}
                setIsError={setNameError}
                errorMessage="This field can not be empty"
              />
            </View>

            <View className="mb-4">
              <RenderTextInput
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
          </View>

          <View>
            <TouchableOpacity
              onPress={() => {
                handleNext();
              }}
              className="bg-[#FE6F07] w-full py-3 rounded-3xl flex justify-center items-center"
            >
              <Text className="text-white font-garamond-bold text-xl">Next</Text>
            </TouchableOpacity>

            <View className=" relative flex justify-center items-center w-full my-4">
              <Text className="text-opacity-50 font-garamond bg-white px-1 py-1 z-10">or</Text>
              <View className="opacity-50 absolute w-full border-b-[1px] "></View>
            </View>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate("login");
              }}
              className="bg-white border-[1px] border-gray-400 w-full py-3 rounded-3xl flex justify-center items-center"
            >
              <Text className=" font-garamond-bold text-xl">Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;
