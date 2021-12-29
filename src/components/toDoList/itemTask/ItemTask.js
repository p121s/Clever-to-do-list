/* eslint-disable react/prop-types */
import React from 'react';
import { useHistory } from 'react-router';

export default function ItemTask({ task }) {
    const history = useHistory();

    const { nameTask, idTask, statusTask } = task;

    return (
        <div
            className="task_li"
            key={`div_${idTask}`}
            onClick={() => {
                history.push(`/item_task${idTask}`);
            }}
        >
            <input
                key={`input_${idTask}`}
                className="checkbox-label"
                type="checkbox"
                id={`check_${nameTask}`}
                checked={statusTask}
                readOnly
            />
            <label key={`label_${idTask}`} htmlFor={`check_${nameTask}`}></label>
            <span key={`span_${idTask}`} className="item_name">
                {nameTask}
            </span>
        </div>
    );
}
