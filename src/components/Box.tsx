import React from 'react'

type Props = { day : string, temp : number, description: string, border : boolean}

export default function Box({day , temp, description, border}: Props) {
  return (
    <div className= "h-[90px] w-[65px] lg:max-xl:h-[70px] lg:max-xl:w-[52px] md:max-lg:h-[60px] md:max-lg:w-[45px] max-sm:h-[45px] max-sm:w-[30px] max-sm:rounded-[5px] md:rounded-md lg:rounded-lg flex flex-col justify-center items-center gap-0.5 lg:gap-1" style={{border: border ? "1.2px solid #bbafb9" : "none"}}>
        <p className='max-sm:text-[6px] md:max-lg:text-[8px] lg:max-xl:text-[9.5px] text-[11px] font-[700] text-[#5f5054] '>{day}</p>
        <p className='max-sm:text-[10px] md:max-lg:text-[15px] lg:max-xl:text-[18px] text-[22px] font-[700] '>{temp}&#730;</p>
        <p className='max-sm:text-[6px] md:max-lg:text-[8px] lg:max-xl:text-[9.5px] text-[11px] text-[#8d8087] font-[600]'>{description}</p>           
    </div>
  )
}