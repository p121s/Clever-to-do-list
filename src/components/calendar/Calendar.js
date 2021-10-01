/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import Day from "./day/Day";
import ToDoList from '../ToDoList/ToDoList';
import { daysName } from "../../constsnts/Constants";
import './Calendar.scss';

export default function Calendar ({allTasks}) {

    const today = new Date();
    let day = today.getDate();
    let month = today.getMonth();
    let year = today.getFullYear();
    const days = [];
    let doesntDoneTasks = false;
    let doneTasks = false;

    const [tasksAtThisDay, setTasksAtThisDay] = useState([]);
    const [chooseDate, setChooseDate] = useState();
    const [daysInMonth] = useState(32 - new Date(today.getFullYear(), today.getMonth(), 32).getDate());
    const [tasksAtThisDayLenght, settasksAtThisDayLenght] = useState(0);


    function generateArrDays () {
        for (let i = 0; i <= 30; i++) {
            if(day === daysInMonth + 1) {
                day = 1;
                month += 1;
            }
            if(month === 12) {
                month = 0;
                year += 1;
            }
            allTasks.forEach(task => {
                if(JSON.stringify(task[1].dateTask.split('-').map(item => +item)) === JSON.stringify([year, month + 1, day])) {
                    task[1].statusTask ? doneTasks = true : doesntDoneTasks = true;
                }
            });
            days[i] = [daysName[new Date(year, month, day).getDay()], day, month, year, doesntDoneTasks, doneTasks];
            doesntDoneTasks = false;
            doneTasks = false;
            day++;
        }
    }

    useEffect(() => {
        setTasksAtThisDay(allTasks.filter(task => {
            if(JSON.stringify(task[1].dateTask.split('-').map(item => +item)) === JSON.stringify([today.getFullYear(), today.getMonth() + 1, today.getDate()])) {
                return task;
            }
        }));
    }, [allTasks]);

    generateArrDays();

    useEffect(() => {
        setTasksAtThisDay(allTasks.filter(task => {
            if(JSON.stringify(task[1].dateTask.split('-').map(item => +item)) === JSON.stringify([chooseDate.getFullYear(), chooseDate.getMonth() + 1, chooseDate.getDate()])) {
                return task;
            }
        }));
    }, [chooseDate]);

    useEffect(() => {
        settasksAtThisDayLenght(tasksAtThisDay.length);
    }, [tasksAtThisDay]);
    
    const handleDate = (e) => {
        setChooseDate(new Date(e.currentTarget.getAttribute('value')));
    };

    return(
        <>
            <div className='calendar'>
                {days.length !== 0 ? days.map((day, i) => (
                    <Day key={`${day[0]}_${day[1]}_${day[2]}`} className={i === 0 ? 'today' : 'day'} day={day[0]} date={day[1]} month={day[2]} year={day[3]} doesntDoneTasks={day[4]} doneTasks={day[5]} handleDate={handleDate} />
                )) : ''}
            </div>
            <ToDoList allTodayTasks={tasksAtThisDay} counterTask={tasksAtThisDayLenght} />
        </>
    );
}