import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  Image,
  Alert,
} from "react-native";
import React, { useContext } from "react";
import useBook from "../hooks/useBook";
import UserContext from "../context/UserContext";
import { restApiUrl } from "../Constant";

const BookDetailScreen = (props) => {
  const { id } = props.route.params;
  const [book, error, deleteBook] = useBook(id);
  const userState = useContext(UserContext);

  const removeBook = () => {
    Alert.alert("Анхаар", "Энэ мэдээллийг устгахдаа итгэлтэй байна уу?", [
      {
        text: "Цуцлах",
        onPress: () => {},
      },
      {
        text: "Устгах",
        onPress: () => {
          deleteBook(book._id)
            .then((result) => {
              console.log("Book is removed as successfully.", result.data.data);
              props.navigation.navigate("Үүсгэн байгуулагчид", {
                deletedBook: result.data.data,
              });
            })
            .catch((err) => {
              Alert.alert(
                "Мэдээлэл бүрэн устгагдлаа. ",
                err.response.data.error.message
              );
              console.log(err.response.data.error.message);
            });
        },
      },
    ]);
  };

  if (error) {
    return (
      <Text style={{ color: "red", margin: 30 }}>Error occured! {error}</Text>
    );
  }
  if (!book) {
    return null;
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ padding: 20 }}>
      {book.photo.startsWith("/") ? (
        <Image
          style={{ width: 350, height: 530, alignSelf: "center", marginTop: 2 }}
          source={{ uri: "https://m.media-amazon.com/images/I" + book.photo }}
        />
      ) : (
        <Image
          style={{ width: 350, height: 530, alignSelf: "center", marginTop: 2 }}
          source={{ uri: restApiUrl + "/upload/" + book.photo }}
        />
      )}
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          marginHorizontal: 60,
          top: 10,
        }}
      >
        {book.name}
      </Text>
      <Text style={{ marginHorizontal: 50, marginTop: 15 }}>
        {book.content}
      </Text>
      <View style={{ marginHorizontal: 100, marginTop: 10 }}>
        {userState.userRole === "admin" && (
          <Button
            title="Мэдээллийг устгах"
            color="#00a8ff"
            onPress={removeBook}
          />
        )}
      </View>
      <View style={{ marginHorizontal: 150, marginBottom: 90, marginTop: 10 }}>
        <Button
          title="Буцах"
          color="#00a8ff"
          onPress={() => {
            Alert.alert("Анхаар", "Энэ хуудаснаас гарах гэж байна уу", [
              {
                text: "үгүй",
                onPress: () => console.log("cancel"),
              },
              {
                text: "тийм",
                onPress: () => props.navigation.goBack(),
              },
            ]);
          }}
        />
      </View>
    </ScrollView>
  );
};

export default BookDetailScreen;

const styles = StyleSheet.create({});
