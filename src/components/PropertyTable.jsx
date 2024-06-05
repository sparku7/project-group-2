
import { useState, useEffect } from 'react';
import '../css/RegisterUser.css'
import { useNavigate } from 'react-router-dom';
import CustomAlert from './CustomAlert';




function PropertyDisplay() {
    const navigate = useNavigate()
    const [properties, setProperties] = useState([])
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
    useEffect(() => {

        fetch('http://localhost:8888/properties')
            .then((response) => response.json())
            .then((data) => { setProperties(data) })
            .catch((error) => console.error('Error:', error));

    }, [properties])

    return (
        <div>
            

{!isAuthenticated && (
                    <form className='password-form' onSubmit={handlePasswordSubmit}>
                        <label>  Enter Admin Password to see list of Properties  </label>
                        <input
                        className='input1'
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
                  <div>
          <CustomAlert
            message="Incorrect password. Please try again."
            onClose={() => setShowAlert(false)} // Close the alert when clicked
          />
            <br></br>
            <br></br>
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
)}

export default PropertyDisplay;

