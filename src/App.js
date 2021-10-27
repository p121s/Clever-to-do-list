import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ModalSwitch from './components/Routing/ModalSwich/ModalSwich';
import { ToastContainer } from 'react-toastify';
import './App.scss';

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