import React from "react";
import { Button, View, Text, StyleSheet, Alert } from "react-native";
import { BlurView } from "expo-blur";
import { NavigationContainer } from "@react-navigation/native";
import MyDrawerNavigation from "./src/navigation/MyDrawerNavigator";
import { UserState } from "./src/context/UserContext";

function App() {
    return (
        <NavigationContainer>
            <UserState>
                <MyDrawerNavigation />
            </UserState>
        </NavigationContainer>
    );
}

export default App;