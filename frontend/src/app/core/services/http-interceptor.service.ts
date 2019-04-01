import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private jwtService: JwtService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headersConfig = {
      'Content-Type': 'application/json',
      // tslint:disable-next-line: object-literal-key-quotes
      'Accept': 'application/json'
    };
    const token = this.jwtService.getToken();
    if (token) {
// tslint:disable-next-line: no-string-literal
      headersConfig['Authorization'] = `bearer ${token}`;
    }
// tslint:disable-next-line: variable-name
    const _req = req.clone({ setHeaders: headersConfig });
    return next.handle(_req);
  }

}
