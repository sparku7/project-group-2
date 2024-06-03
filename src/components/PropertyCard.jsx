import '../App.css'
import '../css/PropertyCard.css'
import { FaBed, FaBath, FaTree } from 'react-icons/fa';

export default function PropertyCard({street, town, bedrooms, bathrooms, price, garden, imageUrl}) {

    return (

        <div className="col-12 col-md-6 col-lg-3 d-flex align-items-stretch mb-4">
            <div className="card">
                <h3>{street}</h3>
                <img className="card-img" src={imageUrl} alt="Property" />
                <h4>{town}</h4>
                <div className="card-body">
                    <div className="row text-center">
                        <div className="col">
                        <FaBed size={24} />
                        <p>{bedrooms} Bedrooms</p>
                        </div>
                        <div className="col">
                        <FaBath size={24} />
                        <p>{bathrooms} Bathrooms</p>
                        </div>
                        <div className="col">
                        <FaTree size={24} />
                        <p>{garden} Garden</p>
                        </div>
                    </div>
                </div>
                <h4>Price: £{price}</h4>
            </div>
        </div>
  );
}

// id":"1",
//             "street":"123 avenue",
//             "town":"Dunfermline",
//             "bedrooms":3,
//             "bathrooms":2,
//             "price":123123,
//             "garden":"yes",
//             "imageUrl":"test.com",
//             "status":"for sale"