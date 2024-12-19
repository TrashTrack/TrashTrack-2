import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import auth from "@react-native-firebase/auth"; // Firebase Authentication
import database from "@react-native-firebase/database"; // Firebase Realtime Database

const ProfilePage = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null); // State to store additional user info

  // Fetch the authenticated user's information
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user); // Save user data to state
        fetchUserData(user.uid); // Fetch additional user data from Firebase
      } else {
        Alert.alert("Error", "No user is logged in. Redirecting to login.");
        navigation.navigate("LoginPage"); // Replace "LoginPage" with your login screen route
      }
    });

    return () => unsubscribe(); // Clean up the listener
  }, []);

  // Function to fetch additional user data from Firebase Realtime Database
  const fetchUserData = async (userId) => {
    try {
      const snapshot = await database().ref(`/users/${userId}`).once("value");
      if (snapshot.exists()) {
        setUserData(snapshot.val()); // Save additional user data to state
      } else {
        Alert.alert("Error", "User data not found.");
      }
    } catch (error) {
      Alert.alert("Error", error.message || "Failed to fetch user data.");
    }
  };

  const handleLogout = async () => {
    try {
      await auth().signOut();
      Alert.alert("Success", "You have been logged out.");
      navigation.navigate("LoginPage"); // Replace "LoginPage" with your login screen route
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Your Profile</Text>
      {user ? (
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Email: {user.email}</Text>
          {userData && userData.name ? (
            <Text style={styles.infoText}>Name: {userData.name}</Text>
          ) : (
            <Text style={styles.infoText}>Name: Not available</Text>
          )}
        </View>
      ) : (
        <Text style={styles.infoText}>Loading user information...</Text>
      )}

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  infoContainer: {
    width: "100%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 18,
    color: "#333",
    marginBottom: 10,
  },
  logoutButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#FF5722",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ProfilePage;
