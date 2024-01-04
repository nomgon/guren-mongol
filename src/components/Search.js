import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

import { Feather } from "@expo/vector-icons";

const Search = ({ value, onValueChange, onFinishEnter }) => {
  return (
    <View style={css.searchPanel}>
      <Feather style={css.searchIcon} name="search" color="#535C68" />
      <TextInput
        onChangeText={onValueChange}
        style={css.searchText}
        placeholder="хайлт"
        placeholderTextColor="#2d3436"
        autoCapitalize="none"
        autoCorrect={false}
        onEndEditing={onFinishEnter}
      />
    </View>
  );
};

export default Search;

const css = StyleSheet.create({
  searchPanel: {
    top: 15,
    height: 50,
    backgroundColor: "#BDC3C7",
    marginHorizontal: 15,
    marginBottom: 2,
    borderRadius: 7,
    flexDirection: "row",
  },
  searchText: {
    color: "black",
    fontSize: 18,
    flex: 1,
  },
  searchIcon: {
    fontSize: 34,
    alignSelf: "center",
    marginHorizontal: 15,
  },
});
