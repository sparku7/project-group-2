
import { useState, useEffect } from 'react';
import '../css/RegisterUser.css'
import { useNavigate } from 'react-router-dom';
import CustomAlert from './CustomAlert';
import PasswordInput from './PasswordInput';




function PropertyDisplay() {
    const navigate = useNavigate()
    const [properties, setProperties] = useState([])
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const handlePasswordSubmit = (password) => {
        if (password === 'Password') {
            setIsAuthenticated(true);
        } else {
            setShowAlert(true);
        }
    };
    useEffect(() => {

        fetch('http://localhost:8888/properties')
            .then((response) => response.json())
            .then((data) => { setProperties(data) })
            .catch((error) => console.error('Error:', error));

    }, [properties])

    return (
        <div>
            {!isAuthenticated && (
                <div>
                    <PasswordInput onSubmit={handlePasswordSubmit} />
                    {showAlert && (
                        <CustomAlert
                            message="Incorrect password. Please try again."
                            onClose={() => setShowAlert(false)} // Close the alert when clicked
                        />
                    )}
                </div>
            )}
            {isAuthenticated && (

                <div className='table-container'>
                    <br></br>
                    <br></br>
                    <table >
                        <thead>
                            <th>Property ID</th>
                            <th>Street</th>
                            <th>Town</th>
                            <th>Bedrooms</th>
                            <th>Bathrooms</th>
                            <th>Price </th>

                            <th>Status</th>
                            <th>Update Property Details</th>
                        </thead>
                        <tbody>
                            {
                                properties.map((info) => (
                                    <tr>
                                        <td>{info.id}</td>
                                        <td>{info.street}</td>
                                        <td>{info.town}</td>
                                        <td>{info.bedrooms}</td>
                                        <td>{info.bathrooms}</td>
                                        <td>{(info.price).toLocaleString('en-GB', {
                                            style: 'currency',
                                            currency: 'GBP',
                                            minimumFractionDigits: 0,
                                        })}</td>

                                        <td>{info.status}</td>
                                        <td><button onClick={() => navigate("/update/" + info.id)} className="delete-btn"> Update Property </button></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default PropertyDisplay;

