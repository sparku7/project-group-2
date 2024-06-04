import { useState, useEffect } from 'react';
import '../css/RegisterUser.css';
import ConfirmationDialog from './ConfirmationDialog';

function JsonDataDisplay() {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [buyers, setBuyers] = useState([]);
    const [buyerIdToDelete, setBuyerIdToDelete] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8888/buyers')
            .then((response) => response.json())
            .then((data) => { setBuyers(data) })
            .catch((error) => console.error('Error:', error));
    }, []);

    const handleDelete = (id) => {
        setBuyerIdToDelete(id);
        setShowConfirmation(true);
    };

    const handleCancel = () => {
        setShowConfirmation(false);
        setBuyerIdToDelete(null);
    };

    const handleConfirm = async () => {
        try {
            const response = await fetch(`http://localhost:8888/buyers/${buyerIdToDelete}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setBuyers((prevBuyers) => prevBuyers.filter((buyer) => buyer.id !== buyerIdToDelete));
                console.log(`Buyer with ID ${buyerIdToDelete} successfully deleted.`);
            } else {
                console.error('Failed to delete the buyer with ID:', buyerIdToDelete);
            }
        } catch (error) {
            console.error('Error during deletion:', error);
        } finally {
            setShowConfirmation(false);
            setBuyerIdToDelete(null);
        }
    };

    return (
        <div>
            <br /><br />
            <div className='table-container'>
                <table>
                    <thead>
                        <tr>
                            <th>Buyers ID</th>
                            <th>First Name</th>
                            <th>Surname</th>
                            <th>Delete Buyer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {buyers.map((info) => (
                            <tr key={info.id}>
                                <td>{info.id}</td>
                                <td>{info.firstname}</td>
                                <td>{info.surname}</td>
                                <td>
                                    <button className="delete-btn" onClick={() => handleDelete(info.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {showConfirmation && (
                <ConfirmationDialog
                    message="Are you sure you want to delete this buyer?"
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                />
            )}
        </div>
    );
}

export default JsonDataDisplay;
