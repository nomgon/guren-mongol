import React, { useState, useContext } from "react";
import { View, Text, Image, StyleSheet, Alert } from "react-native";
import MyButton from "../components/MyButton";
import MyInput from "../components/MyInput";
import UserContext, { UserState } from "../context/UserContext";

export default ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const state = useContext(UserContext);
  console.log("======" + state.isLoggedIn + "=======");

  const loginHandler = () => {
    setError(null);
    if (email.length == 0) {
      Alert.alert("Имэйлээ оруулна уу, хоосон байна");
      return;
    }
    if (password.length == 0) {
      Alert.alert("Нууц үгээ оруулна уу, хоосон байна");
      return;
    }
    state.login(email, password, navigation);
  };

  return (
    <View>
      <Image
        style={{ width: "100%", height: "50%" }}
        source={require("../../assets/images/signup.jpeg")}
      />
      <Text
        style={{
          textAlign: "center",
          fontSize: 20,
          marginTop: 20,
          color: "gray",
        }}
      >
        Нэвтрэх
      </Text>

      {error && (
        <Text style={{ margin: 30, textAlign: "center", color: "red" }}>
          {error}
        </Text>
      )}
      <MyInput
        value={email}
        keyboardType="email-address"
        placeholder="Имэйл хаягаа оруулна уу"
        onChangeText={setEmail}
      />
      <MyInput
        value={password}
        secureTextEntry={true}
        placeholder="Нэвтрэх нууц үгээ оруулна уу"
        onChangeText={setPassword}
      />
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <MyButton title="Буцах" onPress={() => navigation.goBack()} />
        <MyButton title="Нэвтрэх" onPress={loginHandler} />
      </View>
    </View>
  );
};

const css = StyleSheet.create({
  inputField: {
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 10,
  },
  button: {
    marginVertical: 5,
  },
});
