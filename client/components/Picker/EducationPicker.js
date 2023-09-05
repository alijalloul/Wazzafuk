import React, { memo, useState } from "react";
import { View, Image, Text, TouchableOpacity, ScrollView } from "react-native";
import Modal from "react-native-modal";

import pen from "../../assets/images/pen.png";
import trash from "../../assets/images/trash.png";

import RenderTextInput from "../RenderTextInput";
import SingleSelectorModal from "../SingleSelectorModal";

const EducationPicker = ({ headerText, headerSize, education, setEducation }) => {
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [degree, setDegree] = useState("");
  const [major, setMajor] = useState("");
  const [school, setSchool] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [note, setNote] = useState("");

  const [isDegreeError, setIsDegreeError] = useState(false);
  const [isMajorError, setIsMajorError] = useState(false);
  const [isSchoolError, setIsSchoolError] = useState(false);
  const [isStartYearError, setIsStartYearError] = useState(false);
  const [isEndYearError, setIsEndYearError] = useState(false);
  const [isNoteError, setIsNoteError] = useState(false);

  const [educationIndex, setEducationIndex] = useState(null);

  const closeModal = () => {
    setBottomSheetVisible(false);
    setIsEditing(false);

    if (isEditing) {
      setDegree("");
      setMajor("");
      setSchool("");
      setStartYear("");
      setEndYear("");
      setNote("");
    }
  };

  const saveEducation = () => {
    const updatedEducation =
      educationIndex !== null
        ? education.map((item, index) =>
            index === educationIndex
              ? {
                  degree,
                  major,
                  school,
                  startYear,
                  endYear,
                  note,
                }
              : item
          )
        : [
            ...education,
            {
              degree,
              major,
              school,
              startYear,
              endYear,
              note,
            },
          ];

    setEducation(updatedEducation);
    closeModal();
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEducationIndex(index);

    setDegree(education[index].degree);
    setMajor(education[index].major);
    setSchool(education[index].school);
    setStartYear(education[index].startYear);
    setEndYear(education[index].endYear);
    setNote(education[index].note);

    setBottomSheetVisible(true);
  };

  const degrees = ["Bachelor of Science (BS)", "Master of Science (MS)", "Doctor of Philosophy (PHD)", "Baccalauréat technologique (BT3)", "High School Diploma"];

  const majors = [
    "Computer Science",
    "Mechanical Engineering",
    "Psychology",
    "Biology",
    "Business Administration",
    "Economics",
    "English Literature",
    "History",
    "Chemistry",
    "Mathematics",
    "Political Science",
    "Sociology",
    "Physics",
    "Art and Design",
    "Environmental Science",
    "Nursing",
    "Marketing",
    "Accounting",
    "Civil Engineering",
    "Architecture",
    "Music",
    "Education",
    "Communications",
    "Graphic Design",
    "Philosophy",
  ];

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
          {education.length > 0 &&
            education.map((educ, index) => (
              <View key={index} className="relative w-full border-[1px] rounded-2xl p-5 pt-3 pr-3 mb-4">
                <View className="flex flex-row w-full justify-end items-center">
                  <TouchableOpacity
                    onPress={() => {
                      handleEdit();
                    }}
                    className="border-[1px] border-gray-400 rounded-full p-[6px] mr-2"
                  >
                    <Image source={pen} className="w-5 h-5 aspect-square" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      setEducation(education.filter((item, index2) => index2 !== index));
                    }}
                    className="border-[1px] border-gray-400 rounded-full p-[6px]"
                  >
                    <Image source={trash} className="w-5 h-5 aspect-square" />
                  </TouchableOpacity>
                </View>
                <Text className=" font-garamond text-3xl">
                  {educ.degree} {educ.major ? "in" : "from"}
                </Text>
                {educ.major && <Text className=" font-garamond text-[15px]">{educ.major} from</Text>}
                <Text className=" font-garamond text-lg">{educ.school}</Text>
                <Text className=" font-garamond text-[15px] opacity-70 mb-3">
                  {educ.startYear} -{educ.endYear}
                </Text>
                <Text className=" font-garamond text-lg opacity-70">{education.note}</Text>
              </View>
            ))}
        </View>

        <TouchableOpacity
          onPress={() => {
            setBottomSheetVisible(true);
          }}
          className="bg-white border-[1px] border-[#FE6F07] w-full py-3 rounded-3xl flex justify-center items-center mb-5"
        >
          <Text className="text-[#FE6F07] font-garamond-bold text-xl">+ Add education</Text>
        </TouchableOpacity>
      </View>

      <Modal isVisible={isBottomSheetVisible} animationInTiming={700} className=" m-0 mt-10">
        <View className="flex-1 justify-center bg-white rounded-t-xl">
          <View className={`w-full flex flex-row px-5 justify-between items-center ${isBottomSheetVisible && "border-b-[1px]"}`}>
            <Text className=" text-3xl font-garamond">{isEditing ? "Edit" : "Add Education"}</Text>

            <TouchableOpacity
              onPress={() => {
                closeModal();
              }}
            >
              <Text className=" text-5xl font-garamond-bold">×</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            contentContainerStyle={{
              flexGrow: 0,
              alignItems: "center",
              justifyContent: "center",
            }}
            className="mt-10"
          >
            <View className="w-[90%]">
              <View className="mb-5">
                <Text className="text-[20px] font-garamond mb-2">Degree *</Text>
                <SingleSelectorModal data={degrees} value={degree} setValue={setDegree} />
              </View>

              <View className="mb-5">
                <Text className="text-[20px] font-garamond mb-2">Major *</Text>
                <SingleSelectorModal data={majors} value={major} setValue={setMajor} />
              </View>

              <View className="mb-5">
                <RenderTextInput
                  isMultiline={false}
                  title="School *"
                  value={school}
                  handleChange={setSchool}
                  placeholder="Ex: LU"
                  error={isSchoolError}
                  setIsError={setIsSchoolError}
                  errorMessage="This field can not be empty"
                />
              </View>

              <View className="mb-5">
                <Text className="text-[20px] font-garamond mb-2">Duration *</Text>
                <View className="flex flex-row justify-between items-center">
                  <View className="w-[45%]">
                    <SingleSelectorModal data={years} value={startYear} setValue={setStartYear} />
                  </View>

                  <View className="w-[45%]">
                    <SingleSelectorModal data={years} value={endYear} setValue={setEndYear} />
                  </View>
                </View>
              </View>

              <View className="mb-5">
                <RenderTextInput
                  isMultiline={true}
                  title="Add Note"
                  value={note}
                  handleChange={setNote}
                  placeholder="Ex: Minor in cyber security"
                  error={isNoteError}
                  setIsError={setIsNoteError}
                  errorMessage="This field can not be empty"
                />
              </View>

              <View className="w-full flex justify-center items-end mb-4">
                <TouchableOpacity
                  onPress={() => {
                    saveEducation();
                  }}
                  className="w-32 bottom-0 right-0 bg-[#FE6F07] rounded-xl px-10 py-2"
                >
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

export default memo(EducationPicker);
