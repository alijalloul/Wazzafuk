import React, { memo, useEffect, useState } from "react";
import { View, TouchableOpacity, Text, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import LanguagePicker from "../components/Picker/LanguagePicker";
import { updateUser } from "../redux/User";
import Spinner from "../components/Spinner";
import CustomeBackHeader from "../components/Header/CustomBackHeader";

const Language = ({ navigation }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const pending = useSelector((state) => state.user.pending);

  const [languageArr, setLanguageArr] = useState(
    userInfo?.language || [
      { language: "Deutsch", proficiency: "Fluent" },
      { language: "العربية", proficiency: "Basic" },
      { language: "English", proficiency: "Intermediate" },
    ]
  );

  useEffect(() => {
    navigation.setOptions({ headerLeft: () => <CustomeBackHeader navigation={navigation} screenName="education" /> });
  }, []);

  return (
    <View className="flex-1 justify-center bg-white">
      <View className={`${pending ? "absolute z-30 w-full h-full justify-center items-center" : "hidden"}`}>
        <Spinner />
      </View>
      <View className={`${pending ? " bg-white z-20 absolute h-full w-full opacity-50 " : "hidden"}`}></View>
      <ScrollView className=" bg-white" contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center" }}>
        <View className="w-[90%] items-center flex-1">
          <LanguagePicker headerSize={35} headerText="One last thing. Tell us what languages do you speak." languageArr={languageArr} setLanguageArr={setLanguageArr} />
        </View>

        <TouchableOpacity
          onPress={() => {
            updateUser({ ...userInfo, language: languageArr }, navigation, dispatch);
          }}
          className="self-end w-32 h-12 flex justify-center items-center bottom-0 right-0 mr-3 mb-3 bg-[#FE6F07] rounded-xl"
        >
          <Text className="text-lg font-garamond text-white">Next</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default memo(Language);
