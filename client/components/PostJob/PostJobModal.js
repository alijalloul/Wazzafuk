import React, { useState, memo } from "react";
import { View, TouchableOpacity, Text, ScrollView, Image, I18nManager } from "react-native";
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

const translateText = (text, arabicText) => {
  return I18nManager.isRTL ? arabicText : text;
};

const PostJobModal = ({ isBottomSheetVisible, setBottomSheetVisible, navigation, jobsStatus }) => {
  const dispatch = useDispatch();
  const employerID = useSelector((state) => state?.user.userInfo)?._id;
  const jobs = useSelector((state) => state.user.jobPosts)?.filter((job) => job.status === jobsStatus);

  const [id, setId] = useState(null);

  const [jobTitle, setJobTitle] = useState(translateText("Software Engineer", "مهندس البرمجيات"));
  const [company, setCompany] = useState(translateText("TechCo", "شركة تكنولوجيا"));
  const [location, setLocation] = useState(translateText("San Francisco", "سان فرانسيسكو"));
  const [country, setCountry] = useState(translateText("United States", "الولايات المتحدة"));
  const [category, setCategory] = useState(translateText("Information Technology", "تكنولوجيا المعلومات"));
  const [skills, setSkills] = useState(["JavaScript", "React", "Node.js"]);
  const [experienceRequired, setExperienceRequired] = useState(translateText("3-4 years", "3-4 سنوات"));
  const [jobType, setJobType] = useState(translateText("Full-Time", "دوام كامل"));
  const [description, setDescription] = useState(
    translateText("We are looking for a skilled Software Engineer to join our dynamic team...", "نبحث عن مهندس برمجيات ماهر للانضمام إلى فريقنا الديناميكي...")
  );

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
              status: "pending",
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
              status: "pending",
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
        <Text className="font-garamond mb-5 text-lg opacity-60">{translateText("You Have Not Posted Any Job Yet.", "لم تقم بنشر أي وظيفة بعد.")}</Text>
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
                <Text className=" font-garamond text-3xl">{translateText(job?.jobTitle, "عنوان الوظيفة")}</Text>

                <View className="flex flex-row justify-end items-center">
                  {<EditBtn index={index} />}
                  {<DelteBtn index={index} />}
                </View>
              </View>

              <Text className=" font-garamond text-[12px] opacity-50 mb-5">{translateText(job?.description?.substring(0, 200), "نبذة عن الوظيفة...")}</Text>
            </TouchableOpacity>
          ))}
      </View>

      <Modal isVisible={isBottomSheetVisible} animationInTiming={700} className=" m-0 mt-10 rounded-t-xl">
        <View className="flex-1 justify-center bg-white">
          <View className={`mb-5 w-full flex flex-row px-5 justify-between items-center ${isBottomSheetVisible && "border-b-[1px]"}`}>
            <Text className=" text-3xl font-garamond">{isEditing ? translateText("Edit", "تحرير") : translateText("Post a Job", "نشر وظيفة")}</Text>

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
                  title={translateText("Job Title *", "عنوان الوظيفة *")}
                  value={jobTitle}
                  setValue={setJobTitle}
                  placeholder={translateText("Ex: Accountant", "مثال: محاسب")}
                  isError={jobTitleError}
                  setIsError={setJobTitleError}
                  errorMessage={translateText("This field can not be empty", "هذا الحقل لا يمكن أن يكون فارغًا")}
                />
              </View>
              <View className="mb-5">
                <RenderTextInput
                  isMultiline={false}
                  title={translateText("Company *", "الشركة *")}
                  value={company}
                  setValue={setCompany}
                  placeholder={translateText("Ex: Amazon", "مثال: أمازون")}
                  isError={companyError}
                  setIsError={setCategoryError}
                  errorMessage={translateText("This field can not be empty", "هذا الحقل لا يمكن أن يكون فارغًا")}
                />
              </View>
              <View className="mb-5">
                <RenderTextInput
                  isMultiline={false}
                  title={translateText("Location *", "الموقع *")}
                  value={location}
                  setValue={setLocation}
                  placeholder={translateText("Ex: Beirut", "مثال: بيروت")}
                  isError={locationError}
                  setIsError={setLocationError}
                  errorMessage={translateText("This field can not be empty", "هذا الحقل لا يمكن أن يكون فارغًا")}
                />
              </View>
              <View className="mb-5">
                <RenderTextInput
                  isMultiline={false}
                  title={translateText("Country *", "الدولة *")}
                  value={country}
                  setValue={setCountry}
                  placeholder={translateText("Ex: Lebanon", "مثال: لبنان")}
                  isError={countryError}
                  setIsError={setCountryError}
                  errorMessage={translateText("This field can not be empty", "هذا الحقل لا يمكن أن يكون فارغًا")}
                />
              </View>

              <View className="mb-5">
                <SingleSelectorModal
                  title={translateText("Category *", "الفئة *")}
                  data={categories}
                  value={category}
                  setValue={setCategory}
                  isError={categoryError}
                  setIsError={setCategoryError}
                  errorMessage={translateText("This field can not be empty", "هذا الحقل لا يمكن أن يكون فارغًا")}
                />
              </View>

              <View className="mb-5">
                <Text className="text-[20px] font-garamond mb-2">{translateText("Skills", "المهارات")}</Text>

                <SkillModal value={skills} setValue={setSkills} />
              </View>

              <View className="mb-5">
                <Text className="text-[20px] font-garamond mb-2">{translateText("Job Experience", "خبرة الوظيفة")}</Text>

                <View>
                  {<CheckMarkForm value={experienceRequired} setValue={setExperienceRequired} conditional={translateText("No Experience", "لا تجربة")} />}

                  {<CheckMarkForm value={experienceRequired} setValue={setExperienceRequired} conditional={translateText("1-2 years", "1-2 سنوات")} />}

                  {<CheckMarkForm value={experienceRequired} setValue={setExperienceRequired} conditional={translateText("3-4 years", "3-4 سنوات")} />}

                  {<CheckMarkForm value={experienceRequired} setValue={setExperienceRequired} conditional={translateText("5+ years", "5+ سنوات")} />}
                </View>
              </View>

              <View className="mb-5">
                <Text className="text-[20px] font-garamond mb-2">{translateText("Job Type", "نوع الوظيفة")}</Text>

                <View>
                  {<CheckMarkForm value={jobType} setValue={setJobType} conditional={translateText("Full-Time", "دوام كامل")} />}

                  {<CheckMarkForm value={jobType} setValue={setJobType} conditional={translateText("Part-Time", "دوام جزئي")} />}

                  {<CheckMarkForm value={jobType} setValue={setJobType} conditional={translateText("Contract", "عقد")} />}
                </View>
              </View>

              <View className="mb-5">
                <RenderTextInput
                  isMultiline={true}
                  title={translateText("Description", "الوصف")}
                  value={description}
                  setValue={setDescription}
                  placeholder={translateText("Ex: I count money", "مثال: أنا أحسب المال")}
                />
              </View>

              <View className="w-full flex justify-center items-end mb-8">
                <TouchableOpacity onPress={() => saveWorkExperience()} className="w-32 bottom-0 right-0 bg-[#FE6F07] rounded-xl px-10 py-2">
                  <Text className="text-lg fontW-garamond text-white">{isEditing ? translateText("Edit", "تحرير") : translateText("Post", "نشر")}</Text>
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
