import React from 'react';
import {
    View,
    ScrollView,
    FlatList,
    Text,
    Image,
    StyleSheet,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { FeedItem } from './FeedItem';
import FeedData from './FeedData/FeedData.json'; // sample feed data
import { TopView } from '../Screens/HomeScreen';

// const feedImages = FeedData.map(data => require(`../../../assets/${data.imageName}`));

export const FeedDisplay = () => {
    const renderItem = ({ item }) => (
        <FeedItem feedName={item.FeedName} feedItems={item.FeedItems} />
    );
    return (
        <FlatList
            ListHeaderComponent={<TopView />}
            data={FeedData}
            renderItem={renderItem}
            keyExtractor={item => item.FeedID}
            contentContainerStyle={{ paddingBottom: 160 }}
            indicatorStyle='white'
        />
    );
}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        flexDirection: 'column',
    }
});