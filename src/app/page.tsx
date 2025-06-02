"use client";
import React, { useState, useEffect } from "react";
import Dashboard from "@/components/Dashboard";
import Search from "@/components/Search";
import {CurrentWeather,DailyForecast,HourlyForecast,WeatherCache,} from "@/utils/types";
import SkeletonCard from "@/components/SkeletonCard";

export default function Home() {
    const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(null);
    const [dailyForecast, setDailyForecast] = useState<DailyForecast>({
        data: [],
    });
    const [hourlyForecast, setHourlyForecast] = useState<HourlyForecast>({
        data: [],
    });

    // to get the locally saved data...
    // if no data found, create a checker flag... 
    const [check, setCheck] = useState<boolean>(false);
    useEffect(() => {
        const cached = localStorage.getItem("WeatherCache");
        if (cached) {
            const parsed: WeatherCache = JSON.parse(cached);
            setCurrentWeather(parsed.currentWeather);
            setDailyForecast(parsed.dailyForecast);
            setHourlyForecast(parsed.hourlyForecast);
            setCheck(false);
        }else{
            setCheck(true);
        }
    }, []);
    // to save data locally...
    useEffect(() => {
        if (!currentWeather || !dailyForecast || !hourlyForecast) return;
        const newCache: WeatherCache = {
            currentWeather,
            dailyForecast,
            hourlyForecast,
        };
        localStorage.setItem("WeatherCache", JSON.stringify(newCache));
    }, [currentWeather, dailyForecast, hourlyForecast]);
    
    const getDataFromSearch = (currentWeather: CurrentWeather,dailyForecast: DailyForecast,hourlyForecast: HourlyForecast ) => {
        setCurrentWeather(currentWeather);
        setDailyForecast(dailyForecast);
        setHourlyForecast(hourlyForecast);
    };


    if (!currentWeather || !dailyForecast){
        return (
            <main className="flex justify-center items-center bg-[#bbafb9] h-screen w-screen">
                <div className=" flex flex-col justify-center items-center gap-[20px] max-w-[1000px] w-8/10 h-85/100">
                    <Search sendData={getDataFromSearch} />
                    <SkeletonCard check = {check} />
                </div>
            </main>
        );
    }   
    return (
        <main className="flex justify-center items-center bg-[#bbafb9] h-screen w-screen">
            <div className=" flex flex-col justify-center items-center gap-[20px] max-w-[1000px] w-8/10 h-85/100">
                <Search sendData={getDataFromSearch} />
                <Dashboard currentWeather={currentWeather} dailyForecast={dailyForecast} hourlyForecast={hourlyForecast}/>
            </div>
        </main>
    );
}