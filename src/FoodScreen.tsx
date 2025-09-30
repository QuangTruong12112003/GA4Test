import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {MFXManagerGA} from 'mfx-ga';

export default function FoodScreen() {
  const ga = new MFXManagerGA(
    '1:1019247544581:android:02678dccbb4396248a4f6c',
    'qCTIK0hVRo21pyzPWEfoQA',
  );
  useEffect(() => {
    const logEvents = async () => {
      ga.logEvent(
        'food_ordered',
        {
          restaurant_id: 'rest123',
          menu_item: 'burger',
          quantity: 2,
        },
        {
          country: {value: 'Vietnam'},
          city: {value: 'Ho Chi Minh'},
        },
      );
      ga.logScreen('FoodScreen');
    };

    logEvents();
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 20}}>🍔 Food Screen</Text>
    </View>
  );
}
