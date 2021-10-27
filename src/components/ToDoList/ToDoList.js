/* eslint-disable react/prop-types */
import React from 'react';
import { useHistory } from 'react-router-dom';
import ItemTask from './ItemTask/ItemTask';
import './ToDoList.scss';

export default function ToDoList({allTodayTasks, counterTask}) {
    
    const history = useHistory();

    const goToThePage = () => {
        history.push('/item_taskadd');
    };

    return (
        <div className="container">
            <div>
                <h2>{counterTask} Today Tasks</h2>
            </div>
            <div className='container_tasks'>
                {!allTodayTasks.length
                    ? 'You don`t have tasks today!'
                    : allTodayTasks.map(task =>
                    {
                        return (
                            <ItemTask key={`item_${task.idTask}`} task={task} />
                        );
                    }
                    )
                }
            </div>
            <button
                id="add_task"
                onClick={goToThePage}
            >
                + Add Task
            </button>
        </div>
    );
}
