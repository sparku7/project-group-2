import '../App.css'

export default function PropertyCard({street, town, bedrooms, bathrooms, price, garden, imageUrl}) {

    return (

        <div className="card">
            <h2> {town} </h2>
            <img className="card-img" src={imageUrl}  />
            <h4> Bedrooms : {bedrooms} </h4>
            <p> Bathrooms : {bathrooms}</p>
            <p> Garden? : {garden} </p>
            <p> Address : {street} </p>
            <h2> Price : £{price} </h2>
        </div>
    ) 


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