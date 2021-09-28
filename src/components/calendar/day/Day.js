/* eslint-disable react/prop-types */
import React from 'react';
import './Day.scss';

export default function Day({ day, date, month, year, handleDate, className }) {
    return (
        <>
            <div className={className} value={new Date(year, month, date)} onClick={handleDate}>
                <div className='month_yaer'>{month}/{year}</div>
                <div className='day_name'>{day}</div>
                <div className='date'>{date}</div>
            </div>
        </>
    );
}
