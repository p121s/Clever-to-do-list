/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { useState } from 'react';
import Calendar from '../calendar/Calendar';
import ToDoList from '../ToDoList/ToDoList';
import { auth, database } from '../fireBase/FireBasenItialization';
import { signOut } from '@firebase/auth';
import { collection, getDocs } from "firebase/firestore"; 
import './TasksPage.scss';
import { useEffect } from 'react/cjs/react.development';

export default function TasksPage(user) {

    const [dataOutDatabadse, setDataOutDatabase] = useState([]);

    const logOut = auth => {
        signOut(auth);
    };

    useEffect(() => {
        const alovelaceDocumentRef = collection(database, user.user);
        getDocs(alovelaceDocumentRef)
            .then(responce => responce.forEach(doc => setDataOutDatabase(dataOutDatabadse.push([doc.id, doc.data()]))));
        console.log(dataOutDatabadse);
    }, []);
    

    return (
        <div className="task_page-container">
            <h1>Tasker</h1>
            <button
                onClick={() => {
                    logOut(auth);
                }}
            >
                Sign Out
            </button>
            <Calendar />
            <ToDoList />
        </div>
    );
}
