import PropertyCard from "../components/PropertyCard";
import houseData from "../data/properties.json";
import "../App.css";
import { useState, useEffect } from "react";

function HomePage() {
  const backgroundUrl =
    "https://c1.wallpaperflare.com/preview/989/964/872/castle-church-monastery-architecture.jpg";
  const apiUrl = "http://localhost:8000/properties";
  const [items, setItems] = useState([""]);
  const [filters, setFilters] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
        setFilteredItems(data); // on page load show all properties
      });
  }, []);

  // Handle input changes for the filter form (target represents the active box on the page)
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update the corresponding filter state
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Handle form submission to apply filters
  const handleSubmit = (e) => {
    e.preventDefault();
    applyFilters(); // Apply the filters to the PropertyCard display
  };

  // Apply the filter criteria to the properties list
  const applyFilters = () => {
    const filtered = items.filter((item) => {
      //using items here to filter on original "unfiltered" data every time we submit a new filter request

      // Check if the property matches the search term in street or town
      const matchesSearch =
        item.street.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        item.town.toLowerCase().includes(filters.searchTerm.toLowerCase());

      // Check if the property matches the bedrooms filter - toString needed as stored as number in JSON vs string input from filter form
      const matchesBedrooms = filters.bedrooms
        ? item.bedrooms.toString() === filters.bedrooms
        : true;

      // Check if the property matches the bathrooms filter - toString needed as stored as number in JSON vs string input from filter form
      const matchesBathrooms = filters.bathrooms
        ? item.bathrooms.toString() === filters.bathrooms
        : true;

      // Check if the property matches the garden filter - toLowerCase used to ensure capital letters dont impact search (yes vs Yes, No vs no etc.)
      const matchesGarden = filters.garden
        ? item.garden.toLowerCase() === filters.garden.toLowerCase()
        : true;

      // Check if the property matches the price filter (below the specified maximum price)
      const matchesPrice = filters.price
        ? item.price <= parseInt(filters.price, 10)
        : true; //the ten in parseInt represents decimal

      // Check if the property matches the status filter - toLowerCase used to ensure capital letters dont impact search
      const matchesStatus = filters.status
        ? item.status.toLowerCase() === filters.status.toLowerCase()
        : true;

      // Return true if all conditions are matched
      return (
        matchesSearch &&
        matchesBedrooms &&
        matchesBathrooms &&
        matchesGarden &&
        matchesPrice &&
        matchesStatus
      );
    });

    // Update the state with the filtered properties
    setFilteredItems(filtered);
  };

  return (
    <div className="body">
      <div
        className="head-image"
        style={{
          height: "600px",
          backgroundImage: `url(${backgroundUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.5,
        }}
      >
        <div style={{}}>
          <form
            className="search-filter"
            style={{ color: "black", backgroundColor: "white", float: "left" }}
            onSubmit={handleSubmit}
          >
            <label>Street or Town: </label>
            <input
              type="text"
              name="searchTerm"
              value={filters.searchTerm}
              onChange={handleChange}
            />
            <br />
            <label>Bedrooms: </label>
            <input
              type="number"
              name="bedrooms"
              value={filters.bedrooms}
              onChange={handleChange}
            />
            <br />
            <label>Bathrooms: </label>
            <input
              type="number"
              name="bathrooms"
              value={filters.bathrooms}
              onChange={handleChange}
            />
            <br />
            <label>Garden: </label>
            <select
              name="garden"
              value={filters.garden}
              onChange={handleChange}
            >
              <option selected value="Yes">
                Yes
              </option>
              <option value="No">No</option>
            </select>
            <br />
            <label>Max Price: </label>
            <input
              type="number"
              name="price"
              value={filters.price}
              onChange={handleChange}
            />
            <br />
            <label>Status: </label>
            <select
              value={filters.status}
              onChange={handleChange}
              name="status"
            >
              <option selected value="For Sale">
                For Sale
              </option>
              <option value="Sold">Sold</option>
              <option value="Withdrawn">Withdrawn</option>
            </select>
            <br />
            <button type="submit">Apply Filters</button>
          </form>
        </div>
      </div>
      <div className="items-grid">
        {filteredItems.map((item) => (
          <PropertyCard
            street={item.street}
            town={item.town}
            bedrooms={item.bedrooms}
            bathrooms={item.bathrooms}
            price={item.price}
            garden={item.garden}
            imageUrl={item.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
