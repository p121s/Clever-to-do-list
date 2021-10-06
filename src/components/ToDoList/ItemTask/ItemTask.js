/* eslint-disable react/prop-types */
import React from "react";
import { useHistory } from "react-router";

export default function ItemTask ({task}) {

    const history = useHistory();

    return (
        <div 
            className='task_li' 
            key={`div_${task.nameTask}`}
            onClick={() => {
                history.push(`/item_task${task.idTask}`);
            }}
        >
            <input
                key={`input_${task.nameTask}`}
                className="checkbox-label"
                type="checkbox"
                id={`check_${task.nameTask}`}
                checked={task.statusTask}
                readOnly
            />
            <label
                key={`label_${task.nameTask}`}
                htmlFor={`check_${task.nameTask}`}
            ></label>
            <span
                key={`span_${task.nameTask}`}
                className="item_name"
            >
                {task.nameTask}
            </span>
        </div>);
}