import React from 'react'
import Image from 'next/image'

import {CurrentWeather, HourlyForecast, DailyForecast} from '@/utility/types'
import humidity from '../../public/humidity.png';
import wind from '../../public/wind.png';
import Box from './Box'

type Props = {currentWeather : CurrentWeather, dailyForecast : DailyForecast, hourlyForecast: HourlyForecast}

export default function Dashboard({currentWeather, dailyForecast, hourlyForecast}: Props) {
    const date = new Date();
    const displayMsg = () => {
        let hr = date.getHours();
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
        <div className="bg-[#efeff0] h-full w-full rounded-[20px] flex flex-row max-sm:flex-col justify-between">
            
            <div className="w-72/100 max-sm:w-full max-sm:h-70/100 max-sm:p-[20px] px-[40px] py-[20px]">
                <header className="flex justify-center items-end font-[600] ">
                    <p className="w-5/10 text-[21px] max-sm:text-[17px] max-lg:text-[19px]">{currentWeather.city.toLowerCase().replace(/\b\w/g, char => char.toUpperCase())}</p>
                    <p className="w-3/10 text-[16px] max-sm:text-[12px] max-lg:text-[14px] ">
                        {date.toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </p>
                </header>
                <section className="text-center max-sm:mt-[60px] md:max-lg:mt-[60px] mt-[70px] text-[#5f5054]">
                    <p className="text-[180px]/[150px] max-sm:text-[120px]/[100px] md:max-lg:text-[140px]/[120px] lg:max-xl:text-[150px]/[130px] font-[600] relative">
                        {currentWeather.temp}&#730;
                        <span className="text-[#8d8087] absolute text-[100px]/[100px] max-sm:hidden md:max-lg:text-[70px]/[70px] lg:max-xl:text-[80px]/[80px] font-[600]">C</span>
                    </p>
                    <p className="text-[#706269] text-[30px] max-sm:text-[15px] md:max-lg:text-[20px] lg:max-xl:text-[25px] font-[700] relative">{currentWeather.description.toLowerCase().replace(/\b\w/g, char => char.toUpperCase())}</p>
                </section>
                <section className="mt-[60px] max-sm:mt-[35px] md:max-xl:mt-[50px] max-sm:mx-[12px] mx-[30px] flex justify-center xl:gap-[20px] lg:gap-[15px] md:gap-[12px] max-sm:gap-[10px] text-[13px] ">
                    <Box day={"Today"} temp ={currentWeather?.temp} description={currentWeather?.main} border={true} />
                    {dailyForecast.data.map((entry: any) => (
                        <Box  key={entry.day} day={entry.day} temp={entry.temp} description={entry.main} border = {false} />
                    ))}
                </section>
            </div>
            
            
            <div className="w-28/100 max-sm:w-full max-sm:h-3/10 max-sm:p-[10px] md:max-lg:p-[10px] p-[20px] text-center flex max-sm:flex-row md:flex-col bg-[#e7e4e7] md:rounded-r-[20px] max-sm:rounded-b-[20px]">
                <p className="text-[25px] font-[500] max-sm:hidden md:max-lg:text-[16px] lg:max-xl:text-[22px] "> { displayMsg() }</p>
                <p className="mt-1.5 text-[21.5px] lg:max-xl:text-[19px] md:max-lg:text-[14px] md:max-lg:mt-0.5 md:max-lg:mb-[30px]  font-[500] mb-[35px] max-sm:hidden">
                    {date.toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </p>
                <section className="mx-auto my-auto md:max-lg:w-[140px] lg:max-xl:w-[150px] xl:w-[170px] max-sm:w-[110px] max-sm:h-[80px]">
                    <div className="flex">
                        <p className="w-45/100 text-[35px] max-sm:text-[22px] md:max-lg:text-[26px] lg:max-xl:text-[30px] font-[700] text-center content-center">
                            {currentWeather.temp}&#730;
                        </p>
                        <div className="w-55/100 p-1 flex flex-col justify-center items-start gap-1 lg:gap-1.5">
                            <p className=" flex items-center lg:gap-2 text-[12px] max-md:text-[9px] md:max-lg:text-[10.5px] max-lg:gap-1.5 ">
                                <Image src={humidity} alt="_blank" height='16' className=' max-sm:w-[11px] md:max-lg:w-[13px]'/>
                                {currentWeather.humidity + " %"}
                            </p>
                            <p className="flex items-center lg:gap-2 text-[11px] max-md:text-[8px] md:max-lg:text-[10.5px] max-lg:gap-1.5 " >
                                <Image src={wind} alt="_blank" height="16" className='max-sm:w-[11px] md:max-lg:w-[13px]' />
                                {currentWeather.wind + " kmph"}
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <p className="w-55/100 max-sm:w-[45px] md:max-xl:w-[50px] "
                            style={{
                                backgroundImage: `url("https://openweathermap.org/img/wn/${currentWeather.icon}@2x.png")`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        ></p>
                        <div className="w-6/10 p-1.5 flex flex-col max-sm:gap-0.5">
                            <p className="text-[12px] max-sm:text-[8px] md:max-xl:text-[11px]">{"Feels Like " + currentWeather.feels_like}&#730;</p>
                            <p className="font-[500] text-[15px] max-sm:text-[9px] md:max-xl:text-[12px] ">{currentWeather.main}</p>
                        </div>
                    </div>
                </section>
                <section className="lg:mt-[55px] md:mt-[48px] max-sm:w-[140px] md:max-lg:w-[160px] max-lg:mx-auto max-lg:my-auto">
                    <p className="text-[17px] font-[600] md:mb-2.5 max-sm:mb-2 max-sm:text-[12px]/[12px] md:max-xl:text-[15px]/[15px]">Hourly Forecast</p>
                    <div className="flex xl:gap-2.5 max-xl:gap-2 justify-center flex-wrap">
                        {hourlyForecast.data.map((entry : any) => (
                            <Box key = {entry.time} day={entry.time} temp={entry.temp} description={entry.main} border={true} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}