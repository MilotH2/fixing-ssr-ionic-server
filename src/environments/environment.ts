// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  api: {
    pureLink: '',
    apiLink: '',
    azureAuth: {
      tenant: 'KitcCourses',
      main: 'https://KitcCourses.b2clogin.com/KitcCourses.onmicrosoft.com/B2C_1_SigninAndSignUp/oauth2/v2.0/',
      redirect_uri: 'http://localhost:8100/',
      cId: '735cf859-ff6d-49c1-a92c-083ddd582ba1',
      loginScope: 'https://KitcCourses.onmicrosoft.com/webapi/api.access',
      authScope:
        'https://KitcCourses.onmicrosoft.com/webapi/api.access openid offline_access',
      codeChallangeMethod: 'S256',
    },
  },
  storage: {
    auth: {
      codeVerifier: 'KITCCodeVerifier',
      azureAuth: 'KITCauthAzureData',
      userData: 'KITCUserData',
    },
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
