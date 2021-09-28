/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './ToDoList.scss';

export default function ToDoList({allTodayTasks}) {

    // eslint-disable-next-line no-unused-vars
    const [tasks, setTasks] = useState(allTodayTasks);
    console.log(tasks);

    // setTasks(allTodayTasks);
    
    const history = useHistory();

    return (
        <div className="container">
            <div>
                <h2>Today Tasks</h2>
            </div>
            {allTodayTasks.length === 0
                ? 'You don`t have tasks today!'
                : allTodayTasks.map(task => (
                    <div className='task_li' key={`div_${task.nameTask}`}>
                        <input
                            key={`input_${task.nameTask}`}
                            className="checkbox-label"
                            type="checkbox"
                            id={`check_${task[1].nameTask}`}
                            checked={task[1].statusTask}
                            readOnly
                        />
                        <label
                            key={`label_${task.nameTask}`}
                            htmlFor={`check_${task[1].nameTask}`}
                        ></label>
                        <span
                            key={`span_${task.nameTask}`}
                            className="item_name"
                            onClick={() => {
                                history.push(`/item_task${task[0]}`);
                            }}
                        >
                            {task[1].nameTask}
                        </span>
                    </div>
                ))}
            <button
                id="add_task"
                onClick={() => {
                    history.push('/item_taskadd');
                }}
            >
                + Add Task
            </button>
        </div>
    );
}
