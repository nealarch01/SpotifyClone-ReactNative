import React, { useContext, useState, Fragment } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Image,
    TouchableOpacity,
    Modal,
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from '@react-navigation/native';
import { AuthenticationContext } from './AuthenticationContext';
import { TrySignIn } from './ServiceLogin';
import { AuthLoadingScreen } from '../Loading/LoadingScreen';

import LoginIcon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons';

export const LoginScreen = ({ navigation }) => {
    const [username, SetUserName] = useState('');
    const [password, SetPassword] = useState('');
    const [isLoginSuccessful, SetLoginSuccess] = useState(false);
    const [isPasswordEntrySecure, SetPasswordEntrySecure] = useState(true);
    const { SignedIn } = useContext(AuthenticationContext);
    const { SignedOut } = useContext(AuthenticationContext);

    const [isLoading, SetLoadingState] = useState(false);
    function AuthProcess() {
        SetLoadingState(true);
        var authResult = TrySignIn(username, password);
        setTimeout(() => {
            SetLoadingState(false);
            authResult ? SignedIn(username, password) : SignedOut();
        }, 500);
        console.log("Logged in");
    }

    return (
        <View style={[styles.MainContainer]}>
            <View style={[styles.CenteredContainer]}>
                <Modal animation='none' visible={isLoading} transparent={true} >
                    <View style={[styles.CenteredContainer]}>
                        <AuthLoadingScreen />
                    </View>
                </Modal>
            </View>
            <View style={{ flex: 6 }} />
            <View style={[styles.LogoContainer]}>
                <Image source={require('../../assets/Spotify_Icon_RGB_Green.png')} style={[styles.VeryTinyLogo]} />
                <Text style={[styles.HeaderText]}>Spotify Clone</Text>
            </View>
            <View style={[styles.LoginContainer], { flexDirection: 'column', marginTop: 50 }}>
                <View style={[styles.LoginInputBox]}>
                    <View style={{ flex: 1 }}>
                        <LoginIcon name='user' size={20} color={'#C5C6D0'} />
                    </View>
                    <View style={{ flex: 8 }}>
                        <TextInput style={[styles.LoginInput]}
                            onChangeText={SetUserName}
                            placeholder='Username or email address'
                            placeholderTextColor={'#C5C6D0'}
                            autoCapitalize='none'
                            autoCorrect={false}
                        />
                    </View>
                </View>
                <View style={[styles.LoginInputBox]}>
                    <View style={{ flex: 1 }}>
                        <LoginIcon name='lock' size={20} color={'#C5C6D0'} />
                    </View>
                    <View style={{ flex: 8 }}>
                        <TextInput style={[styles.LoginInput]}
                            onChangeText={SetPassword}
                            placeholder='Password'
                            placeholderTextColor={'#C5C6D0'}
                            secureTextEntry={isPasswordEntrySecure}
                            autoCapitalize='none'
                            autoCorrect={false}
                        />
                    </View>
                    <TouchableOpacity style={{ flex: 1, marginRight: 10 }} onPress={() => SetPasswordEntrySecure(!isPasswordEntrySecure)} activeOpacity={0.95}>
                        {
                            isPasswordEntrySecure
                                ? <Ionicons name='eye-sharp' size={24} color='#FFFFFF' />
                                : <Ionicons name='eye-off-sharp' size={24} color='#FFFFFF' />
                        }
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={[styles.LoginButton, { backgroundColor: '#1DB954', marginTop: 15 }]} onPress={() => AuthProcess()}>
                    <Text style={{ color: '#FFFFFF', fontWeight: '600', fontSize: 20, }}>Sign In</Text>
                </TouchableOpacity>
                <View style={[styles.OptionSeparationContainer, { marginTop: 20 }]}>
                    <View style={{ width: 150, height: 1, backgroundColor: 'gray' }} />
                    <Text style={{ color: '#FFFFFF', paddingLeft: 10, paddingRight: 10, }}>OR</Text>
                    <View style={{ width: 150, height: 1, backgroundColor: 'gray', }} />
                </View>
                <TouchableOpacity style={[styles.LoginButton, { backgroundColor: '#3b5998', marginTop: 20 }]}>
                    <MaterialIcon name='facebook' size={30} color={'white'} />
                    <Text style={{ color: '#FFFFFF', fontWeight: '600', fontSize: 18, marginLeft: 4 }}>Continue with Facebook</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.LoginButton, { backgroundColor: '#080402' }]}>
                    <MaterialCommunityIcons name='apple' size={26} color={'white'} />
                    <Text style={{ color: '#FFFFFF', fontWeight: '600', fontSize: 20, marginLeft: 4, paddingTop: 1 }}>Continue with Apple</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.LoginButton, { backgroundColor: 'white' }]}>
                    <Image source={require('../../assets/icons8-google-48.png')} style={{ height: 22, width: 22 }} />
                    <Text style={{ color: '#696969', fontWeight: '600', fontSize: 20, marginLeft: 4, paddingTop: 1 }}>Continue with Google</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 4 }} />
        </View >
    );
}

// <TouchableOpacity style={[styles.LoginButton, { backgroundColor: '#1DB954', marginTop: 15 }]} onPress={() => TrySignIn(username, password) ? SignedIn() : SignedOut()}>


const styles = StyleSheet.create({
    MainContainer: {
        backgroundColor: '#191414',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    CenteredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    OptionSeparationContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    LogoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        flexDirection: 'row',
        alignSelf: 'center',
    },
    LoginContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    HeaderText: {
        fontWeight: 'bold',
        fontSize: 44,
        textAlign: 'center',
        color: '#FFFFFF',
        paddingLeft: 8,
        paddingTop: 3,
    },
    VeryTinyLogo: {
        width: 50,
        height: 50,
    },
    LoginInputBox: {
        height: 55,
        width: 330,
        paddingLeft: 18,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        borderColor: '#FFFFFF90',
        borderRadius: 5,
        borderWidth: 1,
        marginTop: 12,
        alignSelf: 'center',
    },
    LoginInput: {
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: '400',
        paddingTop: 15,
        paddingBottom: 15,
    },
    LoginButton: {
        height: 50,
        width: 330,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        flexDirection: 'row',
        marginTop: 13,
    },
});