import { Colors } from "@/constants/Colors";
import GaramondText from "@/components/GaramondText";
import "./global.css";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Constants from "expo-constants";
import * as Device from "expo-device";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Provider, useSelector } from "react-redux";

import "react-native-gesture-handler";
import "react-native-reanimated";

import Store from "@/redux/Store";

import Navbar from "@/components/Navbar/Navbar";
import CV from "@/screens/CV";
import Choose from "@/screens/Choose";
import Education from "@/screens/Education";
import Home from "@/screens/Home";
import Introduction from "@/screens/Introduction";
import JobPostDetails from "@/screens/JobPostDetails";
import LogIn from "@/screens/LogIn";
import MyJobs from "@/screens/MyJobs/MyJobs";
import OnBoarding from "@/screens/OnBoarding";
import Profile from "@/screens/Profile/Profile";
import SignUp from "@/screens/SignUp";
import UserDetails from "@/screens/UserDetails";
import UserJobPostDetails from "@/screens/UserJobPostDetails";
import Work from "@/screens/Work";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import HeaderRight from "@/components/Header/HeaderRight";
import { editUser } from "@/redux/User";

import ContactInfo from "@/screens/ContactInfo";
import EmployeeJobDetails from "@/screens/EmployeeJobDetails";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

SplashScreen.preventAutoHideAsync();

const App = () => {
  return (
    <Provider store={Store}>
      <AppContent />
    </Provider>
  );
};

export default App;

const HomeTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="home"
      tabBar={(props) => <Navbar {...props} />}
      screenOptions={{
        headerTitle: "",
        headerShadowVisible: false,
        headerStyle: {
          height: 120,
        },
        headerRight: () => <HeaderRight />,
      }}
    >
      <Tab.Screen name="home" component={Home} />
      <Tab.Screen name="myJobs" component={MyJobs} />
      <Tab.Screen name="profile" component={Profile} />
    </Tab.Navigator>
  );
};

const AppContent = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      const storedProfile = await AsyncStorage.getItem("profile");
      if (storedProfile) {
        const parsedProfile = JSON.parse(storedProfile);
        setToken(parsedProfile.token);
      }
    };

    fetchToken();
  }, []);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "CHECK_PROFILE" });
  }, [dispatch]);

  const [loaded, error] = useFonts({
    "EB-Garamond": require("@/assets/fonts/EBGaramond-Medium.ttf"),
    "EB-Garamond-Bold": require("@/assets/fonts/EBGaramond-Bold.ttf"),
    "EB-Garamond-SemiBold": require("@/assets/fonts/EBGaramond-SemiBold.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        initialRouteName={token ? "HomeTabs" : "onBoarding"}
        screenOptions={{
          contentStyle: {
            backgroundColor: "#FBF2E3",
          },
        }}
      >
        <Stack.Screen
          name="onBoarding"
          component={OnBoarding}
          options={{
            headerTitle: "",
            headerStyle: {
              backgroundColor: "#FBF2E3",
            },
            headerShadowVisible: false,
          }}
        />

        <Stack.Screen
          name="signUp"
          component={SignUp}
          options={{
            headerTitle: "",
            headerShadowVisible: false,
          }}
        />

        <Stack.Screen
          name="login"
          component={LogIn}
          options={{
            headerTitle: "",
            headerShadowVisible: false,
          }}
        />

        <Stack.Screen
          name="CV"
          component={CV}
          options={{
            headerTitle: "",
            headerShadowVisible: false,
            headerBackVisible: false,
          }}
        />
        <Stack.Screen
          name="choose"
          component={Choose}
          options={{
            headerTitle: "",
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="employeeJobDetails"
          component={EmployeeJobDetails}
          options={{
            headerTitle: "",
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="JobPostDetails"
          component={JobPostDetails}
          options={{
            headerTitle: "",
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="userDetails"
          component={UserDetails}
          options={{
            headerTitle: "",
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="work"
          component={Work}
          options={{
            headerTitle: "",
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="UserJobPostDetails"
          component={UserJobPostDetails}
          options={{
            headerTitle: "",
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="introduction"
          component={Introduction}
          options={{
            headerTitle: "",
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="contactInfo"
          component={ContactInfo}
          options={{
            headerTitle: "",
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="education"
          component={Education}
          options={{
            headerTitle: "",
            headerShadowVisible: false,
          }}
        />

        <Stack.Screen
          name="HomeTabs"
          component={HomeTabs}
          options={{
            headerShown: false,
            headerStyle: {
              height: 100,
              marginHorizantal: 10,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
