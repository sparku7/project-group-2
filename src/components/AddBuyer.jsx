import { useState } from "react";
import '../css/RegisterUser.css';

// AddBuyer component allows users to add new buyer information to the system
const AddBuyer = () => {
    // State hooks to store the input values for the first name and surname
    const [firstname, setFirstName] = useState('');
    const [surname, setSurname] = useState('');

    // Utility function to convert names to title case

    const toTitleCase = (name) => {
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    };

    // Function to handle the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

       // Convert input names to title case
    const titleCaseFirstName = toTitleCase(firstname);
    const titleCaseSurname = toTitleCase(surname);

      // Create the user object
      const user = {
        firstname: titleCaseFirstName,
        surname: titleCaseSurname
    };

        try {


            // Check if the combination already exists
            const checkResponse = await fetch(`http://localhost:8001/buyers?firstname=${titleCaseFirstName}&surname=${titleCaseSurname}`);
            const existingData = await checkResponse.json();

            // Convert existing data to lowercase before comparison
            const dataExists = existingData.some(data =>
                data.firstname === titleCaseFirstName &&
                data.surname === titleCaseSurname
            );

            if (dataExists) {
                alert("This combination of first name and surname already exists. Please choose a different one.");
                return; // Stop further processing
            }

            // Sends a POST request to the server to add the new buyer
            const postResponse = await fetch('http://localhost:8001/buyers', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user)
            });

            const data = await postResponse.json();
            alert(`New Buyer Added. Your Unique ID is ${data.id}`); // Alerts the user that the buyer was added
            setFirstName(''); // Resets the firstname state to an empty string
            setSurname(''); // Resets the surname state to an empty string
        } catch (error) {
            console.error('Error:', error);
        }
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

                <button className="button1"> Add Buyer</button>
            </form>
        </div>
    )
}

export default AddBuyer;
