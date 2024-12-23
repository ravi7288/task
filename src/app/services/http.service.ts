import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  baseUrl: string = "http://api.openweathermap.org";

  constructor(private http: HttpClient) { }

  getLonLat(city:string):Observable<any>{
    return this.http.get(`${this.baseUrl}/geo/1.0/direct?q=${city}&appid=1635890035cbba097fd5c26c8ea672a1`);
  }

  getWeather(lat:any,lon:any):Observable<any>{
    return this.http.get(`${this.baseUrl}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=1635890035cbba097fd5c26c8ea672a1`);
  }
}
