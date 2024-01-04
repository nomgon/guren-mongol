import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Detail from "../screens/BookDetailScreen";
import { restApiUrl } from "../Constant";

const thousandify = require("thousandify");
const Book = ({ data }) => {
  const navigation = useNavigation();
  console.log(data.id);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Detail", { id: data.id })}
      style={{
        marginLeft: 15,
        marginVertical: 15,
        width: 200,
      }}
    >
      {data.photo.startsWith("/") ? (
        <Image
          style={{ width: 211, height: 305, alignSelf: "center", marginTop: 2 }}
          source={{ uri: "https://m.media-amazon.com/images/I" + data.photo }}
        />
      ) : (
        <Image
          style={{ width: 211, height: 305, alignSelf: "center", marginTop: 2 }}
          source={{ uri: restApiUrl + "/upload/" + data.photo }}
        />
      )}
      <Text
        style={{
          marginLeft: 10,
          fontSize: 14,
          marginTop: 10,
          fontWeight: "bold",
        }}
      >
        {data.name}
      </Text>
      <Text
        style={{ marginLeft: 10, top: 5, fontSize: 10, fontWeight: "bold" }}
      >
        {data.author}
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 10,
          marginTop: 10,
          alignItems: "center",
        }}
      >
        <Text style={{ marginRight: 10, fontSize: 14, fontWeight: "bold" }}>
          {/* {thousandify(data.price)}$ */}
          {data.price}
        </Text>

        {/* <Text style={{ marginRight: 10, fontSize: 12, color: "gray" }}>
          {data.balance > 0 ? `${data.balance} pcs` : null}
        </Text> */}
      </View>
    </TouchableOpacity>
  );
};

export default Book;

const styles = StyleSheet.create({});
