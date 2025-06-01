import React from "react"
import { Skeleton } from "./ui/skeleton"

export default function SkeletonCard() {
    return (
        <div className="bg-[#efeff0] h-full w-full rounded-[20px] flex flex-row justify-between">
            <div className="w-75/100 px-[40px] py-[20px]">
                <header className="flex justify-center items-end">
                    {/* <p className="text-[21px]">
                        Search for a city to get the latest weather updates
                    </p> */}
                    <div className="w-5/10">
                        <Skeleton className="mt-1 h-6 w-40 bg-[#cec7ce] rounded-2xl "/>
                    </div>
                    <div className="w-3/10">
                        <Skeleton className="mt-1 h-5 w-[140px] bg-[#cec7ce] rounded-2xl"/>
                    </div>
                </header>
                <div className="mt-[70px]">
                    <div className="h-[150px] w-[200px] mx-auto relative mb-[11px] ">
                        <Skeleton className=" h-[150px] w-[200px] bg-[#cec7ce] rounded-[20px] "/>
                    </div>
                    <div className="h-[35px] w-[300px] mx-auto relative ">
                        <Skeleton className=" h-[35px] w-[300px] bg-[#cec7ce] rounded-3xl"/>
                    </div>
                </div>
                <section className="mt-[60px] mx-[30px] flex justify-center gap-[20px] text-[13px] ">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="h-[90px] w-[65px] rounded-lg flex flex-col justify-center items-center gap-1">
                            <Skeleton className="h-[90px] w-[65px] bg-[#cec7ce] rounded-lg " />
                        </div>
                    ))}
                </section>
            </div>
            
            {/* right side of the dashboard */}
            <div className="w-3/10 p-[20px] bg-[#e7e4e7] rounded-r-[20px]">
                <div className="h-[30px] w-[220px] mx-auto mt-[7px] ">
                    <Skeleton className="h-[30px] w-[220px] bg-[#cec7ce] rounded-xl"/>
                </div>
                <div className="h-[22px] w-[100px] mx-auto mt-[9px] mb-[45px] ">
                    <Skeleton className="h-[22px] w-[100px] bg-[#cec7ce] rounded-xl" />
                </div>
                <section className="mx-auto w-[150px]">
                    <Skeleton className="w-[150px] h-[100px] bg-[#cec7ce] rounded-xl" />
                </section>
                <section className="mt-[60px]">
                    <div className="w-[200px] h-[20px] mx-auto mb-2.5 ">
                        <Skeleton className=" w-[200px] h-[20px] bg-[#cec7ce] rounded-xl" />
                    </div>
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