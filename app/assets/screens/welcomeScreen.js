import React, { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Platform,
  Linking,
} from "react-native";
import * as Location from "expo-location";

function WelcomeScreen({ navigation }) {
  const [locationPermission, setLocationPermission] = useState(null);

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        setLocationPermission(status);

        if (status !== "granted") {
          Alert.alert(
            "Location Permission Required",
            "This app needs access to your location to provide tracking features.",
            [
              {
                text: "Open Settings",
                onPress: () => Linking.openSettings(),
              },
              {
                text: "Cancel",
                style: "cancel",
              },
            ]
          );
        }
      } catch (error) {
        console.error("Error requesting location permission:", error);
        Alert.alert(
          "Permission Error",
          "Unable to request location permissions."
        );
      }
    };

    requestLocationPermission();
  }, []);

  const isLocationPermissionGranted = locationPermission === "granted";

  return (
    <ImageBackground
      style={styles.background}
      source={require("../background.jpg")}
      resizeMode="cover"
    >
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("../icon.png")} />
        <Text style={styles.logoText}>Real-Time Trash, Real-Time Track</Text>
      </View>
      <TouchableOpacity
        style={[
          styles.startButton,
          {
            backgroundColor: isLocationPermissionGranted ? "orange" : "gray",
          },
        ]}
        onPress={() => {
          if (isLocationPermissionGranted) {
            navigation.navigate("Main");
          } else {
            alert("Location permission is required to proceed.");
          }
        }}
        disabled={!isLocationPermissionGranted}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  startButton: {
    width: "80%",
    paddingVertical: 13,
    borderRadius: 20,
    position: "absolute",
    bottom: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  logo: {
    width: 180,
    height: 180,
  },
  logoContainer: {
    position: "absolute",
    top: 320,
    alignItems: "center",
  },
  logoText: {
    fontWeight: "600",
    color: "white",
  },
});

export default WelcomeScreen;
