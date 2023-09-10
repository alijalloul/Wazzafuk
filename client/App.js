import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Provider } from "react-redux";

import "react-native-reanimated";
import "react-native-gesture-handler";

import Store from "./redux/Store.js";

import OnBoarding from "./screens/OnBoarding.js";
import LogIn from "./screens/LogIn.js";
import SignUp from "./screens/SignUp.js";
import Choose from "./screens/Choose.js";
import Verification from "./screens/Verification.js";
import CV from "./screens/CV.js";
import Introduction from "./screens/Introduction.js";
import Work from "./screens/Work.js";
import Education from "./screens/Education.js";
import Language from "./screens/Language.js";
import Home from "./screens/Home.js";
import Profile from "./screens/Profile.js";
import MyJobs from "./screens/MyJobs.js";
import JobPostDetails from "./screens/JobPostDetails.js";
import UserJobPostDetails from "./screens/UserJobPostDetails.js";
4;
import UserDetails from "./screens/UserDetails.js";

import Navbar from "./components/Navbar.js";

import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editUser } from "./redux/User.js";
import EmployeeJobDetails from "./screens/EmployeeJobDetails.js";
import ContactInfo from "./screens/ContactInfo.js";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const App = () => {
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);
  const [screenName, setScreenName] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("profile");
        const value2 = await AsyncStorage.getItem("screenName");

        if (value) {
          setUser(JSON.parse(value).result);
          editUser(JSON.parse(value).result, null, null, dispatch);
          setScreenName(value2);
        }
      } catch (error) {
        console.log("error message: ", error);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    //console.log(user);
  }, [user]);

  const [fontsLoaded] = useFonts({
    "EB-Garamond": require("./assets/fonts/EBGaramond-Medium.ttf"),
    "EB-Garamond-Bold": require("./assets/fonts/EBGaramond-Bold.ttf"),
    "EB-Garamond-SemiBold": require("./assets/fonts/EBGaramond-SemiBold.ttf"),
  });

  const HomeTabs = () => {
    return (
      <Tab.Navigator
        initialRouteName={user.type === "mployer" ? "myJobs" : "home"}
        tabBar={(props) => <Navbar {...props} />}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen name="home" component={Home} />
        <Tab.Screen name="myJobs" component={MyJobs} />
        <Tab.Screen name="profile" component={Profile} />
      </Tab.Navigator>
    );
  };
  if (fontsLoaded) {
    return (
      <NavigationContainer className=" border-box padding-0 margin-0">
        <Stack.Navigator initialRouteName={user && screenName}>
          <Stack.Screen
            name="onBoarding"
            component={OnBoarding}
            options={{
              headerTitle: "",
              headerShadowVisible: false,
            }}
          />

          <Stack.Screen
            name="HomeTabs"
            component={HomeTabs}
            options={{
              headerTitle: "",
              headerShadowVisible: false,
              headerBackVisible: false,
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
            name="language"
            component={Language}
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
            name="login"
            component={LogIn}
            options={{
              headerTitle: "",
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
            name="verification"
            component={Verification}
            options={{
              headerTitle: "",
              headerShadowVisible: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return null;
  }
};

const AppWrapper = () => {
  return (
    <Provider store={Store}>
      <App />
    </Provider>
  );
};

export default AppWrapper;
