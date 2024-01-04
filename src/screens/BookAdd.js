import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Alert,
  Button,
  Image,
} from "react-native";
import { mainColor, lightColor, textColor, restApiUrl } from "../Constant";
import FormText from "../components/FormText";
import * as Animatable from "react-native-animatable";
import FormSwitch from "../components/FormSwitch";
import FormPicker from "../components/FormPicker";
import useCategory from "../hooks/useCategory";
import Spinner from "../components/Spinner";
import MyButton from "../components/MyButton";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";

const BookAdd = (props) => {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled || !result.cancelled) {
      setBook({ ...book, photo: result.assets[0].uri });
    }
  };
  const [uploadTotal, setUploadTotal] = useState(0);
  const [uploadProgress, setUploadProgress] = useState();
  const [savingToServer, setSavingToServer] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [categories, errorMessage, loading] = useCategory();
  const [book, setBook] = useState({
    name: "",
    photo: "",
    content: "",
    rating: 4.0,
    balance: 0,
    price: "",
    author: "",
    bestseller: true,
    available: ["old", "new"],
    category: "null",
  });
  const [error, setError] = useState({
    name: false,
    content: false,
    price: false,
    author: false,
  });
  const handleUploadComplete = (event, bookID) => {
    console.log("Upload has been completed");
    setUploadProgress(0);
    setUploadTotal(0);
    props.navigation.navigate("Detail", { id: bookID });
  };
  const handleUploadProgress = (event) => {
    if (uploadTotal === 0) setUploadTotal(event.total);

    setUploadProgress((uploadProgress) => {
      console.log("Uploadable total", uploadTotal);
      console.log("Uploading progress", uploadProgress);
      return Math.round((event.loaded * 100) / event.total);
    });
  };
  const sendBookToServer = () => {
    if (book.category !== "null") {
      setSavingToServer(true);

      const fileURI = book.photo;
      const fileExt = fileURI.substring(fileURI.lastIndexOf(".") + 1);
      book.photo = `photo_${new Date().getTime()}.${fileExt}`;

      axios
        .post(`${restApiUrl}/api/v1/books/`, book)
        .then((result) => {
          setSavingToServer(false);
          const newBook = result.data.data;
          const xhr = new XMLHttpRequest();
          xhr.addEventListener("load", (event) =>
            handleUploadComplete(event, newBook._id)
          );
          xhr.upload.addEventListener("progress", handleUploadProgress);
          const data = new FormData();

          data.append("file", {
            uri: fileURI,
            type: `image/${fileExt}`,
            name: book.photo,
          });
          xhr.open(
            "PUT",
            `${restApiUrl}/api/v1/books/${newBook._id}/upload-photo`
          );
          xhr.send(data);
        })
        .catch((serverError) => {
          // setSavingToServer(false);
          if (serverError.response)
            setServerError(serverError.response.data.error.message);
          else setServerError(serverError.response);
        })
        .finally(() => {
          setSavingToServer(false);
        });
    } else {
      Alert.alert("10тыг сонгоно уу");
    }
  };
  const toggleBestSeller = () => {
    setBook({
      ...book,
      bestseller: !book.bestseller,
    });
  };
  const checkName = (text) => {
    // let isValid = false;
    // if (text.length < 5 || text.length > 30) isValid = true;
    // setError({
    //   ...error,
    //   name: isValid,
    // });

    setError({
      ...error,
      name: text.length < 5 || text.length > 61,
    });

    setBook({
      ...book,
      name: text,
    });
  };
  const checkAuthor = (text) => {
    setError({
      ...error,
      author: text.length < 5 || text.length > 91,
    });
    setBook({
      ...book,
      author: text,
    });
  };

  const checkPrice = (text) => {
    setError({
      ...error,
      price: text < 5,
    });
    setBook({
      ...book,
      price: text,
    });
  };
  const checkContent = (text) => {
    setError({
      ...error,
      content: text.length < 1001,
    });
    setBook({
      ...book,
      content: text,
    });
  };
  if (uploadTotal > 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{
            marginBottom: 20,
            fontSize: 20,
            marginLeft: 50,
            marginRight: 50,
          }}
        >
          Зургийг сэрвэр рүү ачаалж байна...
        </Text>
        <View style={{ height: 30, backgroundColor: "#d63031", width: 100 }}>
          <View
            style={{
              height: 30,
              backgroundColor: "#00b894",
              width: uploadProgress,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", marginTop: 6 }}>
              {uploadProgress}%
            </Text>
          </View>
        </View>
      </View>
    );
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: mainColor }}>
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
          Үүсгэн байгуулагчийг нэмэх
        </Text>
        <Text style={{ fontSize: 16, color: lightColor, marginTop: 10 }}>
          Зорилго, үзэл баримтлал ижил тохиолдолд бүртгүүлнэ
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
        {loading || savingToServer ? (
          <Spinner />
        ) : (
          <ScrollView>
            {serverError &&
              Alert.alert("Attention", serverError, [
                {
                  text: "ok",
                  onPress: setServerError(null),
                },
              ])}

            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                title="Утаснаас зураг оруулах (5MB-аас ихгүй)"
                onPress={pickImage}
              />
              {book.photo && (
                <Image
                  source={{ uri: book.photo }}
                  style={{ width: 100, height: 100 }}
                />
              )}
            </View>
            <FormText
              label="Үүсгэн байгуулагчийн овог нэр"
              placeHolder="Бэгзийн ГИВААН гэх мэтээр оруулна уу"
              icon="user"
              value={book.name}
              onChangeText={checkName}
              errorText="4-60 тэмдэгт байна."
              errorShow={error.name}
            />
            <FormText
              label="Facebook хаягийн холбоос"
              placeHolder="facebook.com/batjargal.gochoosuren.5"
              icon="facebook"
              value={book.author}
              onChangeText={checkAuthor}
              errorText="4-90 тэмдэгт байна"
              errorShow={error.author}
            />

            <FormText
              label="Утасны дугаар"
              placeHolder="зөвхөн 1 дугаар оруулна уу"
              icon="phone"
              keyboardType="numeric"
              value={book.price}
              onChangeText={checkPrice}
              errorText="Утасны дугаарыг бүрэн оруулна уу"
              errorShow={error.price}
            />
            <FormText
              label="Хаяг, Ажил мэргэжил"
              placeHolder="гэрийн хаяг, ажил мэргэжил"
              icon="anchor"
              multiline
              numberOfLines={10}
              value={book.content}
              onChangeText={checkContent}
              errorText="1000 тэмдэгтээс илүүгүй байна"
              errorShow={error.content}
            />
            <FormSwitch
              label="Сонгуульд нэр дэвших эсэх"
              icon="trending-up"
              value={book.bestseller}
              onChangeValue={toggleBestSeller}
              data={["Нэр дэвшинэ", "Нэр дэвшихгүй"]}
            />

            <FormPicker
              label="Харъяалагдах АРАВТ-ыг сонгох"
              icon="layers"
              data={categories.map((el) => el.name)}
              value={categories.map((el) => el._id)}
              onValueChange={(value, index) => {
                setBook({ ...book, category: value });
                console.log(value);
              }}
              selectedValue={book.category}
            />
            <View
              style={{ flexDirection: "row", justifyContent: "space-evenly" }}
            >
              <MyButton
                title="Буцах"
                onPress={() => props.navigation.goBack()}
              />
              <MyButton title="Бүртгүүлэх" onPress={sendBookToServer} />
            </View>
          </ScrollView>
        )}
      </Animatable.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default BookAdd;
