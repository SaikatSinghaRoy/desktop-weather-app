"use client";
import React, { useState, useEffect } from "react";
import Dashboard from "@/components/Dashboard";
import Search from "@/components/Search";
import {Weather,DailyForecast,HourlyForecast,WeatherCache,} from "@/utils/types";
import SkeletonCard from "@/components/SkeletonCard";

export default function Home() {
    const [weather, setWeather] = useState<Weather | null>(null);
    const [dailyForecast, setDailyForecast] = useState<DailyForecast>({
        data: [],
    });
    const [hourlyForecast, setHourlyForecast] = useState<HourlyForecast>({
        data: [],
    });
    useEffect(() => {
        const cached = localStorage.getItem("WeatherCache");
        if (cached) {
            const parsed: WeatherCache = JSON.parse(cached);
            setWeather(parsed.weather);
            setDailyForecast(parsed.dailyForecast);
            setHourlyForecast(parsed.hourlyForecast);
        }
    }, []);
    useEffect(() => {
        if (!weather || !dailyForecast || !hourlyForecast) return;
        const newCache: WeatherCache = {
            weather,
            dailyForecast,
            hourlyForecast,
        };
        localStorage.setItem("WeatherCache", JSON.stringify(newCache));
    }, [weather, dailyForecast, hourlyForecast]);
    
    const getDataFromSearch = (weather: Weather,dailyForecast: DailyForecast,hourlyForecast: HourlyForecast ) => {
        setWeather(weather);
        setDailyForecast(dailyForecast);
        setHourlyForecast(hourlyForecast);
    };

    if (!weather || !dailyForecast){
        return (
            <main className="flex justify-center items-center bg-[#bbafb9] h-screen w-screen">
                <div className=" flex flex-col justify-center items-center gap-[20px] max-w-[1000px] w-8/10 h-85/100">
                    <Search sendData={getDataFromSearch} />
                    <SkeletonCard />
                </div>
            </main>
        );
    }   
    return (
        <main className="flex justify-center items-center bg-[#bbafb9] h-screen w-screen">
            <div className=" flex flex-col justify-center items-center gap-[20px] max-w-[1000px] w-8/10 h-85/100">
                <Search sendData={getDataFromSearch} />
                <Dashboard weather={weather} dailyForecast={dailyForecast} hourlyForecast={hourlyForecast}/>
            </div>
        </main>
    );
}