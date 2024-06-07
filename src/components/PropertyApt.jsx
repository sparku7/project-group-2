import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CustomAlert from "./CustomAlert";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import '../css/PropertyCard.css'
import ApptPropCard from "./ApptPropCard";

const BookAppointment = () => {
  const [timeSlot, settimeSlot] = useState([]);
  const [firstName, setFirstname] = useState("");
  const [surname, setSurname] = useState("");
  const [propertyId, setPropertyId] = useState("");
  const [date, setDate] = useState("");
  const [buyerId, setBuyerId] = useState("");
  const [details, setDetails] = useState([]);
  const [userPopulate, setUserPopulate] = useState({
    firstName: "",
    surname: "",
  });
  const availableSlots = [
    "8:00-9:00",
    "9:00-10:00",
    "10:00-11:00",
    "12:00-13:00",
    "13:00-14:00",
    "15:00-16:00",
    "16:00-17:00",
  ];

  const params = useParams();
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const handleCloseAlert = () => {
    setShowAlert(false);
    navigate("/bookappointment");
  };

  useEffect(() => {
    axios
      .get("http://localhost:8888/properties/" + params.id)
      .then((res) => {
        setPropertyId(res.data.id);
        setDetails(res.data);
      })
      .catch((err) => console.log(err));
  }, []);


  const handleTimeChange = (e) => {
    settimeSlot(e.target.value); // Update the selected time
  };

  const handlePopulate = async (e) => {
    const buyerId = e.target.value;
    setBuyerId(buyerId);
  
    if (buyerId) {
      try {
        const response = await fetch("http://localhost:8888/buyers");
        const userData = await response.json();
        const userExists = userData.find((buyer) => buyer.id === buyerId);
        if (userExists) {
          setFirstname(userExists.firstname);
          setSurname(userExists.surname);
        } else {
          console.log("User not found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Fetch propertys data
    try {
      const response = await fetch("http://localhost:8888/buyers");
      const buyersData = await response.json();

      // Check if property ID exists
      const buyerExists = buyersData.some((buyer) => buyer.id === buyerId);
      if (!buyerExists) {
        alert(
          `Buyer ID ${buyerId} does not exist. Please enter a valid Buyer ID`
        );
        return;
      }
    } catch (error) {
      console.error("Error fetching Buyers data:", error);
    }

    try {
      const response = await fetch("http://localhost:8888/properties");
      const propertysData = await response.json();

      // Check if property ID exists
      const propertyExists = propertysData.some(
        (property) => property.id === propertyId
      );
      if (!propertyExists) {
        alert(
          `Property ID ${propertyId} does not exist. Please enter a valid Property ID`
        );
        return;
      }
    } catch (error) {
      console.error("Error fetching propertys data:", error);
    }

    try {
      const response = await fetch("http://localhost:8888/appointments");
      const bookingData = await response.json();

      // Check if the appointment exists for the specified date and time slot
      const appointmentExists = bookingData.some(
        (booking) =>
          booking.propertyId === propertyId &&
          booking.date === date &&
          booking.timeSlot === timeSlot
      );
      if (appointmentExists) {
        alert(
          `This timeslot is already booked for Property ID ${propertyId} on ${date} at ${timeSlot}, please select another time slot`
        );
        return;
      } else {
        alert(`The timeslot is available for booking.`);
        // You can proceed with further logic (e.g., allowing the user to book the slot).
      }
    } catch (error) {
      console.error("Error fetching appointment data:", error);
    }

    // Proceed with appointment booking logic
    const appointments = {
      buyerId,
      firstName,
      surname,
      propertyId,
      date,
      timeSlot,
    };
    const appointmentResponse = await fetch(
      "http://localhost:8888/appointments",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointments),
      }
    );

    const appointmentData = await appointmentResponse.json();
    setAlertMessage(
      `Appointment Booked. Your Booking ID is ${appointmentData.id}`
    );
    setShowAlert(true);
    setBuyerId("");
    setFirstname("");
    setSurname("");
    setPropertyId("");
    setDate("");
    settimeSlot("");
  };

  return (
    <div>
      <Container fluid className="h-100 d-flex align-items-center">
        <Row className="w-100">
          <Col
            md={6}
            className="d-flex align-items-center justify-content-center"
          >
            {showAlert && (
              <CustomAlert message={alertMessage} onClose={handleCloseAlert} />
            )}
            <form onSubmit={handleSubmit}>
              <div>
                <label className="label1">Buyer ID:</label>
                <input
                  className="input1"
                  type="text"
                  required
                  value={buyerId}
                  onChange={(e) => setBuyerId(e.target.value)}
                  onBlur={handlePopulate}
                />
              </div>
              <br />
              <div>
                <label className="label1">First Name:</label>
                <input
                  className="input1"
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </div>
              <br />
              <div>
                {" "}
                <label className="label1">Surname:</label>
                <input
                  className="input1"
                  type="text"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                />
              </div>
              <br />
              <div>
                <label className="label1">Property ID:</label>
                <input
                  className="input1"
                  type="text"
                  required
                  value={propertyId}
                  onChange={(e) => setPropertyId(e.target.value)}
                />
              </div>
              <br />
              <div>
                <label className="label1">Date:</label>
                <input
                  className="input1"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <br />
              <div>
                <label className="label1">Select Time:</label>
                <select
                  className="input1"
                  value={timeSlot}
                  onChange={handleTimeChange}
                >
                  <option value="">Choose a time</option>
                  {availableSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
              <br />
              <button className="button1">Book</button>
            </form>
          </Col>
          <Col
            md={6}
            className="d-flex align-items-center justify-content-center"
          >
            <div className="propertyCard">
            <ApptPropCard
                street={details.street}
                town={details.town}
                bedrooms={details.bedrooms}
                bathrooms={details.bathrooms}
                price={details.price}
                garden={details.garden}
                imageUrl={details.imageUrl}
                status={details.status}
              />
            
        
            </div>
          </Col>
        </Row>
      </Container>
    </div>

    
  );
};

export default BookAppointment;
