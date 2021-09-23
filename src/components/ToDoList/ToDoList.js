import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './ToDoList.scss';

export default function ToDoList() {
    const [tasks, setTasks] = useState([]);
    const history = useHistory();

    useEffect(() => {
        setTasks([
            { id: 'hkhjhkj', name: 'First Task' },
            { id: 'dlsgfvsdkj', name: 'Second Task' },
        ]);
    }, []);

    return (
        <div className="container">
            <div>
                <h2>Today Tasks</h2>
            </div>
            {tasks.length === 0
                ? 'You don`t have tasks today!'
                : tasks.map(task => (
                    <>
                        <div>
                            <input
                                className="checkbox-label"
                                type="checkbox"
                                id={`check_${task.name}`}
                            />
                            <label htmlFor={`check_${task.name}`}></label>
                            <span
                                className="item_name"
                                onClick={() => {
                                    history.push(`/item_task${task.id}`);
                                }}
                            >
                                {task.name}
                            </span>
                        </div>
                    </>
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
