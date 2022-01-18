// Full screen music player
import React, { useState, useEffect } from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import GestureRecognizer, { swipeDirection } from 'react-native-swipe-gestures';
import { MusicPlayerActivityContext, MusicPlayerScreenTypeContext } from './MusicPlayerContext';

import { MiniPlayer } from './MiniPlayer';
import { FullPlayer } from './FullPlayer';

export const MusicPlayer = () => {
    const [isMusicPlayerUp, SetMusicPlayerUp] = useState(false);
    const [currentSong, SetCurrentSong] = useState({
        SongName: 'Heat Waves',
        ArtistName: 'Glass Animals',
        Image: { uri: 'https://upload.wikimedia.org/wikipedia/en/1/11/Dreamland_%28Glass_Animals%29.png' },
        SongCoverColor: '#f551ec'
    });
    const [isMusicPlayerActive, SetMusicPlayerActivity] = useState(false);

    // useEffect for changing to next song

    // For displaying whether a song is active or not
    const ActivityContext = React.useMemo(() => ({
        Play: () => {
            SetMusicPlayerActivity(true);
        },
        Pause: () => {
            SetMusicPlayerActivity(false);
        }
    }));

    // For displaying which music player is shown (mini or full)
    const MusicPlayerScreenContext = React.useMemo(() => ({
        CloseFullPlayer: () => {
            SetMusicPlayerUp(false);
        },
        OpenFullPlayer: () => {
            SetMusicPlayerUp(true);
        }
    }));
    return (
        <MusicPlayerActivityContext.Provider value={ActivityContext}>
            <MusicPlayerScreenTypeContext.Provider value={MusicPlayerScreenContext}>
                {
                    (isMusicPlayerUp) // pass the same props
                        ? <FullPlayer songname={currentSong.SongName} artistname={currentSong.ArtistName} isPlaying={isMusicPlayerActive}/>
                        : <MiniPlayer songname={currentSong.SongName} artistname={currentSong.ArtistName} isPlaying={isMusicPlayerActive} covercolor={currentSong.SongCoverColor} />
                }
            </MusicPlayerScreenTypeContext.Provider>
        </MusicPlayerActivityContext.Provider>
    );
}