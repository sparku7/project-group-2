import axios from "axios";
import { useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";

import CustomAlert from "./CustomAlert";

export default function MaintainProperty() {

    const params = useParams();
    const [street, setStreet] = useState()
    const [town, setTown] = useState("")
    const [price, setPrice] = useState('')
    const [bedrooms, setBedrooms] = useState('')
    const [bathrooms, setBathrooms] = useState('')
    const [garden, setGarden] = useState('')
    const [status, setStatus] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const navigate = useNavigate()

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const handleCloseAlert = () => {
      setShowAlert(false);
      navigate("/newproperty");
      
    };

    useEffect(() => {
        axios.get("http://localhost:8888/properties/" + params.id).then(res => {
        console.log(res)    
        setStreet(res.data.street);
            setTown(res.data.town);
            setPrice(res.data.price);
            setBedrooms(res.data.bedrooms);
            setBathrooms(res.data.bathrooms);
            setGarden(res.data.garden);
            setStatus(res.data.status);
            setImageUrl(res.data.imageUrl);
        }).catch(err => console.log(err));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.patch("http://localhost:8888/properties/" + params.id, { street, town, price, bedrooms, bathrooms, garden, status, imageUrl })
            .then(() => {
                setAlertMessage("Property details updated successfully.");
                setShowAlert(true);              
                 
            }).catch(err => console.log(err));
    }

    return (
        <div className="body">
            <h1> Property Updates - Change all required </h1>
            <br/>
            {showAlert && <CustomAlert message={alertMessage} onClose={handleCloseAlert} />}
            <form onSubmit={handleSubmit}>
                <label className="label1">Street Name: </label>
                <input type="text"
                    className="input1"
                    required
                    value={street}
                    onChange={(e) => setStreet(e.target.value)} />
                <br />
                <br />
                <label className="label1">Town: </label>
                <input type="text"
                    className="input1"
                    required
                    value={town}
                    onChange={(e) => setTown(e.target.value)} />
                <br />
                <br />
                <label className="label1">Price: </label>
                <input type="number"
                    className="input1"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)} />
                <br />
                <br />
                <label className="label1">Bedrooms: </label>
                <input type="number"
                    className="input1"
                    required
                    value={bedrooms}
                    onChange={(e) => setBedrooms(e.target.value)} />
                <br />
                <br />
                <label className="label1">Bathrooms: </label>
                <input type="number"
                    className="input1"
                    required
                    value={bathrooms}
                    defaultValue={bedrooms}
                    onChange={(e) => setBathrooms(e.target.value)} />
                <br />
                <br />
                <label className="label1">Garden: </label>
                <select
                    value={garden}
                    onChange={(e) => setGarden(e.target.value)} >
                    <option selected value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
                <br />
                <br />
                <label className="label1">Image URL: </label>
                <input type="text"
                    className="input1"
                    required
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)} />
                <br />
                <br />
                <label className="label1">Current Status: </label>
                <select type="text"
                    className="input1"
                    required
                    value={status}
                    onChange={(e) => setStatus(e.target.value)} >
                    <option>For Sale</option>
                    <option>Withdrawn</option>
                    <option>Sold</option>
                </select>
                <br />
                <br />
                <button className="button1" type="submit">Update Property Details</button>
            </form>
        </div>
    )
}


