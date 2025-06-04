"use client";
import React, {useEffect,useState} from "react";
import { useParams } from "next/navigation";

import {CurrentWeather, HourlyForecast, DailyForecast,WeatherCache} from '@/utility/types'
import fetchWeather from "@/utility/fetchWeather";
import fetchForecast from "@/utility/fetchForecast";
import Search from "@/components/Search";
import SkeletonCard from "@/components/SkeletonCard";
import Dashboard from "@/components/Dashboard";

type Props = {};

export default function WeatherPage({}: Props) {
    const params = useParams();
    const cityParam = params.city;
    const cityURL = Array.isArray(cityParam) ? cityParam[0] : cityParam;

    const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(null);
    const [dailyForecast, setDailyForecast] = useState<DailyForecast>({
        data: [],
    });
    const [hourlyForecast, setHourlyForecast] = useState<HourlyForecast>({
        data: [],
    });

    useEffect(() => {
        if(!cityURL) return;

        const cached = localStorage.getItem(`weather-${cityURL}`);
        if (cached){
            try{
                const parsed: WeatherCache = JSON.parse(cached);
                setCurrentWeather(parsed.currentWeather);
                setDailyForecast(parsed.dailyForecast);
                setHourlyForecast(parsed.hourlyForecast);
                return;
            }catch{
                console.warn('Corrupted local data. Re-fetching...');
                localStorage.removeItem(`weather-${cityURL}`);
            }
        }

        // Fallback: Fetch from API if not cached
        const reFetchAndCache = async () => {
            const city = cityURL.replace(/-/g, ' ');
            try {
                const currentWeather = await fetchWeather({ city });
                if (!currentWeather) {
                    console.error("No current weather data returned");
                    return;
                }

                const result = await fetchForecast({ city });
                if (!result) {
                    console.error("No forecast data returned");
                    return;
                }
                const { dailyForecast, hourlyForecast } = result;

                setCurrentWeather(currentWeather);
                setDailyForecast(dailyForecast);
                setHourlyForecast(hourlyForecast);

                const cache: WeatherCache = {
                    currentWeather,
                    dailyForecast,
                    hourlyForecast,
                };
                localStorage.setItem(`weather-${cityURL}`, JSON.stringify(cache));

            }
            catch (err) {
                console.error("Failed to fetch weather data", err);
            }
        };

        reFetchAndCache();

    }, [cityURL]);

    if(!currentWeather || !dailyForecast || !hourlyForecast) {
        return(
            <main className="flex justify-center items-center bg-[#bbafb9] h-screen w-screen">
                <div className=" flex flex-col justify-center items-center gap-[20px] max-xl:gap-[15px] md:max-lg:w-[650px] md:max-lg:max-h-[500px] lg:max-xl:max-h-[600px] max-sm:max-h-[600px] max-w-[1000px] max-h-[630px] w-8/10 h-85/100 ">
                    <Search />
                    
                </div>
            </main>
        )
    }

    return (
        <main className="flex justify-center items-center bg-[#bbafb9] h-screen w-screen">
            <div className=" flex flex-col justify-center items-center gap-[20px] max-xl:gap-[15px] md:max-lg:w-[650px] md:max-lg:max-h-[500px] lg:max-xl:max-h-[600px] max-sm:max-h-[600px] max-w-[1000px] max-h-[630px] w-8/10 h-85/100 ">
                <Search />
                <Dashboard currentWeather={currentWeather} dailyForecast={dailyForecast} hourlyForecast={hourlyForecast}/>
            </div>
        </main>
    )
}