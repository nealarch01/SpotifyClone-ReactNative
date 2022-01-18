// Small 
import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { MusicPlayerActivityContext, MusicPlayerScreenTypeContext } from './MusicPlayerContext';
import GestureRecognizer, { swipeDirection } from 'react-native-swipe-gestures';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const MiniPlayer = (props) => {
    const { Pause, Play } = React.useContext(MusicPlayerActivityContext);
    const { OpenFullPlayer } = React.useContext(MusicPlayerScreenTypeContext);
    return (
        <GestureRecognizer onSwipeUp={() => OpenFullPlayer()}>
            <SafeAreaView style={[styles.MiniPlayerContainer]}>
                <LinearGradient colors={[props.covercolor, '#191414']} style={{ flex: 1, borderRadius: 10}} start={{x: 0, y: 0}} end={{x: 0, y : 0.99}}>
                    <TouchableOpacity style={[styles.MiniPlayerDetailView]} onPress={() => OpenFullPlayer()} activeOpacity={1.0}>
                        <Image source={require('../../../../assets/FeedImages/glassAnimals.png')} style={[styles.MiniPlayerImg]} />
                        <View style={[styles.MiniPlayerSongDetail]}>
                            <Text style={[styles.TextTitle]}>{props.songname}</Text>
                            <Text style={[styles.TextArtist]}>{props.artistname}</Text>
                        </View>
                        <TouchableOpacity style={[styles.MiniPlayerController]}>
                            <Ionicons name='play-skip-back-sharp' size={26} color={'#FFFFFF'} />
                        </TouchableOpacity>
                        {
                            (props.isPlaying)
                                ? <TouchableOpacity style={[styles.MiniPlayerController]} onPress={() => Pause()} >
                                    <Ionicons name='pause-sharp' size={30} color={'#FFFFFF'} />
                                </TouchableOpacity>
                                : <TouchableOpacity style={[styles.MiniPlayerController]} onPress={() => Play()}>
                                    <Ionicons name='play-sharp' size={30} color={'#FFFFFF'} />
                                </TouchableOpacity>
                        }
                        <TouchableOpacity style={[styles.MiniPlayerController]}>
                            <Ionicons name='play-skip-forward-sharp' size={26} color={'#FFFFFF'} />
                        </TouchableOpacity>
                    </TouchableOpacity>
                </LinearGradient>
            </SafeAreaView>
        </GestureRecognizer>
    );
}

const styles = StyleSheet.create({
    MiniPlayerContainer: {
        width: '100%',
        height: 60,
        borderRadius: 10,
        borderColor: 'gray',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        bottom: 81,
    },
    MiniPlayerDetailView: {
        flex: 1,
        flexDirection: 'row',
    },
    MiniPlayerSongDetail: {
        flex: 4,
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: 10,
    },
    MiniPlayerController: {
        flex: 1,
        justifyContent: 'center',
    },
    MiniPlayerImg: {
        marginTop: 5,
        height: 46,
        width: 46,
        borderRadius: 10,
        marginLeft: 10,
    },
    TextTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    TextArtist: {
        fontSize: 14,
        color: '#A9A9A9',
    },
});