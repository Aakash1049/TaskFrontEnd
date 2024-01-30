import { Injectable } from '@angular/core';
import { SessionService } from '../service/session.service';
import { HttpEvent, HttpHandler,HttpRequest,HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InterceptorsService implements HttpInterceptor {

  constructor(private session:SessionService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.session.getToken();
    const apiUrl = environment.apiUrl;
    const apiReq = `${apiUrl}${req.url}`;
    if(token){
       const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
       const request = req.clone({url: apiReq, headers });
       return next.handle(request);
    }
    return next.handle(req.clone({url: apiReq }));
  }
}
