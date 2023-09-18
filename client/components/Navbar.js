import { useBackHandler } from "@react-native-community/hooks";
import { getFocusedRouteNameFromRoute, useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, Dimensions, I18nManager, Image, Keyboard, Text, TouchableOpacity, View, BackHandler } from "react-native";

import { MotiView, useDynamicAnimation } from "moti";
import graphOrange from "../assets/images/graphOrange.png";
import graphWhite from "../assets/images/graphWhite.png";
import homeOrange from "../assets/images/homeOrange.png";
import homeWhite from "../assets/images/homeWhite.png";
import userOrange from "../assets/images/userOrange.png";
import userWhite from "../assets/images/userWhite.png";

const translateText = (englishText, arabicText) => {
  return I18nManager.isRTL ? arabicText : englishText;
};

const Navbar = ({ navigation }) => {
  const route = useRoute();
  const focusedRouteName = getFocusedRouteNameFromRoute(route) || "home";

  const navigator = useNavigation();
  const isFocused = useIsFocused();

  const handleNavigation = (screenName) => {
    if (focusedRouteName === "profile") {
      if (isFocused) {
        Alert.alert(translateText("Confirm Navigation", "تأكيد الملاحة"), translateText("Do you want to leave this screen without saving?", "هل ترغب في مغادرة هذا الشاشة دون حفظ؟"), [
          {
            text: translateText("NO", "لا"),
            style: "cancel",
          },
          {
            text: translateText("YES", "نعم"),
            onPress: () => {
              navigator.navigate(screenName);
            },
          },
        ]);
      }
    } else {
      navigator.navigate(screenName);
    }
  };

  const handleBackPress = () => {
    if (focusedRouteName === "profile" && isFocused) {
      Alert.alert(translateText("Confirm Exit", "تأكيد الخروج"), translateText("Do you want to exit the app without saving?", "هل ترغب في مغادرة الاب دون حفظ؟"), [
        {
          text: translateText("No", "لا"),
          style: "cancel",
        },
        {
          text: translateText("Yes", "نعم"),
          onPress: () => {
            if (Platform.OS === "android") {
              // For Android, use react-native-exit-app to exit the app
              BackHandler.exitApp(); // You may need to import exitApp from 'react-native-exit-app'
            } else {
              // For iOS, you can use navigation.goBack()
              BackHandler.exitApp(); // You may need to import exitApp from 'react-native-exit-app'
            }
          },
        },
      ]);
      return true; // Prevent the default back action
    }
    return false; // Allow the default back action for other screens
  };
  useBackHandler(handleBackPress);

  const barHeight = 70;
  const buttonsMargin = 20;
  const borderMargin = 70;
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
    const isRTL = I18nManager.isRTL;

    if (focusedRouteName === "home") {
      selectorAnimation.animateTo(() => ({
        translateX: isRTL ? -(navBarSpacing * 0 + 12) : navBarSpacing * 0 - 3,
      }));
    } else if (focusedRouteName === "myJobs") {
      selectorAnimation.animateTo(() => ({
        translateX: isRTL ? -(navBarSpacing * 1 + 3) : navBarSpacing * 1 - 3,
      }));
    } else if (focusedRouteName === "profile") {
      selectorAnimation.animateTo(() => ({
        translateX: isRTL ? -(navBarSpacing * 2 - 8) : navBarSpacing * 2,
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
      <View style={{ width: navBarWidth }} className={`flex flex-row justify-around self-center items-center w-full h-full rounded-t-[50px] bg-[#FFE2CD]`}>
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
                handleNavigation("home");
              }}
              className="  rounded-full"
            >
              <Image source={focusedRouteName === "home" ? homeWhite : homeOrange} className="w-8 h-8" />
            </TouchableOpacity>
          </MotiView>

          <Text className="text-[#FE6F07] font-garamond text-lg">{translateText("home", "الصفحة الرئيسية")}</Text>
        </View>
        <View className="z-20 relative flex justify-center items-center">
          <MotiView state={graphAnimation} transition={{ type: "spring", damping: 300 }} className="relative">
            <TouchableOpacity
              onPress={() => {
                handleNavigation("myJobs");
              }}
              className=" p-0 rounded-full"
            >
              <Image source={focusedRouteName === "myJobs" ? graphWhite : graphOrange} className="w-8 h-8" />
            </TouchableOpacity>
          </MotiView>
          <Text className="text-[#FE6F07] font-garamond text-lg">{translateText("myJobs", "وظائفي")}</Text>
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
          <Text className="text-[#FE6F07] font-garamond text-lg">{translateText("profile", "الملف الشخصي")}</Text>
        </View>
      </View>
    </MotiView>
  );
};

export default Navbar;
