import { Injectable } from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor  {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if ( sessionStorage.getItem('username') && sessionStorage.getItem('token')) {
      const cloned = req.clone({
                headers: req.headers.set('authorization',
                    'Bearer ' + sessionStorage.getItem('token'))
     });
      return next.handle(cloned)
    }
    return next.handle(req);
  }

}
