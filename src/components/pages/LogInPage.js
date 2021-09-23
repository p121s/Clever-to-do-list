import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import FormInput from '../FormInput/FormInput';
import { auth } from '../fireBase/FireBasenItialization';
import { signInWithEmailAndPassword } from '@firebase/auth';
import './LogInPage.scss';
import { useEffect } from 'react/cjs/react.development';

export default function LogIn() {
    const [error, setError] = useState();
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
            .catch(err => {
                setError(err);
            });
    };

    useEffect(() => {
        if (error) {
            alert(error);
        }
    }, [error]);

    return (
        <div className="login_container">
            <h2>Log In</h2>
            <FormInput label="Your Email" type="email" handleChange={handleEmail} />
            <FormInput label="Password" type="password" handleChange={handlePassword} />
            <button
                onClick={() => {
                    logIn(auth, email, password);
                }}
            >
                Sing In
            </button>
            {/* <button type='button'>Log in whith Google</button> */}
            <NavLink to="/register">Registration</NavLink>
        </div>
    );
}
