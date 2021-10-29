import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import FormInput from '../FormInput/FormInput';
import { auth } from '../fireBase/FireBasenItialization';
import { signInWithEmailAndPassword } from '@firebase/auth';
import {notifyError} from '../modalMessages/modalMessages';
import 'react-toastify/dist/ReactToastify.css';
import './LogInPage.scss';

export default function LogIn() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleEmail = ({ target: { value } }) => {
        setEmail(value);
    };

    const handlePassword = ({ target: { value } }) => {
        setPassword(value);
    };

    const logIn = (auth, email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .then(responce => responce)
            .catch(error => {
                notifyError(error);
            });
    };

    return (
        <div className="login_container">
            <h2>Log In</h2>
            <FormInput label="Your Email" value={email} type="email" handleChange={handleEmail} />
            <FormInput label="Password" value={password} type="password" handleChange={handlePassword} />
            <button className='login-reg'
                onClick={() => {
                    logIn(auth, email, password);
                }}
            >
                Sing In
            </button>
            <NavLink to="/register">Registration</NavLink>
        </div>
    );
}
