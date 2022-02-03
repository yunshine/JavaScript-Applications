import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ResetPasswordScreen = ({ match }) => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const resetPasswordHandler = async (e) => {
        e.preventDefault();

        const config = { headers: { "Content-Type": "applicaiton/json" } };

        if (password !== confirmPassword) {
            setPassword("");
            setConfirmPassword("");
            setTimeout(() => {
                setError("");
            }, 5000);
            return setError("Passwords do not match.");
        }

        try {
            const { data } = await axios.put(`/api/auth/resetpassword/${match.params.resetToken}`, { password }, config);

            setSuccess(data.data);
        } catch (error) {
            setError(error.response.data.error);
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    };

    return (
        <div className="ResetPasswordScreen">
            <form onSubmit={resetPasswordHandler}>
                <h3>Reset Password</h3>
                {error && <p>Error: {error}</p>}
                {success && <Link to="/login">Login</Link>}
                <div className="form-group">
                    <label htmlFor="password">New Password: </label>
                    <input
                        type="password"
                        required
                        id="password"
                        placeholder="Enter New Password"
                        value={password}
                        autoComplete="true"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="confirmpassword">Confirm New Password: </label>
                    <input
                        type="password"
                        required
                        id="confirmpassword"
                        placeholder="Confirm New Password"
                        value={confirmPassword}
                        autoComplete="true"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
}

export default ResetPasswordScreen;
