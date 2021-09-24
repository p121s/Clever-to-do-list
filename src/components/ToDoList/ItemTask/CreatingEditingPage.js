import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import FormInput from '../../FormInput/FormInput';
import { collection, addDoc, doc, getDoc } from "firebase/firestore"; 
import { database } from '../../fireBase/FireBasenItialization';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './CreatingEditingPage.scss';
import '../ToDoList.scss';

export default function CreatingEditingPage(user) {
    const history = useHistory();
    const { id } = useParams();
    const [dateTask, setDateTask] = useState();
    const [nameTask, setNameTask] = useState();
    const [textTask, setTextTask] = useState();
    const [thisTask, setThisTask] = useState();
    const notify = (error) => toast.error(`${error}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    const notifySucc = (error) => toast.success(`${error}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

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
        const docRef = doc(database, user.user + '/' + id);
        getDoc(docRef)
            .then(responce => responce.data())
            .then(responce => setThisTask(responce));
        console.log(thisTask);
    }, []);

    function writeUserData() {
        try {
            addDoc(collection(database, user.user), {
                dateTask: dateTask,
                nameTask: nameTask,
                textTask: textTask,
                statusTask: false
            });
            notifySucc("Document written");
            history.push('/');
        } catch (e) {
            notify("Error adding document: ");
        }
    }

    return (
        <div className="task_page-container">
            <button className="button_back" type="button" onClick={back}>
                Back Tasker
            </button>
            {id === 'add' ? (
                <div className="container">
                    <div>
                        <FormInput label="Date" type="date" handleChange={handleDate} />
                        <FormInput label="Name Task" type="text" handleChange={handleNameTask} />
                        <textarea onChange={handleTextTask}></textarea>
                    </div>
                    <button className="button_add-edit" onClick={writeUserData}>
                        Add
                    </button>
                </div>
            ) : (
                <div className="container">
                    <div>
                        <input className="checkbox-label" id={id} type="checkbox" checked={thisTask ? thisTask.statusTask : false} />
                        <label htmlFor={id}></label>
                        <span className="item-name">{thisTask ? thisTask.nameTask : ''}</span>
                    </div>
                    <p>
                        {thisTask ? thisTask.textTask : ''}
                    </p>
                    <button className="button_add-edit">Edit</button>
                </div>
            )}
            <ToastContainer />
        </div>
    );
}
