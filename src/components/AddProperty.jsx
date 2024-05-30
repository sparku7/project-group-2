import { useState } from "react";

export default function AddProperty() {

    const [street, setStreet] = useState('')
    const [town, setTown] = useState('')
    const [price, setPrice] = useState(0)
    const [bedrooms, setBedrooms] = useState(0)
    const [bathrooms, setBathrooms] = useState(0)
    const [garden, setGarden] = useState('Yes')
    const [status, setStatus] = useState('For Sale')
    const [imageUrl, setImageUrl] = useState('')


    const handleSubmit = (e) => {
        e.preventDefault();
        const task = {street, town, price, bedrooms, bathrooms, garden, status, imageUrl}

        fetch("http://localhost:8000/properties",
            {
                method: 'POST',
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(task)

            }
        )

        alert("Property added successfully!")

        setStreet('')
        setTown('')
        setPrice(0)
        setBedrooms(0)
        setBathrooms(0)
        setGarden('Yes')
        setStatus('For Sale')
        setImageUrl('')

    }


    return(
        <form onSubmit={handleSubmit}>
            <label>Street Name: </label>
            <input type="text"
            required
            value={street}
            onChange={(e) => setStreet(e.target.value)} />
            <br/>
            <br/>
            <label>Town: </label>
            <input type="text"
            required
            value={town}
            onChange={(e) => setTown(e.target.value)} />
            <br/>
            <br/>
            <label>Price: </label>
            <input type="number"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)} />
            <br/>
            <br/>
            <label>Bedrooms: </label>
            <input type="number"
            required
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)} />
            <br/>
            <br/>
            <label>Bathrooms: </label>
            <input type="number"
            required
            value={bathrooms}
            onChange={(e) => setBathrooms(e.target.value)} />
            <br/>
            <br/>
            <label>Garden: </label>
            <select 
                    value={garden} 
                    onChange = {(e) => setGarden(e.target.value)} > 
                    <option selected value="Yes">Yes</option> 
                    <option value="No">No</option>
            </select> 
            <br/>
            <br/>
            <label>Image URL: </label>
            <input type="text"
            required
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)} />
            <br/>
            <br/>
            <button>Add Property</button>
        </form>
    )




}