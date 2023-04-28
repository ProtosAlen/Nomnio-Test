import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {

  constructor(private http: HttpClient) { }

  LoadWeather(): Observable<any> {
    return this.http.get("https://api.openweathermap.org/data/2.5/forecast?lat=46.5576439&lon=15.6455854&appid=64148b11c647b06865c71814d6980f19&units=metric");
  }
}