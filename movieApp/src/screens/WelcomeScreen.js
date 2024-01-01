import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

export default function WelcomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.welcomeContainer}>
      <Image
      style={styles.welcomeBackgroundImage}
        source={require("../../assets/movie_wallpaper2.jpeg")}
        resizeMode="cover"
      />

      <StatusBar style="light" />

      {/* Title and Button */}
      <View style={styles.welcomeContentContainer}>
        <View style={styles.labelContentContainer}>
          <Text style={styles.labelTextContainer}>MYC</Text>
        </View>
        <Text style={styles.labelTextContentContainer}>Movie You Choose</Text>

        <Text style={styles.labelTextContentContainer}>
          Watch and find movies that bring your mood back.
        </Text>

        <View style={styles.exploreViewContainer}>
          <TouchableOpacity
          style={styles.exploreButtonContainer}
            onPress={() => navigation.navigate("HomeTab")}
          >
            <Text  style={styles.exploreButtonText}>Explore</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  welcomeContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    position: "relative",
  },
  welcomeContentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "80%",
  },
  labelContentContainer: {
    backgroundColor: "#DC2626",
    padding: 10,
    borderRadius: 18,
  },
  labelTextContainer: {
    color: "white",
    fontWeight: "bold",
    fontSize: 24,
    letterSpacing: 2,
    marginVertical: 12,
  },
  labelTextContentContainer: {
    color: "black",
    marginTop: 16,
    padding: 2,
    backgroundColor: "white",
    letterSpacing: 2,
    marginBottom: 2,
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
  exploreViewContainer: {
    marginTop: 56,
  },
  exploreButtonContainer: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8, 
    backgroundColor: '#DC2626', 
  },
  exploreButtonText:{
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
  },
  welcomeBackgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
  }
});
