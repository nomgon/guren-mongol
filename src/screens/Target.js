import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import MyButton from "../components/MyButton";

const Target = ({ navigation }) => {
  return (
    <ScrollView style={{}}>
      <View style={styles.scroll}>
        <Image
          style={{
            width: "50%",
            height: "40%",
            alignSelf: "center",
            marginTop: 10,
          }}
          source={require("../../assets/images/chinggis.jpeg")}
        />
        <Text style={styles.text}>
          Ард иргэд өөрсдөө хуулийг санаачлах, парламент баталсан хуулийг хэзээд
          цуцлах, түдгэлзүүлэх эрхийг Үндсэн хуулинд онцгойлон тодорхойлж, олгох
          бүрэн боломжтой.
        </Text>
        <Text style={styles.text}>
          Энэхүү ганц өгүүлбэрээр бүх цаг үеийн алдааг залруулж Монгол улс,
          үндэстнийг дэлхийн тэргүүлэх улс үндэстэн болгоно.
        </Text>
        <Text style={styles.text}>
          Төр бол нам гэсэн 100 жилийн бурангуй, алдаатай ойлголт, бодлогыг Төр
          бол ард түмэн гэсэн ойлголт бодлогоор сольно. Ингэснээр Монголчууд эх
          орондоо эзэн нь болно. Намын удирдагчид улс үндэстнийг бусдад найр
          тавин өгөх, зарах, хөгжлийг хааж саатуулах, боломжийг хулгайлах явдал
          үүрд дуусгавар болно.
        </Text>
        <Text style={styles.text}>
          Монгол улс, үндэстэн мянган мянган жил Мөнх тэнгэрийн дор мандан
          бадрах боломж 1 өгүүлбэрийн цаана байна.
        </Text>
        <MyButton
          style={styles.button}
          title="Буцах"
          onPress={() => navigation.goBack()}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  text: {
    paddingHorizontal: 50,
    paddingVertical: 10,
    fontSize: Platform.OS === "ios" ? 13 : 13,
    lineHeight: 20,
    fontFamily: Platform.OS === "ios" ? "Helvetica" : "Roboto",
  },
  button: {
    marginHorizontal: 150,
    marginBottom: 10,
  },
  scroll: {
    marginBottom: Platform.OS === "ios" ? 100 : 400,
    flexGrow: 1,
  },
});

export default Target;
