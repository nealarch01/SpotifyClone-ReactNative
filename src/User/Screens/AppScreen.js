import React, { useState, Fragment } from 'react';
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    ImageBackground,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from './HomeScreen'
import { SearchScreen } from './SearchScreen'
import { LibraryScreen } from './LibraryScreen';
import { MusicPlayer } from './MusicPlayer/MusicPlayer';

import FoundationIcon from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const AppTab = createBottomTabNavigator();

const AppTabBar = () => {
    return (
        <NavigationContainer independent={true}>
            <View style={[styles.AppBackground]}>
                <AppTab.Navigator
                    initialRouteName='Home'
                    screenOptions={{
                        tabBarActiveTintColor: '#FFFFFF',
                        tabBarInactiveTintColor: '#848482',
                        tabBarStyle: { backgroundColor: '#191414', borderTopColor: 'transparent', position: 'absolute' },

                    }}
                >
                    <AppTab.Screen name='Home' component={HomeScreen} options={{
                        headerShown: false,
                        tabBarIcon: ({ color }) => (
                            <FoundationIcon name='home' size={30} color={color} />
                        ),
                    }} />
                    <AppTab.Screen name='Search' component={SearchScreen} options={{
                        headerShown: false,
                        tabBarIcon: ({ color }) => (
                            <Ionicons name='search' size={30} color={color} />
                        )
                    }} />
                    <AppTab.Screen name='Library' component={LibraryScreen} options={{
                        headerShown: false,
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name='bookshelf' size={30} color={color} />
                        )
                    }} />
                </AppTab.Navigator>
                <View style={[styles.MusicPlayerView]}>
                    <MusicPlayer />
                </View>
            </View>
        </NavigationContainer>
    );
}



export const AppScreen = () => {
    return (
        <AppTabBar />
    );
}

const styles = StyleSheet.create({
    AppBackground: {
        backgroundColor: 'transparent',
        flex: 1,
    },
    MusicPlayerView: {
        marginLeft: 10,
        marginRight: 10,
    }
});