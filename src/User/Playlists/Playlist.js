import React, { useState, useEffect, Fragment } from 'react';
import {
    View,
    FlatList,
    Image,
    TouchableOpacity,
    Text,
    TextInput,
    StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// import SamplePlaylist from './SamplePlaylist.json';
import { getAuthToken } from '../UserConfig/getAuthToken';
import { getPlaylistTracks } from './GetPlaylistData';
import { getVibrantColors } from '../../Data/Colors/GetColors';

import { PlaylistTrackItem } from '../Tracks/PlaylistTrackItem';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'

// first query the playlist in props.playlistID
// parameter: playlistID
export const PlaylistScreen = ({ route, navigation }) => {
    const { playlistID } = route.params;
    const [authToken, SetAuthToken] = useState(null);
    const [isAuthenticated, SetAuthenticated] = useState(false);
    const [playlistData, SetPlaylistData] = useState(null);
    const necessaryFields = 'name,followers,owner,images,id,primary_color,description,tracks(items(track(uri,id,name,album(images),artists(name))))';
    useEffect(() => {
        async function getTrackList() {
            let data = await getPlaylistTracks(playlistID, necessaryFields);
            SetPlaylistData(data);
        }
        if (playlistData === null) getTrackList();
    }, []);
    // necessary fields = name,images,id,primary_color,description,tracks(items(track(uri,id,name,album(images),artists(name))))
    // fields including owner = name,owner,images,id,primary_color,description,tracks(items(track(uri,id,name,album(images),artists(name))))
    return (
        <View style={[styles.MainContainer]}>
            {
                (playlistData === null) // if no playlist data is found from the playlist id parameter
                    ? <Text style={[styles.PlaylistNameText]}>Null</Text>
                    : <PlaylistDisplay playlist_data={playlistData} />
                // <PlaylistTopView img={PlaylistTracks.images[0].url} />
            }
        </View>
    );
}

const PlaylistDisplay = (props) => {
    const [isLoading, SetIsLoading] = useState(true);
    const [pid, SetPlaylistID] = useState(null);
    const renderItem = ({ item }) => (
        (item === null || item.track === null || item.track.id === null)
            ? <View></View>
            : <PlaylistTrackItem
                item_artists={item.track.artists}
                item_track_name={item.track.name}
                item_album_image_small={item.track.album.images[2].url}
                item_album_image_medium={item.track.album.images[1].url}
                item_track_id={item.track.id}
            />
    );
    // console.log(props.playlist_data.tracks.items[0].track.id);
    // console.log(props.playlist_data.tracks.items[0].track.artists);
    // <PlaylistTrackItem item_data={props.playlist_data.tracks.items[0]} />
    // console.log(props.playlist_data.images[0].url);
    // console.log(props.playlist_data.tracks.items.length);
    useEffect(() => {
        function getPID() {
            SetPlaylistID(props.playlist_data.tracks.items[0].track.id);
            setTimeout(() => {
                SetIsLoading(false);
            }, 70);
        }
        if (pid === null) getPID();
    }, []);
    return (
        <>
            {
                (pid === null || isLoading === true)
                    ? <View style={[styles.EmptyView]}></View>
                    : <FlatList
                        ListHeaderComponent={<PlaylistTopView
                            img={props.playlist_data.images[0].url}
                            owner={props.playlist_data.owner}
                            track_count={props.playlist_data.tracks.items.length}
                            description={props.playlist_data.description}
                            followers={props.playlist_data.followers.total}
                        />}
                        data={props.playlist_data.tracks.items}
                        renderItem={renderItem}
                        keyExtractor={item => (item === null || item.track === null || item.track.id === null) ? 'ERROR_NULL_OBJ' : item.track.id}
                        contentContainerStyle={{ paddingBottom: 155 }}
                        scrollIndicatorInsets={{ right: 1 }}
                    />
            }
        </>
    );
}

// props.img, props.owner, props.track_count, props.followers
const PlaylistTopView = (props) => {
    const [coverColor, SetCoverColor] = useState('#191414');
    // const [isLoading, SetIsLoading] = useState(true);
    useEffect(() => {
        async function getCoverColors() {
            SetCoverColor(await getVibrantColors(props.img));
        }
        if (coverColor === '#191414') {
            getCoverColors();
        }
    }, []);
    return (
        <LinearGradient colors={[coverColor, '#191414']} style={[styles.TopViewContainer]} start={{ x: 0, y: 0.2 }} end={{ x: 0, y: 1 }}>
            <View style={[styles.CoverImageContainer]}>
                <Image source={{ uri: `${props.img}` }} style={[styles.PlaylistCoverImageStyle]} />
            </View>
            <View style={[styles.PlaylistInfoView]}>
                <Text style={[styles.PlaylistDescriptionText]}>{props.description}</Text>
                <View style={[styles.DetailControlsView]}>
                    <View style={[styles.ColumnContainer, { flex: 1 }]}>
                        <TouchableOpacity style={[styles.UserProfileButton]}>
                            <Text style={[styles.PlaylistOwnerText]}>{`${props.owner.display_name}`}</Text>
                        </TouchableOpacity>
                        <Text style={[styles.PlaylistCountText]}>{`${props.track_count} Songs`}</Text>
                        <Text style={[styles.PlaylistCountText]}>{`${props.followers} Likes`}</Text>
                    </View>
                    <TouchableOpacity style={[styles.PlayButton]} activeOpacity={0.5}>
                        <Ionicons name='play-sharp' size={24} color={'#FFFFFF'} />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 6 }}>
                    <TouchableOpacity style={[styles.SmallButton]}>
                        <Ionicons name='heart-outline' size={26} color='#FFFFFF' />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.SmallButton]}>
                        <AntDesign name='download' size={26} color={'#FFFFFF'} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.SmallButton, { paddingTop: 4 }]}>
                        <SimpleLineIcons name='options' size={24} color={'#FFFFFF'} />
                    </TouchableOpacity>
                </View>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        backgroundColor: '#191414',
    },
    EmptyView: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    TopViewContainer: {
        flex: 1,
        marginBottom: 15,
    },
    RowContainer: {
        flexDirection: 'row',
    },
    ColumnContainer: {
        flexDirection: 'column',
    },
    CoverImageContainer: {
        alignSelf: 'center',
        flex: 3,
        marginTop: 60,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    PlaylistCoverImageStyle: {
        height: 250,
        width: 250,
    },
    PlaylistInfoView: {
        flex: 1,
        paddingLeft: 12,
        marginTop: 15,
        flexDirection: 'column',
    },
    UserProfileButton: {
        paddingTop: 5,
        marginBottom: 5
    },
    PlaylistOwnerText: {
        fontSize: 20,
        color: '#FFFFFF',
        fontWeight: '600',
    },
    PlaylistDescriptionText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#FFFFFF99',
        marginBottom: 8,
    },
    DetailControlsView: {
        flexDirection: 'row',
    },
    PlaylistCountText: {
        fontSize: 15,
        fontWeight: '500',
        color: '#FFFFFF90',
    },
    PlayButton: {
        borderRadius: 30,
        backgroundColor: '#1DB954',
        height: 53,
        width: 53,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginRight: 10,
    },
    SmallButton: {
        marginRight: 22,
    },
});