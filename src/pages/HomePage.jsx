import PropertyCard from "../components/PropertyCard";
import houseData from '../data/properties.json';
import '../App.css'




function HomePage() {
    return (
        <div className="body">
            <div className="head-image" height="600px">
                <img margin="collapse" height="640px" width="75%" src="https://c1.wallpaperflare.com/preview/989/964/872/castle-church-monastery-architecture.jpg" />
                <div margin="collapse" background-color="blue" className="searchplaceholder" height="640px" width="25%">
                    <p> extra <textarea name="" id=""></textarea></p>
                </div>
            </div>
            <div className="items-grid">

                {houseData.map((item) => (
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


// import itemsData from "../itemsData.json";
// import PlantCard from '../components/PlantCard';

// const ShopPage = () => {
//     return(
//         <div className="body">
//             <h1 className="shopHeader">Our Plants</h1>
//             <div className="shopItems">
//                 {itemsData.map((item) => (
//                         <PlantCard
//                         name = {item.name}
//                         price = {item.price}
//                         imageUrl = {item.imageUrl}
//                         />
//                     ))}
//             </div>
//         </div>
//     )
// };

// export default ShopPage;