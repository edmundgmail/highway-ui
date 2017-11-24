import {Injectable} from '@angular/core';
import {Http, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Headers} from '@angular/http';


@Injectable()
export class HighwayPostService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = 'http://localhost:5000';
    req = req.clone({
      url: url + req.url
    });
    return next.handle(req);
  }

  constructor(private http: Http){

  }
}
