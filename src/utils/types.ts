export interface Weather{
    city : string;
    main : string;
    description : string;
    icon : string;
    temp : number;
    feels_like : number;
    humidity : number;
    wind : number;
}

export interface DayForecast {
    day: string;
    temp : number;
    main: string;
}
export interface DailyForecast{
    data : DayForecast[]
}

export interface HourForecast{
    time: string;
    temp: number;
    main: string;
};
export interface HourlyForecast{
    data : HourForecast[]
}

export interface WeatherCache{
    weather: Weather;
    dailyForecast: DailyForecast;
    hourlyForecast: HourlyForecast;
}