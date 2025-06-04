import React from 'react'
import { HourlyForecast, DailyForecast } from '@/utility/types';

type Props = {city : string}

async function fetchForecast({city}: Props) {
    if (!city) throw new Error("City is required");
    const apikey = process.env.NEXT_PUBLIC_API_KEY;
    const baseurl = process.env.NEXT_PUBLIC_BASE_URL;

    try{
        const forecastRes = await fetch(
            `${baseurl}/forecast?q=${city}&appid=${apikey}&units=metric&lang=en`
        );
        if (!forecastRes.ok) {
            throw new Error(`HTTP error, Error in fetching forecast data !!`);
        }
        const forecastData = await forecastRes.json();

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
        // from the object converts to array of size 5, evenif by any chance there are more elements, we are ignoring

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
        const dailyForecast: DailyForecast = {data : formattedDailyForecast };

        const formattedHourlyForecast = forecastData.list.slice(0, 6).map((entry: any) => {
            const date = new Date(entry.dt_txt);
            const time = date.toLocaleTimeString("en-US", {
                hour:"2-digit",
                hour12: true,
            })
            const main = entry.weather[0].main;
            const temp = Math.round(entry.main.temp);
            return { time, temp, main };
        });
        const hourlyForecast: HourlyForecast = { data: formattedHourlyForecast };

        return {dailyForecast, hourlyForecast};
    }
    catch(error){
        console.error("Error fetching data:", error);
    }
}

export default fetchForecast;