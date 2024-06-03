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
            <label className="label1">Street Name: </label>
            <input type="text"
             className="input1"
            required
            value={street}
            onChange={(e) => setStreet(e.target.value)} />
            <br/>
            <br/>
            <label className="label1">Town: </label>
            <input type="text"
            className="input1"
            required
            value={town}
            onChange={(e) => setTown(e.target.value)} />
            <br/>
            <br/>
            <label className="label1">Price: </label>
            <input type="number"
             className="input1"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)} />
            <br/>
            <br/>
            <label className="label1">Bedrooms: </label>
            <input type="number"
             className="input1"
            required
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)} />
            <br/>
            <br/>
            <label className="label1">Bathrooms: </label>
            <input type="number"
             className="input1"
            required
            value={bathrooms}
            onChange={(e) => setBathrooms(e.target.value)} />
            <br/>
            <br/>
            <label className="label1">Garden: </label>
            <select 
                    value={garden} 
                    onChange = {(e) => setGarden(e.target.value)} > 
                    <option selected value="Yes">Yes</option> 
                    <option value="No">No</option>
            </select> 
            <br/>
            <br/>
            <label className="label1">Image URL: </label>
            <input type="text"
             className="input1"
            required
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)} />
            <br/>
            <br/>
            <button  className="button1"  type="submit">Add Property</button>
        </form>
    )




}