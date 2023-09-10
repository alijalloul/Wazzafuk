import { Text, TouchableOpacity, ScrollView, TextInput, View, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { memo, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import search from "../assets/images/search.png";

import Pagination from "../components/Pagination";
import JobPosts from "../components/JobPosts";

const Home = ({ navigation }) => {
  const user = useSelector((state) => state.user.userInfo);
  const page = useSelector((state) => state.jobPosts.page);
  const numberOfPages = useSelector((state) => state.jobPosts.numberOfPages);

  useEffect(() => {
    const setItem = async () => {
      try {
        await AsyncStorage.setItem("screenName", "HomeTabs");
      } catch (error) {
        console.log("async set screenName to hometabs error: ", error);
      }
    };

    setItem();
  }, []);

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 items-center mb-8">
        <View className="w-[90%]">
          <View className="mb-5">
            <Text className="font-garamond text-xl text-gray-500">Hello {user?.name?.split(" ")[0]},</Text>
            <Text className={`font-garamond-bold text-2xl ${user?.type === "employer" && "hidden"}`}>Find your perfect job</Text>
          </View>

          <View className="">
            <View className="flex flex-row mb-4">
              <TextInput value="" onChange={() => {}} placeholder="Find your job" className="w-[85%] rounded-xl bg-gray-100 mr-2 pl-4" />

              <TouchableOpacity onPress={() => {}} className="w-[15%] p-2 aspect-square rounded-xl bg-orange-400">
                <Image source={search} resizeMode="contain" className="w-full h-full" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <JobPosts navigation={navigation} />

        <Pagination fetchType="posts" page={page} numberOfPages={numberOfPages} />
      </View>
    </ScrollView>
  );
};

export default memo(Home);
