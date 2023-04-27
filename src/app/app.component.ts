import { Component } from '@angular/core';
import { WeatherData, ForecastDetails } from './models/forecast';
import { ForecastService } from './services/forecast.service';
import { keyframes } from '@angular/animations';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'nomnio-test';

  weather: WeatherData = new WeatherData();
  forecast: ForecastDetails[] = ForecastDetails[0];

  refreshTime: string;

  public dd: Array<ForecastDetails> = new Array<ForecastDetails>();

  constructor(private forecastService: ForecastService) {
    moment.locale('sl');
    this.refreshTime = moment().format('DD.MM.YYYY [ob] h:mm');;
  }

  loadWeather() {
    this.forecastService.LoadWeather().subscribe(
      res => {

        // Current Weather
        this.refreshTime = moment().format('DD.MM.YYYY [ob] h:mm');

        this.weather.cityName = res.list[0].name;
        this.weather.description = res.list[0].weather[0].description;
        this.weather.currentTemperature = res.list[0].main.temp;

        this.weather.maxTemperature = res.list[0].main.temp_max;
        this.weather.minTemperature = res.list[0].main.temp_min;

        // 5 Day Forecast
        for (var i = 7; i < res.list.length; i = i + 8) // Jumps 8 times to get to next day (A day has 8 details in API)
        {
          var details = new ForecastDetails();
          details.date = moment(res.list[i].dt_txt).format('DD.MM.');
          details.maxTemperature = res.list[i].main.temp_max;
          details.minTemperature = res.list[i].main.temp_min;
          details.description = res.list[i].weather[0].description;

          this.dd.push(details);
        }
      }
    )
  }


}
