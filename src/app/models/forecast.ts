export class WeatherData {
    public cityName: string
    public description: string
    public currentTemperature: number
    public minTemperature: number
    public maxTemperature: number
}

export class ForecastDetails extends WeatherData {
    public date: string
}