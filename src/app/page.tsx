import React from "react";
import Search from "@/components/Search";
import LandingPage from "@/components/LandingPage";

export default function Home() {
    return(
        <main className="flex justify-center items-center bg-[#bbafb9] h-screen w-screen">
            <div className=" flex flex-col justify-center items-center gap-[20px] max-xl:gap-[15px] md:max-lg:w-[650px] md:max-lg:max-h-[500px] lg:max-xl:max-h-[600px] max-sm:max-h-[600px] max-w-[1000px] max-h-[630px] w-8/10 h-85/100 ">
                <Search />
                <LandingPage />
            </div>
        </main>
    )
}