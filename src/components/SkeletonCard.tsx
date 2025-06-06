'use client'
import React from "react"
import { Skeleton } from "./ui/skeleton"

type Props = {}

export default function SkeletonCard( {}:Props ) {
    const date = new Date();
    return (
        <div className="bg-[#efeff0] h-full w-full rounded-[20px] flex flex-row justify-between">
            <div className="w-72/100 px-[40px] py-[20px]">
                <header className="flex justify-center items-end font-[600]">
                    <div className="w-5/10">
                        <Skeleton className="h-7 w-40 bg-[#cec7ce] rounded-2xl"/>
                    </div>
                    <p className="w-3/10 text-[16px] mt-[7.5px]">
                        {date.toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </p>
                </header>
                <div className="mt-[70px]">
                    <div className="h-[145px] w-[260px] mx-auto relative mb-[11px] ">
                        <Skeleton className=" h-[145px] w-[260px] bg-[#cec7ce] rounded-[20px] "/>
                    </div>
                    <div className="h-[35px] w-[300px] mx-auto relative ">
                        <Skeleton className=" h-[30px] w-[300px] bg-[#cec7ce] rounded-3xl"/>
                    </div>
                </div>
                <section className="mt-[64.5px] mx-[30px] flex justify-center gap-[20px] text-[13px] ">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="h-[90px] w-[65px] rounded-lg flex flex-col justify-center items-center gap-1">
                            <Skeleton className="h-[90px] w-[65px] bg-[#cec7ce] rounded-lg " />
                        </div>
                    ))}
                </section>
            </div>
            
            {/* right side of the dashboard */}
            <div className="w-28/100 p-[20px] text-center bg-[#e7e4e7] rounded-r-[20px]">

                <div className="mt-[8px] w-[220px] h-[30px] mx-auto">
                    <Skeleton className="w-[220px] h-[30px] bg-[#cec7ce] rounded-xl" />
                </div>
                <p className="mt-1.5 text-[21.5px] font-[500] mb-[35px]">
                    {date.toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </p>
                <section className="mx-auto w-[150px] h-[100px]">
                    <Skeleton className="w-[150px] h-[100px] bg-[#cec7ce] rounded-xl" />
                </section>
                <section className="mt-[60px]">
                    <p className="text-[17px] font-[600] mb-[9.5px]">Hourly Forecast</p>
                    <div className="flex gap-2.5 justify-center flex-wrap ">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="h-[90px] w-[65px] rounded-lg flex flex-col justify-center items-center gap-1">
                                <Skeleton className="h-[90px] w-[65px] bg-[#cec7ce] rounded-lg " />
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}