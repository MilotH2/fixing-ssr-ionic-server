import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { environment } from 'src/environments/environment.prod';
import { BaseApiResponse } from '../models/interfaces/responses/auth/base_api_response.interface';
import { AlertsService } from './alerts.service';

export interface headerType {
  name: string;
  value: string;
}

@Injectable({
  providedIn: 'root',
})
export class HttpApiClientService {
  private API_ENDPOINTBASE: string = environment.api.pureLink;
  private API_ENDPOINT: string = environment.api.apiLink;
  private AZURE_ENDPOINT: string = environment.api.azureAuth.main;

  private _headerTypes: Array<headerType> = [
    { name: 'Access-Control-Allow-Origin', value: '*' },
    {
      name: 'Access-Control-Allow-Methods',
      value: 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    },
  ];

  private _headers = new HttpHeaders();

  isLoadingControllerShown: boolean = false;

  constructor(
    private http: HttpClient,
    // private translateService: TranslateService,
    private alertsService: AlertsService
  ) {}

  get getHeaders(): HttpHeaders {
    return this._headers;
  }

  setTokenToHeader(token: string) {
    this._headers = this._headers.set('Authorization', `Bearer ${token}`);
  }
  removeTokenFromHeader(token: string) {
    this._headers = this._headers.delete('Authorization');
  }

  private setHeaderParams(data: headerType) {
    this._headers = this.getHeaders.set(data.name, data.value);
  }

  private setHeaders(inHeaders: HttpHeaders | undefined, isFileUpload = false) {
    this._headerTypes.forEach((element) => {
      this.setHeaderParams(element);
    });
    if (!isFileUpload) {
      var htp: headerType = { name: 'Content-Type', value: 'application/json' };
      this.setHeaderParams(htp);
    }

    if (inHeaders != null) {
      for (let key of inHeaders.keys()) {
        if (!isFileUpload) {
          this.setHeaderParams({ name: key, value: inHeaders.get(key)! });
        }
      }
    }

    return this.getHeaders;
  }

  private setParams(params: any = {}) {
    let httpParams = new HttpParams();
    for (const key in params) {
      if (params.hasOwnProperty(key) && params[key] != null) {
        httpParams = httpParams.append(key, params[key]);
      }
    }
    return httpParams;
  }

  get<T>(
    url: string,
    params: object = {},
    showLoader: boolean = false,
    xheaders?: HttpHeaders,
    isPureUrl: boolean = false
  ): Observable<T> {
    if (showLoader) {
      this.alertsService.presentLoadingController();
    }
    const getUrl: string = `${
      isPureUrl ? this.API_ENDPOINTBASE : this.API_ENDPOINT
    }/${url}`;
    return this.http
      .get<BaseApiResponse<T>>(getUrl, {
        params: this.setParams(params),
        headers: this.setHeaders(xheaders),
      })
      .pipe(
        map((response) => {
          if (showLoader) {
            this.alertsService.dismissLoadingController();
          }
          return response.values;
        })
      );
  }

  generateFilesForFormData(formData: FormData, files: Array<any> = []): any {
    for (const file of files) {
      let newFile: Blob | null = null;
      newFile = new Blob([file.data], { type: file.mediaType });

      let nameAttr = 'images[]';
      formData.append(nameAttr, newFile, file.name);
    }
  }

  post<T>(
    url: string,
    body: any,
    params: object = {},
    isPureUrl: boolean = false,
    showLoader: boolean = false,
    xheaders?: HttpHeaders,
    isFileUpload: boolean = false,
    files: Array<any> = []
  ): Observable<T> {
    if (showLoader) {
      if (!this.isLoadingControllerShown) {
        this.isLoadingControllerShown = true;
        this.alertsService.presentLoadingController();
      }
    }
    const postUrl: string = `${
      isPureUrl ? this.API_ENDPOINTBASE : this.API_ENDPOINT
    }/${url}`;

    var formData: FormData | null = null;
    if (isFileUpload) {
      formData = new FormData();
      this.generateFilesForFormData(formData, files);
    }
    return this.http
      .post<BaseApiResponse<T>>(postUrl, isFileUpload ? formData : body, {
        params: this.setParams(params),
        headers: this.setHeaders(xheaders),
      })
      .pipe(
        map((response) => {
          this.isLoadingControllerShown = false;
          this.alertsService.dismissLoadingController();
          if (response.status) {
            return response.values;
          } else {
            this.showErrorMessageOnStatusFalse(
              response.errors ? response.errors : response.message,
              response.errors ? true : false,
              response.error
            );
            return response.values;
          }
        })
      );
  }

  put<T>(
    url: string,
    body: any,
    params: object = {},
    showLoader = false,
    xheaders?: HttpHeaders,
    isPureUrl: boolean = false
  ): Observable<T> {
    if (showLoader) {
      this.alertsService.presentLoadingController();
    }
    const putUrl: string = `${
      isPureUrl ? this.API_ENDPOINTBASE : this.API_ENDPOINT
    }/${url}`;
    return this.http
      .put<BaseApiResponse<T>>(putUrl, body, {
        params: this.setParams(params),
        headers: this.setHeaders(xheaders),
      })
      .pipe(
        map((response) => {
          this.alertsService.dismissLoadingController();
          return response.values;
        })
      );
  }
  patch<T>(
    url: string,
    body: any,
    params: object = {},
    showLoader: boolean = false,
    xheaders?: HttpHeaders,
    isPureUrl: boolean = false
  ): Observable<T> {
    if (showLoader) {
      this.alertsService.presentLoadingController();
    }
    const patchUrl: string = `${
      isPureUrl ? this.API_ENDPOINTBASE : this.API_ENDPOINT
    }/${url}`;
    return this.http
      .patch<BaseApiResponse<T>>(patchUrl, body, {
        params: this.setParams(params),
        headers: this.setHeaders(xheaders),
      })
      .pipe(
        map((response) => {
          this.alertsService.dismissLoadingController();
          return response.values;
        })
      );
  }

  delete<T>(
    url: string,
    params: object = {},
    showLoader: boolean = false,
    xheaders?: any,
    isPureUrl: boolean = false
  ): Observable<T> {
    if (showLoader) {
      this.alertsService.presentLoadingController();
    }
    const deleteUrl: string = `${
      isPureUrl ? this.API_ENDPOINTBASE : this.API_ENDPOINT
    }/${url}`;
    return this.http
      .delete<BaseApiResponse<T>>(deleteUrl, {
        params: this.setParams(params),
        headers: this.setHeaders(xheaders),
      })
      .pipe(
        map((response) => {
          this.alertsService.dismissLoadingController();
          return response.values;
        })
      );
  }

  showErrorMessageOnStatusFalse(message: any, isMsg: any, status: any) {
    console.log({ message, isMsg, status });

    let errMessage: any = [];
    if (isMsg) {
      if (message?.email) {
        if (message.email instanceof Array) {
          console.log(true);

          errMessage = message.email[0];
        } else {
          errMessage = message.email;
        }
      }
      if (message?.password) {
        if (message.password instanceof Array) {
          console.log(true);

          errMessage = message.password[0];
        } else {
          errMessage = message.password;
        }
      }
      if (message?.privacy_policy) {
        if (message.privacy_policy instanceof Array) {
          console.log(true);

          errMessage = message.privacy_policy[0];
        } else {
          errMessage = message.privacy_policy;
        }
      }
      if (message?.name) {
        if (message.name instanceof Array) {
          console.log(true);

          errMessage = message.name[0];
        } else {
          errMessage = message.name;
        }
      }
      if (message?.mobile) {
        console.log(Object.prototype.toString.call(message.mobile));
        if (message?.mobile instanceof Array) {
          console.log(true);
          errMessage = message.mobile[0];
        } else {
          errMessage = message.mobile;
        }
      }
      this.alertsService.presentToast(errMessage, 'danger');
    } else {
      this.alertsService.presentToast(message, 'danger');
    }
  }
}
