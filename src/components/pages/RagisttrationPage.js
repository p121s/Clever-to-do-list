import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { auth } from '../fireBase/FireBasenItialization';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import FormInput from '../FormInput/FormInput';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './LogInPage.scss';

export default function Redistration() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [repeatPassword, setRepeatPassword] = useState();
    const history = useHistory();
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

    const handleReapeatPassword = ({target: {value}}) => {
        setRepeatPassword(value);
    };

    const createAccount = () => {
        if(password === repeatPassword) {
            createUserWithEmailAndPassword(auth, email, password)
                .then(responce => responce)
                .catch(err => notify(err));
        } else {
            notify("Passwords don't match");
        }
        history.push('/');
    };

    return (
        <div className='login_container'>
            <h2>Registration</h2>
            <FormInput label="Your Email" value={email} type="email" handleChange={handleEmail} />
            <FormInput label="Password" value={password} type="password" handleChange={handlePassword} />
            <FormInput label="Repeat password" value={repeatPassword} type="password" handleChange={handleReapeatPassword} />
            <button className='login-reg' onClick={createAccount}>Register</button>
            <NavLink to="/">Log In</NavLink>
            <ToastContainer />
        </div>
    );
}
