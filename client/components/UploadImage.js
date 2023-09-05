import React, { memo, useState } from "react";
import { Image, View, TouchableOpacity, Text, TouchableWithoutFeedback } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";

const UploadImage = ({ width, isButton, image, setImage }) => {
  const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });

    if (!_image.cancelled) {
      const resizedImage = await ImageManipulator.manipulateAsync(_image.uri, [{ resize: { width: 512, height: 512 } }], { compress: 1, format: "jpeg" });
      setImage(resizedImage.uri);
    }
  };

  return (
    <View className="flex justify-center items-center">
      <TouchableWithoutFeedback
        onPress={() => {
          !isButton && addImage();
        }}
      >
        <View style={{ width: width }} className="aspect-square bg-[#efefef] relative rounded-full overflow-hidden mb-2">
          {image && <Image source={{ uri: image }} className="w-full h-full" />}
        </View>
      </TouchableWithoutFeedback>
      <View className={`bg-white border-[1px] border-[#FE6F07] rounded-xl px-2 py-1 ${!isButton && "hidden"}`}>
        <TouchableOpacity onPress={addImage} className="flex items-center justify-center">
          <Text className="text-[15px] font-garamond text-[#FE6F07]">{image ? "Edit" : "+ Add Image"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default memo(UploadImage);
