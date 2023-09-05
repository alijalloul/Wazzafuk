import React, { useState, memo } from "react";
import { View, TouchableOpacity, Text, ScrollView, Image } from "react-native";
import Modal from "react-native-modal";

import SingleSelectorModal from "../SingleSelectorModal";
import RenderTextInput from "../RenderTextInput";

import pen from "../../assets/images/pen.png";
import trash from "../../assets/images/trash.png";

const WorkExperiencePicker = ({ headerSize, headerText, workExperience, setWorkExperience }) => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    country: "",
    startMonth: "",
    startYear: "",
    endMonth: "",
    endYear: "",
    description: "",
  });

  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [workIndex, setWorkIndex] = useState(null);

  const closeModal = () => {
    setBottomSheetVisible(false);
    setIsEditing(false);

    if (isEditing) {
      setFormData({
        title: "",
        company: "",
        location: "",
        country: "",
        startMonth: "",
        startYear: "",
        endMonth: "",
        endYear: "",
        description: "",
      });
    }
  };

  const saveWorkExperience = () => {
    const updatedWorkExperience = workIndex !== null ? workExperience.map((work, index) => (index === workIndex ? formData : work)) : [...workExperience, formData];

    setWorkExperience(updatedWorkExperience);
    closeModal();
  };

  const handleChange = (fieldName, text) => {
    setFormData((prevData) => ({ ...prevData, [fieldName]: text }));
  };

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const startYearN = 1990;
  const endYearN = 2023;
  const years = Array.from({ length: endYearN - startYearN + 1 }, (_, index) => (endYearN - index).toString());

  return (
    <View className="flex-1 w-full">
      <View className="flex-1 w-[90%] self-center">
        <Text style={{ fontSize: headerSize }} className=" font-garamond-semibold mb-5">
          {headerText}
        </Text>
        <View>
          {workExperience.length > 0 &&
            workExperience.map((work, index) => (
              <View key={index} className="relative w-full border-[1px] rounded-2xl p-5 pt-3 pr-3 mb-4">
                <View className="flex flex-row w-full justify-end items-center">
                  <TouchableOpacity
                    onPress={() => {
                      setIsEditing(true);
                      setWorkIndex(index);
                      setFormData(workExperience[index]);
                      setBottomSheetVisible(true);
                    }}
                    className="border-[1px] border-gray-400 rounded-full p-[6px] mr-2"
                  >
                    <Image source={pen} className="w-5 h-5 aspect-square" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setWorkExperience(workExperience.filter((item, index2) => index2 !== index));
                    }}
                    className="border-[1px] border-gray-400 rounded-full p-[6px]"
                  >
                    <Image source={trash} className="w-5 h-5 aspect-square" />
                  </TouchableOpacity>
                </View>
                <Text className=" font-garamond text-3xl">{work.title}</Text>
                <Text className=" font-garamond text-[15px]">{work.company}</Text>
                <Text className=" font-garamond text-xl">
                  {work.startMonthWork} {work.startYear} - {work.endMonthWork} {work.endYear}
                </Text>
                <Text className=" font-garamond text-[15px] opacity-70 mb-3">
                  {work.country}, {work.location}
                </Text>
                <Text className=" font-garamond text-lg opacity-70">{work.description}</Text>
              </View>
            ))}
        </View>
        <TouchableOpacity
          onPress={() => {
            setBottomSheetVisible(true);
          }}
          className="bg-white border-[1px] border-[#FE6F07] w-full py-3 rounded-3xl flex justify-center items-center mb-5"
        >
          <Text className="text-[#FE6F07] font-garamond-bold text-xl">+ Add experience</Text>
        </TouchableOpacity>
      </View>
      <Modal isVisible={isBottomSheetVisible} animationInTiming={700} className=" m-0 mt-10 rounded-t-xl">
        <View className="flex-1 justify-center bg-white">
          <View className={`mb-5 w-full flex flex-row px-5 justify-between items-center ${isBottomSheetVisible && "border-b-[1px]"}`}>
            <Text className=" text-3xl font-garamond">{isEditing ? "Edit" : "Add Work Experience"}</Text>

            <TouchableOpacity onPress={() => closeModal()}>
              <Text className=" text-5xl font-garamond-bold">×</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            contentContainerStyle={{
              alignItems: "center",
              justifyContent: "center",
            }}
            className=""
          >
            <View className="w-[90%] flex-1">
              <View className="mb-5">
                <RenderTextInput isForm={true} isMultiline={false} title="Title *" value={formData.title} handleChange={handleChange} placeholder="Ex: Accountant" fieldName="title" />
              </View>
              <View className="mb-5">
                <RenderTextInput isForm={true} isMultiline={false} title="Company *" value={formData.company} handleChange={handleChange} placeholder="Ex: Amazon" fieldName="company" />
              </View>
              <View className="mb-5">
                <RenderTextInput isForm={true} isMultiline={false} title="Location *" value={formData.location} handleChange={handleChange} placeholder="Ex: Beirut" fieldName="location" />
              </View>
              <View className="mb-5">
                <RenderTextInput isForm={true} isMultiline={false} title="Country *" value={formData.country} handleChange={handleChange} placeholder="Ex: Lebanon" fieldName="country" />
              </View>

              <View className="mb-5">
                <Text className="text-[20px] font-garamond mb-2">Start Date *</Text>

                <View className="flex flex-row justify-between items-center w-full">
                  <View className=" w-[45%] ">
                    <SingleSelectorModal isForm={true} data={months} value={formData.startMonth} setValue={setFormData} fieldName="startMonth" />
                  </View>

                  <View className="w-[45%]">
                    <SingleSelectorModal isForm={true} data={years} value={formData.startYear} setValue={setFormData} fieldName="startYear" />
                  </View>
                </View>
              </View>

              <View className="mb-5">
                <Text className="text-[20px] font-garamond mb-2">End Date *</Text>
                <View className="flex flex-row justify-between items-center w-full">
                  <View className=" w-[45%] ">
                    <SingleSelectorModal isForm={true} data={months} value={formData.endMonth} setValue={setFormData} fieldName="endMonth" />
                  </View>

                  <View className="w-[45%]">
                    <SingleSelectorModal isForm={true} data={years} value={formData.endYear} setValue={setFormData} fieldName="endYear" />
                  </View>
                </View>
              </View>

              <View className="mb-5">
                <RenderTextInput
                  isForm={true}
                  isMultiline={true}
                  title="Description"
                  value={formData.description}
                  handleChange={handleChange}
                  placeholder="Ex: I count money"
                  fieldName="description"
                />
              </View>

              <View className="w-full flex justify-center items-end mb-24">
                <TouchableOpacity onPress={() => saveWorkExperience()} className="w-32 bottom-0 right-0 bg-[#FE6F07] rounded-xl px-10 py-2">
                  <Text className="text-lg font-garamond text-white">{isEditing ? "Edit" : "Add"}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default memo(WorkExperiencePicker);
