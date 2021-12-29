/* eslint-disable react/no-children-prop */
import LogIn from '../components/pages/LoginPage/LogInPage';
import CreatingEditingPage from '../components/pages/CreatingEditingPage/CreatingEditingPage';
import Redistration from '../components/pages/RegistrationPage/RagisttrationPage';
import { Switch, Route } from 'react-router-dom';
import React, { useState } from 'react';
import { onAuthStateChanged } from '@firebase/auth';
import { auth } from '../fireBase/fireBasenItialization';
import TasksPage from '../components/pages/TasksPage/TasksPage';

export default function ModalSwitch() {
    const [status, setStatus] = useState();

    onAuthStateChanged(auth, user => {
        user && setStatus(user.uid);
    });

    return (
        <div>
            <Switch>
                {!status ? (
                    <>
                        <Route children={LogIn}>
                            <Route path="/" exact children={<LogIn />} />
                            <Route path="/register" children={<Redistration />} />
                        </Route>
                    </>
                ) : (
                    <>
                        <Route children={TasksPage}>
                            <Route path="/" exact children={<TasksPage user={status} />} />
                            <Route
                                path="/item_task:id"
                                children={<CreatingEditingPage user={status} />}
                            />
                        </Route>
                    </>
                )}
            </Switch>
        </div>
    );
}
