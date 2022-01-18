import React, { useState, useEffect, useContext, Fragment } from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    StyleSheet,
    Modal,
    SafeAreaView,
    ScrollView,
} from 'react-native';

import { BlurView } from '@react-native-community/blur';

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import GestureRecognizer from 'react-native-swipe-gestures';

// props param: props.item_data
export const PlaylistTrackItem = ({ item_artists, item_track_name, item_album_image_small, item_album_image_medium, item_track_id }) => {
    const [AreOptionsOpen, SetOptionsOpen] = useState(false);
    const [isTrackModalOpen, SetTrackModalOpen] = useState(false);
    const [isPlaylistModalOpen, SetPlaylistModalOpen] = useState(false);
    const [isTrackLiked, SetTrackLiked] = useState(false);
    const [isTrackHidden, SetTrackHidden] = useState(false);
    const [LikeOptionText, SetLikeOptionText] = useState('Like'); // by default false
    const [HideOptionText, SetHiddenOptionText] = useState('Hide song');
    // console.log(props.item_data.track.album.images[2].url);
    // console.log(props.item_data.track.name);
    // console.log(props.item_data.track.artists);
    const [artists, SetArtists] = useState('');
    useEffect(() => {
        let tempArtists = '';
        item_artists.map(someArtist => tempArtists += `${someArtist.name}, `);
        SetArtists(tempArtists.substring(0, tempArtists.length - 2));
    }, []);
    useEffect(() => {
        isTrackLiked === true
            ? SetLikeOptionText('Liked')
            : SetLikeOptionText('Like');
    }, [isTrackLiked]);
    // <Image source={{ uri: `${props.item_data.album.images[2]}`}}
    useEffect(() => {
        isTrackHidden === true
            ? SetHiddenOptionText('Hidden')
            : SetHiddenOptionText('Hide song');
    }, [isTrackHidden]);
    function LikeButtonPressed() {
        // do something
    }

    function HideButtonPressed() {
        // do something

    }

    return (
        <TouchableOpacity style={[styles.ItemContainer]}>
            <View style={[styles.ItemMainView]}>
                <Image source={{ uri: `${item_album_image_small}` }} style={[styles.TrackImageSmall]} />
                <View style={[styles.TrackDetailsView]}>
                    <Text style={[styles.TrackNameText]}>{item_track_name}</Text>
                    <Text style={[styles.ArtistsNameText]}>{artists}</Text>
                </View>
            </View>
            <View style={[styles.FlexBox_One, { justifyContent: 'center', marginLeft: 40 }]}>
                {
                    (isTrackHidden === true)
                        ? <SimpleLineIcons name='minus' size={20} color={'#E60026'} />
                        : (isTrackLiked === true) 
                            ?  <Ionicons name='ios-heart-sharp' size={20} color='#1DB954' />
                            : <View></View>
                }
            </View>
            <TouchableOpacity style={[styles.OptionsButton]} onPress={() => SetTrackModalOpen(true)}>
                <SimpleLineIcons name='options' size={20} color={'#FFFFFF'} />
            </TouchableOpacity>
            {/* Beginning of modal */}
            <Modal
                animationType='slide'
                visible={isTrackModalOpen}
                transparent={true}
            >
                <View style={[styles.CenterView, { flex: 1, position: 'absolute', height: '100%', width: '100%' }]}>
                    <BlurView
                        style={[styles.AbosoluteView]}
                        blurType="dark"
                        blurAmount={5}
                    />
                    <View style={[styles.TracksModalOptionsView]}>
                        <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
                            <View style={[styles.ImageContainer, { alignSelf: 'center', }]}>
                                <Image source={{ uri: `${item_album_image_medium}` }} style={[styles.TrackImageMedium]} />
                            </View>
                            <View style={[styles.FlexBox_One, { justifyContent: 'center', alignItems: 'center', marginTop: 15 }]}>
                                <Text style={{ fontSize: 22, color: '#FFFFFF', fontWeight: '500' }}>{item_track_name}</Text>
                                <Text style={{ fontSize: 18, color: '#FFFFFF99', fontWeight: '500' }}>{artists}</Text>
                            </View>
                            <View style={[styles.FlexBox_One]}>
                                <TouchableOpacity style={[styles.ModalOptionButton]} onPress={() => SetTrackLiked(!isTrackLiked)}>
                                    {
                                        (isTrackLiked === true)
                                            ? <Ionicons name='ios-heart-sharp' size={28} color='#1DB954' />
                                            : <Ionicons name='ios-heart-outline' size={28} color='#FFFFFF' />
                                    }
                                    <Text style={[styles.ModalOptionText]}>{LikeOptionText}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.ModalOptionButton]} onPress={() => SetTrackHidden(!isTrackHidden)}>
                                    {
                                        (isTrackHidden === true)
                                            ? <SimpleLineIcons name='minus' size={26} color={'#E60026'} />
                                            : <SimpleLineIcons name='minus' size={26} color={'#FFFFFF'} />
                                    }
                                    <Text style={[styles.ModalOptionText]}>{HideOptionText}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.ModalOptionButton]} onPress={() => console.log('Add to playlist pressed')}>
                                    <MaterialIcons name='playlist-add' size={28} color={'#FFFFFF'} />
                                    <Text style={[styles.ModalOptionText]}>Add to playlist</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.ModalOptionButton]} onPress={() => console.log('Add to queue pressed')}>
                                    <MaterialIcons name='queue-music' size={28} color={'#FFFFFF'} />
                                    <Text style={[styles.ModalOptionText]}>Add to queue</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.ModalOptionButton]} onPress={() => console.log('Share button pressed')}>
                                    <Ionicons name='ios-share-outline' size={28} color='#FFFFFF' />
                                    <Text style={[styles.ModalOptionText, { paddingTop: 3 }]}>Share</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.ModalOptionButton]} onPress={() => console.log('Go to radio button pressed')}>
                                    <Ionicons name='radio' size={28} color='#FFFFFF' />
                                    <Text style={[styles.ModalOptionText]}>Go to radio</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.ModalOptionButton]} onPress={() => console.log('Go to album button pressed')}>
                                    <Ionicons name='albums-outline' size={28} color='#FFFFFF' />
                                    <Text style={[styles.ModalOptionText]}>Go to album</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.ModalOptionButton]} onPress={() => console.log('Go to artist button pressed')}>
                                    <Ionicons name='musical-notes' size={28} color='#FFFFFF' />
                                    <Text style={[styles.ModalOptionText]}>Go to artist</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                    <View style={[styles.CloseButtonView]}>
                        <BlurView
                            style={[styles.AbosoluteView]}
                            blurType="light"
                            blurAmount={5}
                        />
                        <TouchableOpacity onPress={() => SetTrackModalOpen(false)} >
                            <Text style={[styles.CloseText]}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </TouchableOpacity >
    )
}

const styles = StyleSheet.create({
    ItemContainer: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        width: '100%',
        paddingLeft: 12,
        marginTop: 10,
        marginBottom: 5,
        flex: 1,
    },
    FlexBox_One: {
        flex: 1,
    },
    CenterView: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    AbosoluteView: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        position: 'absolute',
    },
    ImageContainer: {
        flex: 1
    },
    ItemMainView: {
        flex: 10,
        flexDirection: 'row'
    },
    TrackImageSmall: {
        height: 64,
        width: 64,
    },
    TrackImageMedium: {
        height: 200,
        width: 200,
    },
    TrackDetailsView: {
        marginLeft: 6,
        marginRight: 50,
        justifyContent: 'center',
        flexDirection: 'column',
    },
    TrackNameText: {
        color: '#FFFFFF',
        fontWeight: '500',
        fontSize: 14,
        paddingRight: 5,
    },
    ArtistsNameText: {
        color: '#C0C0C0',
        fontWeight: '500',
        fontSize: 12,
    },
    OptionsButton: {
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'flex-end',
        height: 30,
        width: 30,
        paddingRight: 4,
        marginRight: 10,
        flex: 1,
    },
    CloseButtonView: {
        flex: 1,
        width: '100%',
        bottom: 0,
        justifyContent: 'center',
    },
    CloseText: {
        fontSize: 24,
        color: '#FFFFFF',
        textAlign: 'center',
    },
    TracksModalOptionsView: {
        flex: 8,
        width: '100%',
        justifyContent: 'center',
        top: 100,
    },
    ModalOptionButton: {
        flex: 1,
        flexDirection: 'row',
        paddingLeft: 30,
        marginTop: 30,
    },
    ModalOptionText: {
        color: '#FFFFFF',
        fontSize: 22,
        fontWeight: '400',
        paddingLeft: 10,
    },
});