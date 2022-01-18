import React from 'react';
import {
    View,
    ScrollView,
    Image,
    Text,
    StyleSheet,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

const LibraryStack = createStackNavigator();

export const LibraryScreen = () => {
    return (
        <View style={[styles.MainContainer]}>

        </View>
    );
}

const styles = StyleSheet.create({
    MainContainer: {
        backgroundColor:'#191414',
        flex:1,
        flexDirection:'row',
    },
});