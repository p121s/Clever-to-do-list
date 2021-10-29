/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import Day from "./day/Day";
import ToDoList from '../ToDoList/ToDoList';
import { daysName } from "../../constsnts/Constants";
import './Calendar.scss';

export default function Calendar ({allTasks}) {

    const today = new Date();
    const [countDays, setCountDays] = useState(30);
    const [days, setDays] = useState([]);
    const [tasksAtThisDay, setTasksAtThisDay] = useState([]);
    const [chooseDate, setChooseDate] = useState();
    const [tasksAtThisDayLenght, settasksAtThisDayLenght] = useState(0);

    const daysInMonth = (month, year) => {
        return 32 - new Date(year, month, 32).getDate();
    };

    const nextDateInMonth = (year, month, day) => {
        if(day === daysInMonth(month, year) + 1) {
            day = 1;
            month += 1;
        }
        if(month === 12) {
            month = 0;
            year += 1;
        }
        return {
            day: day,
            month: month,
            year: year
        };
    };

    const checkTaskDoneAndNot = (year, month, day) => {
        const isTasksDoneOrNot = {
            doesntDoneTasks: false,
            doneTasks: false
        };
        allTasks.forEach(task => {
            if(new Date(task.dateTask).getTime() === new Date(year, month, day, 3, 0, 0, 0).getTime()) {
                task.statusTask ? isTasksDoneOrNot.doneTasks = true : isTasksDoneOrNot.doesntDoneTasks = true;
            }
        });
        return isTasksDoneOrNot;
    };

    const readyDay = () => {
        let day = today.getDate();
        let month = today.getMonth();
        let year = today.getFullYear();
        return function () {
            const nextDate = nextDateInMonth(year, month, day);
            day = nextDate.day;
            month = nextDate.month;
            year = nextDate.year;
            return {
                dayName: daysName[new Date(year, month, day).getDay()],
                day: day++,
                month: month,
                year: year
            };
        };
    };

    const generDay = readyDay();
    
    useEffect(() => {
        let tempArr = [];
        for (let i = 0; i < countDays; i++) {
            const tempObj = generDay();
            tempArr = [...tempArr, {...tempObj, ...checkTaskDoneAndNot(tempObj.year, tempObj.month, tempObj.day)}];
        }
        setDays(tempArr);
    }, [allTasks, countDays]);

    useEffect(() => {
        setTasksAtThisDay(allTasks.filter(task => {
            return new Date(task.dateTask).getTime() === new Date(today.getFullYear(), today.getMonth(), today.getDate(), 3, 0, 0, 0).getTime() && task;
        }));
    }, [allTasks]);

    useEffect(() => {
        setTasksAtThisDay(allTasks.filter(task => {
            return new Date(task.dateTask).getTime() === new Date(chooseDate.getFullYear(), chooseDate.getMonth(), chooseDate.getDate(), 3, 0, 0, 0).getTime() && task;
        }));
    }, [chooseDate]);

    useEffect(() => {
        settasksAtThisDayLenght(tasksAtThisDay.length);
    }, [tasksAtThisDay]);

    function changeClassChooseDay (elem) {
        const daysCollection = document.getElementsByClassName("day");
        [...daysCollection].forEach(elem => elem.classList.remove("chooseDay"));
        elem.classList.add("chooseDay");
    }
    
    const handleDate = (e) => {
        setChooseDate(new Date(e.currentTarget.value));
        changeClassChooseDay(e.currentTarget);
    };

    const handleScroll = (e) => {
        if(Math.ceil(e.target.scrollLeft + e.target.clientWidth) === e.target.scrollWidth) {
            setCountDays(countDays + 30);
        }
    };

    return(
        <>
            <div className='calendar' onScroll={handleScroll}>
                {days.length ? days.map((day, i) => (
                    <Day 
                        key={`${day.day}_${day.month}_${day.year}`} 
                        className={i === 0 ? 'today' : 'day'} 
                        day={day.dayName} date={day.day} 
                        month={day.month} year={day.year} 
                        doesntDoneTasks={day.doesntDoneTasks} 
                        doneTasks={day.doneTasks} 
                        handleDate={handleDate} />
                )) : ''}
            </div>
            <ToDoList allTodayTasks={tasksAtThisDay} counterTask={tasksAtThisDayLenght} />
        </>
    );
}