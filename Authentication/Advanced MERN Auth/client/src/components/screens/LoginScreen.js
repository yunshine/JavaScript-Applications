import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // JS library used to make HTTP requests from node. js; supports the Promise API

const LoginScreen = ({ history }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // checks to see if the user is already logged in or not...
    useEffect(() => {
        if (localStorage.getItem("authToken")) {
            history.push("/");
        }
    }, [history]);

    const handleLogin = async (e) => {
        e.preventDefault();

        const config = {
            header: {
                "Content-Type": "application/json"
            }
        }

        try {
            const { data } = await axios.post("/api/auth/login", { email, password }, config);

            localStorage.setItems("authToken", data.token);

            history.pushState("/");
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
            </form>
        </div>
    );
}

export default LoginScreen;
