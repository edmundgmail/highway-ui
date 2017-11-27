import {Injectable} from '@angular/core';
import {Http, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Headers} from '@angular/http';
import {RoadFeature} from "../models/road-feature";


@Injectable()
export class HighwayPostService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const baseUrl = 'http://localhost:5000';
    req = req.clone({
      url: baseUrl + req.url
    });
    return next.handle(req);
  }

  constructor(private http: Http){

  }

}
