import { useState } from 'react';
import { useHistory, useParams } from 'react-router';
import './CreatingEditingPage.scss';
import '../ToDoList.scss';
import FormInput from '../../FormInput/FormInput';
import { collection, addDoc } from "firebase/firestore"; 
import { database } from '../../fireBase/FireBasenItialization';

export default function CreatingEditingPage(user) {
    const history = useHistory();
    const { id } = useParams();
    const [dateTask, setDateTask] = useState();
    const [nameTask, setNameTask] = useState();
    const [textTask, setTextTask] = useState();

    console.log(history);

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

    function writeUserData() {
        try {
            const docRef = addDoc(collection(database, user.user), {
                dateTask: dateTask,
                nameTask: nameTask,
                textTask: textTask
            });
            alert("Document written with ID: ", docRef.id);
            history.push('/');
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    return (
        <div className="task_page-container">
            <button className="button_back" type="button" onClick={back}>
                Babk Tasker
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
                        <input className="checkbox-label" id={id} type="checkbox" />
                        <label htmlFor={id}></label>
                        <span className="item-name">Name</span>
                    </div>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae arcu
                        sed est eleifend mollis. Nulla tristique vulputate tincidunt. Quisque id
                        libero sit amet lectus mollis scelerisque. Interdum et malesuada fames ac
                        ante ipsum primis in faucibus. Mauris auctor orci eu dui porta, eget
                        ullamcorper nulla consectetur. Quisque dapibus tristique orci, eu pretium
                        dolor aliquam ut. Class aptent taciti sociosqu ad litora torquent per
                        conubia nostra, per inceptos himenaeos. Fusce in leo purus. Fusce a faucibus
                        odio.
                    </p>
                    <button className="button_add-edit">Edit</button>
                </div>
            )}
        </div>
    );
}
