import React, { useState, useEffect } from "react";
import { View, StyleSheet, Button, Alert } from "react-native";
import WebMapView from "@teovilla/react-native-web-maps"; // Import the WebMapView component
import * as Location from "expo-location";

export default function MapScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    // Request location permission and fetch the location
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      try {
        // Get current location of the user
        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        });
      } catch (error) {
        setErrorMsg("Unable to fetch location. Please try again.");
      }
    };

    getLocation();
  }, []);

  const showUserLocation = () => {
    if (!location) {
      Alert.alert(
        "Location not available",
        "Please wait for location to load."
      );
      return;
    }
    // Re-center the map to user's location
    alert("Showing location: " + location.latitude + ", " + location.longitude);
  };

  if (!location) {
    return (
      <View style={styles.loading}>
        <Image
          source={require("../../assets/Loading.gif")} // Correct relative path from mapPage.js to Loading.gif
          style={styles.loading}
        />
      </View>
    ); // Show loading message while fetching location
  }

  return (
    <View style={styles.container}>
      <WebMapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        provider="google" // Use Google Maps provider
      />
      <View style={styles.buttonContainer}>
        <Button title="My Location" onPress={showUserLocation} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
  },
  map: {
    width: "100%",
    height: "80%", // Adjust based on how much space you want the map to take
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "white",
    borderRadius: 30,
    padding: 10,
    elevation: 5, // Adds shadow for the button
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 15,
    height: 15,
  },
});
