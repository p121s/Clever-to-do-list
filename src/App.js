import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ModalSwitch from './components/Routing/ModalSwich/ModalSwich';
import { ToastContainer, toast } from 'react-toastify';
import './App.scss';

const notifySetting = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
};

export const notifySuccess = (message) => toast.success(`${message}`, notifySetting);
export const notifyError = (error) => toast.error(`${error}`, notifySetting);

function App() {

    return (
        <div className="App">
            <Router>
                <ModalSwitch />
            </Router>
            <ToastContainer />
        </div>
    );
}

export default App;