import React, { useState, useLayoutEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  Button,
} from "react-native";

import {
  HeaderButtons,
  Item,
  HiddenItem,
  OverflowMenu,
  Divider,
} from "react-navigation-header-buttons";
import { Feather } from "@expo/vector-icons";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Search from "../components/Search";
import useCategory from "../hooks/useCategory";
import CategoryBookList from "../components/CategoryBookList";
import Spinner from "../components/Spinner";
import MyHeaderButton from "../components/MyHeaderButton";
import UserContext from "../context/UserContext";

const HomeScreen = ({ navigation, route }) => {
  const [localSearchText, setLocalSearchText] = useState("");
  const [serverSearchText, setServerSearchText] = useState("");
  const [categories, errorMessage, loading] = useCategory();
  const [refresh, setRefresh] = useState(false);

  if (route.params && route.params.deletedBook) {
    Alert.alert(
      route.params.deletedBook.name +
        " named book has been deleted as permenantly"
    );
    delete route.params.deletedBook;
    setRefresh(true);
  }
  const state = useContext(UserContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      // headerRight: () => (
      //   <HeaderButtons HeaderButtonComponent={MyHeaderButton}>
      //     <Item
      //       title="Цэс"
      //       iconName="ios-menu"
      //       onPress={() => navigation.toggleDrawer()}
      //     />
      //   </HeaderButtons>
      // )
      title: state.userName
        ? "Сайн байна уу " + state.userName
        : "Улсын эрх ашиг, тусгаар тогтнолын нам",
      headerTitleStyle: {
        fontSize: 18,
      },
    });
  }, [navigation, localSearchText, state.userName]);

  const searchBookFromServer = () => {
    console.log(`Сэрвэрээс ${localSearchText} утгаар хайж эхэллээ...`);

    setServerSearchText(localSearchText);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {loading ? (
        <Spinner />
      ) : (
        <View>
          <Search
            value={localSearchText}
            onValueChange={setLocalSearchText}
            onFinishEnter={searchBookFromServer}
          />

          {errorMessage && (
            <Text style={{ marginHorizontal: 20, color: "red" }}>
              {errorMessage}
            </Text>
          )}
          <ScrollView style={{ marginTop: 20 }}>
            {categories.map((category) => (
              <CategoryBookList
                setRefreshCategories={setRefresh}
                refreshCategories={refresh}
                searchLocalValue={localSearchText}
                searchServerValue={serverSearchText}
                key={category._id}
                style={{ marginVertical: 10 }}
                data={category}
              />
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
