import { useState, useEffect } from "react";
import '../css/RegisterUser.css'

import AddSeller from "../components/AddSeller";
import ConfirmationDialog from "../components/ConfirmationDialog";
import CustomAlert from "../components/CustomAlert";
import PasswordInput from "../components/PasswordInput";
import { useNavigate } from "react-router-dom";

// Custom hook to fetch data from a given URL
const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });

  // useEffect to fetch data when the component mounts or the URL changes
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [url]);

  // Return the fetched data
  return [data];
};

const Sellers = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [deleteId, setDeleteId] = useState(null); // State to store the ID of the seller to be deleted
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [data, setData] = useState([]); // State to store the fetched seller data
  const [password, setPassword] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });

  // Handler for password input change
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Handler for password form submission
  const handlePasswordSubmit = (password) => {
    if (password === 'Password') {
      setIsAuthenticated(true); // Set isAuthenticated to true if password is correct
    } else {
      setShowAlert(true); // Show alert if the password is incorrect
    }
  };

  // Fetch seller data once authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetch('http://localhost:8888/sellers')
        .then((res) => res.json())
        .then((data) => setData(data))
        .catch((error) => console.error('Error fetching sellers:', error));
    }
  }, [isAuthenticated]);

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

  // Function to handle sorting of the table
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Sort the sellers data based on the sort configuration
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
