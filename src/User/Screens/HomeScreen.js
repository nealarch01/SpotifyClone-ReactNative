import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    SafeAreaView,
    Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { AuthenticationContext } from '../../Login/AuthenticationContext.js';
import { PlaylistNavContext } from '../AppNavigationContext/PlaylistNavigationContext.js';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { FeedDisplay } from '../Feed/Feed';
import { PlaylistScreen } from '../Playlists/Playlist.js';
import { LikedTracksScreen } from '../UserLikes/LikedTracks/LikedTracks.js';

import TopSix from '../Feed/FeedData/TopSix.json'; // sample json file

const HomeStack = createStackNavigator();

const Home = ({ navigation }) => {
    const HomeNavigationContext = React.useMemo(() => ({
        GotoPlaylist: (playlist_id) => {
            // console.log("Playlist id received: " + playlist_id);
            // if(playlist_id === '') navigation.navigate('LikedSongs')
            // else navigation.navigate('Playlist', { playlistID: playlist_id });
            if (playlist_id === '') return;
            navigation.navigate('Playlist', { playlistID: playlist_id });
        }
    }));
    return (
        <PlaylistNavContext.Provider value={HomeNavigationContext}>
            <View style={[styles.BackgroundContainer]}>
                <FeedDisplay />
            </View>
        </PlaylistNavContext.Provider>
    );
}

export const HomeScreen = () => {
    return (
        <NavigationContainer independent={true}>
            <HomeStack.Navigator name='Home'
                initialRouteName='Home'
                screenOptions={{
                    headerShown: false,
                }} >
                <HomeStack.Screen name='Home' component={Home} />
                <HomeStack.Screen name='Playlist' component={PlaylistScreen}
                    options={{
                        headerShown: true,
                        headerTransparent: true,
                        headerBackTitle: ' ',
                        headerTitleStyle: { color: '#FFFFFF' },
                        headerTitle: ' ',
                    }}
                />
                {/* Playlist screen goes here */}
                <HomeStack.Screen name='LikedSongs' component={LikedTracksScreen}
                    options={{
                        headerShown: true,
                        headerTransparent: true,
                        headerBackTitle: 'Playlist',
                        headerTitleStyle: { color: '#FFFFFF' },
                    }}
                />
            </HomeStack.Navigator>
        </NavigationContainer>
    );
}

// This functional component will be exported into Feed.js to become a flat list header
export const TopView = () => {
    const { SignedOut } = React.useContext(AuthenticationContext);
    const [GreetMessage, SetGreetMessage] = useState('');
    const [TimeIcon, SetTimeIcon] = useState('sunrise');
    const [TimeIconColor, SetTimeIconColor] = useState('orange');

    // initialize the current greet message and icons
    useEffect(() => {
        let hours = new Date().getHours();
        if (hours > 3 && hours < 12) {
            SetGreetMessage('Good morning');
            SetTimeIcon('sunrise');
            SetTimeIconColor('orange');
        } else if (hours >= 12 && hours < 18) {
            SetGreetMessage('Good afternoon');
            SetTimeIcon('sun');
            SetTimeIconColor('#FFF7AA');
        } else {
            SetGreetMessage('Good evening');
            SetTimeIcon('moon');
            SetTimeIconColor('#2274A5');
        }
    }, []);

    // add interval to useEffect to run every 5 minutes
    useEffect(() => {
        let hrInterval = setInterval(() => {
            let hours = new Date().getHours();
            if (hours > 3 && hours < 12) {
                SetGreetMessage('Good morning');
                SetTimeIcon('sunrise');
                SetTimeIconColor('orange');
            } else if (hours >= 12 && hours < 18) {
                SetGreetMessage('Good afternoon');
                SetTimeIcon('sun');
                SetTimeIconColor('#FFF7AA');
            } else {
                SetGreetMessage('Good evening');
                SetTimeIcon('moon');
                SetTimeIconColor('#2274A5');
            }
        }, 600000);
        // clear the interval to prevent mem leaks
        return () => clearInterval(hrInterval);
    }, []);
    return (
        <View style={[styles.MainContainer]}>
            <View style={[styles.TopView]}>
                <View style={{ flex: 2, flexDirection: 'row' }}>
                    <View style={[styles.IconGreet]}>
                        <Feather name={TimeIcon} size={28} color={TimeIconColor} styles={{ marginBottom: 2 }} />
                    </View>
                    <View style={[styles.TextGreetView]}>
                        <Text style={[styles.TextGreet]}>{GreetMessage}</Text>
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => console.log('Press detected')}>
                        <Feather name='bell' size={28} color={'#FFFFFF'} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => console.log('Press detected')} style={{ marginLeft: 15 }}>
                        <Ionicons name='cog-sharp' size={28} color={'#FFFFFF'} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => SignedOut()} style={{ marginLeft: 15 }}>
                        <Feather name='log-out' size={28} color={'#FFFFFF'} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={[styles.ShortcutsView]}>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <View style={{ flexDirection: 'column', flex: 1 }}>
                        <ShortcutItemButton imgName={TopSix[0].imageSource} name={TopSix[0].name} playlistID={TopSix[0].playlistID} />
                        <ShortcutItemButton imgName={TopSix[1].imageSource} name={TopSix[1].name} playlistID={TopSix[1].playlistID} />
                        <ShortcutItemButton imgName={TopSix[2].imageSource} name={TopSix[2].name} playlistID={TopSix[2].playlistID} />
                    </View>
                    <View style={{ flexDirection: 'column', flex: 1, marginLeft: 10 }}>
                        <ShortcutItemButton imgName={TopSix[3].imageSource} name={TopSix[3].name} playlistID={TopSix[3].playlistID} />
                        <ShortcutItemButton imgName={TopSix[4].imageSource} name={TopSix[4].name} playlistID={TopSix[4].playlistID} />
                        <ShortcutItemButton imgName={TopSix[5].imageSource} name={TopSix[5].name} playlistID={TopSix[5].playlistID} />
                    </View>
                </View>
            </View>
        </View>
    );
}

const ShortcutItemButton = (props) => {
    const { GotoPlaylist } = React.useContext(PlaylistNavContext);
    return (
        <TouchableOpacity style={[styles.ShortcutItemBtnStyle]} activeOpacity={0.8} onPress={() => GotoPlaylist(props.playlistID)}>
            <LinearGradient colors={['#69696980', '#7a7a7a80', '#8a8a8a70', '#9b9b9b60']} style={{ flex: 1, borderRadius: 6 }} start={{ x: 1, y: 0 }} end={{ x: 2, y: 0 }} >
                <View style={[styles.ShortcutItemView]}>
                    <View style={[styles.ShortcutItemImageView]}>
                        <Image source={{ uri: `${props.imgName}` }} style={[styles.ShortcutItemImage]} />
                    </View>
                    <View style={[styles.ShortcutItemTextView]}>
                        <Text style={[styles.ItemText]}>{props.name}</Text>
                    </View>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    BackgroundContainer: {
        flex: 1,
        backgroundColor: '#191414',
    },
    MainContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        marginLeft: 15,
        marginRight: 15,
        marginTop: 36,
        top: 18,
        marginBottom: 22,
    },
    TopView: {
        flex: 1,
        flexDirection: 'row',
    },
    FeedView: {
        flex: 1,
        marginLeft: 15,
    },
    ShortcutsView: {
        flex: 2,
        marginTop: 16,
    },
    TextGreet: {
        fontSize: 24,
        fontWeight: '700',
        color: '#FFFFFF',
        paddingTop: 2,
        paddingLeft: 3,
    },
    TextGreetView: {
        flex: 6,
    },
    IconGreet: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ShortcutItemBtnStyle: {
        height: 60,
        width: 175,
        borderWidth: 1,
        borderRadius: 6,
        marginBottom: 6,
    },
    ShortcutItemView: {
        flex: 1,
        flexDirection: 'row',
    },
    ShortcutItemImage: {
        height: 59,
        width: 55,
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 6,
    },
    ShortcutItemImageView: {
        flex: 1,
    },
    ShortcutItemTextView: {
        flex: 2,
        alignSelf: 'center',
        marginLeft: 6,
    },
    ItemText: {
        color: '#FFFFFF',
        fontSize: 13,
        fontWeight: 'bold',
    },
    Btn: {
        backgroundColor: 'green',
        height: 30,
        width: 100,
        alignItems: 'center',
        alignSelf: 'center',
    }
});