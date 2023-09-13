import React, { useState, memo } from "react";
import { View, TouchableOpacity, Text, ScrollView, Image } from "react-native";
import Modal from "react-native-modal";

import SingleSelectorModal from "../SingleSelectorModal";
import RenderTextInput from "../RenderTextInput";

import pen from "../../assets/images/pen.png";
import trash from "../../assets/images/trash.png";

const WorkExperiencePicker = ({ headerSize, headerText, workExperience, setWorkExperience }) => {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [country, setCountry] = useState("");
  const [startMonth, setStartMonth] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endMonth, setEndMonth] = useState("");
  const [endYear, setEndYear] = useState("");
  const [description, setDescription] = useState("");

  const [titleError, setTitleError] = useState(false);
  const [companyError, setCompanyError] = useState(false);
  const [locationError, setLocationError] = useState(false);
  const [countryError, setCountryError] = useState(false);

  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [workIndex, setWorkIndex] = useState(null);

  const closeModal = () => {
    setBottomSheetVisible(false);
    setIsEditing(false);

    setTitle("");
    setCompany("");
    setLocation("");
    setCountry("");
    setStartMonth("");
    setStartYear("");
    setEndMonth("");
    setEndYear("");
    setDescription("");
  };

  const handleEdit = (index) => {
    setIsEditing(true);
    setWorkIndex(index);
    setTitle(workExperience[index].title);
    setCompany(workExperience[index].company);
    setLocation(workExperience[index].location);
    setCountry(workExperience[index].country);
    setStartMonth(workExperience[index].startMonth);
    setStartYear(workExperience[index].startYear);
    setEndMonth(workExperience[index].endMonth);
    setEndYear(workExperience[index].endYear);
    setDescription(workExperience[index].description);
    setBottomSheetVisible(true);
  };

  const saveWorkExperience = () => {
    let error = false;

    if (title.trim() === "") {
      setTitleError(true);
      error = true;
    }
    if (company.trim() === "") {
      setCompanyError(true);
      error = true;
    }
    if (location.trim() === "") {
      setLocationError(true);
      error = true;
    }
    if (country.trim() === "") {
      setCountryError(true);
      error = true;
    }

    if (!error) {
      const updatedWorkExperience = isEditing
        ? workExperience.map((work, index) =>
            index === workIndex
              ? {
                  title,
                  company,
                  location,
                  country,
                  startMonth,
                  startYear,
                  endMonth,
                  endYear,
                  description,
                }
              : work
          )
        : [
            ...workExperience,
            {
              title,
              company,
              location,
              country,
              startMonth,
              startYear,
              endMonth,
              endYear,
              description,
            },
          ];

      setWorkExperience(updatedWorkExperience);
      closeModal();
    }
  };

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const startYearN = 1990;
  const endYearN = 2023;
  const years = Array.from({ length: endYearN - startYearN + 1 }, (_, index) => (endYearN - index).toString());

  return (
    <View className="flex-1 w-full">
      <View className="flex-1 w-full self-center">
        <Text style={{ fontSize: headerSize }} className=" font-garamond-semibold mb-5">
          {headerText}
        </Text>
        <View>
          {workExperience.length > 0 &&
            workExperience.map((work, index) => (
              <View key={index} className="relative w-full border-[1px] rounded-2xl p-5 pt-3 pr-3 mb-4 h-60">
                <View className="w-full flex flex-row justify-between items-center">
                  <Text className=" font-garamond text-3xl">{work.title}</Text>

                  <View className="flex flex-row justify-center items-center">
                    <TouchableOpacity
                      onPress={() => {
                        handleEdit(index);
                      }}
                      className="border-[1px] border-gray-400 rounded-full p-[6px] mr-2"
                    >
                      <Image source={pen} className="w-5 h-5 aspect-square" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setWorkExperience(workExperience?.filter((item, index2) => index2 !== index));
                      }}
                      className="border-[1px] border-gray-400 rounded-full p-[6px]"
                    >
                      <Image source={trash} className="w-5 h-5 aspect-square" />
                    </TouchableOpacity>
                  </View>
                </View>
                <Text className=" font-garamond text-xl ">{work.company}</Text>
                <View className="w-full flex my-4">
                  <Text className=" font-garamond text-[15px]">
                    {work.country}, {work.location}
                  </Text>
                  <Text className=" font-garamond text-[15px]">
                    {work.startMonth} {work.startYear} - {work.endMonth} {work.endYear}
                  </Text>
                </View>
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
                <RenderTextInput
                  isMultiline={false}
                  title="Title *"
                  value={title}
                  setValue={setTitle}
                  placeholder="Ex: Accountant"
                  isError={titleError}
                  setIsError={setTitleError}
                  errorMessage="This field can not be empty"
                />
              </View>
              <View className="mb-5">
                <RenderTextInput
                  isMultiline={false}
                  title="Company *"
                  value={company}
                  setValue={setCompany}
                  placeholder="Ex: Amazon"
                  isError={companyError}
                  setIsError={setCompanyError}
                  errorMessage="This field can not be empty"
                />
              </View>
              <View className="mb-5">
                <RenderTextInput
                  isMultiline={false}
                  title="Location *"
                  value={location}
                  setValue={setLocation}
                  placeholder="Ex: Beirut"
                  isError={locationError}
                  setIsError={setLocationError}
                  errorMessage="This field can not be empty"
                />
              </View>
              <View className="mb-5">
                <RenderTextInput
                  isMultiline={false}
                  title="Country *"
                  value={country}
                  setValue={setCountry}
                  placeholder="Ex: Lebanon"
                  isError={countryError}
                  setIsError={setCountryError}
                  errorMessage="This field can not be empty"
                />
              </View>

              <View className="mb-5">
                <Text className="text-[20px] font-garamond mb-2">Start Date</Text>

                <View className="flex flex-row justify-between items-center w-full">
                  <View className=" w-[48%] ">
                    <SingleSelectorModal data={months} value={startMonth} setValue={setStartMonth} />
                  </View>

                  <View className="w-[48%]">
                    <SingleSelectorModal data={years} value={startYear} setValue={setStartYear} />
                  </View>
                </View>
              </View>

              <View className="mb-5">
                <Text className="text-[20px] font-garamond mb-2">End Date</Text>
                <View className="flex flex-row justify-between items-center w-full">
                  <View className=" w-[48%] ">
                    <SingleSelectorModal data={months} value={endMonth} setValue={setEndMonth} />
                  </View>

                  <View className="w-[48%]">
                    <SingleSelectorModal data={years} value={endYear} setValue={setEndYear} />
                  </View>
                </View>
              </View>

              <View className="mb-5">
                <RenderTextInput isMultiline={true} title="Description" value={description} setValue={setDescription} placeholder="Ex: I count money" />
              </View>

              <View className="w-full flex justify-center items-end mb-8">
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
