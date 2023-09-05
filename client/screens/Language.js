import React, { memo, useState } from "react";
import { View, TouchableOpacity, Text, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import LanguagePicker from "../components/Picker/LanguagePicker";

const Language = ({ navigation }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);

  const [languageArr, setLanguageArr] = useState([]);

  return (
    <ScrollView className=" bg-white" contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center" }}>
      <LanguagePicker headerSize={35} headerText="One last thing. Tell us what languages do you speak." languageArr={languageArr} setLanguageArr={setLanguageArr} />

      <TouchableOpacity onPress={() => {}} className="self-end w-32 h-12 flex justify-center items-center bottom-0 right-0 mr-3 mb-3 bg-[#FE6F07] rounded-xl">
        <Text className="text-lg font-garamond text-white">Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default memo(Language);
