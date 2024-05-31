
import { useState, useEffect } from 'react';
import '../css/RegisterUser.css'
function JsonDataDisplay() {
    const [buyers, setBuyers] = useState([])
    useEffect(() => {

        fetch('http://localhost:8001/buyers')
            .then((response) => response.json())
            .then((data) => { setBuyers(data) })

    }, [buyers])
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
                    </thead>
                    <tbody>
                        {
                            buyers.map((info) => (
                                <tr>
                                    <td>{info.id}</td>
                                    <td>{info.firstname}</td>
                                    <td>{info.surname}</td>
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