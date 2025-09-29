import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {firebaseManager} from '../services/FirebaseManager';

export default function TransportScreen() {
  useEffect(() => {
    firebaseManager.initMiniApp('transport');
    firebaseManager.setContext('transport');
    firebaseManager.logScreen('TransportScreen');
    firebaseManager.logEvent('screen_view', {screen_name: 'TransportScreen'});
    firebaseManager.logEvent('ride_booked', {driver_id: 'driver456'});
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 20}}>🚖 Transport Screen</Text>
    </View>
  );
}
