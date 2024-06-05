import React, { useState } from 'react';
import AddBuyer from "../components/AddBuyer";
import JsonDataDisplay from "../components/BuyerTable";
import '../css/RegisterUser.css';

function AddBuyers() {
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (password === 'Password') {
            setIsAuthenticated(true);
        } else {
            alert('Incorrect password');
        }
    };

    return (
        <div className="body">
            <div className="container1">
                <h1>Register a New Buyer</h1>
                <AddBuyer />
                {!isAuthenticated && (
                    <form className='password-form' onSubmit={handlePasswordSubmit}>
                        <label>  Enter Admin Password to see list of Buyers  </label>
                        <input
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <br></br>
                        <br></br>

                        <button type="submit">Submit</button>
                    </form>
                )}
                {isAuthenticated && <JsonDataDisplay />}
            </div>
        </div>
    );
}

export default AddBuyers;
