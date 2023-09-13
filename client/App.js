import { useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";

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
import UserDetails from "./screens/UserDetails.js";
import Navbar from "./components/Navbar.js";

import CustomBackHeader from "./components/Header/CustomBackHeader.js";

import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editAppLanguage, editUser } from "./redux/User.js";
import EmployeeJobDetails from "./screens/EmployeeJobDetails.js";
import ContactInfo from "./screens/ContactInfo.js";
import HeaderRight from "./components/Header/HeaderRight.js";
import ChooseLanguage from "./screens/ChooseLanguage.js";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Can use this function below or use Expo's Push Notification Tool from: https://expo.dev/notifications
async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Original Title",
    body: "And here is the body!",
    data: { someData: "goes here" },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    });
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

const App = () => {
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);
  const [screenName, setScreenName] = useState(null);
  const [language, setLanguage] = useState(null);

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("profile");
        const value2 = await AsyncStorage.getItem("screenName");
        const value3 = await AsyncStorage.getItem("language");

        if (value) {
          setUser(JSON.parse(value).result);
          editUser(JSON.parse(value).result, null, null, dispatch);
          setScreenName(value2);

          setLanguage(value3);
          editAppLanguage(JSON.parse(value3), null, dispatch);
        }
      } catch (error) {
        console.log("error message: ", error);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    editUser({ ...user, pushToken: expoPushToken.data }, null, null, dispatch);
  }, [expoPushToken]);

  useEffect(() => {
    //console.log("user: ", user);
  }, [user]);

  const [fontsLoaded] = useFonts({
    "EB-Garamond": require("./assets/fonts/EBGaramond-Medium.ttf"),
    "EB-Garamond-Bold": require("./assets/fonts/EBGaramond-Bold.ttf"),
    "EB-Garamond-SemiBold": require("./assets/fonts/EBGaramond-SemiBold.ttf"),
  });

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
  if (fontsLoaded) {
    return (
      <NavigationContainer className=" border-box padding-0 margin-0">
        <Stack.Navigator initialRouteName={language ? (user?.telephone ? screenName : "home") : "chooseLanguage"}>
          <Stack.Screen
            name="chooseLanguage"
            component={ChooseLanguage}
            options={{
              headerTitle: "",
              headerShadowVisible: false,
              headerBackVisible: false,
            }}
          />

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
              headerShown: false,
              headerStyle: {
                height: 100,
                marginHorizantal: 10,
              },
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
