import { useState } from "react";
import '../css/RegisterUser.css';

import CustomAlert from "./CustomAlert";

const AddSeller = () => {
  const [firstName, setFirstname] = useState(''); // State to store first name
  const [surname, setSurname] = useState(''); // State to store surname
  const [showAlert, setShowAlert] = useState(false); // State to control alert visibility
  const [alertMessage, setAlertMessage] = useState(''); // State to store alert message

  // Handler to close the alert and reload the page
  const handleCloseAlert = () => {
    setShowAlert(false);
    window.location.reload();
  };

  // Function to convert names to title case with special handling for 'Mc' and 'Mac' prefixes
  const toTitleCase = (name) => {
    return name.split(' ').map((word) => {
      if (/^mc/i.test(word)) {
        // Capitalize the first letter and the second letter after 'Mc'
        return word.charAt(0).toUpperCase() + 'c' + word.charAt(2).toUpperCase() + word.slice(3).toLowerCase();
      } else if (/^mac/i.test(word)) {
        // Capitalize the first letter and the letter following 'Mac'
        return word.charAt(0).toUpperCase() + 'ac' + word.charAt(3).toUpperCase() + word.slice(4).toLowerCase();
      } else {
        // Capitalize the first letter of other words
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }
    }).join(' ');
  };

  // Function to convert first name to title case
  const firstToTitleCase = (first) => {
    return first.split(' ').map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join(' ');
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert first name and surname to title case
    const titleCaseFirstName = firstToTitleCase(firstName);
    const titleCaseSurname = toTitleCase(surname);

    // Create the user object
    const user = {
      firstname: titleCaseFirstName,
      surname: titleCaseSurname
    };

    try {
      // Check if the combination of first name and surname already exists
      fetch(`http://localhost:8888/sellers?firstname=${titleCaseFirstName}&surname=${titleCaseSurname}`)
        .then((checkResponse) => checkResponse.json())
        .then((existingData) => {
          // Check if the seller already exists
          const dataExists = existingData.some(data =>
            data.firstname === titleCaseFirstName &&
            data.surname === titleCaseSurname
          );

          if (dataExists) {
            setAlertMessage('Seller Already Exists. Please enter a different name.');
            setShowAlert(true);
            return;
          }

          // Send a POST request to add the new seller
          fetch('http://localhost:8888/sellers', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
          })
            .then((postResponse) => postResponse.json())
            .then((data) => {
              setAlertMessage(`New Seller Added. Your Unique ID is ${data.id}`);
              setShowAlert(true);
              setFirstname(''); // Reset first name input
              setSurname(''); // Reset surname input
            });
        });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="addseller">
      <form onSubmit={handleSubmit}>
        <div>
          <label className="label1">First Name:</label>
          <input
            className="input1"
            type="text"
            required
            value={firstName}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>
        <br />
        <div>
          <label className="label1">Surname:</label>
          <input
            className="input1"
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
        </div>
        <br />
        <button className='button1'>Add Seller</button>

        {showAlert && (
          <CustomAlert
            message={alertMessage}
            onClose={handleCloseAlert}
          />
        )}
      </form>
    </div>
  );
};

export default AddSeller;
