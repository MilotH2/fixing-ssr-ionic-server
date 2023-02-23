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
