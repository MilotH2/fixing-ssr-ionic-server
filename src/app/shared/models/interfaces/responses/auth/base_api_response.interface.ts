import { HttpStatusCode } from '@angular/common/http';

export interface BaseApiResponse<T> {
  action?: string;
  error?: any;
  errors?: any;
  message?: any;
  data?: T;
  values: T;
  status?: HttpStatusCode;
}
