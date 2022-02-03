import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateScreen from './components/screens/PrivateScreen';
import LoginScreen from './components/screens/LoginScreen';
import RegisterScreen from './components/screens/RegisterScreen';
import ForgotPasswordScreen from './components/screens/ForgotPasswordScreen';
import ResetPasswordScreen from './components/screens/ResetPasswordScreen';
import PrivateRoute from './components/routing/PrivateRoute'; // ROUTING...

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    {/* <Switch> // react-router-dom v. 5 syntax... */}
                    {/* <Route exact path="/login" element={LoginScreen} />  // react-router-dom v. 5 syntax... */}

                    {/* <PrivateRoute path="/" element={<PrivateScreen />} /> */}
                    <Route path="/" element={<PrivateRoute><PrivateScreen /></PrivateRoute>} />

                    <Route path="/login" element={<LoginScreen />} />
                    <Route path="/register" element={<RegisterScreen />} />
                    <Route path="/forgotpassword" element={<ForgotPasswordScreen />} />
                    <Route path="/passwordreset/:resetToken" element={<ResetPasswordScreen />} />
                    {/* </Switch> // react-router-dom v. 5 syntax... */}
                </Routes>
            </Router>
        </div>
    );
}

export default App;
