
import { useState, useEffect } from 'react';
import '../css/RegisterUser.css'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';


function PropSeller() {
    const params = useParams()
    const navigate = useNavigate()
    const [userProperties, setUserProperties] = useState([])
    useEffect(() => {

        axios.get("http://localhost:8888/properties/" + params.sellerId).
            then((response) => response.json())
            .then((data) => { setUserProperties(data) })
            .then(console.log(userProperties))
            .catch((error) => console.error('Error:', error));

    }, [userProperties]);

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

                        <th>Status</th>
                        <th>Update Property Details</th>
                    </thead>
                    <tbody>
                        {
                            userProperties.map((info) => (
                                <tr key={info.sellerId}>
                                    <td>{info.id}</td>
                                    <td>{info.street}</td>
                                    <td>{info.town}</td>
                                    <td>{info.bedrooms}</td>
                                    <td>{info.bathrooms}</td>
                                    <td>{info.price}</td>

                                    <td>{info.status}</td>
                                    <td><button onClick={() => navigate("/update/" + info.id)} className="delete-btn"> Update Property </button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>

    )
}

export default PropSeller;

