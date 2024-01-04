import React from "react";
import { Alert } from "react-native";
import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import BookDetailScreen from "../screens/BookDetailScreen";
import { mainColor } from "../Constant";

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: mainColor },
      headerTintColor: "white",
      headerTitleStyle: { fontSize: 22 },
    }}
    initialRouteName="Home"
  >
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={({ navigation }) => ({
        title: "Үүсгэн байгуулагчид",
      })}
    />

    <Stack.Screen
      name="Detail"
      component={BookDetailScreen}
      options={({ navigation }) => ({
        title: "",
        headerBackTitleVisible: true,
        headerBackTitle: "буцах",
        headerTruncatedBackTitle: "буц",
      })}
    />
  </Stack.Navigator>
);
