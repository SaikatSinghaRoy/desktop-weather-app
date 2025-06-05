'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { FiSearch } from "react-icons/fi";

import fetchWeather from '@/utility/fetchWeather';
import fetchForecast from '@/utility/fetchForecast';
import { WeatherCache } from '@/utility/types';

type Props = {}
export default function Search( {} : Props) {
    const router = useRouter(); // important

    const [city, setCity] = useState('');
    const handleInputChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        let inputVal = e.target.value;
        inputVal = inputVal ? inputVal.toLowerCase() : "";
        setCity(inputVal);
    }

    const handleClick = async () => {
        if(!city) return;

        try{
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
            
            const newCache: WeatherCache = {
                currentWeather : currentWeather,
                dailyForecast: dailyForecast,
                hourlyForecast: hourlyForecast,
            };

            const cityURL = city.trim().toLowerCase().replace(/\s+/g, '-');
            // to save locally...
            localStorage.setItem(`weather-${cityURL}`, JSON.stringify(newCache));
            // for the url...
            router.push(`/city/${encodeURIComponent(cityURL)}`);
            setCity('');
        }
        catch(err){
            console.error("Error fetching data:", err);
        }
    }
    
    return (
        <div className="w-full flex justify-end items-center">
            <div className=" max-sm:w-full max-sm:max-w-[400px] flex justify-between max-lg:rounded-[14px] lg:max-xl:rounded-[15px] rounded-[17px] border-solid border-[1.7px] ">
                <input
                    className=" max-sm:p-[10px] sm:max-lg:p-[15px] max-sm:text-[12px] md:max-lg:text-[14.5px] lg:max-xl:px-[25px] lg:max-xl:py-[15px] lg:max-xl:text-[15px] xl:text-[16px] xl:pl-[20px] xl:pr-[40px] xl:py-[18px] bg-transparent outline-none border-hidden"
                    type="text"
                    placeholder="Search a City..."
                    autoComplete="off"
                    value={ city }
                    onChange={ handleInputChange }
                />
                <button
                    className="cursor-pointer bg-transparent md:max-lg:text-[14.5px] lg:max-xl:text-[15px] max-sm:p-[10px] sm:p-[15px] xl:text-[16px] border-hidden outline-none"
                    onClick={ handleClick }
                > <FiSearch className='sm:hidden max-sm:text-[20px]'/><span className='max-sm:hidden'>Search</span></button>
            </div>
        </div>
    )
}