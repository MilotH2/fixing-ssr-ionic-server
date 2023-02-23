import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpStatusCode,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertsService } from '../services/alerts.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private alertsService: AlertsService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        this.alertsService.dismissLoadingController();
        // this.publicService.loadingSubject.next(false);
        // console.log(err);

        let errorMsg = '';
        if ([HttpStatusCode.NotFound].includes(err.status)) {
          this.alertsService.presentToast(
            `Request not found, please try something else! --> ${err.statusText}`,
            'danger'
          );
        } else {
          if (
            errorMsg.includes('Invalid client request') ||
            errorMsg.includes('Connection refused')
          ) {
            // this.authenticationService.logout();
            this.alertsService.presentToast(
              `Something happend, please try again later! --> ${err.statusText}`,
              'danger'
            );
          }
          if (
            [HttpStatusCode.Forbidden, HttpStatusCode.Unauthorized].includes(
              err.status
            )
          ) {
            // auto logout if 401 or 403 response returned from api
            this.alertsService.presentToast(
              `Forbidden or Unauthorized, please try again later! --> ${err.statusText}`,
              'danger'
            );
            // this.authService.logout();
          }
          if (
            [
              HttpStatusCode.BadRequest,
              HttpStatusCode.InternalServerError,
            ].includes(err.status)
          ) {
            // this.alertsService.dismissLoadingController();
            this.alertsService.presentToast(
              `Something happend, please try again later! --> ${err.statusText}`,
              'danger'
            );
          }
        }
        const error =
          (err && err.error && err.error.messages) || err.statusText;
        return throwError(error);
      })
    );
  }
}
