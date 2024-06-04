import PropertyCard from "../components/PropertyCard";
import "../App.css";
import { useState, useEffect } from "react";
import { Col, Row, Container, Form, Button } from 'react-bootstrap';

function HomePage() {
  const apiUrl = "http://localhost:8888/properties";
  const [items, setItems] = useState([""]);
  const [filters, setFilters] = useState({});
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
        const forSaleProperties = data.filter(item => item.status.toLowerCase() === "for sale");
        setFilteredItems(forSaleProperties); // Initially display only "For Sale" properties
        setFilters({ status: "For Sale" }); // Initialize filters with "For Sale"
      });
  }, []);

  // Handle input changes for the filter form
  const handleChange = (e) => {
    const { name, value } = e.target;
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
    console.log("Applying filters with state:", filters);

    let filtered = items.filter((item) => {
      const searchTerm = filters.searchTerm ? filters.searchTerm.toLowerCase() : '';

      const matchesSearch = searchTerm
        ? item.street.toLowerCase().includes(searchTerm) || item.town.toLowerCase().includes(searchTerm)
        : true;

      const matchesBedrooms = filters.bedrooms
        ? item.bedrooms.toString() === filters.bedrooms
        : true;

      const matchesBathrooms = filters.bathrooms
        ? item.bathrooms.toString() === filters.bathrooms
        : true;

      const matchesGarden = filters.garden
        ? item.garden.toLowerCase() === filters.garden.toLowerCase()
        : true;

      const matchesPrice = filters.price
        ? item.price <= parseInt(filters.price, 10)
        : true;

      const matchesStatus = filters.status
        ? item.status.toLowerCase() === filters.status.toLowerCase()
        : true;

      return matchesSearch && matchesBedrooms && matchesBathrooms && matchesGarden && matchesPrice && matchesStatus;
    });

    console.log("Filtered items:", filtered);
    setFilteredItems(filtered);
  };

  return (
    <>
      <div className="body">
        <div className="head-image">
          <Container fluid className="h-100 d-flex align-items-center">
            <Row className="w-100">
              <Col md={6} className="d-flex align-items-center justify-content-center">
                <div className="text-center text-white">
                  <h1 className="featureTitle">WrongMove</h1>
                  <p className="featureText">Probably best to buy or sell somewhere else!</p>
                </div>
              </Col>
              <Col md={6} className="d-flex align-items-center justify-content-center">
                <Form className="search-filter bg-white p-4 rounded" onSubmit={handleSubmit}>
                  <Row>
                    <Col xs={12}>
                      <Form.Group controlId="searchTerm">
                        <Form.Label>Street or Town:</Form.Label>
                        <Form.Control
                          type="text"
                          name="searchTerm"
                          value={filters.searchTerm || ""}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <Form.Group controlId="bedrooms">
                        <Form.Label>Bedrooms:</Form.Label>
                        <Form.Control
                          type="number"
                          name="bedrooms"
                          value={filters.bedrooms || ""}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group controlId="bathrooms">
                        <Form.Label>Bathrooms:</Form.Label>
                        <Form.Control
                          type="number"
                          name="bathrooms"
                          value={filters.bathrooms || ""}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group controlId="garden">
                        <Form.Label>Garden:</Form.Label>
                        <Form.Control
                          as="select"
                          name="garden"
                          value={filters.garden || ""}
                          onChange={handleChange}
                        >
                          <option value="">Select</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Form.Group controlId="price">
                        <Form.Label>Max Price:</Form.Label>
                        <Form.Control
                          type="number"
                          name="price"
                          value={filters.price || ""}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="status">
                        <Form.Label>Status:</Form.Label>
                        <Form.Control
                          as="select"
                          name="status"
                          value={filters.status || ""}
                          onChange={handleChange}
                        >
                          <option value="">Select</option>
                          <option value="For Sale">For Sale</option>
                          <option value="Sold">Sold</option>
                          <option value="Withdrawn">Withdrawn</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12}>
                      <Button variant="primary" type="submit" className="btn-custom mt-3 w-100">
                        Apply Filters
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <div className="container">
        <div className="row">
          {filteredItems.map((item) => (
            <PropertyCard
              key={item.id}
              street={item.street}
              town={item.town}
              bedrooms={item.bedrooms}
              bathrooms={item.bathrooms}
              price={item.price}
              garden={item.garden}
              imageUrl={item.imageUrl}
              status={item.status}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default HomePage;
