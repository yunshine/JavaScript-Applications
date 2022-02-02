import { useState } from 'react';
import axios from 'axios';

const ForgotPasswordScreen = () => {
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    return (
        <div className="ForgotPasswordScreen">
            <h1>ForgotPasswordscreen...</h1>
        </div>
    );
}

export default ForgotPasswordScreen;
