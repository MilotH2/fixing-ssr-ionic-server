import { Component, NgZone } from '@angular/core';
import {
  NavigationEnd,
  NavigationStart,
  Router,
  Event as NavigationEvent,
} from '@angular/router';
import { App, URLOpenListenerEvent } from '@capacitor/app';
import { MenuItem } from './shared/models/interfaces/menu-item.interface';
import { map, delay, withLatestFrom, filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  menuItems: Array<MenuItem> = [
    {
      hasDividor: false,
      icon: 'book-outline',
      path: 'myCourses',
      title: 'My Courses',
    },
    {
      hasDividor: false,
      icon: 'cart-outline',
      path: 'myCart',
      title: 'My cart',
    },
    {
      hasDividor: false,
      icon: 'heart-outline',
      path: 'wishlist',
      title: 'Wishlist',
    },
    {
      hasDividor: true,
      icon: 'accessibility-outline',
      path: 'teachOnKitc',
      title: 'Teach on KITC',
    },
    {
      hasDividor: false,
      icon: 'notifications-outline',
      path: 'notifications',
      title: 'Notifications',
    },
    {
      hasDividor: true,
      icon: 'chatbubble-ellipses-outline',
      path: 'messages',
      title: 'Messages',
    },
    {
      hasDividor: false,
      icon: 'settings-outline',
      path: 'accountSettings',
      title: 'Account Settings',
    },
    {
      hasDividor: false,
      icon: 'card-outline',
      path: 'paymentMethods',
      title: 'Payment methods',
    },
    {
      hasDividor: true,
      icon: 'list-outline',
      path: 'purchaseHistory',
      title: 'Purchase history',
    },
    {
      hasDividor: false,
      icon: 'people-outline',
      path: 'publicProfile',
      title: 'Public profile',
    },
    {
      hasDividor: true,
      icon: 'create-outline',
      path: 'editProfile',
      title: 'Edit Profile',
    },
    {
      hasDividor: false,
      icon: 'help-outline',
      path: 'help',
      title: 'Help',
    },
    {
      hasDividor: false,
      icon: 'exit-outline',
      path: 'logOut',
      title: 'Log Out',
    },
  ];
  constructor(private zone: NgZone, private router: Router) {
    this.initializeApp();

    this.router.events.subscribe((event: NavigationEvent) => {
      if (event instanceof NavigationEnd) {
        console.log({ event });
        if (event.url.includes('id_token')) {
          // console.log(JSON.parse(event.url))
          let accessToken = event.url
            .split('#')[1]
            .split('=')[1]
            .split('&token_type')[0];
          let expiresOn = event.url.split('#')[1].split('=')[3];

          console.log({ accessToken, expiresOn });
          // this.webService.setTokenData({ accessToken, expiresOn });
        } else {
          // this.canonicalService.setCanonicalURL(event.url);
        }
      }
    });
  }

  initializeApp() {
    App.addListener('appUrlOpen', (data: URLOpenListenerEvent) => {
      console.log(data);

      console.log('App opened with URL: ' + data.url);
      this.zone.run(() => {
        const domain = 'fixing.server.com';
        // Example url: https://beerswift.app/tabs/tab2
        // slug = /tabs/tab2
        const pathArray = data.url.split(domain);

        const appPath = pathArray.pop();
        if (appPath) {
          this.router.navigateByUrl(appPath);
        }
        const slug = data.url.split('.app').pop();
        if (slug) {
          // this.router.navigateByUrl(slug);
        }
        // If no match, do nothing - let regular routing
        // logic take over
      });
    });
  }
}
