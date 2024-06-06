import { useState, useEffect } from "react";
import BookAppointment from "../components/AddAppointment";
import CustomAlert from '../components/CustomAlert';
import PasswordInput from '../components/PasswordInput';
//  import '../css/RegisterUser.css'


//this fetch uses the useEffect to get all the data instantly, and by passing a parameter we can set the url in our state
const useFetch = (url) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [data]);
  //we have to return data here as we have made a function expecting some kind of data back
  //comment the bit of code and look at the error you get in the browser


  return [data];
};


const Appointments = () => {

  //this is how we are going to use the id
  const [deleteId, setDeleteId] = useState('')
  //this is our data call, using the useFetch function containing the useEffect
  const [data] = useFetch('http://localhost:8888/appointments')
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleDelete = (e, deleteId) => {
    e.preventDefault()

    if (window.confirm('Are you sure you want to delete this appointer?')) {

      fetch('http://localhost:8888/appointments/' + deleteId, {

        method: 'DELETE',

      }).then(res => res.json())
      //because we are deleting, there is no data we need to return, so we dont need that extra .then
    }
  }

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
      <div className="container2" style={{ paddingBottom: 0 }}>
        <h1 className="pagetitle">Book Appointment</h1>
        <BookAppointment />


        {!isAuthenticated && <PasswordInput onSubmit={handlePasswordSubmit} />}
        {/* Render CustomAlert component if showAlert is true */}
        {showAlert && (
          <CustomAlert
            message="Incorrect password. Please try again."
            onClose={() => setShowAlert(false)} // Close the alert
          />
        )}
        <br></br>
        <br></br>
        {isAuthenticated && (
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
                  {data && data.map((appoint) => (
                    <tr>
                      {/* We are setting the deleteId (The one we use in our handleDelete function to input the id directly at the end of the url) */}
                      {/* We are extracting the value from the data on the page so we cant make a mistake */}
                      <td value={deleteId} onChange={(e) => setDeleteId(e.target.value)}>{appoint.id}</td>
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
        )}

      </div>
    </div>
  );
}




export default Appointments;