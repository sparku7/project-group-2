import { useState } from "react";
import '../css/RegisterUser.css';

// AddBuyer component allows users to add new buyer information to the system
const AddBuyer = () => {
    // State hooks to store the input values for the first name and surname
    const [firstname, setFirstName] = useState('');
    const [surname, setSurname] = useState('');

    // Function to handle the form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Creates a user object with the state values
        const user = { firstname, surname };

        // Sends a POST request to the server to add the new buyer
        fetch('http://localhost:8001/buyers', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user) // Converts the user object to a JSON string
        })
            .then(() => {
                alert("New Buyer Added"); // Alerts the user that the buyer was added
                setFirstName(''); // Resets the firstname state to an empty string
                setSurname(''); // Resets the surname state to an empty string
            });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <br></br>
                <br></br>

                <label className="label1">First Name: </label>
                <input className="input1" type="text"
                    required // Makes the field required for form submission
                    value={firstname} // Binds the input value to the firstname state
                    onChange={(e) => setFirstName(e.target.value)} // Updates the state on input change
                />
                <br></br>
                <br></br>

                <label className="label1">Surname: </label>
                <input className="input1" type="text"
                    required // Makes the field required for form submission
                    value={surname} // Binds the input value to the surname state
                    onChange={(e) => setSurname(e.target.value)} // Updates the state on input change
                />
                <br></br>
                <br></br>

                <button className="button1"> Add Buyer</button> // Button to submit the form
            </form>
        </div>
    )
}

export default AddBuyer;
