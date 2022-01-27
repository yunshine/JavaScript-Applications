import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateScreen from './components/screens/PrivateScreen';
import LoginScreen from './components/screens/LoginScreen';
import RegisterScreen from './components/screens/RegisterScreen';
import ForgotPasswordScreen from './components/screens/ForgotPasswordScreen';
import ResetPasswordScreen from './components/screens/ResetPasswordScreen';
import PrivateRoute from './components/routing/PrivateRoute'; // ROUTING...

function App() {
    return (
        <Router>
            <div className="App">
                hi welcome to the app
                {/* <Switch> // react-router-dom v. 5 syntax... */}
                {/* <Route exact path="/login" element={LoginScreen} />  // react-router-dom v. 5 syntax... */}
                <Routes>
                    <PrivateRoute path="/" element={<PrivateScreen />} />
                    <Route path="/login" element={<LoginScreen />} />
                    <Route path="/register" element={<RegisterScreen />} />
                    <Route path="/forgotpassword" element={<ForgotPasswordScreen />} />
                    <Route path="/passwordreset/:resetToken" element={<ResetPasswordScreen />} />
                </Routes>
                {/* </Switch> // react-router-dom v. 5 syntax... */}
            </div>
        </Router>
    );
}

export default App;
