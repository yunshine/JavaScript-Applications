import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // JS library used to make HTTP requests from node. js; supports the Promise API

const RegisterScreen = ({ history }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    // checks to see if the user is already logged in or not...
    useEffect(() => {
        if (localStorage.getItem("authToken")) {
            history.push("/");
        }
    }, [history]);

    const handleRegistration = async (e) => {
        e.preventDefault();

        const config = {
            header: {
                "Content-Type": "application/json"
            }
        }

        if (password !== confirmPassword) {
            setPassword("");
            setConfirmPassword("");
            setTimeout(() => {
                setError("");
            }, 5000);
            return setError("Passwords do not match.")
        }

        try {
            const { data } = await axios.post("/api/auth/register", { username, email, password }, config);

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
        <div className="RegisterScreen">
            <form className="RegisterScreen-form" onSubmit={handleRegistration}>
                <h3 className="RegisterScreen-from-title">Register</h3>
                {error && <p>{error}</p>}
                <div className="form-group">
                    <label htmlFor="name">Username:</label>
                    <input type="text" required id="name" placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email Address:</label>
                    <input type="email" required id="email" placeholder="Enter Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" required id="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input type="password" required id="confirmPassword" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>

                <button type="submit">Register</button>

                <p>Already have an account? <Link to="/login">Login</Link></p>
            </form>
        </div>
    );
}

export default RegisterScreen;
