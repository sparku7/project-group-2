import { useState, useEffect } from "react";
import '../css/RegisterUser.css'

import AddSeller from "../components/AddSeller";
import ConfirmationDialog from "../components/ConfirmationDialog";
import CustomAlert from "../components/CustomAlert";
import PasswordInput from "../components/PasswordInput";



//this fetch uses the useEffect to get all the data instantly, and by passing a parameter we can set the url in our state
const useFetch = (url) => {
  const [data, setData] = useState([]);

  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [url]);
  //we have to return data here as we have made a function expecting some kind of data back
  //comment the bit of code and look at the error you get in the browser
  return [data];
};


const Sellers = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  //this is how we are going to use the id
  const [deleteId, setDeleteId] = useState(null);
  //this is our data call, using the useFetch function containing the useEffect
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [data, setData] = useState([]);
  const [password, setPassword] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordSubmit = (password) => {
    // Check if the password is correct
    if (password === 'Password') {
      setIsAuthenticated(true); // Set isAuthenticated to true
    } else {
      setShowAlert(true); // Show alert if the password is incorrect
    }
  };

  useEffect(() => {
    // Fetch sellers data once authenticated
    if (isAuthenticated) {
      fetch('http://localhost:8888/sellers')
        .then((res) => res.json())
        .then((data) => setData(data))
        .catch((error) => console.error('Error fetching sellers:', error));
    }
  }, [isAuthenticated]);

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

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedSellers = [...data].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });



  return (
    <div className="body">
      <div className="container2">
        <h1 className="pagetitle">Register a New Seller</h1>
        <br />
        <br />
        <AddSeller />
        {!isAuthenticated && (
          <PasswordInput onSubmit={handlePasswordSubmit} />
        )}
        {showAlert && (
          <CustomAlert
            message="Incorrect password. Please try again."
            onClose={() => setShowAlert(false)}
          />
        )}
        {isAuthenticated && (
          <div>
            <br /> <br />
            <div className='table-container'>
              <table>
                <thead>
                  <tr>
                    <th onClick={() => requestSort('id')}>Sellers ID</th>
                    <th onClick={() => requestSort('firstname')}>First Name</th>
                    <th onClick={() => requestSort('surname')}>Surname</th>
                    <th>Delete Seller</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedSellers.map((sell) => (
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