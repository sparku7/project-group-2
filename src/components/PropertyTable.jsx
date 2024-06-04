
import { useState, useEffect } from 'react';
import '../css/RegisterUser.css'
import { useNavigate } from 'react-router-dom';




function PropertyDisplay() {
    const navigate= useNavigate()
    const [properties, setProperties] = useState([])
    useEffect(() => {

        fetch('http://localhost:8080/properties')
            .then((response) => response.json())
            .then((data) => { setProperties(data) })
            .catch((error) => console.error('Error:', error));

    }, [properties])

    return (
        <div>
            <br></br>
            <br></br>
            <div className='table-container'>
                <table >
                    <thead>
                        <th>Property ID</th>
                        <th>Street</th>
                        <th>Town</th>
                        <th>Bedrooms</th>
                        <th>Bathrooms</th>
                        <th>Price </th>
                        <th>Image URL</th>
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
                                    <td>{info.price}</td>
                                    <td>{info.imageUrl}</td>
                                    <td>{info.status}</td>
                                    <td><button onClick={() => navigate("/update/" + info.id )} className="delete-btn"> Update Property </button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>

    )
}

export default PropertyDisplay;

