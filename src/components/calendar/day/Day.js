/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import './Day.scss';

export default function Day({ day, date, month, year, handleDate, className, doesntDoneTasks, doneTasks }) {

    return (
        <button className={className} value={new Date(year, month, date)} onClick={handleDate}>
            <div className='month_yaer'>{month + 1}/{year}</div>
            <div className='day_name'>{day}</div>
            <div className='date'>{date}</div>
            <div className='doesnt_done_tasks' style={{display: doesntDoneTasks ? 'inline-block' : 'none'}}></div>
            <div className='done_tasks' style={{display: doneTasks ? 'inline-block' : 'none'}}></div>
        </button>
    );
}
