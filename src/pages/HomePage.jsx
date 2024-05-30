import PropertyCard from "../components/PropertyCard";
import houseData from '../data/properties.json';
import '../App.css'
import { useState, useEffect } from "react";




function HomePage() {
    const apiUrl = 'http://localhost:8000/properties';
    const [items, setItems] = useState([""]);
    
    useEffect(() => {
    fetch (apiUrl)
    .then((response) => response.json())
    .then((data) => setItems(data))
    }, [])

    return (
        <div className="body">
            <div className="head-image" height="600px">
                <img margin="collapse" height="640px" width="75%" src="https://c1.wallpaperflare.com/preview/989/964/872/castle-church-monastery-architecture.jpg" />
                <div margin="collapse" background-color="blue" className="searchplaceholder" height="640px" width="25%">
                    <p> extra <textarea name="" id=""></textarea></p>
                </div>
            </div>
            <div className="items-grid">

                {items.map((item) => (
                    <PropertyCard
                        street={item.street}
                        town={item.town}
                        bedrooms={item.bathrooms}
                        bathrooms={item.bathrooms}
                        price={item.price}
                        garden={item.garden}
                        imageUrl={item.imageUrl}
                    />
                ))}
            </div>
        </div>
    )
}


export default HomePage;


