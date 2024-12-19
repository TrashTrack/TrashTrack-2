import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import MapScreen from "./mapPage";
import SignupPage from "./signupPage";
import ProfilePage from "./profilePage";
import NotificationsScreen from "./notificationScreen";

function HomeScreen() {
  return <MapScreen />;
}

function NotificationsScreenTab() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>All Notifications this way please!</Text>
    </View>
  );
}

function ProfileScreen() {
  return <ProfilePage />;
}

const Tab = createBottomTabNavigator();

function MainPage() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Notifications") {
            iconName = focused ? "notifications" : "notifications-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#4CAF50",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          height: 60,
          paddingBottom: 10,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen
        name="NotificationsScreenTab"
        component={NotificationsScreenTab}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: true }}
      />
    </Tab.Navigator>
  );
}

export default MainPage;
