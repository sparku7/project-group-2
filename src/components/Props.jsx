
import { useState, useEffect } from 'react';
import '../css/RegisterUser.css'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';


function PropSeller() {
    const params = useParams()
    const navigate = useNavigate()
    const [userProperties, setUserProperties] = useState([])
    const [user, setUser] = useState([])
    const [showAlert, setShowAlert] = useState(false);
    const [deleteId, setDeleteId] = useState(null); // State to store the ID of the seller to be deleted
    const [showConfirmation, setShowConfirmation] = useState(false);

    // Handler for delete button click
    const handleDelete = (id) => {
        setDeleteId(id);
        setShowConfirmation(true); // Show confirmation dialog
    };

    // Handler for confirming delete action
    const handleConfirmDelete = () => {
        fetch(`http://localhost:8888/sellers/${deleteId}`, {
            method: 'DELETE',
        }).then(() => {
            setDeleteId(null);
            setShowConfirmation(false);
            window.location.reload(); // Reload the page to reflect changes
        });
    };

    // Handler for canceling delete action
    const handleCancelDelete = () => {
        setDeleteId(null);
        setShowConfirmation(false);
    };


    useEffect(() => {

        axios.get(`http://localhost:8888/properties?id=${params.id}`)
            .then((response) => response.data)
            .then((data) => { setUserProperties(data); })
            .then(() => console.log(userProperties))
            .catch((error) => console.error('Error:', error));

    }, [userProperties]);

const sellerId= userProperties.sellerId
    useEffect(() => {

        axios.get(`http://localhost:8888/sellers?id=${params.sellerId}`)
            .then((response) => response.data)
            .then((data) => { setUser(data); })
            .then(() => console.log(user))
            .catch((error) => console.error('Error:', error));

    }, [user]);


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
                                <tr key={info.id}>
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


            <div>
                <br /> <br />
                <div className='table-container'>
                    <table>
                        <thead>
                            <tr>
                                <th >Sellers ID</th>
                                <th >First Name</th>
                                <th >Surname</th>
                                <th>Delete Seller</th>
                            </tr>
                        </thead>
                        <tbody>
                            {user.map((sell) => (
                                <tr key={sell.id}>
                                    <td onClick={() => navigate('../properties/' + sell.id)}> {sell.id}</td>
                                    <td>{sell.firstname}</td>
                                    <td>{sell.surname}</td>
                                    <td>
                                        <button
                                            className="delete-btn"
                                            onClick={() => handleDelete(sell.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
















    )
}

export default PropSeller;

