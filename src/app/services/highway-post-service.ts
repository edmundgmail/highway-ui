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

  postHighway(o: Object) {
    let body = JSON.stringify(o);
    console.log(body)
    //this.http.get('http://localhost:5000/highway').forEach( res=> console.log(res));

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions();
    options.headers = headers;
    return this.http.post('http://localhost:5000/highway', body, options).forEach(res=>console.log(res.toString()));
  }
}
