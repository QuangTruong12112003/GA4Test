import React, {useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import {firebaseManager} from '../services/FirebaseManager';

export default function HomeScreen({navigation}: any) {
  useEffect(() => {
    firebaseManager.initMiniApp('main');
    firebaseManager.setContext('main');
    firebaseManager.logScreen('HomeScreen');
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 20}}>🏠 Home Screen</Text>
      <View style={{margin: 20}}>
        <Button
          title="Go to Food"
          onPress={() => {
            firebaseManager
              .logEvent('navigate_food', {from: 'HomeScreen'})
              .catch(err => console.error(err));
            navigation.navigate('Food');
          }}
        />
      </View>

      <Button
        title="Go to Transport"
        onPress={() => {
          firebaseManager
            .logEvent('navigate_transport', {from: 'HomeScreen'})
            .catch(err => console.error(err));
          navigation.navigate('Transport');
        }}
      />
    </View>
  );
}
