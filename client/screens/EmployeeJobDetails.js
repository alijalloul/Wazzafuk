import React, { useState } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { useSelector } from "react-redux";

import RenderTextInput from "../components/RenderTextInput";

const EmployeeJobDetails = ({ route, navigation }) => {
  const baseURL = "http://192.168.1.10:5000";

  const { jobId, employerId } = route.params;

  const post = useSelector((state) => state.jobPosts.postsInfo).filter((item) => item._id === jobId && item)[0];
  const job_id = jobId;
  const employee_id = useSelector((state) => state.user.userInfo)?._id;
  const employer_id = employerId;
  const status = "pending";
  const category = post?.category || "";

  const [coverLetter, setCoverLetter] = useState("");

  const handleApply = async () => {
    try {
      await fetch(`${baseURL}/application`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ job_id, employee_id, employer_id, status, category, coverLetter }),
      });

      navigation.navigate("HomeTabs");
    } catch (error) {
      console.log("error message: ", error);
    }
  };

  return (
    <ScrollView className=" bg-white" contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center" }}>
      <View className="flex-1 w-full items-center">
        <View className=" w-[90%] mb-8 ">
          <View className="mb-8">
            <Text className=" font-garamond-semibold text-4xl">{post?.jobTitle}</Text>
            <Text className=" font-garamond text-[15px] opacity-50">posted 2 hourse ago</Text>
          </View>

          <View className="flex flex-row justify-between items-center mb-8">
            <Text className=" font-garamond text-lg">
              {post?.location}-{post?.country}
            </Text>
            <Text className=" font-garamond text-lg">{post?.experienceRequired}</Text>
          </View>

          <Text className=" font-garamond text-lg">{post?.description}</Text>
        </View>

        <View className="w-full flex justify-between items-center py-6 border-t-[1px]">
          <View className="w-[90%] flex flex-row justify-between items-center">
            <Text className=" font-garamond text-lg">Job Type</Text>
            <Text className=" font-garamond text-lg">{post?.type}</Text>
          </View>
        </View>

        <View className="w-full flex justify-between items-center py-6 border-t-[1px]">
          <View className="w-[90%] flex flex-row justify-between items-center">
            <Text className=" font-garamond text-lg">Category</Text>
            <Text className=" font-garamond text-lg">{post?.category}</Text>
          </View>
        </View>

        <View className="w-full flex justify-center items-center py-6 border-y-[1px] mb-5">
          <View className="w-[90%]">
            <Text className=" font-garamond text-lg">Skills</Text>
            <View className="flex flex-row flex-wrap">
              {post?.skills?.length > 0 &&
                post?.skills?.map((skill, index) => (
                  <View className="inline-block px-2 py-2 rounded-2xl mr-2 mb-2 bg-[#ff8d3c]" key={index.toString()}>
                    <Text className="text-white">{skill}</Text>
                  </View>
                ))}
            </View>
          </View>
        </View>

        <View className="flex justify-center w-[90%]">
          <Text className="text-2xl font-garamond mb-2">Cover Letter</Text>

          <Text className=" font-garamond ">{post?.coverLetter}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default EmployeeJobDetails;
