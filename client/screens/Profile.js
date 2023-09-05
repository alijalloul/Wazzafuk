import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, ScrollView, Image, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import UploadImage from "../components/UploadImage";
import TextInputEditor from "../components/Profile/TextInputEditor";
import IntroductionPicker from "../components/Profile/IntroductionPicker";
import WorkExperiencePicker from "../components/Picker/WorkExperiencePicker";
import EducationPicker from "../components/Picker/EducationPicker";
import LanguagePicker from "../components/Picker/LanguagePicker";

import { updateUser, logout } from "../redux/User";

import blobTop from "../assets/images/blobTop.png";

const Profile = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userInfo);

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [profession, setProfession] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [workExperience, setWorkExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [languageArr, setLanguageArr] = useState([]);

  useEffect(() => {
    user?.name && setName(user.name);
    user?.profession && setProfession(user.profession);
    user?.introduction && setIntroduction(user.introduction);
    user?.workExperience && setWorkExperience(user.workExperience);
    user?.education && setEducation(user.education);
    user?.languageArr && setLanguageArr(user.languageArr);
  }, [user]);

  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}>
      <Image source={blobTop} className="absolute -top-72  opacity-90" />
      <View className="my-8 w-full">
        <TextInputEditor textSize={35} textColor={"white"} value={name} setValue={setName} placeholder="Full Name" />
      </View>

      <UploadImage width={250} isButton={false} image={image} setImage={setImage} />

      <TextInputEditor textSize={25} textColor={"black"} value={profession} setValue={setProfession} placeholder="Professional Title" />

      <View className="w-[90%] my-8">
        <IntroductionPicker introduction={introduction} setIntroduction={setIntroduction} placeholder="Introduction" />
      </View>

      <View className="w-full my-5 flex-1">
        <WorkExperiencePicker headerSize={25} headerText="Work Experience" workExperience={workExperience} setWorkExperience={setWorkExperience} />
      </View>

      <View className="w-full my-5 flex-1">
        <EducationPicker headerSize={25} headerText="Education" education={education} setEducation={setEducation} />
      </View>

      <View className="w-full my-5 flex-1">
        <LanguagePicker headerSize={25} headerText="Languages" languageArr={languageArr} setLanguageArr={setLanguageArr} />
      </View>

      <View className={`w-[90%] flex justify-center items-start mb-5`}>
        <TouchableOpacity
          onPress={() => {
            logout(navigation, dispatch);
          }}
          className="w-32 h-12 flex justify-center items-center bottom-0 right-0 mr-3 mb-3 bg-white border-[1px] border-[#FE6F07] rounded-xl"
        >
          <Text className="text-lg font-garamond text-[#FE6F07]">Log Out</Text>
        </TouchableOpacity>
      </View>

      <View className={`w-full flex justify-center items-end mb-5`}>
        <TouchableOpacity
          onPress={() => {
            updateUser(
              {
                body: { name: name, image: image, profession: profession, introduction: introduction, workExperience: workExperience, education: education, language: languageArr },
                userId: user._id,
                type: user.type,
              },
              navigation,
              dispatch
            );
          }}
          className="w-32 h-12 flex justify-center items-center bottom-0 right-0 mr-3 mb-3 bg-[#FE6F07] rounded-xl"
        >
          <Text className="text-lg font-garamond text-white">Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Profile;
