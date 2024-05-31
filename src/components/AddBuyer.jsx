import { useState } from "react";
import '../css/RegisterUser.css'


const AddBuyer = () => {

    const [firstname, setFirstName] = useState('')
    const [surname, setSurname] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();

        const user = { firstname, surname }

        fetch('http://localhost:8001/buyers',
            {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user)
            })
            .then(() => {

                alert("New Buyer Added");
                setFirstName('');
                setSurname('');

            });
    }

    return (
        <div>

            <form onSubmit={handleSubmit}>
                <br></br>
                <br></br>

                <label className="label1">First Name: </label>
                <input className="input1" type="text"
                    required
                    value={firstname}
                    onChange={(e) => setFirstName(e.target.value)} />
                <br></br>
                <br></br>

                <label className="label1">Surname: </label>
                <input className="input1" type="text"
                    required
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)} />
                <br></br>
                <br></br>


                <button className="button1"> Add Buyer</button>

            </form>

        </div>
    )
}

export default AddBuyer;