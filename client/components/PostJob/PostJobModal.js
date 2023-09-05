import React, { useState, memo } from "react";
import { View, TouchableOpacity, Text, ScrollView, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Modal from "react-native-modal";

import RenderTextInput from "../RenderTextInput";

import pen from "../../assets/images/pen.png";
import trash from "../../assets/images/trash.png";
import check from "../../assets/images/checkWhite.png";

import SingleSelectorModal from "../SingleSelectorModal";
import SkillModal from "./SkillModal";

import { deletePost, createJobPost } from "../../redux/User";
import { fetchEmployeesByJobId } from "../../redux/User";

const PostJobModal = ({ isBottomSheetVisible, setBottomSheetVisible, navigation }) => {
  const dispatch = useDispatch();
  const employerID = useSelector((state) => state?.user.userInfo)?._id;
  const jobs = useSelector((state) => state.user.jobPosts);

  const [formData, setFormData] = useState({
    jobTitle: "",
    company: "",
    location: "",
    country: "",
    category: "",
    skills: [],
    experienceRequired: "",
    jobType: "",
    description: "",
    date: "posted 3 days ago",
  });

  const [isEditing, setIsEditing] = useState(false);

  const [workIndex, setWorkIndex] = useState(null);

  const closeModal = () => {
    setBottomSheetVisible(false);
    setIsEditing(false);

    setFormData({
      jobTitle: "",
      company: "",
      location: "",
      country: "",
      category: "",
      skills: [],
      experienceRequired: "",
      jobType: "",
      description: "",
      date: "posted 3 days ago",
    });
  };

  const saveWorkExperience = () => {
    const updatedWorkExperience = workIndex !== null ? jobs.map((job, index) => (index === workIndex ? formData : job)) : [...jobs, formData];

    createJobPost({ ...formData, employer_id: employerID }, dispatch);
    closeModal();
  };

  const handleChange = (fieldName, text) => {
    setFormData((prevData) => ({ ...prevData, [fieldName]: text }));
  };

  const categories = [
    "Technology",
    "Healthcare",
    "Finance",
    "Education",
    "Marketing",
    "Sales",
    "Design",
    "Engineering",
    "Customer Service",
    "Human Resources",
    "Administrative",
    "Legal",
    "Writing",
    "Art",
    "Entertainment",
    "Science",
    "Retail",
    "Food Service",
    "Construction",
    "Transportation",
    "Social Services",
    "Manufacturing",
    "Media",
    "Research",
    "Architecture",
    "Environmental",
    "Hospitality",
    "Real Estate",
    "Agriculture",
    "Fitness",
    "Fashion",
    "Automotive",
    "Other",
  ];

  const CheckMarkForm = ({ value, setValue, fieldName, conditional }) => {
    return (
      <View className="flex flex-row  items-center mb-4">
        <TouchableOpacity
          onPress={() => {
            setValue((prevData) => ({ ...prevData, [fieldName]: conditional }));
          }}
          className={`h-8 w-8 p-2 rounded-lg mr-3 ${value === conditional ? "bg-[#FE6F07]" : "bg-white border-[1px]"}`}
        >
          {value === conditional && <Image source={check} className="w-full h-full" />}
        </TouchableOpacity>

        <Text className="text-lg font-garamond ">{conditional}</Text>
      </View>
    );
  };

  const EditBtn = ({ index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setIsEditing(true);
          setWorkIndex(index);
          setFormData(jobs[index]);
          setBottomSheetVisible(true);
        }}
        className="border-[1px] border-gray-400 rounded-full p-[6px] mr-2"
      >
        <Image source={pen} className="w-5 h-5 aspect-square" />
      </TouchableOpacity>
    );
  };

  const DelteBtn = ({ index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          deletePost(jobs._id, dispatch);
        }}
        className="border-[1px] border-gray-400 rounded-full p-[6px]"
      >
        <Image source={trash} className="w-5 h-5 aspect-square" />
      </TouchableOpacity>
    );
  };
  return (
    <View className="flex-1 w-[90%]">
      <View className={`flex-1 justify-center items-center ${jobs.length > 0 && "hidden"}`}>
        <Text className="font-garamond mb-5 text-lg opacity-60">You Have Not Posted Any Job Yet.</Text>
      </View>
      <View>
        {jobs.length > 0 &&
          jobs.map((job, index) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("UserJobPostDetails", { itemId: job._id });
                fetchEmployeesByJobId(job._id, dispatch);
              }}
              key={index}
              className="flex justify-center w-full border-[1px] rounded-2xl p-5 mb-4"
            >
              <View className="flex flex-row justify-between items-center">
                <Text className=" font-garamond text-3xl">{job.jobTitle}</Text>

                <View className="flex flex-row justify-end items-center">
                  {<EditBtn index={index} />}
                  {<DelteBtn index={index} />}
                </View>
              </View>

              <Text className=" font-garamond text-[12px] opacity-50 mb-5">{job.date}</Text>

              <View className="mb-3 flex flex-row justify-between">
                <Text className=" font-garamond text-[15px] ">{job.country}</Text>
                <Text className=" font-garamond text-[15px] ">{job.location}</Text>
              </View>

              <View className="mb-3 flex flex-row justify-between">
                <Text className=" font-garamond text-[15px] ">{job.experienceRequired}</Text>
                <Text className=" font-garamond text-[15px] ">{job.jobType}</Text>
              </View>

              <Text className=" font-garamond text-[15px] opacity-50 leading-6">{job.description.substring(0, 200)}</Text>
            </TouchableOpacity>
          ))}
      </View>

      <Modal isVisible={isBottomSheetVisible} animationInTiming={700} className=" m-0 mt-10 rounded-t-xl">
        <View className="flex-1 justify-center bg-white">
          <View className={`mb-5 w-full flex flex-row px-5 justify-between items-center ${isBottomSheetVisible && "border-b-[1px]"}`}>
            <Text className=" text-3xl font-garamond">{isEditing ? "Edit" : "Post a Job"}</Text>

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
                <RenderTextInput isForm={true} isMultiline={false} title="Job Title *" value={formData.jobTitle} handleChange={handleChange} placeholder="Ex: Accountant" fieldName="jobTitle" />
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
                <Text className="text-[20px] font-garamond mb-2">Category *</Text>

                <SingleSelectorModal isForm={true} data={categories} value={formData.category} setValue={setFormData} fieldName="category" />
              </View>

              <View className="mb-5">
                <Text className="text-[20px] font-garamond mb-2">Skills *</Text>

                <SkillModal value={formData.skills} setValue={setFormData} />
              </View>

              <View className="mb-5">
                <Text className="text-[20px] font-garamond mb-2">Job Experience</Text>

                <View>
                  {<CheckMarkForm value={formData.experienceRequired} setValue={setFormData} fieldName="experienceRequired" conditional="No Experience" />}

                  {<CheckMarkForm value={formData.experienceRequired} setValue={setFormData} fieldName="experienceRequired" conditional="1-2 years" />}

                  {<CheckMarkForm value={formData.experienceRequired} setValue={setFormData} fieldName="experienceRequired" conditional="3-4 years" />}

                  {<CheckMarkForm value={formData.experienceRequired} setValue={setFormData} fieldName="experienceRequired" conditional="5+ years" />}
                </View>
              </View>

              <View className="mb-5">
                <Text className="text-[20px] font-garamond mb-2">Job Type</Text>

                <View>
                  {<CheckMarkForm value={formData.jobType} setValue={setFormData} fieldName="jobType" conditional="Full-Time" />}

                  {<CheckMarkForm value={formData.jobType} setValue={setFormData} fieldName="jobType" conditional="Part-Time" />}

                  {<CheckMarkForm value={formData.jobType} setValue={setFormData} fieldName="jobType" conditional="Contract" />}
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

              <View className="w-full flex justify-center items-end mb-8">
                <TouchableOpacity onPress={() => saveWorkExperience()} className="w-32 bottom-0 right-0 bg-[#FE6F07] rounded-xl px-10 py-2">
                  <Text className="text-lg fontW-garamond text-white">{isEditing ? "Edit" : "Post"}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default memo(PostJobModal);
