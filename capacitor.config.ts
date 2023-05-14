import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mymichu.app',
  appName: 'mymichu',
  webDir: 'dist/mymichu',
  server: {
    androidScheme: 'http'
  }
};

export default config;
