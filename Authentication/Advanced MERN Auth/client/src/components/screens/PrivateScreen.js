import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PrivateScreen = ({ history }) => {
    const [error, setError] = useState("");
    const [privateData, setPrivateData] = useState("");

    const navigate = useNavigate(); // instead of history.push, react-router-dom version 6 uses this hook...

    useEffect(() => {
        // if there's no authToken in the localStorage, the user is not logged in, so we want to immediately redirect
        if (!localStorage.getItem("authToken")) {
            // history.push("/login"); // old syntax...
            navigate("/login");
        }

        const fetchPrivateData = async () => {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`
                }
            }

            try {
                const { data } = await axios.get('api/private', config);
                setPrivateData(data.data);
            } catch (error) {
                localStorage.removeItem("authToken");
                setError("You don't have permission to do that. Please login.");
            }
        }

        fetchPrivateData();
    }, [history]);

    const logoutHandler = () => {
        localStorage.removeItem("authToken");
        // history.push("/login"); // old syntax...
        navigate("/login");
    }

    return (
        <div className="PrivateScreen">
            <h2>Private Screen</h2>
            {error ? <p>Error: {error}</p> : <p>privateData: {privateData}</p>}
            <button onClick={logoutHandler}>Logout</button>
        </div>
    );
}

export default PrivateScreen;
