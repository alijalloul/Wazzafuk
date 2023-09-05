import React, { memo, useState } from "react";
import { View, TouchableOpacity, Text, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import editUser from "../redux/User";

import WorkExperiencePicker from "../components/Picker/WorkExperiencePicker";

const Work = ({ navigation }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);

  const [workExperience, setWorkExperience] = useState([]);

  return (
    <ScrollView className=" bg-white" contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center" }}>
      <WorkExperiencePicker headerSize={35} headerText="If you have relevant work experience, add it here." workExperience={workExperience} setWorkExperience={setWorkExperience} />

      <TouchableOpacity
        onPress={() => {
          editUser({ ...userInfo, workExperience: workExperience }, dispatch);
          navigation.navigate("education");
        }}
        className="  self-end w-32 h-12 flex justify-center items-center mr-3 mb-3 bg-[#FE6F07] rounded-xl"
      >
        <Text className="text-lg font-garamond text-white">Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default memo(Work);
