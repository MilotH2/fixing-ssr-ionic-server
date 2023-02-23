import { first } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export function appInitializer() {
  return () => {
    return new Promise(async (resolve) => {
      //   let userToken = await Preferences.get({
      //     key: environment.storageKeys.token,
      //   });
      // let userData = await Preferences.get({
      //   key: environment.storageKeys.INNSMapperUserStorage,
      // });
      // console.log({ userData });
      // let hasTokenAndUser: boolean = false;
      // if (userData.value) {
      //   // const expiryDate: Date = new Date(
      //   //   JSON.parse(userToken.value).expires_at.replace(" ", "T")
      //   // );
      //   // const timeOfExpiryDate = expiryDate.getTime();
      //   // const todaysDateTime = new Date().getTime();
      //   // if (timeOfExpiryDate <= todaysDateTime) {
      //   //   authenticationService.logout();
      //   // } else {
      //   //   authenticationService.setToken(JSON.parse(userToken.value));
      //   userService.setUserValue(JSON.parse(userData.value));
      //   // authenticationService.logout();
      //   hasTokenAndUser = true;
      //   resolve(true);
      //   // userService
      //   //   .getUserData()
      //   //   .pipe(first())
      //   //   .subscribe({
      //   //     next: (n) => {
      //   //       // console.log(n)
      //   //     },
      //   //     error: (err) => {
      //   //       console.log(err);
      //   //     },
      //   //     complete: () => {
      //   //       resolve(true);
      //   //     },
      //   //   });
      //   // }
      // }
      resolve(true);
      //   userService
      //     .startAppWithUser(hasTokenAndUser, JSON.parse(userData.value))
      //     .subscribe((x) => resolve(x));
    });
  };
}
