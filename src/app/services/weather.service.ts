import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of} from  'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private httpClient: HttpClient) { }

  getWeather(city:string): Observable<any>{
    console.log('getWeather>>');
    return this.httpClient.get(`https://api.openweathermap.org/data/2.5/weather?appID=5104ab5fe2fff1dd0c66d19d379048b7&q=${city}`);
  }

}
