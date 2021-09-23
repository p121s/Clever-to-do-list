import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { auth } from '../fireBase/FireBasenItialization';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import FormInput from '../FormInput/FormInput';

export default function Redistration() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleEmail = ({ target: { value } }) => {
        setEmail(value);
    };

    const handlePassword = ({ target: { value } }) => {
        setPassword(value);
    };

    const createAccount = () => {
        console.log(email, password);
        createUserWithEmailAndPassword(auth, email, password)
            .then(responce => responce)
            .catch(err => console.log(err));
    };

    return (
        <>
            {/* <FormInput label='Your Name' type='text' /> */}
            <FormInput label="Your Email" type="email" handleChange={handleEmail} />
            <FormInput label="Password" type="password" handleChange={handlePassword} />
            <FormInput label="Repeat password" type="password" />
            <button onClick={createAccount}>Register</button>
            <NavLink to="/">Log In</NavLink>
        </>
    );
}
