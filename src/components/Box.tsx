import React from 'react'

type Props = { day : string, temp : number, description: string, border : boolean}

export default function Box({day , temp, description, border}: Props) {
  return (
    <div className= "h-[90px] w-[65px] rounded-lg flex flex-col justify-center items-center gap-1"
    style={{border: border ? "1.2px solid #bbafb9" : "none"}}>
        <p className='text-[11px] font-[700] text-[#5f5054] '>{day}</p>
        <p className='text-[22px] font-[700] '>{temp}&#730;</p>
        <p className='text-[11px] text-[#8d8087] font-[600]'>{description}</p>           
    </div>
  )
}