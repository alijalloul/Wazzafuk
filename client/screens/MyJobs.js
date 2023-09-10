import React, { memo, useState } from "react";
import { View, TouchableOpacity, Text, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { editUser } from "../redux/User";

import PostJobModal from "../components/PostJob/PostJobModal";
import Pagination from "../components/Pagination";
import EmployeeJobs from "../components/EmployeeJobs";

const MyJobs = ({ navigation }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.userInfo);
  const page = useSelector((state) => state.user.currentPage);
  const numberOfPages = useSelector((state) => state.user.numberOfPages);

  const EmployerMyJobs = () => {
    const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

    return (
      <View className="flex-1 flex justify-center items-center">
        <PostJobModal isBottomSheetVisible={isBottomSheetVisible} setBottomSheetVisible={setBottomSheetVisible} navigation={navigation} />

        <Pagination fetchType="postsById" userId={user?._id} page={page} numberOfPages={numberOfPages} />

        <TouchableOpacity
          onPress={() => {
            setBottomSheetVisible(true);
          }}
          className={`${user?.type === "employee" ? "hidden" : "self-end w-32 h-12 flex justify-center items-center mr-3 mb-3 bg-[#FE6F07] rounded-xl"}`}
        >
          <Text className="text-lg font-garamond text-white">Post Job</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const EmployeeMyJobs = () => {
    return (
      <View className="flex-1 flex justify-center items-center">
        <EmployeeJobs navigation={navigation} />

        <Pagination fetchType="postsByEmployeeId" userId={user?._id} page={page} numberOfPages={numberOfPages} />
      </View>
    );
  };

  return (
    <ScrollView className="bg-white" contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center" }}>
      {user?.type === "employee" ? <EmployeeMyJobs /> : <EmployerMyJobs />}
    </ScrollView>
  );
};

export default memo(MyJobs);
