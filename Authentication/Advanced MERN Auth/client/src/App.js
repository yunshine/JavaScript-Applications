import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginScreen from './components/screens/LoginScreen';

function App() {
    return (
        <Router>
            <div className="App">
                hi welcome to the app
                {/* <Switch> // react-router-dom v. 5 syntax... */}
                {/* <Route exact path="/login" element={LoginScreen} />  // react-router-dom v. 5 syntax... */}
                <Routes>

                    <Route path="/" element={<LoginScreen />} />
                </Routes>
                {/* </Switch> // react-router-dom v. 5 syntax... */}
            </div>
        </Router>
    );
}

export default App;
