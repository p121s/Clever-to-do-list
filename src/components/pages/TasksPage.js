/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { useState } from 'react';
import Calendar from '../calendar/Calendar';
import { auth, database } from '../fireBase/FireBasenItialization';
import { signOut } from '@firebase/auth';
import { collection, getDocs } from "firebase/firestore"; 
import './TasksPage.scss';
import { useEffect } from 'react/cjs/react.development';

export default function TasksPage(user) {

    const [dataOutDatabadse, setDataOutDatabase] = useState([]);
    console.log(dataOutDatabadse);

    const logOut = auth => {
        signOut(auth);
    };

    useEffect(() => {
        const alovelaceDocumentRef = collection(database, user.user);
        getDocs(alovelaceDocumentRef)
            .then(responce => {
                const x = [];
                responce.forEach(doc => x.push([doc.id, doc.data()]));
                return x;
            })
            .then(responce => setDataOutDatabase(responce));
    }, []);
    

    return (
        <div className="task_page-container">
            <h1>Tasker</h1>
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
