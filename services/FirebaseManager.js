import {initializeApp} from '@react-native-firebase/app';
import analytics from '@react-native-firebase/analytics';

import configMain from '../config/firebase-main.json';
import configFood from '../config/firebase-food.json';
import configTransport from '../config/firebase-transport.json';

const configs = {
  main: configMain,
  food: configFood,
  transport: configTransport,
};

class FirebaseManager {
  constructor() {
    this.instances = new Map();
    this.currentContext = 'main';
  }

  initInstance(name, config) {
    if (!this.instances.has(name)) {
      const app = initializeApp(config, name);
      this.instances.set(name, app);
    }
    return this.instances.get(name);
  }

  setContext(name) {
    if (!this.instances.has(name)) {
      throw new Error(`Firebase instance "${name}" chưa init!`);
    }
    this.currentContext = name;
  }

  async logEvent(eventName, params) {
    const app = this.instances.get(this.currentContext);
    if (!app) {
      throw new Error(
        `Chưa có Firebase instance cho context ${this.currentContext}`,
      );
    }
    return await analytics().logEvent(eventName, params);
  }

  initMiniApp(miniAppId) {
    const config = configs[miniAppId];
    if (!config) {
      throw new Error(`Không tìm thấy config cho miniAppId: ${miniAppId}`);
    }
    return this.initInstance(miniAppId, config);
  }

  async logScreen(screenName) {
    await this.logEvent('screen_view', {
      firebase_screen: screenName,
      firebase_screen_class: screenName,
    });
  }
}

export const firebaseManager = new FirebaseManager();
