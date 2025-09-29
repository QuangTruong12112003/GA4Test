import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {firebaseManagerHTTP} from '../services/FirebaseManagerHTTP';

export default function FoodScreen() {
  useEffect(() => {
    // Chọn context miniApp 'food'
    firebaseManagerHTTP.setContext('food');

    // Log screen view
    firebaseManagerHTTP.logScreen('FoodScreen');

    // Log event custom
    firebaseManagerHTTP.logEvent('food_ordered', {
      restaurant_id: 'rest123',
      menu_item: 'burger',
      quantity: 2,
    });
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 20}}>🍔 Food Screen</Text>
    </View>
  );
}
