 import { useState, useEffect } from "react";
 import '../css/RegisterUser.css'
 
import AddSeller from "../components/AddSeller";
import ConfirmationDialog from "../components/ConfirmationDialog";
import CustomAlert from "../components/CustomAlert";


 
//this fetch uses the useEffect to get all the data instantly, and by passing a parameter we can set the url in our state
const useFetch = (url) => {
  const [data, setData] = useState([]);
 
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [url]);
  //we have to return data here as we have made a function expecting some kind of data back
  //comment the bit of code and look at the error you get in the browser
  return [data];
};
 
 
const Sellers = ()=> {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
 
  //this is how we are going to use the id
  const [deleteId, setDeleteId] = useState(null);
  //this is our data call, using the useFetch function containing the useEffect
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [data, setData] = useState([]);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    if (password === 'Password') {
      setIsAuthenticated(true);
      // Fetch sellers data once authenticated
      fetch('http://localhost:8888/sellers')
        .then((res) => res.json())
        .then((data) => setData(data))
        .catch((error) => console.error('Error fetching sellers:', error));
    } else {
     setShowAlert(true);
    }
  };
 
  const handleDelete = (id) => {
    setDeleteId(id);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = () => {
    fetch(`http://localhost:8888/sellers/${deleteId}`, {
      method: 'DELETE',
    }).then(() => {
      setDeleteId(null);
      setShowConfirmation(false);
      window.location.reload();
    
    });
  };

  const handleCancelDelete = () => {
    setDeleteId(null);
    setShowConfirmation(false);
      
  };
 
 
  return (
    <div className="body">
      <div className="container2">
        <h1>Register a New Seller</h1>
        <br />
        <br />
        <AddSeller />
        {!isAuthenticated && (
          <form className="password-form" onSubmit={handlePasswordSubmit}>
            <label>Enter Admin Password to see list of Sellers</label>
            <input
            className="input1"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <br />
            <br />
            <button className="button1" type="submit">Submit</button>            
          </form>
        )}
         {showAlert && ( // Render the custom alert if showAlert is true
          <CustomAlert
            message="Incorrect password. Please try again."
            onClose={() => setShowAlert(false)} // Close the alert when clicked
          />
      )}
        {isAuthenticated && (
          <div>
            <br /> <br />
            <div className='table-container'>
              <table>
                <thead>
                  <tr>
                    <th>Sellers ID</th>
                    <th>First Name</th>
                    <th>Surname</th>
                    <th>Delete Seller</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((sell) => (
                    <tr key={sell.id}>
                      <td>{sell.id}</td>
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
        )}
        {showConfirmation && (
          <ConfirmationDialog
            message="Are you sure you want to delete this seller?"
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
          />
        )}
        
      </div>
    </div>
  );
}
export default Sellers;