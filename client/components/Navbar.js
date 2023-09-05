import React, { useEffect, useRef, useState } from "react";
import { View, Image, Text, TouchableOpacity, Dimensions, Keyboard } from "react-native";

import { useRoute, getFocusedRouteNameFromRoute } from "@react-navigation/native";

import homeOrange from "../assets/images/homeOrange.png";
import graphOrange from "../assets/images/graphOrange.png";
import userOrange from "../assets/images/userOrange.png";
import homeWhite from "../assets/images/homeWhite.png";
import graphWhite from "../assets/images/graphWhite.png";
import userWhite from "../assets/images/userWhite.png";
import { MotiView, useDynamicAnimation } from "moti";

const Navbar = ({ navigation }) => {
  const route = useRoute();
  const focusedRouteName = getFocusedRouteNameFromRoute(route) || "home";

  const barHeight = 70;
  const buttonsMargin = 20;
  const borderMargin = 65;
  const windowWidth = Dimensions.get("window").width;
  const navBarWidth = windowWidth;
  const navBarSpacing = navBarWidth / 3;

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const containerAnimation = useDynamicAnimation(() => {
    return {
      height: barHeight,
    };
  });

  const selectorAnimation = useDynamicAnimation(() => {
    return {
      translateX: 0,
    };
  });

  const homeAnimation = useDynamicAnimation(() => {
    return {
      bottom: 0,
    };
  });
  const graphAnimation = useDynamicAnimation(() => {
    return {
      bottom: 0,
    };
  });
  const userAnimation = useDynamicAnimation(() => {
    return {
      bottom: 0,
    };
  });

  const animateContainerHeight = () => {
    if (isKeyboardVisible) {
      containerAnimation.animateTo(() => ({
        height: 0,
      }));
    } else {
      containerAnimation.animateTo(() => ({
        height: barHeight,
      }));
    }
  };

  const animateSelector = () => {
    if (focusedRouteName === "home") {
      selectorAnimation.animateTo(() => ({
        translateX: navBarSpacing * 0,
      }));
    } else if (focusedRouteName === "myJobs") {
      selectorAnimation.animateTo(() => ({
        translateX: navBarSpacing * 1,
      }));
    } else if (focusedRouteName === "profile") {
      selectorAnimation.animateTo(() => ({
        translateX: navBarSpacing * 2,
      }));
    }
  };

  const animateButtons = () => {
    if (focusedRouteName === "home") {
      homeAnimation.animateTo(() => ({
        bottom: buttonsMargin,
      }));
    } else {
      homeAnimation.animateTo(() => ({
        bottom: 0,
      }));
    }

    if (focusedRouteName === "myJobs") {
      graphAnimation.animateTo(() => ({
        bottom: buttonsMargin,
      }));
    } else {
      graphAnimation.animateTo(() => ({
        bottom: 0,
      }));
    }

    if (focusedRouteName === "profile") {
      userAnimation.animateTo(() => ({
        bottom: buttonsMargin,
      }));
    } else {
      userAnimation.animateTo(() => ({
        bottom: 0,
      }));
    }
  };

  useEffect(() => {
    animateSelector();
    animateButtons();
  }, [focusedRouteName]);

  useEffect(() => {
    animateContainerHeight();
  }, [isKeyboardVisible]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true); // or some other action
    });
    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false); // or some other action
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  return (
    <MotiView state={containerAnimation} transition={{ type: "spring", damping: 300, duration: 100 }} className={`bg-white ${isKeyboardVisible && "hidden opacity-0"}`}>
      <View style={{ width: navBarWidth }} className={`flex flex-row justify-around self-center items-center w-full h-full px-1 rounded-t-[50px] bg-[#FFE2CD]`}>
        <MotiView
          state={selectorAnimation}
          transition={{ type: "spring", damping: 300 }}
          style={{
            width: navBarSpacing,
            bottom: borderMargin,
          }}
          className="z-10 absolute top-0 left-0 right-0 flex justify-center items-center"
        >
          <View className={` z-10 bg-[#FE6F07] border-8 border-white rounded-full w-16 aspect-square `}></View>
        </MotiView>

        <View className="z-20 relative flex justify-center items-center">
          <MotiView state={homeAnimation} transition={{ type: "spring", damping: 300 }} className="relative">
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("home");
              }}
              className="  rounded-full"
            >
              <Image source={focusedRouteName === "home" ? homeWhite : homeOrange} className="w-8 h-8" />
            </TouchableOpacity>
          </MotiView>

          <Text className="text-[#FE6F07] font-garamond text-lg">home</Text>
        </View>
        <View className="z-20 relative flex justify-center items-center">
          <MotiView state={graphAnimation} transition={{ type: "spring", damping: 300 }} className="relative">
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("myJobs");
              }}
              className=" p-0 rounded-full"
            >
              <Image source={focusedRouteName === "myJobs" ? graphWhite : graphOrange} className="w-8 h-8" />
            </TouchableOpacity>
          </MotiView>
          <Text className="text-[#FE6F07] font-garamond text-lg">myJobs</Text>
        </View>
        <View className="z-20 flex justify-center items-center">
          <MotiView state={userAnimation} transition={{ type: "spring", damping: 300 }} className="relative">
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("profile");
              }}
              className="p-0 rounded-full"
            >
              <Image source={focusedRouteName === "profile" ? userWhite : userOrange} className="w-8 h-8" />
            </TouchableOpacity>
          </MotiView>
          <Text className="text-[#FE6F07] font-garamond text-lg">profile</Text>
        </View>
      </View>
    </MotiView>
  );
};

export default Navbar;
