import React, { memo, useState } from "react";
import { View, TouchableOpacity, Text, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import EducationPicker from "../components/Picker/EducationPicker";

import { editUser } from "../redux/User";

const Education = ({ navigation }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);

  const [education, setEducation] = useState([]);

  return (
    <ScrollView className=" bg-white" contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center" }}>
      <EducationPicker headerSize={35} headerText="Your education is very important to the client." education={education} setEducation={setEducation} />

      <TouchableOpacity
        onPress={() => {
          editUser({ ...userInfo, education: education }, dispatch);
          navigation.navigate("language");
        }}
        className="self-end w-32 h-12 flex justify-center items-center bottom-0 right-0 mr-3 mb-3 bg-[#FE6F07] rounded-xl"
      >
        <Text className="text-lg font-garamond text-white">Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default memo(Education);
