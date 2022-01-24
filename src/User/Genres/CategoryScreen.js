import React, { useState, useEffect, Fragment, useRef } from 'react';
import {
    FlatList,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    SafeAreaView,
    Animated
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import { PlaylistScreen } from '../Playlists/Playlist';
import { getVibrantColors } from '../../Data/Colors/GetColors';
import { getCategoryPlaylists } from './GetCategoryPlaylists';

import Ionicons from 'react-native-vector-icons/Ionicons';
// props.CategoryItems, props.navigation, props.categoryImage

// params: categoryID, categoryName, categoryImage, navigation
export const CategoryInnerScreen = ({ route }) => {
    const { categoryID, categoryName, categoryImage, navigation } = route.params;
    const [allCategoryPlaylists, SetCategoryPlaylists] = useState(null);
    useEffect(() => {
        async function getCatPlaylists() {
            SetCategoryPlaylists(await getCategoryPlaylists(categoryID));
        }
        if (allCategoryPlaylists === null) getCatPlaylists();
    }, []);
    const renderItem = ({ item }) => (
        (item === null || item === undefined || item.name === 'theLINER')
            ? <View />
            : <CategoryInnerItem
                playlist_data={item}
                navigation={navigation}
            />
    );
    return (
        <View style={[styles.MainContainer]}>
            <View style={[styles.CategoryPlaylistsView]}>
                {
                    (categoryID === null || categoryID === undefined)
                        ? <Text style={[styles.SampleText]}>Error obtaining category data. Check again later</Text>
                        : (allCategoryPlaylists === null || allCategoryPlaylists === undefined)
                            ? <View />
                            : <FlatList data={allCategoryPlaylists.playlists.items}
                                renderItem={renderItem}
                                keyExtractor={(itemKey, index) => index.toString()}
                                numColumns={2}
                                columnWrapperStyle={{
                                    justifyContent: 'space-between',
                                    marginLeft: 10,
                                    marginRight: 10,
                                }}
                                contentContainerStyle={{
                                    paddingBottom: 165,
                                    flexGrow: 1
                                }}
                                scrollIndicatorInsets={{ right: 1 }}
                                indicatorStyle='white'
                                ListHeaderComponent={
                                    <StickyHeader
                                        navigation={navigation}
                                        category_name={categoryName}
                                    />
                                }
                                stickyHeaderIndices={[0]}
                            />
                }
            </View>
        </View>
    );
}


// this calls the Playlist function
// parameters: categoryPlaylistID
export const categoryPlaylist = ({ route, navigation }) => {
    // call the PlayListscreen function
    const { categoryPlaylistID } = route.params;
    return (
        <View />
    );
}
// params: props.navigation, props.category_name
const StickyHeader = (props) => {
    return (
        <View style={[styles.StickyHeaderStyle]}>
            <TouchableOpacity style={[styles.BackButton]} onPress={() => props.navigation.goBack()}>
                <Ionicons name='ios-chevron-back-sharp' size={34} color='#FFFFFF' />
            </TouchableOpacity>
            <Text style={[styles.CategoryHeaderText]}>{props.category_name}</Text>
            <View style={{ flex: 1 }} />
        </View>
    );
}

const CategoryInnerItem = ({ playlist_data, navigation }) => {
    return (
        <TouchableOpacity style={[styles.CategoryItemBox]} onPress={() => navigation.navigate('Playlist', { playlistID: playlist_data.id })}>
            <View style={[styles.PlaylistImageView]}>
                {
                    (playlist_data.images[0] === null || playlist_data.images[0] === undefined)
                        ? <View />
                        : <Image source={{ uri: `${playlist_data.images[0].url}` }} style={[styles.PlaylistImageStyle]} />
                }
            </View>
            <Text style={[styles.CategoryPlaylistTextStyle]}>{playlist_data.name}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    MainContainer: {
        backgroundColor: '#191414',
        flexDirection: 'column',
        flex: 1,
        position: 'relative',
    },
    CategoryItemBox: {
        // backgroundColor: '#1DB954',
        backgroundColor: 'transparent',
        marginLeft: 4,
        marginRight: 4,
        marginTop: 10,
        marginBottom: 10,
        width: 170,
    },
    PlaylistImageView: {
        width: 170,
        height: 170,
    },
    PlaylistImageStyle: {
        width: '100%',
        height: '100%',
    },
    PlaylistTitleText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    CategoryPlaylistsView: {
        justifyContent: 'space-between',
    },
    CategoryPlaylistTextStyle: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 14,
        paddingTop: 6,
    },
    BackButton: {
        backgroundColor: 'transparent',
        flex: 1,
    },
    StickyHeaderStyle: {
        width: '100%',
        height: 80,
        backgroundColor: '#191414',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    CategoryHeaderText: {
        color: '#FFFFFF',
        fontSize: 28,
        fontWeight: '700',
        textAlign: 'center',
    },
});