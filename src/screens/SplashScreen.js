import React, { useEffect, useContext } from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserContext from "../context/UserContext";

const SplashScreen = () => {
  const state = useContext(UserContext);
  useEffect(() => {
    AsyncStorage.getItem("user")
      .then((data) => {
        console.log("+++++++++++" + data);
        if (data !== null) {
          const user = JSON.parse(data);
          console.log("----------" + user);
          state.setToken(user.token);
          state.setEmail(user.email);
          state.setUserName(user.userName);
          state.setUserRole(user.userRole);
          state.setIsLoggedIn(true);
        }
        state.setIsLoading(false);
      })
      .catch((err) =>
        console.log("Token could not be received. Error:  " + err.message)
      );
  }, []);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#2c3e50",
      }}
    >
      <ActivityIndicator size="large" color="#c0392b" />
      <Text
        style={{
          color: "#f1c40f",
          marginHorizontal: 70,
          marginTop: 20,
          fontSize: 23,
        }}
      >
        Төрийн эрхийг Намаас салгаж ард иргэддээ өгнө. Эзэн нь юмаа мэдэж эрэг
        нь усаа хашна.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default SplashScreen;
