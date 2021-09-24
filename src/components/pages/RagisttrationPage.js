import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { auth } from '../fireBase/FireBasenItialization';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import FormInput from '../FormInput/FormInput';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './LogInPage.scss';

export default function Redistration() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const notify = (error) => toast.error(`${error}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    const handleEmail = ({ target: { value } }) => {
        setEmail(value);
    };

    const handlePassword = ({ target: { value } }) => {
        setPassword(value);
    };

    const createAccount = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(responce => responce)
            .catch(err => notify(err));
    };

    return (
        <div className='login_container'>
            <h2>Registration</h2>
            <FormInput label="Your Email" type="email" handleChange={handleEmail} />
            <FormInput label="Password" type="password" handleChange={handlePassword} />
            <FormInput label="Repeat password" type="password" />
            <button className='login-reg' onClick={createAccount}>Register</button>
            <NavLink to="/">Log In</NavLink>
            <ToastContainer />
        </div>
    );
}
