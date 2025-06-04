import React from 'react'

type Props = {}

export default function LandingPage({}: Props) {
    return (
        <div className="bg-[#efeff0] h-full w-full rounded-[20px] flex flex-row max-sm:flex-col justify-between">
            
            <div className="w-72/100 max-sm:w-full max-sm:h-70/100 max-sm:p-[20px] md:max-lg:p-[25px] px-[40px] py-[20px]">
                <div className="w-full h-full flex justify-center items-center content-center flex-col relative">
                    <div className="absolute ">
                        <p className="text-[#211a1b] text-[25px] max-sm:text-[10px] md:max-lg:text-[15px] lg:max-xl:text-[20px] font-[600]">Search for a city to get the latest weather updates</p>
                    </div>
                    <div>
                        <p className="flex justify-start items-center text-[40px]/[20px] max-sm:text-[16px]/[12px] md:max-lg:text-[25px]/[13px] lg:max-xl:text-[34px]/[16px] font-[800] text-[#5f5054] ">&bull;&bull;&bull;</p>
                        <p className="text-[160px]/[115px] max-sm:text-[65px]/[50px] md:max-lg:text-[95px]/[77px] lg:max-xl:text-[130px]/[100px] font-[700] text-[#e7e4e7]">Weather</p>
                        <p className="flex justify-end items-center text-[40px]/[20px] max-sm:text-[16px]/[12px] md:max-lg:text-[25px]/[13px] lg:max-xl:text-[34px]/[16px] font-[800] text-[#5f5054]">&bull;&bull;&bull;</p>
                    </div>
                </div>
            </div>
            
            
            <div className="w-28/100 max-sm:w-full max-sm:h-3/10 max-sm:p-[10px] p-[20px] text-center bg-[#e7e4e7] md:rounded-r-[20px] max-sm:rounded-b-[20px] max-sm:flex">
                <section className="h-[120px] md:max-lg:h-[60px] flex justify-center items-center max-sm:w-1/2 max-sm:my-auto">
                    <p className="text-[16.5px]/[18px] max-lg:text-[9px]/[10px]">Stay prepared for upcoming weather with <span className="font-[600] ">accurate daily forecast data.</span></p>
                </section>
                <section className="md:mt-[60px] lg:mb-[10px] max-sm:w-1/2 max-sm:my-auto">
                    <p className="text-[20px]/[16px] font-[600] max-sm:text-[15px]/[13px] md:max-lg:text-[14px]/[12px]">Weather forecast</p>
                    <p className="text-[20px]/[16px] font-[600] max-sm:text-[15px]/[13px] md:max-lg:text-[14px]/[12px]"> in your pocket</p>
                </section>
            </div>
        </div>
    )
}