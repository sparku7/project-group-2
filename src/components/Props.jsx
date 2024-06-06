
import { useState, useEffect } from 'react';
import '../css/RegisterUser.css'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ApptPropCard from './ApptPropCard';



function PropSeller() {
    const params = useParams()
    const navigate = useNavigate()
    const [userProperties, setUserProperties] = useState([])
    const [appts, setAppts] = useState([])
    const [showAlert, setShowAlert] = useState(false);
    const [deleteId, setDeleteId] = useState(null); // State to store the ID of the seller to be deleted
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
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


    useEffect(() => {

        axios.get(`http://localhost:8888/appointments?propertyId=${params.id}`)
            .then((response) => response.data)
            .then((data) => { setAppts(data); })
            .then(() => console.log(appts))
            .catch((error) => console.error('Error:', error));

    }, [appts]);



    return (
        
        <div className='body'>
            <br></br>
            <h1 className='pagetitle'>Property details and bookings</h1>
            <br></br>
            <div className='conatiner3' >
                <div >
                    {userProperties.map((details) => (
            <ApptPropCard className="propertyCard"
                street={details.street}
                town={details.town}
                bedrooms={details.bedrooms}
                bathrooms={details.bathrooms}
                price={details.price}
                garden={details.garden}
                imageUrl={details.imageUrl}
                status={details.status}
              />))}
            </div></div>


            <div>
            <br /> <br />
            <div className='table-container'>
              <table>
                <thead>
                  <th>Booking ID</th>
                  <th>Buyer ID</th>
                  <th>First Name</th>
                  <th>Surname</th>
                  <th>Property ID</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th></th>
                </thead>
                <tbody>
                  {appts && appts.map((appoint) => (
                    <tr>
                      {/* We are setting the deleteId (The one we use in our handleDelete function to input the id directly at the end of the url) */}
                      {/* We are extracting the value from the data on the page so we cant make a mistake */}
                      <td >{appoint.id}</td>
                      <td>{appoint.buyerId}</td>
                      <td>{appoint.firstName}</td>
                      <td>{appoint.surname}</td>
                      <td>{appoint.propertyId}</td>
                      <td>{appoint.date}</td>
                      <td>{appoint.timeSlot}</td>
                      {/* We use the handleDelete to use the appoint.id, it makes the request, and disappears from the screen and json file */}
                      <td><button className="delete-btn" onClick={(e) => handleDelete(e, appoint.id)}>Cancel</button></td>

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

