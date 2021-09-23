import { BrowserRouter as Router } from 'react-router-dom';
import ModalSwitch from './components/Routing/ModalSwich/ModalSwich';
import './App.scss';

function App() {
    return (
        <div className="App">
            <Router>
                <ModalSwitch />
            </Router>
        </div>
    );
}

export default App;
