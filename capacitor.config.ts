import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'fixing.server.com',
  appName: 'CoursesKITC',
  webDir: 'dist/app/browser',
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,
    },
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId:
        '472773443515-3feb9m73vmv61nttssge4ghqh181q4oj.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
    },
  },
};

export default config;
