import React, { useState, useEffect} from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import { PlaylistNavContext } from '../AppNavigationContext/PlaylistNavigationContext';
import { getPlaylistCover } from '../Playlists/GetPlaylistCover';

const FeedItemBox = ({ imageSource, details, itemName, playlistID }) => {
    const { GotoPlaylist } = React.useContext(PlaylistNavContext);
    const [playlistImage, SetPlaylistImage] = useState(null);
    useEffect(() => {
        async function getImage() {
            let data = await getPlaylistCover(playlistID);
            SetPlaylistImage(data[0].url);
        }
        if(playlistImage === null || playlistImage === undefined) getImage();
    }, []);
    return (
        <View style={[styles.ImgView]}>
            <TouchableOpacity style={[styles.Button]} activeOpacity={0.9} onPress={() => GotoPlaylist(playlistID)}>
                {
                    (playlistImage === null) 
                    ? <View style={[styles.Img, {backgroundColor: '#191414'}]} /> 
                    :<Image source={{ uri: `${playlistImage}` }} style={[styles.Img]} />
                }
                <View style={[styles.DetailsContainer]}>
                    <Text style={[styles.ItemNameText]}>{itemName}</Text>
                    <Text style={[styles.DetailsText]}>{details}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

export const FeedItem = (props) => {
    /*
    console.log('Printing feed items:')
    console.log(props.feedItems);
    console.log(typeof (props.feedItems));
    console.log('------------------------------------------------')
    */
    const renderItem = ({ item }) => (
        <FeedItemBox details={item.details} itemName={item.itemName} playlistID={item.playlistID} />
    );
    return (
        <View style={[styles.FeedItemContainer]}>
            <View style={[styles.TitleContainer]}>
                <Text style={[styles.TitleText]}>{props.feedName}</Text>
            </View>
            <FlatList
                data={props.feedItems}
                renderItem={renderItem}
                keyExtractor={item => item.itemID}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ backgroundColor: 'transparent' }}
                horizontal={true} />
        </View>
    );
}

const styles = StyleSheet.create({
    FeedItemContainer: {
        backgroundColor: 'transparent',
        flex: 1,
        flexDirection: 'column',
        marginLeft: 15,
    },
    TitleContainer: {
        marginTop: 15,
        flex: 1,
        marginBottom: 10,
    },
    TitleText: {
        fontSize: 24,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    DetailsContainer: {
        width: 130,
        height: 60,
        flex: 1,
    },
    DetailsText: {
        marginTop: 4,
        fontSize: 11,
        color: '#FFFFFF70'
    },
    ImgView: {
        flex: 1,
        marginRight: 20,
    },
    Img: {
        height: 130,
        width: 130,
        borderRadius: 2,
    },
    Button: {
        flex: 1,
        borderRadius: 2,
    },
    ItemNameText: {
        marginTop: 5,
        fontSize: 12,
        color: '#FFFFFF',
        fontWeight: '500',
    },
});