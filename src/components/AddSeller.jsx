import { useState } from "react";
import '../css/RegisterUser.css';

const AddSeller = () => {
  const [firstName, setFirstname] = useState('');
  const [surname, setSurname] = useState('');

  const toTitleCase = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // const addSeller = { firstName, surname };

    const titleCaseFirstName = toTitleCase(firstName);
    const titleCaseSurname = toTitleCase(surname);

    // Create the user object
    const user = {
      firstname: titleCaseFirstName,
      surname: titleCaseSurname
    };

    try {
      // Check if the combination already exists
      fetch(`http://localhost:8002/sellers?firstname=${titleCaseFirstName}&surname=${titleCaseSurname}`)
        .then((checkResponse) => checkResponse.json())
        .then((existingData) => {
          // Convert existing data to lowercase before comparison
          const dataExists = existingData.some(data =>
            data.firstname === titleCaseFirstName &&
            data.surname === titleCaseSurname
          );

          if (dataExists) {
            alert("User already exists. Please enter a different name.");
            return; // Stop further processing
          }

          // Sends a POST request to the server to add the new buyer
          fetch('http://localhost:8002/sellers', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
          })
            .then((postResponse) => postResponse.json())
            .then((data) => {
              alert(`New Seller Added. Your Unique ID is ${data.id}`);
              setFirstname(''); // Resets the firstname state to an empty string
              setSurname(''); // Resets the surname state to an empty string
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
        <button className='button1'>Submit</button>
      </form>
    </div>
  );
};

export default AddSeller;