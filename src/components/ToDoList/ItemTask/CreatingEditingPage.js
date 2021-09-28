import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import FormInput from '../../FormInput/FormInput';
import { collection, addDoc, doc, getDoc, setDoc, updateDoc, deleteDoc } from "firebase/firestore"; 
import { database } from '../../fireBase/FireBasenItialization';
import { notifyError, notifySuccess } from '../../../App';
import 'react-toastify/dist/ReactToastify.css';
import './CreatingEditingPage.scss';
import '../ToDoList.scss';

export default function CreatingEditingPage(user) {
    const history = useHistory();
    const { id } = useParams();
    const [idPar, setIdPar] = useState(id);
    const [dateTask, setDateTask] = useState();
    const [nameTask, setNameTask] = useState();
    const [textTask, setTextTask] = useState();
    const [thisTask, setThisTask] = useState({});
    const [idTask, setIdTask] = useState(id);
    const [flagRequest, setFlagRequest] = useState(false);

    const handleDate = ({ target: { value } }) => {
        setDateTask(value);
    };

    const handleNameTask = ({ target: { value } }) => {
        setNameTask(value);
    };

    const handleTextTask = ({ target: { value } }) => {
        setTextTask(value);
    };

    const back = e => {
        e.stopPropagation();
        history.goBack();
    };

    useEffect(() => {
        const docRef = doc(database, user.user + '/' + idTask);
        getDoc(docRef)
            .then(responce => responce.data())
            .then(responce => setThisTask(responce));
    }, [flagRequest]);

    function writeUserData() {
        try {
            addDoc(collection(database, user.user), {
                dateTask: dateTask,
                nameTask: nameTask,
                textTask: textTask,
                statusTask: false
            });
            notifySuccess("Document written");
            history.push('/');
        } catch (e) {
            notifyError("Error adding document");
        }
    }

    function done () {
        const cityRef = doc(database, user.user, idTask);
        updateDoc(cityRef, { statusTask: true });
        setFlagRequest(!flagRequest);
        notifySuccess('This task done');
    }

    function delDoc () {
        const cityRef = doc(database, user.user, idTask);
        deleteDoc(cityRef);
        setFlagRequest(!flagRequest);
    }

    function changeTask() {
        try {
            setDoc(doc(database, user.user, idTask), {
                dateTask: dateTask,
                nameTask: nameTask,
                textTask: textTask,
                statusTask: false
            });
            notifySuccess("Document written");
            setFlagRequest(!flagRequest);
            setIdPar(idTask);
        } catch (e) {
            notifyError("Error adding document");
        }
        
    }

    return (
        <div className="task_page-container">
            <button className="button_back" type="button" onClick={back}>
                Back Tasker
            </button>
            {idPar === 'add' || idPar === 'adit' ? (
                <div className="container">
                    <div>
                        <FormInput label="Date" value={dateTask} type="date" handleChange={handleDate} />
                        <FormInput label="Name Task" value={nameTask} type="text" handleChange={handleNameTask} />
                        <textarea value={textTask} onChange={handleTextTask}></textarea>
                    </div>
                    <button className="button_add" onClick={thisTask ? changeTask : writeUserData}>
                        {thisTask ? "Save" : 'Add'}
                    </button>
                </div>
            ) : (
                thisTask ? (
                    <div className="container">
                        <p>{thisTask.dateTask}</p>
                        <div>
                            <input className="checkbox-label" id={id} type="checkbox" checked={thisTask ? thisTask.statusTask : false} readOnly />
                            <label htmlFor={id}></label>
                            <span className="item-name">{thisTask ? thisTask.nameTask : ''}</span>
                        </div>
                        <p>
                            {thisTask ? thisTask.textTask : ''}
                        </p>
                        <button className='button_done' onClick={done}>&#10004;</button>
                        <button className="button_edit" onClick={() => {
                            setDateTask(thisTask.dateTask);
                            setNameTask(thisTask.nameTask);
                            setTextTask(thisTask.textTask);
                            setIdPar('adit');
                        }}>Edit</button>
                        <button className='button_delete' onClick={delDoc}>&#128465;</button>
                    </div>
                ) : "Task deleted"
            )}
        </div>
    );
}
