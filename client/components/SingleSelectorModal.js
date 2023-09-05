import React, { useState, memo } from "react";
import { View, Image, Text, TouchableOpacity, TextInput, FlatList } from "react-native";
import Modal from "react-native-modal";

import downVector from "../assets/images/downVector.png";

const SingleSelectorModal = ({ isForm, data, value, setValue, fieldName }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [search, setSearch] = useState("");

  const renderList = ({ item }) => {
    return (
      <View className="flex flex-row justify-start items-center pb-4 mb-4 border-b-[1px]">
        <TouchableOpacity
          onPress={() => {
            isForm ? setValue((prevData) => ({ ...prevData, [fieldName]: item })) : setValue(item);
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

  const filteredData = data.filter((item) => item.toLowerCase().includes(search.toLowerCase()));

  return (
    <View className="flex flex-row justify-between items-center w-full h-12">
      <TouchableOpacity
        onPress={() => {
          setIsVisible(true);
        }}
        className="border-[1px] p-2 w-full rounded-lg flex flex-row justify-between items-center"
      >
        <Text className="text-[20px] font-garamond">{value ? value : "_ _ _"}</Text>
        <Image source={downVector} className=" w-5 aspect-[2/1]" />
      </TouchableOpacity>

      <Modal isVisible={isVisible} animationInTiming={700} className="m-0 mt-10 rounded-t-xl">
        <View className=" flex-1 justify-center bg-white">
          <View className={`mb-5 w-full flex flex-row px-5 justify-between items-center ${isVisible && "border-b-[1px]"}`}>
            <TextInput
              value={search}
              onChangeText={(text) => {
                setSearch(text);
              }}
              className=" text-3xl font-garamond w-[90%]"
              placeholder="Search"
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
