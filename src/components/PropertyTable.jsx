
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
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
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

    const sortedProperties = [...properties].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };


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
                            <th>
                                <div className="dropdown">
                                    <button onClick={() => requestSort('id')} className='dropbtn'>Property ID ↑ ↓  </button>
                                </div>
                            </th>
                            <th>
                            <div className="dropdown">
                                    <button onClick={() => requestSort('street')} className='dropbtn'>Street ↑ ↓ </button>
                                </div>
                            </th>
                            <th> 
                                <div className="dropdown">
                                    <button className='dropbtn'onClick={() => requestSort('town')}>Town ↑ ↓</button>
                                </div>
                            </th>
                            <th> 
                                <div className="dropdown">
                                    <button className='dropbtn' onClick={() => requestSort('bedrooms')}>Bedrooms ↑ ↓</button>
                                </div>
                            </th>
                            <th> 
                                <div className="dropdown">
                                    <button className='dropbtn' onClick={() => requestSort('bathrooms')}>Bathrooms ↑ ↓ </button>
                                </div>
                            </th>
                            <th> 
                                <div className="dropdown">
                                    <button className='dropbtn'  onClick={() => requestSort('price')}>Price ↑ ↓ </button>
                              </div>
                            </th>

                            <th> <div className="dropdown">
                                    <button onClick={() => requestSort('status')} className='dropbtn'>Status ↑ ↓</button>
                         </div>
                            </th>
                            <th> <div className="dropdown">
                                    <button className='dropbtn'>Update Property Details  </button>
                                </div>
                            </th>
                        </thead>
                        <tbody>
                            {
                                sortedProperties.map((info) => (
                                    <tr>
                                        <td onClick={()=> navigate('/propertydetails/'+info.id)}> {info.id}</td>
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

