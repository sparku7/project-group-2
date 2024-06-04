import { useState, useEffect } from 'react';
import '../css/RegisterUser.css';

// JsonDataDisplay component is responsible for displaying the buyers data and handling deleting records
function JsonDataDisplay() {
    // This is used to  store the buyers' data
    const [buyers, setBuyers] = useState([]);

    // This is used to fetch the  buyers' data from the server
    useEffect(() => {
        fetch('http://localhost:8888/buyers')
            .then((response) => response.json())
            .then((data) => { setBuyers(data) })
            .catch((error) => console.error('Error:', error));
    }, [buyers]); // Dependency array includes buyers to refetch when buyers' data changes

    // Function to handle the deletion of a buyer
    const deleteBuyer = async (id) => {
        // Display a confirmation dialog before deleting
        if (window.confirm('Are you sure you want to delete this buyer?')) {
            try {
                // Sending a DELETE request to the server to remove a specific buyer
                const response = await fetch(`http://localhost:8888/buyers/${id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    // If deletion is successful, this updates the state to remove the buyer from the list
                    setBuyers(buyers.filter((buyer) => buyer.id !== id));
                } else {
                    // If the server responds with an error, log it to the console
                    console.error('Failed to delete the buyer with id:', id);
                }
            } catch (error) {
                // This will catch any errors
                console.error('Error:', error);
            }
        }
    };

    return (
        <div>
            <br></br>
            <br></br>
            <div className='table-container'>
                <table >
                    <thead>
                        <th>Buyers ID</th>
                        <th>First Name</th>
                        <th>Surname</th>
                        <th>Delete Buyer</th>
                        <th></th>
                    </thead>
                    <tbody>
                        {
                            // Mapping over the buyers' data to create table rows
                            buyers.map((info) => (
                                <tr>
                                    <td>{info.id}</td>
                                    <td>{info.firstname}</td>
                                    <td>{info.surname}</td>
                                    <td>
                                        {/* Button to call the deleteBuyer function with the buyer's id */}
                                        <button className="delete-btn" onClick={() => deleteBuyer(info.id)}> Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default JsonDataDisplay;
