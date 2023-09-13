import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, ScrollView, Image } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import * as FileSystem from "expo-file-system";
import * as Notifications from "expo-notifications";
import { StorageAccessFramework } from "expo-file-system";
import * as DocumentPicker from "expo-document-picker";

import UploadImage from "../components/UploadImage";
import TextInputEditor from "../components/Profile/TextInputEditor";
import IntroductionPicker from "../components/Profile/IntroductionPicker";
import WorkExperiencePicker from "../components/Picker/WorkExperiencePicker";
import EducationPicker from "../components/Picker/EducationPicker";
import LanguagePicker from "../components/Picker/LanguagePicker";
import ContactInfoEditor from "../components/Profile/ContactInfoEditor";

import { updateUser, logout } from "../redux/User";

import blobTop from "../assets/images/blobTop.png";
import Spinner from "../components/Spinner";

const Profile = ({ navigation }) => {
  const isFocused = useIsFocused();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userInfo);
  const pending = useSelector((state) => state.user.pending);
  console.log(user?.type);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [pdf, setPdf] = useState("");
  const [image, setImage] = useState("");
  const [profession, setProfession] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [workExperience, setWorkExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [languageArr, setLanguageArr] = useState([]);

  useEffect(() => {
    if (isFocused) {
      user?.name && setName(user.name);
      user?.email && setEmail(user.email);
      user?.address && setAddress(user.address);
      user?.pdf && setPdf(user.pdf);
      user?.image && setImage(user.image);
      user?.profession && setProfession(user.profession);
      user?.introduction && setIntroduction(user.introduction);
      user?.workExperience && setWorkExperience(user.workExperience);
      user?.education && setEducation(user.education);
      user?.language && setLanguageArr(user.language);
    }
  }, [user, isFocused]);

  const downloadPDF = async (base64PDF) => {
    const base64Data = base64PDF.split(",")[1];

    try {
      await StorageAccessFramework.createFileAsync("content://com.android.externalstorage.documents/tree/primary%3ADocuments", `${name}CV.pdf`, "application/pdf")
        .then(async (uri) => {
          await FileSystem.writeAsStringAsync(uri, base64Data, { encoding: FileSystem.EncodingType.Base64 });

          await Notifications.scheduleNotificationAsync({
            content: {
              title: "File Downloaded Successfully",
              body: `${name}CV has been downloaded successfully to Documents.`,
            },
            trigger: { seconds: 2 },
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {
      throw new Error(e);
    }
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });

      if (result.canceled === false) {
        if (result.assets[0].size > 1024 * 1024) {
          alert("Selected PDF exceeds the size limit of 1MB.");
          return;
        }

        try {
          const response = await fetch(result.assets[0].uri);
          const blob = await response.blob();
          const reader = new FileReader();

          const base64Data = await new Promise((resolve) => {
            reader.onloadend = () => {
              resolve(reader.result);
            };
            reader.readAsDataURL(blob);
          });
          setPdf(base64Data);
        } catch (error) {
          console.error("Error converting to base64:", error);
        }
      }
    } catch (error) {
      console.error("Error picking document:", error);
    }
  };
  const handlePDF = () => {
    if (pdf !== "") {
      downloadPDF(pdf);
    } else {
      pickDocument();
    }
  };

  const EmployerProfile = () => {
    return (
      <View className="flex-1 items-center w-full">
        <View className="absolute -top-72  opacity-90">
          <Image source={blobTop} />
        </View>

        <View className="my-8 w-full">
          <TextInputEditor textSize={35} textColor={"white"} value={name} setValue={setName} placeholder="Full Name" />
        </View>

        <UploadImage width={250} isButton={false} image={image} setImage={setImage} />

        <View className="w-[90%]">
          <View className=" my-5 flex-1">
            <Text className=" font-garamond-semibold text-2xl">Contact Information</Text>

            <View className="">
              <View className=" opacity-50 flex flex-row justify-start items-center border-y-[1px] py-4 px-2">
                <Text className=" font-garamond">Telephone: </Text>
                <Text className=" font-garamond">{user?.telephone}</Text>
              </View>
              <View className=" flex flex-row justify-start items-center border-y-[1px] py-4 px-2 my-[1px]">
                <Text className=" font-garamond">E-Mail: </Text>
                <ContactInfoEditor textSize={15} textColor="black" value={email} setValue={setEmail} placeholder="N/A" />
              </View>
              <View className="flex flex-row justify-start items-center border-b-[1px] py-4 px-2">
                <Text className=" font-garamond">Address: </Text>
                <ContactInfoEditor textSize={15} textColor="black" value={address} setValue={setAddress} placeholder="N/A" />
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const EmployeeProfile = () => {
    return (
      <View className="flex-1 items-center w-full">
        <View className="absolute -top-72  opacity-90">
          <Image source={blobTop} />
        </View>

        <View className="my-8 w-full">
          <TextInputEditor textSize={35} textColor={"white"} value={name} setValue={setName} placeholder="Full Name" />
        </View>

        <UploadImage width={250} isButton={false} image={image} setImage={setImage} />

        <TextInputEditor textSize={25} textColor={"black"} value={profession} setValue={setProfession} placeholder="Professional Title" />

        <View className="w-[90%]">
          <View className=" my-8">
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

          <View className=" my-5 flex-1">
            <Text className=" font-garamond-semibold text-2xl">Contact Information</Text>

            <View className="">
              <View className=" opacity-50 flex flex-row justify-start items-center border-y-[1px] py-4 px-2">
                <Text className=" font-garamond">Telephone: </Text>
                <Text className=" font-garamond">{user?.telephone}</Text>
              </View>
              <View className=" flex flex-row justify-start items-center border-y-[1px] py-4 px-2 my-[1px]">
                <Text className=" font-garamond">E-Mail: </Text>
                <ContactInfoEditor textSize={15} textColor="black" value={email} setValue={setEmail} placeholder="N/A" />
              </View>
              <View className="flex flex-row justify-start items-center border-b-[1px] py-4 px-2">
                <Text className=" font-garamond">Address: </Text>
                <ContactInfoEditor textSize={15} textColor="black" value={address} setValue={setAddress} placeholder="N/A" />
              </View>
            </View>
          </View>

          <View className="my-5">
            <Text className=" font-garamond-semibold text-2xl mb-4">My CV</Text>

            <View className="flex flex-row justify-between items-center">
              <TouchableOpacity
                onPress={() => {
                  handlePDF();
                }}
                className={`p-2 flex justify-center items-center rounded-xl mr-2 ${pdf ? "bg-sky-300" : "bg-[#FE6F07]"}`}
              >
                <Text className="text-lg font-garamond text-white">{pdf === "" ? "Upload PDF" : "Download PDF"}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setPdf("");
                }}
                className={`${pdf ? " px-2 py-2 border-[1px] rounded-xl border-red-500 bg-white" : "hidden"}`}
              >
                <Text className=" font-garamond text-[15px] text-red-500">Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View className="flex-1 justify-center bg-white">
      <View className={`${pending ? "absolute w-full h-full justify-center items-center" : "hidden"}`}>
        <Spinner />
      </View>
      <View className={`${pending ? " bg-white z-20 absolute h-full w-full opacity-50 " : "hidden"}`}></View>

      <ScrollView className="flex-1" contentContainerStyle={{ alignItems: "center" }}>
        {user?.type === "employee" ? <EmployeeProfile /> : <EmployerProfile />}

        <View className="w-[90%] justify-center">
          <View className={` flex justify-center items-center my-10`}>
            <TouchableOpacity
              onPress={() => {
                logout(navigation, dispatch);
              }}
              className="w-full h-12 flex justify-center items-center bottom-0 right-0 bg-white border-[1px] border-[#FE6F07] rounded-xl mb-2"
            >
              <Text className="text-lg font-garamond text-[#FE6F07]">Log Out</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                updateUser(
                  {
                    name: name,
                    image: image,
                    profession: profession,
                    introduction: introduction,
                    workExperience: workExperience,
                    education: education,
                    language: languageArr,
                    email: email,
                    address: address,
                    pdf: pdf,
                    _id: user._id,
                    type: user.type,
                  },

                  navigation,
                  dispatch
                );
              }}
              className="w-full h-12 flex justify-center items-center bottom-0 right-0 bg-[#FE6F07] rounded-xl"
            >
              <Text className="text-lg font-garamond text-white">Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;
