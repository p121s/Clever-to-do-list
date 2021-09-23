// import { useState } from "react";
import Day from "./day/Day";
import './Calendar.scss';

export default function Calendar () {

    const today = new Date();
    const daysInMonth = 32 - new Date(today.getFullYear(), today.getMonth(), 32).getDate();
    const daysName = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    let day = 0;
    const days = new Array(daysInMonth - 15).fill(null);

    for (let i = today.getDate(); i <= daysInMonth; i++) {
        days[day] = <Day day={daysName[new Date(today.getFullYear(), today.getMonth(), i).getDay()]} date={i} />;
        day++;
    }

    // console.log(days);
    console.log(today.getDate(), daysInMonth);

    return(
        <div className='calendar'>
            {days.map(day => day)}
        </div>
    );
}