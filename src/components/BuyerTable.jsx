
import { useState, useEffect } from 'react';
function JsonDataDisplay() {
    const [buyers, setBuyers] = useState([])
    useEffect(() => {

        fetch('http://localhost:8001/buyers')
            .then((response) => response.json())
            .then((data) => {setBuyers(data) })

    }, [buyers])
    return (
<div>
        {
            buyers.map((info) => (
                <tr>
                    <td>{info.id}</td>
                    <td>{info.firstname}</td>
                    <td>{info.surname}</td>
                </tr>
            ))
        }
</div>

    )
}

export default JsonDataDisplay;