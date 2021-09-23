/* eslint-disable react/prop-types */
import './Day.scss';

export default function Day({ day, date }) {
    return (
        <>
            <div className="day">
                <div>{day}</div>
                <div>{date}</div>
            </div>
        </>
    );
}
