import '../App.css'
import '../css/PropertyCard.css'
import { FaBed, FaBath, FaTree } from 'react-icons/fa';

export default function PropertyCard({street, town, bedrooms, bathrooms, price, garden, imageUrl, status}) {

    const getStatusClass = (status) => {
        switch (status) {
            case 'For Sale':
              return 'bg-success text-white';
            case 'Withdrawn':
              return 'bg-warning text-dark';
            case 'Sold':
              return 'bg-danger text-white';
            default:
              return 'bg-secondary text-white';
        }
    };

    const isButtonDisabled = (status) => {
        return status === 'Sold' || status === 'Withdrawn';
      };

      return (
        <div className="col-12 col-md-6 col-lg-3 d-flex align-items-stretch mb-4">
          <div className="card">
            <div className="card-header">
              <h3 className="mb-0">{street}</h3>
            </div>
            <img className="card-img-top" src={imageUrl} alt="Property" />
            <div className="card-body">
              <h4>{town}</h4>
              <h4>£{price}</h4>
              <p><span className={`badge ${getStatusClass(status)}`}>{status}</span></p>
              <div className="row text-center">
                <div className="col">
                  <FaBed size={24} />
                  <p>{bedrooms}</p>
                </div>
                <div className="col">
                  <FaBath size={24} />
                  <p>{bathrooms}</p>
                </div>
                <div className="col">
                  <FaTree size={24} />
                  <p>{garden}</p>
                </div>
              </div>
            </div>
            <div className="card-footer text-center">
              <a href="/bookappointment" 
                 className={`btn ${isButtonDisabled(status) ? 'btn-disabled' : 'btn-custom'}`} 
                 aria-disabled={isButtonDisabled(status)}>
                {isButtonDisabled(status) ? 'Not Available' : 'Book Now'}
              </a>
            </div>
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