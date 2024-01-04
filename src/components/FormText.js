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
        <TextInput
          {...props}
          style={{
            paddingLeft: 10,
            flex: 1,
            color: textColor,
            marginTop: Platform.OS === "ios" ? 0 : -3,
          }}
          placeholder={props.placeHolder}
        />
        {props.errorShow === false && (
          <Animatable.View animation="fadeInRight" duration={500}>
            <Feather name="check-circle" size={14} color={textColor} />
          </Animatable.View>
        )}
      </View>
      {props.errorShow && (
        <Animatable.Text
          animation="fadeInLeft"
          duration={500}
          style={{
            color: "#1abc9c",
            marginTop: 5,
            paddingLeft: 30,
            fontSize: 15,
          }}
        >
          {props.errorText}
        </Animatable.Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

export default FormText;
