import React, { useState, useContext } from "react";
import { View, Text, Image, StyleSheet, Alert } from "react-native";
import MyButton from "../components/MyButton";
import MyInput from "../components/MyInput";
import UserContext from "../context/UserContext";

export default function ({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState(null);
  const state = useContext(UserContext);

  const signupHandler = () => {
    setError(null);
    if (name.length == 0) {
      Alert.alert("Нэрээ оруулна уу, хоосон байна");
      return;
    }
    if (email.length == 0) {
      Alert.alert("Имэйл хаягаа оруулна уу, хоосон байна");
      return;
    }
    if (password1 !== password2) {
      Alert.alert("Нууц үгнүүд ижил биш байна");
      return;
    }

    state.signUp(name, email, password1);
  };
  return (
    <View>
      <Image
        style={{ width: "100%", height: "40%" }}
        source={require("../../assets/images/login.png")}
      />
      <Text
        style={{
          textAlign: "center",
          fontSize: 20,
          marginTop: 20,
          color: "gray",
        }}
      >
        Бүртгүүлэх
      </Text>
      {error && (
        <Text style={{ margin: 30, textAlign: "center", color: "red" }}>
          {error}
        </Text>
      )}

      <MyInput
        value={name}
        keyboardType="default"
        placeholder="Нэрээ оруулна уу"
        onChangeText={setName}
      />
      <MyInput
        value={email}
        keyboardType="email-address"
        placeholder="Имэйл хаягаа оруулна уу"
        onChangeText={setEmail}
      />

      <MyInput
        value={password1}
        secureTextEntry={true}
        placeholder="Нууц үг үүсгэнэ үү"
        onChangeText={setPassword1}
      />

      <MyInput
        value={password2}
        secureTextEntry={true}
        placeholder="Нууц үгээ давтана уу"
        onChangeText={setPassword2}
      />
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <MyButton title="Буцах" onPress={() => navigation.goBack()} />
        <MyButton title="Бүртгүүлэх" onPress={signupHandler} />
      </View>
    </View>
  );
}

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
