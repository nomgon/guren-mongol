import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { DrawerItem, DrawerContentScrollView } from "@react-navigation/drawer";
import { Avatar, Caption, Title, Drawer } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import UserContext from "../context/UserContext";
import { SimpleLineIcons } from "@expo/vector-icons";
// import Target from "../screens/Target";
import { useNavigation, DrawerActions } from "@react-navigation/native";

const DrawerContent = (props) => {
  const state = useContext(UserContext);
  const navigation = useNavigation();
  const closeDrawer = () => {
    // props.navigation.closeDrawer();
    navigation.dispatch(DrawerActions.closeDrawer());
  };
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={{ flexDirection: "row", paddingLeft: 20, marginTop: 20 }}>
          <Avatar.Image
            source={require("../../assets/adaptive-icon.png")}
            size={50}
          />
          <View style={{ marginLeft: 10 }}>
            <Title style={{ fontSize: 16, fontWeight: "bold", lineHeight: 25 }}>
              {state.userName ? state.userName : "Ард түмэн бол ТӨР"}
            </Title>
            <Caption style={{ lineHeight: 13 }}>
              {state.userRole ? state.userRole : "Төр бол НАМ БИШ !"}
            </Caption>
          </View>
        </View>
        <View style={{ marginHorizontal: 15, marginTop: 20 }}>
          <Drawer.Section>
            <DrawerItem
              label="Жагсаалт"
              onPress={() => {
                closeDrawer();
                props.navigation.navigate("Үүсгэн байгуулагчид");
              }}
              icon={() => <Feather name="list" size={20} color="black" />}
            />
          </Drawer.Section>
          <Drawer.Section>
            <DrawerItem
              label="Зорилго"
              onPress={() => {
                closeDrawer();
                props.navigation.navigate("Зорилго");
              }}
              icon={() => <Feather name="target" size={20} color="black" />}
            />
          </Drawer.Section>
          <Drawer.Section>
            {state.isLoggedIn ? (
              <View>
                {state.userRole === "admin" && (
                  <Drawer.Section>
                    <DrawerItem
                      label="Нэмж оруулах"
                      onPress={() => {
                        closeDrawer();
                        props.navigation.navigate("Нэмж оруулах");
                      }}
                      icon={() => (
                        <AntDesign name="addfile" size={20} color="black" />
                      )}
                    />
                  </Drawer.Section>
                )}
                <Drawer.Section>
                  <DrawerItem
                    label="Тохиргоо"
                    onPress={() => {
                      closeDrawer();
                      props.navigation.navigate("Тохиргоо");
                    }}
                    icon={() => (
                      <AntDesign name="setting" size={20} color="black" />
                    )}
                  />
                </Drawer.Section>

                <DrawerItem
                  label="Гарах"
                  onPress={() => {
                    closeDrawer();
                    state.logout();
                  }}
                  icon={() => (
                    <AntDesign name="logout" size={20} color="black" />
                  )}
                />
              </View>
            ) : (
              <View>
                <Drawer.Section>
                  <DrawerItem
                    label="Бүртгэл"
                    onPress={() => {
                      closeDrawer();
                      props.navigation.navigate("Бүртгэл");
                    }}
                    icon={() => (
                      <AntDesign name="setting" size={20} color="black" />
                    )}
                  />
                </Drawer.Section>

                <DrawerItem
                  label="Нэвтрэх"
                  onPress={() => {
                    closeDrawer();
                    props.navigation.navigate("Нэвтрэх");
                  }}
                  icon={() => (
                    <SimpleLineIcons name="login" size={20} color="black" />
                  )}
                />
              </View>
            )}
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default DrawerContent;
