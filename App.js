import React, { useEffect } from "react";
import "react-native-gesture-handler"; // This should be the very first import in your entry file (typically App.js)

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

// Import Firebase
import { initializeApp } from "@react-native-firebase/app";

// Import your screen components
import MainPage from "./app/assets/screens/mainPage";
import SignupPage from "./app/assets/screens/signupPage";
import LoginPage from "./app/assets/screens/loginPage";
import MapScreen from "./app/assets/screens/mapPage";
import WelcomeScreen from "./app/assets/screens/welcomeScreen";
import NotificationsScreen from "./app/assets/screens/notificationScreen";
import ProfilePage from "./app/assets/screens/profilePage";

// Create the navigation stack
const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    // Initialize Firebase
    const firebaseConfig = {
      apiKey: "AIzaSyBX--tvBoK-m05X_-0z348IwvRBDAXJqhE",
      authDomain: "trashtrack-67d11.firebaseapp.com",
      databaseURL: "https://trashtrack-67d11-default-rtdb.firebaseio.com",
      projectId: "trashtrack-67d11",
      storageBucket: "trashtrack-67d11.firebasestorage.app",
      messagingSenderId: "891478706008",
      appId: "1:891478706008:web:070b435f9a86e284e3072d",
    };

    // Initialize Firebase app (this is necessary if you are manually initializing Firebase)
    initializeApp(firebaseConfig);

    console.log("Firebase Initialized!");
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={MainPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NotificationsScreen"
          component={NotificationsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MapScreen"
          component={MapScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignupPage"
          component={SignupPage}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="LoginPage"
          component={LoginPage}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="ProfilePage"
          component={ProfilePage}
          options={{ headerShown: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
