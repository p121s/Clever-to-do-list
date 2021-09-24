/* eslint-disable react/prop-types */
import './Day.scss';

export default function Day({ day, date, month, year, handleDate }) {
    return (
        <>
            <div className="day" value={new Date(year, month, date)} onClick={handleDate}>
                <span>{year}{month}{day}{date}</span>
            </div>
        </>
    );
}
