import React, { useContext } from "react";
import { createDrawerNavigator, DrawerActions } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import SignupScreen from "../screens/SignupScreen";
import LoginScreen from "../screens/LoginScreen";
import UserContext from "../context/UserContext";
import HomeScreen from "../screens/HomeScreen";
import SplashScreen from "../screens/SplashScreen";
import DrawerContent from "../components/DrawerContent";
import BookAdd from "../screens/BookAdd";
import SettingsScreen from "../screens/SettingsScreen";
import Target from "../screens/Target";
import BookDetailScreen from "../screens/BookDetailScreen";
import { NavigationContainer } from "@react-navigation/native";

const Drawer = createDrawerNavigator();

export default () => {
  const state = useContext(UserContext);
  const navigation = useNavigation();

  if (state.isLoading === true) {
    return <SplashScreen />;
  }

  const isDrawerOpen = navigation.getState()?.index > 0;

  return (
    <Drawer.Navigator
      initialRouteName="Үүсгэн байгуулагчид"
      drawerContent={(props) => <DrawerContent {...props} />}
      drawerStyle={{
        backgroundColor: "white",
        width: isDrawerOpen ? 450 : 0,
      }}
      screenOptions={{
        activeTintColor: "#e91e63",
        itemStyle: { marginVertical: 5 },
      }}
    >
      {/* <Drawer.Screen name="Үүсгэн байгуулагчид" component={MyStackNavigator} /> */}
      <Drawer.Screen name="Үүсгэн байгуулагчид" component={HomeScreen} />
      <Drawer.Screen name="Detail" component={BookDetailScreen} />
      <Drawer.Screen name="Зорилго" component={Target} />
      {state.isLoggedIn ? (
        <>
          {state.userRole === "admin" && (
            <Drawer.Screen name="Нэмж оруулах" component={BookAdd} />
          )}

          <Drawer.Screen name="Тохиргоо" component={SettingsScreen} />
          <Drawer.Screen
            name="Logout"
            component={HomeScreen}
            listeners={() => {
              state.logout();
            }}
          />
        </>
      ) : (
        <>
          <Drawer.Screen name="Бүртгэл" component={SignupScreen} />
          <Drawer.Screen name="Нэвтрэх" component={LoginScreen} />
        </>
      )}
    </Drawer.Navigator>
  );
};
