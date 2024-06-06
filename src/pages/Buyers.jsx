import React, { useState } from 'react';
import AddBuyer from "../components/AddBuyer";
import JsonDataDisplay from "../components/BuyerTable";
import '../css/RegisterUser.css';
import CustomAlert from '../components/CustomAlert';
import PasswordInput from '../components/PasswordInput';

function AddBuyers() {
    // Define state variables for authentication and alert
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    // Define function to handle password submission
    const handlePasswordSubmit = (password) => {
        // Check if the password is correct
        if (password === 'Password') {
            setIsAuthenticated(true); // Set isAuthenticated to true
        } else {
            setShowAlert(true); // Show alert if the password is incorrect
        }
    };

    return (
        <div className="body">
            <div className="container2" >
            <h1 className="pagetitle">Register a New Buyer</h1>
                <AddBuyer />
                {/* Render PasswordInput component and pass handlePasswordSubmit as onSubmit prop */}
                {!isAuthenticated && <PasswordInput onSubmit={handlePasswordSubmit} />}
                {/* Render CustomAlert component if showAlert is true */}
                {showAlert && (
                    <CustomAlert
                        message="Incorrect password. Please try again."
                        onClose={() => setShowAlert(false)} // Close the alert
                    />
                )}
                {/* Render JsonDataDisplay component if isAuthenticated is true */}
                {isAuthenticated && <JsonDataDisplay />}
            </div>
        </div>
    );
}

export default AddBuyers;
