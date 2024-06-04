import { useState } from "react";
import '../css/RegisterUser.css';

// CustomAlert component
const CustomAlert = ({ message, onClose }) => {
    return (
        <div className="custom-alert">
            <p>{message}</p>
            <button onClick={onClose}>Close</button>
        </div>
    );
};

// AddBuyer component allows users to add new buyer information to the system
const AddBuyer = () => {
    // State hooks to store the input values for the first name and surname
    const [firstname, setFirstName] = useState('');
    const [surname, setSurname] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    // Function to convert names to title case

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
    const firstToTitleCase = (name) => {
        return name.split(' ').map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }
        ).join(' ');
    };

    // Function to handle the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Convert input names to title case
        const titleCaseFirstName = firstToTitleCase(firstname);
        const titleCaseSurname = toTitleCase(surname);

        // Create the user object
        const user = {
            firstname: titleCaseFirstName,
            surname: titleCaseSurname
        };

        try {


            // Check if the combination already exists
            const checkResponse = await fetch(`http://localhost:8888/buyers?firstname=${titleCaseFirstName}&surname=${titleCaseSurname}`);
            const existingData = await checkResponse.json();


            const dataExists = existingData.some(data =>
                data.firstname === titleCaseFirstName &&
                data.surname === titleCaseSurname
            );

            if (dataExists) {
                setAlertMessage('Buyer Already Exists. Please enter a different name.');
                setShowAlert(true);
                return;
            }

            // Sends a POST request to the server to add the new buyer
            const postResponse = await fetch('http://localhost:8888/buyers', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user)
            });

            const data = await postResponse.json();
            setAlertMessage(`New Buyer Added. Your Unique ID is ${data.id}`);
            setShowAlert(true);

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
                {showAlert && (
                    <CustomAlert
                        message={alertMessage}
                        onClose={() => {
                            setShowAlert(false); // Close the alert
                            window.location.reload(); // Reload the page after closing the alert
                        }}
                    />
                )}

            </form>
        </div>
    )
}

export default AddBuyer;
