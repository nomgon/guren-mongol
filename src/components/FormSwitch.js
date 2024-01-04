import React from "react";
import { View, StyleSheet, Text, Platform } from "react-native";
import { Feather } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { mainColor, lightColor, textColor } from "../Constant";
import * as Animatable from "react-native-animatable";
import {
  BounceInRight,
  FadeIn,
  FadeInLeft,
  FadeInUp,
} from "react-native-reanimated";
import { Switch, TouchableRipple } from "react-native-paper";

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
        <View
          style={{
            flexDirection: "row",
            marginLeft: 10,
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          <TouchableRipple onPress={props.onChangeValue}>
            <Text style={{ color: textColor, marginTop: 7 }}>
              {props.value ? props.data[0] : props.data[1]}
            </Text>
          </TouchableRipple>

          <Switch value={props.value} onValueChange={props.onChangeValue} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default FormText;
