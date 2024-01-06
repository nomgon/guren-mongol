import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Button,
  Alert,
} from "react-native";
import { mainColor, lightColor } from "../Constant";
import * as Animatable from "react-native-animatable";
import FormSwitch from "../components/FormSwitch";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
// import * as Permissions from "expo-permissions";
import { expo } from "../../app.json";
import Target from "./Target";
import MyButton from "../components/MyButton";
// import { useNavigation } from "@react-navigation/native";
import UserContext from "../context/UserContext";
import { UserState } from "../context/UserContext";

const SettingsScreen = (props) => {
  // const navigation = useNavigation();
  const [alarm, setAlarm] = useState(false);
  const [notificationID, setNotificationID] = useState(null);
  const projectId = expo.projectId;
  const state = useContext(UserContext);

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
    }),
  });

  useEffect(() => {
    const notificationResponseReceivedListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        Alert.alert("Зорилго сануулсанд баярлалаа!");
        console.log("돌려 받은 response 내용", response);
      });
    const notificationRecievedListener =
      Notifications.addNotificationReceivedListener((notification) =>
        Alert.alert("Анхаар!!!", notification.request.content.data.message, [
          {
            text: "Харах",
            onPress: () => {
              // props.navigation.navigate("Detail", {
              //   id: notification.request.content.data.id,
              props.navigation.navigate("Зорилго");
            },
          },
          { text: "Цуцлах", onPress: () => {} },
        ])
      );

    // Permissions.getAsync(Permissions.NOTIFICATIONS)
    //   .then((result) => {
    //     if (result.status !== "granted") {
    //       Permissions.askAsync(Permissions.NOTIFICATIONS)
    //         .then((result) => console.log("+++", result))
    //         .catch((err) => console.log(err));
    //     }
    //   })
    //   .catch((error) => console.log(error));

    // Permissions.getAsync(Permissions.NOTIFICATIONS)
    //   .then((result) => {
    //     if (result.status !== "granted") {
    //       return Permissions.askAsync(Permissions.NOTIFICATIONS);
    //     }
    //     return result;
    //   })
    //   .then((result) => {
    //     console.log(result);
    //     if (result.status === "granted") {
    //       Notifications.getExpoPushTokenAsync({
    //         projectId: "b755735e-1295-484e-9631-af25d4bb1d2a",
    //       }).then((result) => console.log("Expo result: ", result));
    //     }
    //   })
    //   .catch((err) => console.log(err));

    Notifications.requestPermissionsAsync()
      .then((result) => {
        console.log(result);
        if (result.status === "granted") {
          Notifications.getExpoPushTokenAsync({
            projectId: "b755735e-1295-484e-9631-af25d4bb1d2a",
          }).then((result) => console.log("Expo result: ", result));
        }
      })
      .catch((err) => console.log(err));

    AsyncStorage.getItem("notification_id")
      .then((result) => {
        console.log("NOTIFICATION_ID from asyncStorage", result);
        setNotificationID(result);
      })
      .catch((err) => console.log(err));

    AsyncStorage.getItem("alarm")
      .then((result) => {
        console.log("++++++", JSON.parse(result).alarm);
        setAlarm(JSON.parse(result).alarm);
      })
      .catch((err) => console.log(err));

    return () => {
      notificationRecievedListener.remove();
      notificationResponseReceivedListener.remove();
    };
  }, []);

  const toggleAlarm = () => {
    setAlarm((alarm) => {
      console.log("전에", alarm);
      const newValue = !alarm;
      console.log("후에", newValue);
      // if (newValue) {
      //   Notifications.scheduleNotificationAsync({
      //     content: {
      //       title: "book SALE!",
      //       body: "어떤 책이 세일되었는지 서둘러 확인하세요!",
      //       data: {
      //         id: "653f47b15a9d192d6a5c4e58",
      //         message: "60초마다 50% 힐인받을 수 있게 됐다!!!",
      //       },
      //     },
      //     trigger: {
      //       seconds: 5,
      //     },
      //   })
      //     .then((id) => {
      //       setNotificationID(id);
      //       console.log("sale will be informed as this ID", id);
      //       AsyncStorage.setItem("notification_id", id);
      //     })
      //     .catch((err) => console.log(err));
      // } else {
      //   Notifications.cancelScheduledNotificationAsync(notificationID)
      //     .then((result) => {
      //       AsyncStorage.removeItem("notification_id)");
      //       console.log("notification removed from AsyncStorage");
      //     })
      //     .catch((error) => console.log(error));
      // }
      if (newValue) {
        Notifications.scheduleNotificationAsync({
          content: {
            title: "Зорилгоо сана !!!",
            body: "Бидэнд ямар зорилго байгааг дахин нэг харна уу",
            data: {
              id: "653f47b15a9d192d6a5c4e58",
              message:
                "1 өгүүлбэрийн цаана Монгол улс, үндэстний бүх хөгжил, дэвшил, боломж, амжилт, амьд үлдэх арга байна!!!",
            },
          },
          trigger: {
            seconds: 86400,
          },
        })
          .then((id) => {
            setNotificationID(id);
            console.log("sale will be informed as this ID", id);
            AsyncStorage.setItem("notification_id", id);
          })
          .catch((err) => console.log(err));
      } else {
        Notifications.cancelScheduledNotificationAsync(notificationID)
          .then((result) => {
            AsyncStorage.removeItem("notification_id");
            console.log("notification removed from AsyncStorage");
          })
          .catch((error) => console.log(error));
      }
      AsyncStorage.setItem("alarm", JSON.stringify({ alarm: newValue }));
      return newValue;
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: mainColor }}>
      <UserState>
        <StatusBar backgroundColor={mainColor} barStyle="light-content" />
        <View
          style={{
            flex: 1,
            backgroundColor: mainColor,
            paddingHorizontal: 30,
            paddingVertical: 20,
          }}
        >
          <Text style={{ fontSize: 24, color: lightColor }}>
            - Хэрэглэгчийн тохиргооны хэсэг
          </Text>
          <Text style={{ fontSize: 16, color: lightColor, marginTop: 10 }}>
            Нэмэлт тохируулгууд энд нэмэгдэж хөгжүүлэгдэнэ.
          </Text>
        </View>
        <Animatable.View
          animation="fadeInUpBig"
          duration={800}
          style={{
            flex: 5,
            backgroundColor: "#fff",
            paddingHorizontal: 30,
            paddingVertical: 20,
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
          }}
        >
          <ScrollView>
            <FormSwitch
              label="Зорилгыг өдөр бүр сануулах эсэх"
              icon="clock"
              value={alarm}
              onChangeValue={toggleAlarm}
              data={["сануулга хүлээн авна", "сануулга хүлээн авахгүй"]}
            />
            <View>
              <Text style={{ marginTop: 30 }}>
                Only 'Just after login", you can delete your account permanently
                and directly.
              </Text>
              <MyButton
                title="Delete user account"
                onPress={() => {
                  Alert.alert(
                    "Caution",
                    "Are you sure you want to delete your account? if so, please re-login and use DELETE button directly",
                    [
                      {
                        text: "Turn back",
                        onPress: () => {
                          props.navigation.goBack();
                        },
                      },
                      {
                        text: "Delete",
                        onPress: async () => {
                          try {
                            // Check if state.result and state.result.user are not null
                            if (
                              state.result &&
                              state.result.user &&
                              state.result.user._id
                            ) {
                              await state.deleteAccount(state.result.user._id);
                            } else {
                              console.log(
                                "Result or its properties are null or undefined"
                              );
                            }
                          } catch (error) {
                            console.error(
                              "Error deleting account:",
                              error.message
                            );
                          }
                        },
                      },
                    ]
                  );
                }}
              />
            </View>
          </ScrollView>
        </Animatable.View>
      </UserState>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default SettingsScreen;
