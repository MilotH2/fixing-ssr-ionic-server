import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { NavController } from '@ionic/angular';

import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class StudentGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private navCtrl: NavController
  ) {}
  canActivate(): boolean {
    // console.log('true');
    if (this.authService.isLoggedInValue) {
      console.log('true');
      // this.navCtrl.navigateRoot('');
      return true;
    } else {
      console.log(false);
      // not logged in so redirect to login page with the return url
      // this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }
}
