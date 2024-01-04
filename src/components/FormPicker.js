import React from "react";
import { View, StyleSheet, Text, Platform } from "react-native";
import { Feather } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { Picker } from "@react-native-picker/picker";
import { mainColor, lightColor, textColor } from "../Constant";
import * as Animatable from "react-native-animatable";
import {
  BounceInRight,
  FadeIn,
  FadeInLeft,
  FadeInUp,
} from "react-native-reanimated";

const FormText = (props) => {
  return (
    <View>
      <Text style={{ fontSize: 16, color: "#3d3d3d", paddingTop: 25 }}>
        {props.label}
      </Text>
      <View
        style={{
          flexDirection: "row",
          marginTop: 10,
          borderBottomColor: "#718093",
          borderBottomWidth: 1,
          paddingBottom: 5,
        }}
      >
        <Feather name={props.icon} size={20} />
        <Picker
          selectedValue={props.selectedValue}
          onValueChange={props.onValueChange}
          style={{ flex: 1, marginTop: -15 }}
          itemStyle={{ color: "#16a085", fontSize: 20 }}
        >
          {props.data.map((category, index) => (
            <Picker.Item
              label={category}
              value={props.value[index]}
              key={index}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default FormText;
