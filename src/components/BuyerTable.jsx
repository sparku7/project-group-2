
import { useState, useEffect } from 'react';
import '../css/RegisterUser.css'
function JsonDataDisplay() {
    const [buyers, setBuyers] = useState([])
    useEffect(() => {

        fetch('http://localhost:8001/buyers')
            .then((response) => response.json())
            .then((data) => { setBuyers(data) })
            .catch((error) => console.error('Error:', error));

    }, [buyers])

    const deleteBuyer = async (id) => {
        try {
            
            const response = await fetch(`http://localhost:8001/buyers/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                
                setBuyers(buyers.filter((buyer) => buyer.id !== id));
            } else {
                console.error('Failed to delete the buyer with id:', id);
            }
        } catch (error) {
            console.error('Error:', error);
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
                            buyers.map((info) => (
                                <tr>
                                    <td>{info.id}</td>
                                    <td>{info.firstname}</td>
                                    <td>{info.surname}</td>
                                    <td><button className="delete-btn" onClick={() => deleteBuyer(info.id)}> Delete</button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>

    )
}

export default JsonDataDisplay;