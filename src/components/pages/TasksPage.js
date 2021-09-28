import React, { useState, useEffect } from 'react';
import Calendar from '../calendar/Calendar';
import { auth, database } from '../fireBase/FireBasenItialization';
import { signOut } from '@firebase/auth';
import { collection, getDocs } from "firebase/firestore"; 
import './TasksPage.scss';

export default function TasksPage(user) {

    const [dataOutDatabadse, setDataOutDatabase] = useState([]);

    const logOut = auth => {
        signOut(auth);
    };

    useEffect(() => {
        const alovelaceDocumentRef = collection(database, user.user);
        getDocs(alovelaceDocumentRef)
            .then(responce => {
                const tempArr = [];
                responce.forEach(doc => tempArr.push([doc.id, doc.data()]));
                return tempArr;
            })
            .then(responce => setDataOutDatabase(responce));
    }, []);
    

    return (
        <div className="task_page-container">
            <h1>Tassker</h1>
            <button className='button_sign-out'
                onClick={() => {
                    logOut(auth);
                }}
            >
                Sign Out
            </button>
            <Calendar allTasks={dataOutDatabadse} />
        </div>
    );
}
