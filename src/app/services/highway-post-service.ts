import {Injectable} from '@angular/core';
import {Http, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";

@Injectable()
export class HighwayPostService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = 'http://localhost:5000';
    req = req.clone({
      url: url + req.url
    });
    return next.handle(req);
  }

  constructor(private http: HttpClient){

  }

  postHighway(o: Object) {
    let body = JSON.stringify(o);
    console.log(body)
    this.http.get('http://localhost:5000/highway').subscribe(
      highways=>console.log(highways.toString()),
      error=> console.log(error)

    );
    /*this.http.post('http://localhost:5000/highway', body)
      .map(res => res.json()) // ...and calling .json() on the response to return data
      .catch((error:any) => Observable.throw(error.json().error || 'Server error')) //...errors if
      .subscribe();*/
  }
}
