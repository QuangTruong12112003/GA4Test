import analytics from '@react-native-firebase/analytics';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GA4_ENDPOINT = 'https://www.google-analytics.com/mp/collect';

class FirebaseManagerHTTP {
  constructor() {
    this.contexts = {
      main: {
        firebaseAppId: '1:901462229513:android:b7897ece48276999456ed8',
        apiSecret: 'eiPFiaZSTXKcay2jARzqlg',
      },
      food: {
        firebaseAppId: '1:1019247544581:android:02678dccbb4396248a4f6c',
        apiSecret: 'qCTIK0hVRo21pyzPWEfoQA',
      },
      transport: {
        firebaseAppId: '1:228582358959:android:ccafae1f0dc3d74238795a',
        apiSecret: 'bHKuRHyPSBSGRQKQSHerPA',
      },
    };
    this.currentContext = 'main';
    this.initAppInstanceId();
  }

  async initAppInstanceId() {
    let appInstanceId = await AsyncStorage.getItem('ga_app_instance_id');
    if (!appInstanceId) {
      try {
        appInstanceId = await analytics().getAppInstanceId(); 
        if (appInstanceId) {
          await AsyncStorage.setItem('ga_app_instance_id', appInstanceId);
        }
      } catch (err) {
        console.error('Lỗi lấy app_instance_id từ Firebase:', err);
      }
    }
    this.appInstanceId = appInstanceId;
  }

  setContext(name) {
    if (!this.contexts[name]) throw new Error(`Context ${name} không tồn tại`);
    this.currentContext = name;
  }

  async logEvent(name, params = {}, userProperties = {}) {
    if (!this.appInstanceId) await this.initAppInstanceId();
    const { firebaseAppId, apiSecret } = this.contexts[this.currentContext];

    const body = {
      app_instance_id: this.appInstanceId,
      user_properties: userProperties,
      events: [{ name, params }],
    };

    const url = `${GA4_ENDPOINT}?api_secret=${apiSecret}&firebase_app_id=${encodeURIComponent(firebaseAppId)}`;

    try {
      await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      console.log(`Logged ${name} to ${this.currentContext}`);
    } catch (err) {
      console.error('GA4 log error:', err);
    }
  }

  async logScreen(screenName) {
    await this.logEvent('screen_view', {
      screen_name: screenName,
      screen_class: screenName,
      engagement_time_msec: 1000,
    });
  }
}

export const firebaseManagerHTTP = new FirebaseManagerHTTP();
