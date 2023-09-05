import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { MotiView, MotiText, useDynamicAnimation } from "moti";

import { signup } from "../redux/User";

const Choose = ({ navigation }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);

  const [type, setType] = useState(null);
  const [error, setError] = useState(false);

  const JobCardBackgroundAnimaition = useDynamicAnimation(() => {
    return {
      backgroundColor: "white",
      borderColor: "black",
    };
  });

  const JobTextBackgroundAnimaition = useDynamicAnimation(() => {
    return {
      color: "black",
    };
  });

  const animateJobCardBackground = () => {
    if (type === "employee") {
      JobCardBackgroundAnimaition.animateTo(() => ({
        backgroundColor: "#FE6F07",
        borderColor: "#FE6F07",
      }));

      JobTextBackgroundAnimaition.animateTo(() => ({
        color: "white",
      }));
    } else {
      JobCardBackgroundAnimaition.animateTo(() => ({
        backgroundColor: "white",
        borderColor: "black",
      }));

      JobTextBackgroundAnimaition.animateTo(() => ({
        color: "black",
      }));
    }
  };

  const ClientCardBackgroundAnimaition = useDynamicAnimation(() => {
    return {
      backgroundColor: "white",
      borderColor: "black",
    };
  });

  const ClientTextBackgroundAnimaition = useDynamicAnimation(() => {
    return {
      color: "black",
    };
  });

  const animateClientCardBackground = () => {
    if (type === "employer") {
      ClientCardBackgroundAnimaition.animateTo(() => ({
        backgroundColor: "#FE6F07",
        borderColor: "#FE6F07",
      }));

      ClientTextBackgroundAnimaition.animateTo(() => ({
        color: "white",
      }));
    } else {
      ClientCardBackgroundAnimaition.animateTo(() => ({
        backgroundColor: "white",
        borderColor: "black",
      }));

      ClientTextBackgroundAnimaition.animateTo(() => ({
        color: "black",
      }));
    }
  };

  useEffect(() => {
    animateClientCardBackground();
    animateJobCardBackground();

    setError(false);
  }, [type]);

  return (
    <View className="bg-white flex-1 items-center">
      <View className="my-5 flex justify-center items-center">
        <Text className={`font-garamond text-sm text-red-500 ${!error && "hidden"}`}>You need to choose an account type</Text>
        <Text className=" text-[40px] font-garamond ">I am looking for...</Text>
      </View>

      <MotiView state={JobCardBackgroundAnimaition} className="mb-10 w-[85%] h-[33%]">
        <View className={`w-full h-full border-[1px] rounded-lg ${error && "border-red-500"}`}>
          <View className={`absolute right-0 top-0 mr-2 mt-2 ${type === "employee" ? "bg-[#ffffffb5]" : "bg-white"} border-2 rounded-full p-[6px]`}>
            <LinearGradient colors={["white", type === "employee" ? "#FE6F07" : "rgba(0,0,0,0.4)"]} start={{ x: 0, y: 0.4 }} className="p-[8px] rounded-full" />
          </View>

          <TouchableOpacity
            onPress={() => {
              setType("employee");
            }}
            className="w-full h-full flex justify-center items-center"
          >
            <MotiText state={JobTextBackgroundAnimaition} className=" font-garamond text-[40px]">
              A Job
            </MotiText>
          </TouchableOpacity>
        </View>
      </MotiView>

      <MotiView state={ClientCardBackgroundAnimaition} className="mb-10 w-[85%] h-[33%]">
        <View className={`w-full h-full border-[1px] rounded-lg ${error && "border-red-500"}`}>
          <View className={`absolute right-0 top-0 mr-2 mt-2 ${type === "employer" ? "bg-[#ffffffb5]" : "bg-white"} border-2 rounded-full p-[6px]`}>
            <LinearGradient colors={["white", type === "employer" ? "#FE6F07" : "rgba(0,0,0,0.4)"]} start={{ x: 0, y: 0.4 }} className="p-[8px] rounded-full" />
          </View>
          <TouchableOpacity
            onPress={() => {
              setType("employer");
            }}
            className="w-full h-full flex justify-center items-center"
          >
            <MotiText state={ClientTextBackgroundAnimaition} className=" font-garamond text-[40px]">
              An Employee
            </MotiText>
          </TouchableOpacity>
        </View>
      </MotiView>

      <TouchableOpacity
        onPress={() => {
          type ? signup({ ...userInfo, type: type }, navigation, dispatch) : setError(true);
        }}
        className="absolute bottom-0 right-0 mb-3 mr-3 bg-[#FE6F07] rounded-xl px-10 py-2"
      >
        <Text className="text-lg font-garamond text-white">Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Choose;
