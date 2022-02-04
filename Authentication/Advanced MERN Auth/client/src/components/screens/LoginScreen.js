import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // JS library used to make HTTP requests from node. js; supports the Promise API

const LoginScreen = ({ history }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate(); // instead of history.push, react-router-dom version 6 uses this hook...

    // checks to see if the user is already logged in or not. If so, they are automatically redirected...
    useEffect(() => {
        if (localStorage.getItem("authToken")) {
            // history.push("/"); // old syntax...
            navigate("/");
        }
    }, [history]);

    const handleLogin = async (e) => {
        e.preventDefault();

        const config = {
            header: {
                "Content-Type": "application/json"
            }
        };

        try {
            const { data } = await axios.post("/api/auth/login", { email, password }, config);

            localStorage.setItem("authToken", data.token);

            console.log("Here: ", data);
            // history.push("/"); // old syntax...
            navigate("/");
        } catch (error) {
            setError(error.response.data.error);
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    };

    return (
        <div className="LoginScreen">
            <form className="LoginScreen-form" onSubmit={handleLogin}>
                <h3 className="LoginScreen-from-title">Login</h3>
                {error && <p>{error}</p>}

                <div className="form-group">
                    <label htmlFor="email">Email Address:</label>
                    <input type="email" required id="email" placeholder="Enter Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" required id="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <button type="submit">Login</button>

                <p>Don't have an account? <Link to="/register">Sign Up</Link></p>
                <p>Forgot your password? <Link to="/forgotpassword">Reset Your Password</Link></p>
            </form>
        </div>
    );
}

export default LoginScreen;
