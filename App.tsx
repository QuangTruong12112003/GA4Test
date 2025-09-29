import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import analytics from '@react-native-firebase/analytics';

import HomeScreen from './src/HomeScreen';
import FoodScreen from './src/FoodScreen';
import TransportScreen from './src/TransportScreen';

export type RootStackParamList = {
  Home: undefined;
  Food: undefined;
  Transport: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App(): JSX.Element {
  if (__DEV__) {
    analytics().setAnalyticsCollectionEnabled(true);
    analytics().setSessionTimeoutDuration(1800000); // optional
    console.log('[Firebase] Analytics Debug Mode Enabled');
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Food" component={FoodScreen} />
        <Stack.Screen name="Transport" component={TransportScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
