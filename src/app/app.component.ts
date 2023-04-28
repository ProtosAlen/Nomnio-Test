import { Component } from '@angular/core';
import { WeatherData, ForecastDetails } from './models/forecast';
import { ForecastService } from './services/forecast.service';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'nomnio-test';

  languages = ['EN', 'SL'];

  weather: WeatherData = new WeatherData();
  forecast: ForecastDetails[] = ForecastDetails[0];

  refreshTime: string;
  loading: boolean;

  dd: Array<ForecastDetails> = new Array<ForecastDetails>();

  constructor(private forecastService: ForecastService, public translate: TranslateService) {
    translate.use('sl');
    moment.locale('sl');
  }

  ngOnInit() {
    this.loadData();

    //this.loadWeather(); - Load Weather on Init
  }

  loadData() {
    this.weather.cityName = localStorage.getItem('cityName')
    this.weather.description = localStorage.getItem('description')
    this.weather.currentTemperature = parseFloat(localStorage.getItem('currentTemperature'));
    this.weather.maxTemperature = parseFloat(localStorage.getItem('maxTemperature'));
    this.weather.minTemperature = parseFloat(localStorage.getItem('minTemperature'));

    this.dd = [];

    for (var i = 0; i < 5; i++) {

      var details = new ForecastDetails();
      details.date = localStorage.getItem(i + '-date')
      details.currentTemperature = parseFloat(localStorage.getItem(i + '-currentTemperature'));

      this.dd.push(details);
    }
  }

  changeLang(l: string) {
    this.translate.use(l.toLocaleLowerCase());
  }

  loadWeather() {
    this.loading = true;
    this.forecastService.LoadWeather().subscribe(
      res => {

        // Current Weather
        this.refreshTime = moment().format('DD.MM.YYYY [ob] h:mm');

        this.weather.cityName = res.city.name;
        this.weather.description = res.list[0].weather[0].description;
        this.weather.currentTemperature = res.list[0].main.temp;
        this.weather.maxTemperature = res.list[0].main.temp_max;
        this.weather.minTemperature = res.list[0].main.temp_min;

        localStorage.setItem('cityName', this.weather.cityName);
        localStorage.setItem('description', this.weather.description);
        localStorage.setItem('currentTemperature', this.weather.currentTemperature.toString());
        localStorage.setItem('maxTemperature', this.weather.maxTemperature.toString());
        localStorage.setItem('minTemperature', this.weather.minTemperature.toString());

        var n = 0;

        this.dd = [];

        // 5 Day Forecast
        for (var i = 7; i < res.list.length; i = i + 8) // Jumps 8 times to get to next day (A day has 8 details in API)
        {
          var details = new ForecastDetails();
          details.date = moment(res.list[i].dt_txt).format('DD.MM.');
          details.currentTemperature = res.list[i].main.temp;

          localStorage.setItem(n + '-date', details.date);
          localStorage.setItem(n + '-currentTemperature', details.currentTemperature.toString());
          n++;

          this.dd.push(details);
        }
        this.loading = false;
      }
    )

  }


}
