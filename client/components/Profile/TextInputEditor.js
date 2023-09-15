import React, { useState, useRef, useEffect } from "react";
import { View, TouchableOpacity, Image, TextInput, Text, I18nManager } from "react-native";

import pen from "../../assets/images/pen.png";
import check from "../../assets/images/check.png";

const translateText = (text, arabicText) => {
  return I18nManager.isRTL ? arabicText : text;
};

const TextInputEditor = ({ textSize, textColor, value, setValue, placeholder }) => {
  const [isEditing, setIsEditing] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const toggleVisibility = () => {
    setIsEditing(!isEditing);
  };

  return (
    <View className="relative flex flex-row justify-center items-center w-full">
      <Text style={{ fontSize: textSize, color: textColor }} className={`font-garamond text-center ${isEditing && "h-0 w-0"} ${value === "" && " opacity-50"}`}>
        {value === "" ? translateText(placeholder, "النص البديل") : value}
      </Text>

      <TextInput
        ref={inputRef}
        value={value}
        onBlur={() => {
          setIsEditing(false);
        }}
        onChangeText={(text) => {
          setValue(text);
        }}
        style={{ fontSize: textSize, color: textColor }}
        className={`font-garamond text-center ${!isEditing && "h-1 w-1"}`}
      />

      <View className="left-5 h-0 w-0 relative flex justify-center items-center">
        <TouchableOpacity
          onPress={() => {
            toggleVisibility();
          }}
          className="absolute border-[1px] border-gray-400 p-[6px] rounded-full bg-white"
        >
          <Image source={isEditing ? check : pen} className="w-5 h-5 aspect-square" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TextInputEditor;
