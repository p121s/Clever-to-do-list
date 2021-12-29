import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { auth } from '../../../fireBase/fireBasenItialization';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import FormInput from '../../formInput/FormInput';
import { notifyError } from '../../../modalMessages/modalMessages';
import 'react-toastify/dist/ReactToastify.css';
import '../LoginPage/LogInPage.scss';

export default function Redistration() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [repeatPassword, setRepeatPassword] = useState();
    const history = useHistory();

    const handleEmail = ({ target: { value } }) => {
        setEmail(value);
    };

    const handlePassword = ({ target: { value } }) => {
        setPassword(value);
    };

    const handleReapeatPassword = ({ target: { value } }) => {
        setRepeatPassword(value);
    };

    const createAccount = () => {
        if (password === repeatPassword) {
            createUserWithEmailAndPassword(auth, email, password)
                .then(responce => responce.user.uid)
                .then(responce => {
                    if (responce) {
                        history.push('/');
                    }
                    return responce;
                })
                .catch(err => notifyError(err));
        } else {
            notifyError("Passwords don't match");
        }
    };

    return (
        <div className="login_container">
            <h2>Registration</h2>
            <FormInput label="Your Email" value={email} type="email" handleChange={handleEmail} />
            <FormInput
                label="Password"
                value={password}
                type="password"
                handleChange={handlePassword}
            />
            <FormInput
                label="Repeat password"
                value={repeatPassword}
                type="password"
                handleChange={handleReapeatPassword}
            />
            <button className="login-reg" onClick={createAccount}>
                Register
            </button>
            <NavLink to="/">Log In</NavLink>
        </div>
    );
}
