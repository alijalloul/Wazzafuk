import React from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

const UserJobPostDetails = ({ route, navigation }) => {
  const baseURL = "http://192.168.1.10:5000";

  const { itemId } = route.params;

  const employees = useSelector((state) => state.user.employeesByJobId);
  const post = useSelector((state) => state.user.jobPosts).filter((item) => item._id === itemId && item)[0];

  return (
    <ScrollView className=" bg-white" contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center" }}>
      <View className=" w-full items-center mb-10">
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

        <View className="w-full flex justify-center items-center py-6 border-y-[1px] ">
          <View className="w-[90%]">
            <Text className=" font-garamond text-lg">Skills</Text>
            <View className="flex flex-row flex-wrap">
              {post?.skills.length > 0 &&
                post?.skills.map((skill, index) => (
                  <View className="inline-block px-2 py-2 rounded-2xl mr-2 mb-2 bg-[#ff8d3c]" key={index.toString()}>
                    <Text className="text-white">{skill}</Text>
                  </View>
                ))}
            </View>
          </View>
        </View>
      </View>

      <View className="flex-1 w-full items-center">
        {employees?.length > 0 ? (
          employees.map((employee, index) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("userDetails", { userId: employee._id });
              }}
              key={index}
              className="w-[90%] px-4 flex-1 flex-row justify-between items-center rounded-md border-2 h-32 mb-3"
            >
              <View className="bg-gray-300 rounded-full p-10 mr-2"></View>

              <View className="flex-1">
                <View className="mb-5">
                  <Text className=" font-garamond text-lg ">{employee.name}</Text>
                  <Text className=" font-garamond opacity-50 text-sm">posted 3hr ago</Text>
                </View>

                <Text className=" font-garamond">{employee.coverLetter || "fds hflkdshfjlkds jhfkjd dfdsf hfoiewjflk"}</Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text>No one has applied yet. Refresh the page in order to update the lise.</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default UserJobPostDetails;
