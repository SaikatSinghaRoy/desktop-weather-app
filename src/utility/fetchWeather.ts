import React from 'react'
import { CurrentWeather } from '@/utility/types';

type Props = {city : string}

async function fetchWeather({city}: Props) {
    if(!city) return;
    const apikey = process.env.NEXT_PUBLIC_API_KEY;
    const baseurl = process.env.NEXT_PUBLIC_BASE_URL;

    try{
        const weatherRes = await fetch(
            `${baseurl}/weather?q=${city}&appid=${apikey}&units=metric&lang=en`
        );
        if (!weatherRes.ok) {
            throw new Error(`HTTP error, Error in fetching weather data !!`);
        }
        const weatherData = await weatherRes.json();
        const currentWeather : CurrentWeather = {
            city : city,
            main : weatherData.weather[0].main,
            description : weatherData.weather[0].description,
            icon : weatherData.weather[0].icon,
            temp : Math.round(weatherData.main.temp),
            feels_like : Math.floor(weatherData.main.feels_like),
            humidity : Math.round(weatherData.main.humidity),
            wind : Math.round(weatherData.wind.speed * 3.6),
        };

        return currentWeather;
    }
    catch(error){
        console.error("Error fetching data:", error);
    }
}

export default fetchWeather;