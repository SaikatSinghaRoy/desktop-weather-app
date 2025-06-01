import React, { useState } from 'react'
import { Weather, HourlyForecast, DailyForecast } from '@/utils/types';

const apikey = process.env.NEXT_PUBLIC_API_KEY;
const baseurl = process.env.NEXT_PUBLIC_BASE_URL;

type Props = {sendData : CallableFunction}

export default function Search({ sendData }: Props) {
    const [city, setCity] = useState('');
    const handleInputChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        let inputVal = e.target.value;
        inputVal = inputVal ? inputVal.charAt(0).toUpperCase() + inputVal.substr(1).toLowerCase() : '';
        setCity(inputVal);
    }

    const handleClick = async () => {
        if(city){
            try {
                const weatherRes = await fetch(
                    `${baseurl}/weather?q=${city}&appid=${apikey}&units=metric&lang=en`
                );
                const forecastRes = await fetch(
                    `${baseurl}/forecast?q=${city}&appid=${apikey}&units=metric&lang=en`
                );
                if (!weatherRes.ok || !forecastRes.ok) {
                    throw new Error(`HTTP error, Error in fetching data!`);
                }
                const weatherData = await weatherRes.json();
                const forecastData = await forecastRes.json();

                const newWeather: Weather = {
                    city : city,
                    main : weatherData.weather[0].main,
                    description : weatherData.weather[0].description,
                    icon : weatherData.weather[0].icon,
                    temp : Math.round(weatherData.main.temp),
                    feels_like : Math.floor(weatherData.main.feels_like),
                    humidity : Math.round(weatherData.main.humidity),
                    wind : Math.round(weatherData.wind.speed * 3.6),
                };
                
                // // daysForecast is an object that stores one forecastData.list per day of exactly 09:00:00
                const daysForecast: { [key: string]: any } = {};
                for (let entry of forecastData.list) {
                    if (entry.dt_txt.includes("09:00:00")) {
                        const date = entry.dt_txt.split(" ")[0]; // YYYY-MM-DD
                        if (!daysForecast[date]) {
                            daysForecast[date] = entry;
                        }
                    }
                }
                // // daysForecast = {
                // //     "YYYY-MM-10": { stores forecastData.list[] whose date is YYYY-MM-10 and time if 09:00:00  },
                // //     "YYYY-MM-11": { stores forecastData.list[] whose date is YYYY-MM-11 and time if 09:00:00 },
                // //     "YYYY-MM-12": { stores forecastData.list[] whose date is YYYY-MM-12 and time if 09:00:00 },
                // //     ......
                // // }
                let forecastArray = Object.values(daysForecast).slice(0, 5); 
                // from the object converts to array of size 5, evenif by any chance there are more elemnts, we are ignoring

                // if forecastArray has 4 elements then we are including the last element from forecastData.list
                if (forecastArray.length < 5 && forecastData.list.length === 40) {
                    const lastEntry = forecastData.list[39];
                    const lastDate = lastEntry.dt_txt.split(" ")[0];

                    // Make sure it's not already included
                    if (!daysForecast[lastDate]) {
                        forecastArray.push(lastEntry);
                    }
                }
                const formattedDailyForecast = forecastArray.map((entry: any) => {
                    const date = new Date(entry.dt_txt);
                    const day = date.toLocaleDateString("en-US", { weekday: "short" });
                    const temp = Math.round(entry.main.temp);
                    const main = entry.weather[0].main;
                    return { day, temp, main };
                });
                const newDailyForecast: DailyForecast = {data : formattedDailyForecast };

                const formattedHourlyForecast = forecastData.list.slice(0, 6).map((entry: any) => {
                    const date = new Date(entry.dt_txt);
                    const time = date.toLocaleTimeString("en-US", {
                        hour:"2-digit",
                    })
                    const main = entry.weather[0].main;
                    const temp = Math.round(entry.main.temp);
                    return { time, temp, main };
                });
                const newHourlyForecast: HourlyForecast = { data: formattedHourlyForecast };
                            
                sendData(newWeather, newDailyForecast, newHourlyForecast);
                setCity('');
            }
            catch (error) {
                console.error("Error fetching data:", error);
            }
        }
    }

    return (
        <div className="w-full flex justify-end items-center">
            <div className="flex justify-between rounded-[20px] border-solid border-[1.7px] ">
                <input
                    className="pl-[20px] pr-[40px] py-[15px] bg-transparent outline-none text-[16px] border-hidden"
                    type="text"
                    placeholder="Search a City..."
                    autoComplete="off"
                    value={city}
                    onChange={ handleInputChange }
                />
                <button
                    className="cursor-pointer bg-transparent p-[15px] font-[16px] border-hidden outline-none"
                    onClick={ handleClick }
                >Search</button>
            </div>
        </div>
  )
}