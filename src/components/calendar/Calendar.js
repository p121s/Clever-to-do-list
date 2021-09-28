/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Day from "./day/Day";
import ToDoList from '../ToDoList/ToDoList';
import './Calendar.scss';
import { useEffect } from "react/cjs/react.development";

export default function Calendar ({allTasks}) {

    const [tasksAtThisDay, setTasksAtThisDay] = useState(allTasks);
    const [today] = useState(new Date());
    const [chooseDate, setChooseDate] = useState(new Date());

    console.log(allTasks);
    
    const daysInMonth = 32 - new Date(today.getFullYear(), today.getMonth(), 32).getDate();
    const daysName = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    useEffect(() => {
        setTasksAtThisDay(allTasks.filter(task => {
            if(JSON.stringify(task[1].dateTask.split('-').map(item => +item)) === JSON.stringify([chooseDate.getFullYear(), chooseDate.getMonth(), chooseDate.getDate()])) {
                return task;
            }
        }));
    }, [chooseDate]);
    
    let day = today.getDate();
    let month = today.getMonth();
    let year = today.getFullYear();
    const days = new Array(daysInMonth).fill(null);

    for (let i = 0; i <= 30; i++) {
        day === daysInMonth + 1 ? day = 1 : day;
        day === 1 ? month += 1 : month;
        month === 12 ? month = 0 : month;
        month === 0 ? year += 1 : year;
        days[i] = [daysName[new Date(year, month, day).getDay()], day, month + 1, year];
        day++;
    }

    const handleDate = (e) => {
        console.log(e.currentTarget.getAttribute('value'));
        setChooseDate(new Date(e.currentTarget.getAttribute('value')));
    };

    console.log(tasksAtThisDay);

    return(
        <>
            <div className='calendar'>
                {days.map((day, i) => (
                    <Day key={`${day[0]}_${day[1]}_${day[2]}`} className={i === 0 ? 'today' : 'day'} day={day[0]} date={day[1]} month={day[2]} year={day[3]} handleDate={handleDate} />
                ))}
            </div>
            <ToDoList allTodayTasks={tasksAtThisDay} />
        </>
    );
}