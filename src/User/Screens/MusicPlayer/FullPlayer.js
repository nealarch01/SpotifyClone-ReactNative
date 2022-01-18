import React from 'react';
import {
    ScrollView,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    ImageBackground,
    Modal,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { MusicPlayerScreenTypeContext } from './MusicPlayerContext';
import { MusicPlayerContext } from './MusicPlayerContext';
const sampleImage = require('../../../../assets/FeedImages/dreamland_GlassAnimals.png');
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

export const FullPlayer = (props) => {
    const { CloseFullPlayer } = React.useContext(MusicPlayerScreenTypeContext);
    return (
        <GestureRecognizer onSwipeDown={() => CloseFullPlayer()}>
            <Modal animationType='slide' >
                <LinearGradient colors={['#f551ec', '#191414']} style={{ flex: 1 }}>
                    <ScrollView style={[styles.ContentContainer]}>
                        <SafeAreaView>
                            <View style={[styles.TopItems]}>
                                <TouchableOpacity style={[styles.Button]} onPress={() => CloseFullPlayer()}>
                                    <Ionicons name='chevron-down' size={40} color={'#FFFFFF'} />
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.Button, { paddingTop: 3, alignItems: 'flex-end' }]}>
                                    <Ionicons name='ellipsis-horizontal' size={30} color={'#FFFFFF'} />
                                </TouchableOpacity>
                            </View>
                        </SafeAreaView>
                        <View style={{ height: 40, flex: 1 }} />
                        <View style={[styles.ImageContainer]}>
                            <Image source={sampleImage} style={[styles.PlayerImg]} />
                        </View>
                        <View style={{ height: 30, flex: 2 }} />
                        <View style={[styles.BottomItems]}>
                            <View style={{ flex: 1 }} />
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={[styles.TextBox]}>
                                    <Text style={[styles.TextTitle]}>
                                        {props.songname}
                                    </Text>
                                    <TouchableOpacity style={[styles.Button]} activeOpacity={1.0}>
                                        <Text style={[styles.TextArtist]}>
                                            {props.artistname}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity style={[styles.LikeButton]} activeOpacity={1.0}>
                                    <Feather name='heart' size={30} color={'#FFFFFF'} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </LinearGradient>
            </Modal>
        </GestureRecognizer>
    );
}


const styles = StyleSheet.create({
    ImageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 2,
        backgroundColor: 'transparent',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },
    DefaultBackground: {
        flex: 1,
        justifyContent: 'center',
    },
    ContentContainer: {
        backgroundColor: 'transparent',
        marginLeft: 30,
        marginRight: 30,
    },
    TopItems: {
        flex: 1,
        flexDirection: 'row',
    },
    Button: {
        flex: 1,
    },
    LikeButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    BottomItems: {
        flex: 2,
    },
    PlayerImg: {
        width: 330,
        height: 330,
    },
    TextBox: {
        flex: 10,
        flexDirection: 'column',
    },
    TextTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'left',
    },
    TextArtist: {
        fontSize: 18,
        color: '#A9A9A9',
    },
});