import React from 'react';
import {
    View,
    FlatList,
    Image,
    Text,
    StyleSheet
} from 'react-native';

export const LikedTracksScreen = (props) => {
    // props.userID
    // call GetLikedTracks to get liked track list of user
    return (
        <View style={[styles.MainContainer]}>

        </View>
    );
}

const styles = StyleSheet.create({
    MainContainer: {
        backgroundColor: 'transparent',
        flex: 1,
    }
});