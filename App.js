import React, { useState, useEffect } from 'react';
import type { Node } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
  TouchableHighlight,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { LoginScreen, UserLoggedIn } from './src/Login/LoginScreen.js';
import { AuthenticationContext } from './src/Login/AuthenticationContext.js';
import SvcLogin, { TrySignIn } from './src/Login/ServiceLogin';
import { AppScreen } from './src/User/Screens/AppScreen';
import { AuthLoadingScreen } from './src/Loading/LoadingScreen.js';

const RootStack = createStackNavigator();

const AuthenticatorStack = () => {
  return (
    <LoginScreen />
  );
}

const AppStack = () => {
  return (
    <AppScreen />
  );
}

const App: () => Node = () => {
  const [isLoggedIn, SetLoggedInState] = useState(false);
  const [userToken, SetUserToken] = useState(null);
  // AuthContext can be found in ./src/Login/LoginScreen
  const AuthContext = React.useMemo(() => ({
    SignedIn: (username, password) => { // authentication to api must process before getting into signed in, purpose of parameters are to get usertoken
      SetUserToken(''); // set token to something
      SetLoggedInState(true);
    },
    SignedOut: () => {
      SetUserToken(null);
      SetLoggedInState(false);
    }
  }));

  return (
    <AuthenticationContext.Provider value={AuthContext}>
      <NavigationContainer independent={true}>
        <StatusBar barStyle='light-content' translucent={true} />
        <RootStack.Navigator>
          { (isLoggedIn)
              ? <RootStack.Screen name='AppScreen' component={AppStack} options={{
                headerShown: false, animationEnabled: false
              }} />
              : <RootStack.Screen name='AuthScreen' component={AuthenticatorStack} options={{
                headerShown: false, animationEnabled: false
              }} />
          }
        </RootStack.Navigator>
      </NavigationContainer>
    </AuthenticationContext.Provider>
  );
}

export default App;