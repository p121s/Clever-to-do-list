/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './ToDoList.scss';

export default function ToDoList({allTodayTasks, counterTask}) {
    
    const history = useHistory();

    return (
        <div className="container">
            <div>
                <h2>{counterTask} Today Tasks</h2>
            </div>
            <div className='container_tasks'>
                {allTodayTasks.length === 0
                    ? 'You don`t have tasks today!'
                    : allTodayTasks.map(task =>
                    {
                        return (
                            <div 
                                className='task_li' 
                                key={`div_${task[1].nameTask}`}
                                onClick={() => {
                                    history.push(`/item_task${task[0]}`);
                                }}
                            >
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
                                >
                                    {task[1].nameTask}
                                </span>
                            </div>
                        );
                    }
                    )
                }
            </div>
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
