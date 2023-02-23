import { HttpClient, HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  NavigationEnd,
  Router,
  Event as NavigationEvent,
} from '@angular/router';
import { GetOptions, Preferences, SetOptions } from '@capacitor/preferences';
import { BehaviorSubject, first, Observable } from 'rxjs';

import { map } from 'rxjs/internal/operators/map';
import { environment } from 'src/environments/environment.prod';
import { AzureAuthResponse } from '../models/interfaces/responses/auth/azure_auth.interface';
import { UserRolesEnum } from '../models/interfaces/user/enums/user_roles.enum';
import { UserStatusesEnum } from '../models/interfaces/user/enums/user_statuses.enum';
import { User } from '../models/interfaces/user/user.interface';
import { HttpApiClientService } from './http-api-client.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _userDataBS: BehaviorSubject<User | undefined> = new BehaviorSubject<
    User | undefined
  >(undefined);
  private _userDataAsObs: Observable<User | undefined> =
    this._userDataBS.asObservable();

  isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  headers = new HttpHeaders();

  private _authenticationData: AzureAuthResponse | undefined = undefined;

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private httpApiClient: HttpApiClientService
  ) {
    this.getUserDataFromStorageAndSetUser();
    this.setHeaders();
    this.setupRouteChangeDetector();
  }

  get userDataValues(): User | undefined {
    return this._userDataBS.value;
  }

  get subscribeToUserData(): Observable<User | undefined> {
    return this._userDataAsObs;
  }

  get isLoggedInValue(): boolean {
    return this.isLoggedInSubject.value;
  }

  get getAuthenticationData(): AzureAuthResponse | undefined {
    return this._authenticationData;
  }

  setAuthenticationData(value: AzureAuthResponse) {
    this.isLoggedInSubject.next(true);
    this._authenticationData = value;
    this.setTokenToHeader(value.access_token);
  }

  private tokenExpired(token: string) {
    const expiry = JSON.parse(atob(token.split('.')[1])).exp;
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }

  setHeaders(): void {
    this.headers = this.headers.set('Access-Control-Allow-Origin', '*');
    this.headers = this.headers.set(
      'Access-Control-Allow-Methods',
      'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    );
    this.headers = this.headers.set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );
  }

  setupRouteChangeDetector() {
    this.router.events.subscribe((event: NavigationEvent) => {
      if (event instanceof NavigationEnd) {
        console.log({ event });
      }
    });
  }

  async login(): Promise<void> {}

  async setCodeVerifierToStorage({ code }: { code: string }): Promise<void> {
    await Preferences.set({
      key: environment.storage.auth.codeVerifier,
      value: JSON.stringify(code),
    });
  }

  async getCodeVerifierFromStorage(): Promise<string | undefined> {
    var options: GetOptions = {
      key: environment.storage.auth.codeVerifier,
    };
    const { value } = await Preferences.get(options);
    if (value != null && value) {
      return JSON.parse(value) as string;
    } else {
      return undefined;
    }
  }

  async cleanCodeVerifierFromStorage(): Promise<void> {
    await Preferences.remove({ key: environment.storage.auth.codeVerifier });
  }

  setUserData({
    user,
    setToStorage,
  }: {
    user: User;
    setToStorage?: boolean;
  }): void {
    this._userDataBS.next(user);
    this.isLoggedInSubject.next(true);
    if (setToStorage) {
      this.setUserDataToStorage({ user });
    }
  }

  async logoutUserData(): Promise<void> {
    this.isLoggedInSubject.next(false);
    this._userDataBS.next(undefined);
    await Preferences.remove({ key: environment.storage.auth.userData });
  }

  async setUserDataToStorage({ user }: { user: User }): Promise<void> {
    var setOptions: SetOptions = {
      key: environment.storage.auth.userData,
      value: JSON.stringify(user),
    };
    await Preferences.set(setOptions);
  }

  async getUserDataFromStorageAndSetUser(): Promise<void> {
    const getOptions: GetOptions = {
      key: environment.storage.auth.userData,
    };
    const { value } = await Preferences.get(getOptions);
    if (value != null && value) {
      const user: User = JSON.parse(value) as User;
      this.setUserData({ user });
    }
  }

  setTokenToHeader(access_token: string): void {
    this.httpApiClient.setTokenToHeader(access_token);
  }

  logout(): void {
    this.isLoggedInSubject.next(false);
  }

  // async getHash() {
  //   const randomStr = (len: number) => {
  //     const arr = new Uint8Array(len);
  //     window.crypto.getRandomValues(arr);
  //     return String.fromCharCode(...toCharCodes(arr));
  //   };

  //   const toCharCodes = (arr: Uint8Array) => {
  //     const validChars =
  //       'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  //     return arr.map((x) => validChars.charCodeAt(x % validChars.length));
  //   };
  //   var randomString = randomStr(120);

  //   await this.setCodeVerifierToStorage({ code: randomString });

  //   const sha256 = (message: string) => {
  //     const encoder = new TextEncoder();
  //     const data = encoder.encode(message);
  //     return window.crypto.subtle.digest('SHA-256', data);
  //   };

  //   const bufferToBase64UrlEncoded = (input: ArrayBuffer) => {
  //     const bytes = new Uint8Array(input);
  //     return urlEncodeBase64(window.btoa(String.fromCharCode(...bytes)));
  //   };

  //   const urlEncodeBase64 = (input: string) => {
  //     const chars: any = { '+': '-', '/': '_', '=': '' };
  //     return input.replace(/[\+\/=]/g, (m) => chars[m]);
  //   };
  //   const shaBuffer = await sha256(randomString);
  //   const encoded = bufferToBase64UrlEncoded(shaBuffer);
  //   return encoded;
  // }
}
