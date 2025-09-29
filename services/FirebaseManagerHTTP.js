import AsyncStorage from '@react-native-async-storage/async-storage';

const GA4_ENDPOINT = 'https://www.google-analytics.com/mp/collect';

class FirebaseManagerHTTP {
  constructor() {
    this.contexts = {
      main: {
        measurementId: 'G-3RHF0K05EL',
        apiSecret: 'eiPFiaZSTXKcay2jARzqlg',
      },
      food: {
        measurementId: 'G-78X2F4MGW8',
        apiSecret: 'qCTIK0hVRo21pyzPWEfoQA',
      },
      transport: {
        measurementId: 'G-QZPDLD4Q4W',
        apiSecret: 'bHKuRHyPSBSGRQKQSHerPA',
      },
    };
    this.currentContext = 'main';
    this.initClientId();
  }

  async initClientId() {
    let clientId = await AsyncStorage.getItem('ga_client_id');
    if (!clientId) {
      this.clientId = `${Math.floor(Math.random() * 1000000000)}.${Math.floor(
        Math.random() * 1000000000,
      )}`;
      await AsyncStorage.setItem('ga_client_id', clientId);
    }
    this.clientId = clientId;
  }

  setContext(name) {
    if (!this.contexts[name]) throw new Error(`Context ${name} không tồn tại`);
    this.currentContext = name;
  }

  async logEvent(name, params = {}, userId) {
    if (!this.clientId) await this.initClientId();
    const {measurementId, apiSecret} = this.contexts[this.currentContext];

    const body = {
      client_id: this.clientId,
      user_id: userId || undefined,
      events: [{name, params}],
    };

    const url = `${GA4_ENDPOINT}?measurement_id=${measurementId}&api_secret=${apiSecret}`;

    try {
      await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body),
      });
      console.log(`Logged ${name} to ${this.currentContext}`);
    } catch (err) {
      console.error('GA4 log error:', err);
    }
  }

  async logScreen(screenName) {
    await this.logEvent('screen_view', {
      firebase_screen: screenName,
      firebase_screen_class: screenName,
    });
  }
}

export const firebaseManagerHTTP = new FirebaseManagerHTTP();
