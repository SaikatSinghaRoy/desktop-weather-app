import React from 'react'
import Image from 'next/image'

import {CurrentWeather, HourlyForecast, DailyForecast} from '@/utils/types'
import humidity from '../../public/humidity.png';
import wind from '../../public/wind.png';
import Box from './Box'

type Props = {currentWeather : CurrentWeather, dailyForecast : DailyForecast, hourlyForecast: HourlyForecast}

export default function Dashboard({currentWeather, dailyForecast, hourlyForecast}: Props) {
    const displayMsg = () => {
        let hr = new Date().getHours();
        if (hr >= 5 && hr <= 10) {
            return "Good Morning";
        } else if (hr > 10 && hr <= 14) {
            return "Have a Nice Day";
        } else if (hr > 17 && hr <= 20) {
            return "Good Evening";
        } else {
            return "Have a Nice Day";
        }
    }
    return (
        <div className="bg-[#efeff0] h-full w-full rounded-[20px] flex flex-row justify-between">
            {/* leftSide of the dashboard */}
            <div className="w-72/100 px-[40px] py-[20px]">
                <header className="flex justify-center items-end font-[600] ">
                    <p className="w-5/10 text-[21px]">{currentWeather.city}</p>
                    <p className="w-3/10 text-[16px]">
                        {new Date().toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </p>
                </header>
                <section className="text-center mt-[70px] text-[#5f5054]">
                    <p className="text-[170px]/[150px] font-[600] relative">
                        {currentWeather.temp}&#730;
                        <span className="text-[#8d8087] absolute text-[100px]/[100px] font-[600]">C</span>
                    </p>
                    <p className="text-[#706269] text-[30px] font-[700] relative">{currentWeather.description.charAt(0).toUpperCase() + currentWeather.description.slice(1)}</p>
                </section>
                <section className="mt-[60px] mx-[30px] flex justify-center gap-[20px] text-[13px] ">
                    <Box day={"Today"} temp={currentWeather.temp} description={currentWeather.main} border={true} />
                    {dailyForecast.data.map((entry: any) => (
                        <Box  key={entry.day} day={entry.day} temp={entry.temp} description={entry.main} border = {false} />
                    ))}
                </section>
            </div>
            
            {/* right side of the dashboard */}
            <div className="w-28/100 p-[20px] text-center bg-[#e7e4e7] rounded-r-[20px]">
                <p className="text-[25px] font-[500]"> { displayMsg() }</p>
                <p className="mt-1.5 text-[21.5px] font-[500] mb-[35px]">
                    {new Date().toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </p>
                <section className="mx-auto my-0 w-[150px]">
                    <div className="flex">
                        <p className="w-45/100 text-[35px] font-[700] content-center">
                            {currentWeather.temp}&#730;
                        </p>
                        <div className="w-55/100 p-1 flex flex-col justify-center items-start gap-1.5">
                            <p className=" flex items-center gap-2 text-[12px]">
                                <Image src={humidity} alt="_blank" height="16"/>
                                {currentWeather.humidity} %
                            </p>
                            <p className="flex items-center gap-2 text-[11px]">
                                <Image src={wind} alt="_blank" height="16" />
                                {currentWeather.wind} kmph
                            </p>
                        </div>
                    </div>
                    <div className="flex">
                        <p className="w-4/10"
                            style={{
                                backgroundImage: `url("https://openweathermap.org/img/wn/${currentWeather.icon}@2x.png")`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        ></p>
                        <div className="w-6/10 p-1.5 flex flex-col">
                            <p className="text-[12px] ">Feels Like {currentWeather.feels_like}&#730;</p>
                            <p className="font-[500] text-[15px]">{currentWeather.main}</p>
                        </div>
                    </div>
                </section>
                <section className="mt-[55px]">
                    <p className="text-[17px] font-[600] mb-2.5">Hourly Forecast</p>
                    <div className="flex gap-2.5 justify-center flex-wrap">
                        {hourlyForecast.data.map((entry : any) => (
                            <Box key = {entry.time} day={entry.time} temp={entry.temp} description={entry.main} border={true} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
  )
}