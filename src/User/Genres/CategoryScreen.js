import React, { useState, useEffect, Fragment } from 'react';
import {
    FlatList,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    SafeAreaView,
} from 'react-native';

import { PlaylistScreen } from '../Playlists/Playlist';
import { getVibrantColors } from '../../Data/Colors/GetColors';
// props.CategoryItems, props.navigation, props.categoryImage

export const categoryScreen = ({ route, navigation }) => {
    const [gradientColor, SetGradientColor] = useState('#191414');
    const CategoryNavigationContext = React.useMemo(() => ({
        GotoPlaylist: (playlist_id) => {
            if(playlist_id === null || playlist_id === '') return;
            navigation.navigate('Playlist', { categoryPlaylistID})
        }
    }));
    // const { categoryID } = route.params
    // const renderItem = () => (

    // );
    useEffect(() => {
        async function getGradientColor() {
            SetGradientColor(await getVibrantColors(props.categoryImage))
        }
        if (props.categoryImage !== null && props.categoryImage !== undefined) getGradientColor();
    }, []);
    return (
        <View style={[styles.MainContainer]}>

        </View>
    );
}

// parameters: categoryPlaylistID
export const categoryPlaylist = ({ route, navigation }) => {
    const { categoryPlaylistID } = route.params;
    return (
        <View>

        </View>
    );
}

// props.playlistName, props.playlistID, props.ImageName
const categoryItem = (props) => {
    return (
        <View>
            <TouchableOpacity style={[styles.CategoryItemBox]}>
                {
                    <Image source={{ uri: `${props.img}` }} style={[style.PlaylistImage]} />
                }
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    MainContainer: {
        backgroundColor: '#191414',
        flexDirection: 'column',
    },
    CategoryItemBox: {
        backgroundColor: '#1DB954',
        height: 130,
        width: 130,
    },
    PlaylistImage: {
        height: 130,
        width: 130,
    },
    PlaylistTitleText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    PlaylistFollowersDetail: {

    },
});