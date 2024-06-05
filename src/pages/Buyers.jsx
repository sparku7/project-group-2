import React, { useState } from 'react';
import AddBuyer from "../components/AddBuyer";
import JsonDataDisplay from "../components/BuyerTable";
import '../css/RegisterUser.css';
import CustomAlert from '../components/CustomAlert';

function AddBuyers() {
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (password === 'Password') {
            setIsAuthenticated(true);
        } else {
          setShowAlert(true);
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

                        <button className='button1' type="submit">Submit</button>
                    </form>
                )}
                  {showAlert && ( // Render the custom alert if showAlert is true
          <CustomAlert
            message="Incorrect password. Please try again."
            onClose={() => setShowAlert(false)} // Close the alert when clicked
          />
      )}
                {isAuthenticated && <JsonDataDisplay />}
            </div>
        </div>
    );
}

export default AddBuyers;
