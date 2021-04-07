import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, {useState, useEffect} from 'react';
import { ColorSchemeName, Appearance } from 'react-native';

import RecordAudioScreen from '../screens/RecordAudioScreen';
import AudioPlayer from '../screens/AudioPlayer';
import UserScreen from '../screens/UserScreen';

import SignUpScreen from '../screens/auth/SignUp';
import SignInScreen from '../screens/auth/SignIn';
import ForgotPasswordScreen from '../screens/auth/ForgotPassword';
import ConfirmEmailScreen from '../screens/auth/ConfirmEmail';

import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';

import {Auth} from '@aws-amplify/auth';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started

export default function Navigation(
  { colorScheme }: { colorScheme: ColorSchemeName }
  ) {

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
      const fetchUser = async () => {
        //get authenticated user from Auth
        const userInfo = await Auth.currentAuthenticatedUser(
          { bypassCache: true }
        );
        console.log(userInfo.attributes.sub);
  
        if (!userInfo) {
          return;
        }
        if (userInfo) {
          setIsLoggedIn(true);
        }
      }
      fetchUser();
  
    }, [])

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={isLoggedIn === true ? 'Root' : 'SignIn'}>
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen name="RecordAudio" component={RecordAudioScreen} options={{ title: 'Oops!' }} />
      <Stack.Screen name="AudioPlayer" component={AudioPlayer} options={{ title: 'Oops!' }} />
      <Stack.Screen name="UserScreen" component={UserScreen} options={{ title: 'Oops!' }} />

      <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'Oops!' }} />
      <Stack.Screen name="SignIn" component={SignInScreen} options={{ title: 'Oops!' }} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ title: 'Oops!' }} />
      <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} options={{ title: 'Oops!' }} />



    </Stack.Navigator>
  );
}
