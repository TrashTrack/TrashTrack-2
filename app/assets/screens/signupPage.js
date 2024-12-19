import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import firebase from "@react-native-firebase/app"; // Ensure Firebase is initialized properly

const SignupPage = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState(""); // Added state for name
  const [isLoading, setIsLoading] = useState(false); // Added loading state

  const createProfile = async (response) => {
    try {
      // Create profile in Firebase Database under the users node
      await firebase
        .database()
        .ref(`/users/${response.user.uid}`)
        .set({ name });
    } catch (error) {
      Alert.alert("Error", error.message || "Failed to create profile");
    }
  };

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword || !name) {
      Alert.alert("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Password mismatch", "Your passwords don't match");
      return;
    }

    setIsLoading(true); // Show loading spinner during signup process

    try {
      const response = await auth().createUserWithEmailAndPassword(
        email,
        password
      );
      if (response.user) {
        await createProfile(response); // Create profile if user is created
        navigation.navigate("ProfilePage"); // Navigate to ProfilePage after profile creation
      }
    } catch (e) {
      Alert.alert("Oops", e.message || "Please try again with valid info");
    } finally {
      setIsLoading(false); // Hide loading spinner once process is complete
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup for TrashTrack</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        placeholderTextColor="#666"
        value={name}
        onChangeText={(text) => setName(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#666"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        placeholderTextColor="#666"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm your password"
        placeholderTextColor="#666"
        secureTextEntry
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
      />

      <TouchableOpacity
        style={styles.signupButton}
        onPress={handleSignup}
        disabled={isLoading}
      >
        <Text style={styles.signupButtonText}>
          {isLoading ? "Signing Up..." : "Sign Up"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("LoginPage")}>
        <Text style={styles.linkText}>Already have an account? Login</Text>
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
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  signupButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 20,
  },
  signupButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  linkText: {
    color: "#4CAF50",
    fontSize: 16,
  },
});

export default SignupPage;
