import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as DocumentPicker from "expo-document-picker";

import { updateUser } from "../redux/User";

const CV = ({ navigation }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.userInfo);

  const [selectedDocument, setSelectedDocument] = useState(null);
  const [base64Data, setBase64Data] = useState(null);

  const convertToBase64 = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const reader = new FileReader();

      reader.onloadend = () => {
        setBase64Data(reader.result);
      };

      reader.readAsDataURL(blob);
    } catch (error) {
      console.error("Error converting to base64:", error);
      Alert.alert("Error converting to base64");
    }
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });

      if (result.type === "success") {
        if (result.size > 1024 * 1024) {
          alert("Selected PDF exceeds the size limit of 1MB.");
          return;
        }

        setSelectedDocument(result);
        convertToBase64(result.uri);
      }
    } catch (error) {
      console.error("Error picking document:", error);
    }
  };

  const handleButton = async () => {
    if (selectedDocument) {
      console.log(base64Data);
      //updateUser({ ...user, uri: selectedDocument.uri }, navigation, dispatch);
    } else {
      navigation.navigate("HomeTabs", { screen: "home" });
    }
  };

  return (
    <View className="bg-white flex-1 items-center">
      <View className="w-[90%] h-full">
        <Text className=" text-4xl font-garamond mb-5">How would you like to introduce yourself?</Text>
        <Text className=" text-[20px] font-garamond mb-5">
          It is important to express your education, previous work experience and skills to you potential employer as clearly as possible, as this will set you on the top of your competition.
        </Text>

        <View className=" mb-5 felx justify-center items-center">
          <TouchableOpacity
            onPress={() => {
              pickDocument();
            }}
            className="bg-white border-[1px] border-[#FE6F07] w-full py-3 rounded-3xl flex justify-center items-center mb-2"
          >
            <Text className="text-[#FE6F07] font-garamond-bold text-xl">Upload your CV</Text>
          </TouchableOpacity>

          <View className={`w-full px-2 flex flex-row justify-between items-center ${!selectedDocument && "hidden"}`}>
            <Text className="font-garamond">{selectedDocument?.name}</Text>

            <TouchableOpacity
              onPress={() => {
                setSelectedDocument(false);
              }}
              className="border-red-500 border-[1px] rounded-2xl p-2"
            >
              <Text className=" font-garamond text-red-500">Remove</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          disabled={selectedDocument ? true : false}
          onPress={() => {
            navigation.navigate("introduction");
          }}
          className={`bg-white border-[1px] w-full py-3 rounded-3xl flex justify-center items-center ${selectedDocument ? "border-black opacity-50" : "border-[#FE6F07] opacity-1"}`}
        >
          <Text className={` font-garamond-bold text-xl ${selectedDocument ? "text-black" : "text-[#FE6F07]"}`}>Fill it out manually</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            handleButton();
          }}
          className={` border-[1px] w-full py-3 rounded-3xl flex justify-center items-center absolute bottom-0 mb-10 ${selectedDocument ? "border-[#FE6F07] opacity-1" : "border-black opacity-50"}`}
        >
          <Text className={`text-black font-garamond-bold text-xl  ${selectedDocument ? "text-[#FE6F07]" : "border-black"}`}>{selectedDocument ? "Next" : "Skip"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CV;
