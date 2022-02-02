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
    }, []);

    return (
        <div className="PrivateScreen">
            <h1>Privatescreen...</h1>
        </div>
    );
}

export default PrivateScreen;
