import 'react-native-gesture-handler';
import React, { useContext } from "react";
import { Alert, View, Button } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './src/screens/HomeScreen';
import BookDetailScreen from './src/screens/BookDetailScreen';
import { Feather } from '@expo/vector-icons';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import { UserState } from './src/context/UserContext';
import UserContext from './src/context/UserContext';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


const StackNavigator = () => (
    <Stack.Navigator
        initialRouteName="Home"
    >
        <Stack.Screen
            name="Home"
            component={HomeScreen}
        />
        <Stack.Screen
            name="Detail"
            component={BookDetailScreen}
        />
    </Stack.Navigator>
);

const DrawerNavigator = () => {
    try {
        const state = useContext(UserContext);
        return (
            <NavigationContainer>
                <UserState>
                    <Drawer.Navigator initialRouteName={state.isLoggedIn ? 'Home' : 'Login'}>
                        <Drawer.Screen name="Home" component={StackNavigator} />
                        {state.isLoggedIn ? (
                            <Drawer.Screen name="Logout" component={LoginScreen} />
                        ) : (
                            <>
                                <Drawer.Screen name="Login" component={LoginScreen} />
                                <Drawer.Screen name="Signup" component={SignupScreen} />
                            </>
                        )}
                    </Drawer.Navigator>
                </UserState>
            </NavigationContainer>

        );
    } catch (error) {
        console.error("Error occurred: ", error);
    }
};

export default DrawerNavigator;

