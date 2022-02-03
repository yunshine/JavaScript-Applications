import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ResetPasswordScreen = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    return (
        <div className="ResetPasswordScreen">
            <h1>ResetPasswordscreen...</h1>
        </div>
    );
}

export default ResetPasswordScreen;
