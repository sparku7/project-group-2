import React, { useState, useEffect } from 'react';
import CustomAlert from './CustomAlert';

const BookAppointment = () => {
  // State variables to manage form inputs
  const [timeSlot, setTimeSlot] = useState('');
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [propertyId, setPropertyId] = useState('');
  const [date, setDate] = useState('');
  const [buyerId, setBuyerId] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("")

  // List of available time slots
  const availableSlots = [
    "8:00-9:00",
    "9:00-10:00",
    "10:00-11:00",
    "12:00-13:00",
    "13:00-14:00",
    "15:00-16:00",
    "16:00-17:00",
  ];

  // Handle change in time slot selection
  const handleTimeChange = (e) => {
    setTimeSlot(e.target.value);
  };

  // Fetch buyer details based on the entered Buyer ID and populate the form
  const handlePopulate = async () => {
    try {
      const response = await fetch("http://localhost:8888/buyers");
      const userData = await response.json();
      const userExists = userData.find((buyer) => buyer.id === buyerId);
      if (userExists) {
        setFirstName(userExists.firstname);
        setSurname(userExists.surname);
      } else {
        setAlertMessage(`Buyer ID ${buyerId} does not exist. Please enter a valid Buyer ID`);
        setShowAlert(true)
        setBuyerId('');
        setFirstName('');
        setSurname('');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Validate the entered Property ID
  const handlePropertyValidation = async () => {
    if (propertyId === '') return;

    try {
      const response = await fetch("http://localhost:8888/properties");
      const propertiesData = await response.json();
      const propertyExists = propertiesData.some((property) => property.id === propertyId);

      if (!propertyExists) {
        setAlertMessage(`Property ID ${propertyId} does not exist. Please enter a valid Property ID`);
        setShowAlert(true)
        setPropertyId('');
      }
    } catch (error) {
      console.error('Error fetching properties data:', error);
    }
  };

  // Clear first name and surname when buyerId is cleared
  useEffect(() => {
    if (buyerId === '') {
      setFirstName('');
      setSurname('');
    }
  }, [buyerId]);

  // Handle date change to prevent past dates
  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const today = new Date();


    if (selectedDate < today) {
      setAlertMessage("You cannot select a past date. Please select a valid date.");
      setShowAlert(true);
      setDate('');
    } else {
      setDate(e.target.value);
    }
  };

  // Handle form submission for booking an appointment
  const handleSubmit = async (e) => {
    e.preventDefault();


    // Fetch appointments data and check if the selected time slot is available
    try {
      const response = await fetch("http://localhost:8888/appointments");
      const bookingData = await response.json();
      const appointmentExists = bookingData.some(
        (booking) => booking.propertyId === propertyId && booking.date === date && booking.timeSlot === timeSlot
      );
      if (appointmentExists) {
        setAlertMessage(`This timeslot is already booked for Property ID ${propertyId} on ${date} at ${timeSlot}, please select another time slot`);
        setShowAlert(true);
        return;
      }
    } catch (error) {
      console.error("Error fetching appointment data:", error);
    }

    // Proceed with booking the appointment
    const appointment = { buyerId, firstName, surname, propertyId, date, timeSlot };
    try {
      const appointmentResponse = await fetch('http://localhost:8888/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appointment)
      });

      const appointmentData = await appointmentResponse.json();
      setAlertMessage(`Appointment Booked. Your Booking ID is ${appointmentData.id}`);
      setShowAlert(true);

      // Clear form fields after successful booking
      setBuyerId('');
      setFirstName('');
      setSurname('');
      setPropertyId('');
      setDate('');
      setTimeSlot('');
    } catch (error) {
      console.error("Error booking appointment:", error);
    }
  };

  return (
    <div className="body">
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
            onChange={(e) => setFirstName(e.target.value)}
            readOnly
          />
        </div>
        <br />
        <div>
          <label className="label1">Surname:</label>
          <input
            className="input1"
            type="text"
            required
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            readOnly
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
            onBlur={handlePropertyValidation}
          />
        </div>
        <br />
        <div>
          <label className="label1">Date:</label>
          <input
            className="input1"
            type="date"
            value={date}
            onChange={handleDateChange} // Call handleDateChange on date change
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
        {showAlert && (
          <CustomAlert
            message={alertMessage}
            onClose={() => {
              setShowAlert(false); // Close the alert
              window.location.reload(); // Reload the page after closing the alert
            }} />)}
      </form>
    </div>
  );
};

export default BookAppointment;
