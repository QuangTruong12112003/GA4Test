import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {MFXManagerGA} from 'mfx-ga';

export default function TransportScreen() {
  const ga = new MFXManagerGA(
    '1:228582358959:android:ccafae1f0dc3d74238795a',
    'bHKuRHyPSBSGRQKQSHerPA',
  );
  useEffect(() => {
    const logEvents = async () => {
      ga.logEvent(
        'transport_moved',
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
      ga.logScreen('TransportScreen');
    };

    logEvents();
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 20}}>🚖 Transport Screen</Text>
    </View>
  );
}
