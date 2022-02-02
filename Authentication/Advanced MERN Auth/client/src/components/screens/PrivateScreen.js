import { useState, useEffect } from 'react';
import axios from 'axios';

const PrivateScreen = ({ history }) => {
    const [error, setError] = useState("");
    const [privateData, setPrivateData] = useState("");

    useEffect(() => {
        // if there's no authToken in the localStorage, the user is not logged in, so we want to immediately redirect
        if (!localStorage.getItem("authToken")) {
            history.push("/login");
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

    return (
        <div className="PrivateScreen">
            {error ? <p>Error: {error}</p> : <p>privateData: {privateData}</p>}
            <button onClick={logoutHandler}>Logout</button>
        </div>
    );
}

export default PrivateScreen;
