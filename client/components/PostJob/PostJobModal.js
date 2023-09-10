import React, { useState, memo } from "react";
import { View, TouchableOpacity, Text, ScrollView, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import Modal from "react-native-modal";

import RenderTextInput from "../RenderTextInput";

import pen from "../../assets/images/pen.png";
import trash from "../../assets/images/trash.png";
import check from "../../assets/images/checkWhite.png";

import SingleSelectorModal from "../SingleSelectorModal";
import SkillModal from "./SkillModal";

import { deletePost, createJobPost, updateJobPost } from "../../redux/User";
import { fetchEmployeesByJobId } from "../../redux/User";

const PostJobModal = ({ isBottomSheetVisible, setBottomSheetVisible, navigation }) => {
  const dispatch = useDispatch();
  const employerID = useSelector((state) => state?.user.userInfo)?._id;
  const jobs = useSelector((state) => state.user.jobPosts);

  const [id, setId] = useState(null);

  const [jobTitle, setJobTitle] = useState("Software Engineer");
  const [company, setCompany] = useState("TechCo");
  const [location, setLocation] = useState("San Francisco");
  const [country, setCountry] = useState("United States");
  const [category, setCategory] = useState("Information Technology");
  const [skills, setSkills] = useState(["JavaScript", "React", "Node.js"]);
  const [experienceRequired, setExperienceRequired] = useState("3-4 years");
  const [jobType, setJobType] = useState("Full-Time");
  const [description, setDescription] = useState("We are looking for a skilled Software Engineer to join our dynamic team...");

  const [date, setDate] = useState(new Date());

  const [jobTitleError, setJobTitleError] = useState(false);
  const [companyError, setCompanyError] = useState(false);
  const [locationError, setLocationError] = useState(false);
  const [countryError, setCountryError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  const closeModal = () => {
    setBottomSheetVisible(false);
    setIsEditing(false);

    setJobTitle("");
    setCompany("");
    setLocation("");
    setCountry("");
    setCategory("");
    setSkills([]);
    setExperienceRequired("");
    setJobType("");
    setDescription("");
    setDate(null);
  };

  const saveWorkExperience = () => {
    let error = false;

    if (jobTitle.trim() === "") {
      setJobTitleError(true);
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
    if (category.trim() === "") {
      setCategoryError(true);
      error = true;
    }

    if (!error) {
      isEditing
        ? updateJobPost(
            {
              jobTitle,
              company,
              location,
              country,
              category,
              skills,
              experienceRequired,
              jobType,
              description,
              date: new Date(),
              employer_id: employerID,
              _id: id,
            },
            dispatch
          )
        : createJobPost(
            {
              jobTitle,
              company,
              location,
              country,
              category,
              skills,
              experienceRequired,
              jobType,
              description,
              date: new Date(),
              employer_id: employerID,
            },
            dispatch
          );

      closeModal();
    }
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

  const CheckMarkForm = ({ value, setValue, conditional }) => {
    return (
      <View className="flex flex-row  items-center mb-4">
        <TouchableOpacity
          onPress={() => {
            setValue(conditional);
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

          setJobTitle(jobs[index].jobTitle);
          setCompany(jobs[index].company);
          setLocation(jobs[index].location);
          setCountry(jobs[index].country);
          setCategory(jobs[index].category);
          setSkills(jobs[index].skills);
          setExperienceRequired(jobs[index].experienceRequired);
          setJobType(jobs[index].jobType);
          setDescription(jobs[index].description);
          setDate(jobs[index].date);

          setId(jobs[index]._id);

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
          deletePost(jobs[index]._id, dispatch);
        }}
        className="border-[1px] border-gray-400 rounded-full p-[6px]"
      >
        <Image source={trash} className="w-5 h-5 aspect-square" />
      </TouchableOpacity>
    );
  };
  return (
    <View className="flex-1 w-[90%]">
      <View className={`flex-1 justify-center items-center ${jobs?.length > 0 && "hidden"}`}>
        <Text className="font-garamond mb-5 text-lg opacity-60">You Have Not Posted Any Job Yet.</Text>
      </View>
      <View>
        {jobs?.length > 0 &&
          jobs?.map((job, index) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("UserJobPostDetails", { itemId: job?._id });
                fetchEmployeesByJobId(job?._id, dispatch);
              }}
              key={index}
              className="flex justify-center w-full border-[1px] rounded-2xl p-5 mb-4 h-64"
            >
              <View className="flex flex-row justify-between items-center">
                <Text className=" font-garamond text-3xl">{job?.jobTitle}</Text>

                <View className="flex flex-row justify-end items-center">
                  {<EditBtn index={index} />}
                  {<DelteBtn index={index} />}
                </View>
              </View>

              <Text className=" font-garamond text-[12px] opacity-50 mb-5">{moment(job?.date).fromNow()}</Text>

              <View className="mb-3 flex flex-row justify-between">
                <Text className=" font-garamond text-[15px] ">{job?.country}</Text>
                <Text className=" font-garamond text-[15px] ">{job?.location}</Text>
              </View>

              <View className="mb-3 flex flex-row justify-between">
                <Text className=" font-garamond text-[15px] ">{job?.experienceRequired}</Text>
                <Text className=" font-garamond text-[15px] ">{job?.jobType}</Text>
              </View>

              <Text className=" font-garamond text-[15px] opacity-50 leading-6">{job?.description?.substring(0, 200)}</Text>
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
                <RenderTextInput
                  isMultiline={false}
                  title="Job Title *"
                  value={jobTitle}
                  setValue={setJobTitle}
                  placeholder="Ex: Accountant"
                  isError={jobTitleError}
                  setIsError={setJobTitleError}
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
                  setIsError={setCategoryError}
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
                <SingleSelectorModal
                  title="Category *"
                  data={categories}
                  value={category}
                  setValue={setCategory}
                  isError={categoryError}
                  setIsError={setCategoryError}
                  errorMessage="This field can not be empty"
                />
              </View>

              <View className="mb-5">
                <Text className="text-[20px] font-garamond mb-2">Skills</Text>

                <SkillModal value={skills} setValue={setSkills} />
              </View>

              <View className="mb-5">
                <Text className="text-[20px] font-garamond mb-2">Job Experience</Text>

                <View>
                  {<CheckMarkForm value={experienceRequired} setValue={setExperienceRequired} conditional="No Experience" />}

                  {<CheckMarkForm value={experienceRequired} setValue={setExperienceRequired} conditional="1-2 years" />}

                  {<CheckMarkForm value={experienceRequired} setValue={setExperienceRequired} conditional="3-4 years" />}

                  {<CheckMarkForm value={experienceRequired} setValue={setExperienceRequired} conditional="5+ years" />}
                </View>
              </View>

              <View className="mb-5">
                <Text className="text-[20px] font-garamond mb-2">Job Type</Text>

                <View>
                  {<CheckMarkForm value={jobType} setValue={setJobType} conditional="Full-Time" />}

                  {<CheckMarkForm value={jobType} setValue={setJobType} conditional="Part-Time" />}

                  {<CheckMarkForm value={jobType} setValue={setJobType} conditional="Contract" />}
                </View>
              </View>

              <View className="mb-5">
                <RenderTextInput isMultiline={true} title="Description" value={description} setValue={setDescription} placeholder="Ex: I count money" />
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
