import { useState } from 'react';
import axios from 'axios';

const ForgotPasswordScreen = () => {
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const forgotPasswordHandler = async (e) => {
        e.preventDefault();

        const config = { headers: { "Content-Type": "application/json" } };

        try {
            const { data } = await axios.post("/api/auth/forgotpassword", { email }, config);

            setSuccess(data.data);
        } catch (error) {

        }
    }

    return (
        <div className="ForgotPasswordScreen">
            <form onSubmit={forgotPasswordHandler}>
                <h3>Forgot Password</h3>
                {error && <p>Error: {error}</p>}
                {success && <p>Success: {success}</p>}
                <div className="form-group">
                    <p>Please enter the email address that you registered your account with. We will send you a password reset confirmation to this email address.</p>
                    <label htmlFor="email">Email: </label>
                    <input
                        type="email"
                        required
                        id="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <button type="submit">Send Email</button>
            </form>
        </div>
    );
}

export default ForgotPasswordScreen;
