import React from 'react';
import {
    View,
    ActivityIndicator,
    StyleSheet,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';


export const AuthLoadingScreen = () => {
    return (
        <View style={[styles.MainContainer]}>
            <BlurView
                style={[styles.AbosoluteView]}
                blurType="dark"
                blurAmount={5}
                reducedTransparencyFallbackColor='#C0C0C0'
            />
            <ActivityIndicator size={'large'} color={'#1DB954'} />
        </View>
    );
}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: 'transparent',
        position: 'absolute',
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
});