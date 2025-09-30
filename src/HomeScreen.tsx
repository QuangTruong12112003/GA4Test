import React, {useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import {MFXManagerGA} from 'mfx-ga';

export default function HomeScreen({navigation}: any) {
  const ga = new MFXManagerGA(
    '1:901462229513:android:b7897ece48276999456ed8',
    'eiPFiaZSTXKcay2jARzqlg',
  );

  useEffect(() => {
    const fetchEvent = async () => {
      await ga.logScreen('MainScreen');
    };
    fetchEvent();
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 20}}>🏠 Home Screen</Text>
      <View style={{margin: 20}}>
        <Button
          title="Go to Food"
          onPress={() => {
            ga.logEvent('navigate_food', {
              from: 'HomeScreen',
            });
            navigation.navigate('Food');
          }}
        />
      </View>

      <Button
        title="Go to Transport"
        onPress={() => {
          ga.logEvent('navigate_transport', {
            from: 'HomeScreen',
          });
          navigation.navigate('Transport');
        }}
      />
    </View>
  );
}
