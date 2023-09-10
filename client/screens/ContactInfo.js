import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { editUser } from "../redux/User";
import RenderTextInput from "../components/RenderTextInput";

const CV = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userInfo);

  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const handleButton = async () => {
    if (selectedDocument) {
      editUser({ ...user, uri: selectedDocument.uri }, "introducation", navigation, dispatch);
    } else {
      navigation.navigate("HomeTabs", { screen: "home" });
    }
  };

  return (
    <View className="bg-white flex-1 items-center">
      <View className="w-[90%] flex-1">
        <Text className=" text-4xl font-garamond mb-5">First, tell the employer of how they would contact you.</Text>

        <RenderTextInput isMultiline={false} title="E-Mail" value={email} setValue={setEmail} placeholder="Ex: mohammed.h@hotmail.com" />

        <View className="my-2"></View>

        <RenderTextInput isMultiline={false} title="Address" value={address} setValue={setAddress} placeholder="Ex: Lebanon - Beirut - Hamera - Sadat St." />
      </View>

      <TouchableOpacity
        onPress={() => {
          editUser({ ...user, email: email, address: address }, "introduction", navigation, dispatch);
        }}
        className="self-end w-32 h-12 flex justify-center items-center mr-3 mb-3 bg-[#FE6F07] rounded-xl"
      >
        <Text className="text-lg font-garamond text-white">Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CV;
