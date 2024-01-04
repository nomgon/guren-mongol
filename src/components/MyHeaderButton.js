import React from 'react';
import { StyleSheet } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { HeaderButton } from 'react-navigation-header-buttons';

const MyHeaderButton = props => {
    return (

        <HeaderButton {...props} IconComponent={Ionicons} iconSize={25} color='#fdcb6e' />

    );
}

const styles = StyleSheet.create({})

export default MyHeaderButton;
