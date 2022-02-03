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
            const { data } = await axios.put(`/api/auth/passwordreset/${match.params.resetToken}`, { password }, config);
            console.log(data);
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
            <h1>ResetPasswordscreen...</h1>
        </div>
    );
}

export default ResetPasswordScreen;
