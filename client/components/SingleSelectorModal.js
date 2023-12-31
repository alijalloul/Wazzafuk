import React, { memo, useState } from "react";
import { FlatList, I18nManager, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";

import downVector from "../assets/images/downVector.png";
import downVectorRed from "../assets/images/downVectorRed.png";

const SingleSelectorModal = ({ title, data, value, setValue, isError, setIsError, errorMessage }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [search, setSearch] = useState("");

  const renderList = ({ item }) => {
    return (
      <View className="flex flex-row justify-start items-center pb-4 mb-4 border-b-[1px]">
        <TouchableOpacity
          onPress={() => {
            setValue(item);
            isError && setIsError(false);
            setIsVisible(false);
            setSearch("");
          }}
          className="flex justify-start items-start w-full"
        >
          <Text className="font-garamond text-2xl">{item}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const filteredData = data?.filter((item) => item.toLowerCase().includes(search.toLowerCase()));

  return (
    <View className="flex w-full">
      <Text className={`text-[20px] font-garamond mb-2 ${isError && "text-red-500"} ${!title && "hidden"}`}>{title}</Text>

      <View className="w-full">
        <TouchableOpacity
          onPress={() => {
            setIsVisible(true);
          }}
          className={`${isError && "border-red-500"} border-[1px] p-2 w-full rounded-lg flex flex-row justify-between items-center`}
        >
          <Text className={`text-[20px] font-garamond ${isError && "text-red-500"}`}>{value ? value : "_ _ _"}</Text>
          <Image source={isError ? downVectorRed : downVector} className=" w-5 aspect-[2/1]" />
        </TouchableOpacity>

        <Text className={` font-garamond text-sm text-red-500 ${!isError && "hidden"}`}>{errorMessage}</Text>
      </View>
      <Modal isVisible={isVisible} animationInTiming={700} className="m-0 mt-10 rounded-t-xl">
        <View className=" flex-1 justify-center bg-white">
          <View className={`mb-5 w-full flex flex-row px-5 justify-between items-center ${isVisible && "border-b-[1px]"}`}>
            <TextInput
              value={search}
              onChangeText={(text) => {
                setSearch(text);
              }}
              className=" text-3xl font-garamond w-[90%]"
              placeholder={I18nManager.isRTL ? "بحث" : "Search"}
            ></TextInput>

            <TouchableOpacity
              onPress={() => {
                setIsVisible(false);
                setSearch("");
              }}
            >
              <Text className=" text-5xl font-garamond-bold">×</Text>
            </TouchableOpacity>
          </View>

          <FlatList data={filteredData} keyExtractor={(item, index) => index.toString()} renderItem={({ item }) => renderList({ item })} className="w-[90%] self-center" />
        </View>
      </Modal>
    </View>
  );
};

export default memo(SingleSelectorModal);
