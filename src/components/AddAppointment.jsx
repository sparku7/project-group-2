import React, { useState } from 'react';
import '../css/RegisterUser.css';

const BookAppointment = () => {
  const [selectedTime, setSelectedTime] = useState('');
  const [firstName, setFirstname] = useState('');
  const [surname, setSurname] = useState('');
  const [propertyId, setPropertyId] = useState('');
  const [date, setDate] = useState('');
  const [buyerId, setBuyerId] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
        // Fetch propertys data 
        try {
          const response = await fetch("http://localhost:8888/buyers");
          const buyersData = await response.json();

          // Check if property ID exists
          const buyerExists = buyersData.some((buyer) => buyer.id === buyerId);
          if (!buyerExists) {
              alert(`Buyer ID ${buyerId} does not exist. Please enter a valid Buyer ID`);
              return;
          }
        } catch (error) {
          console.error("Error fetching Buyers data:", error);
        }

        try {
          const response = await fetch("http://localhost:8888/properties");
          const propertysData = await response.json();

          // Check if property ID exists
          const propertyExists = propertysData.some((property) => property.id === propertyId);
          if (!propertyExists) {
              alert(`Property ID ${propertyId} does not exist. Please enter a valid Property ID`);
              return;
          }
        } catch (error) {
          console.error("Error fetching propertys data:", error);
        }


      // Proceed with appointment booking logic
      const appointments = { firstName, surname, propertyId, date, timeslot: selectedTime };
      const appointmentResponse = await fetch('http://localhost:8888/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appointments)
      });

      const appointmentData = await appointmentResponse.json();
      alert(`Appointment Booked. Your Booking ID is ${appointmentData.id}`);
      setBuyerId ('')
      setFirstname('');
      setSurname('');
      setPropertyId('');
      setDate('');
      setSelectedTime('');
 
  };

  return (
    <div className="body">
    <form onSubmit={handleSubmit}>
    <div> 
      <label className="label1">Buyer ID:</label>
      <input className="input1" 
        type="text"  
        required  
        value={buyerId} 
        onChange={(e) => setBuyerId(e.target.value)} 

      />  
    </div>
    <br />
    <div> 
      <label className="label1">First Name:</label>
      <input className="input1" 
        type="text"  
        required  
        value={firstName} 
        onChange={(e) => setFirstname(e.target.value)} 

      />  
    </div>
    <br />
    <div> <label className="label1">Surname:</label> 
      <input className="input1" 
      type="text" 
      value={surname} 
      onChange={(e) => setSurname(e.target.value)} 
    /> 
    </div>
    <br />
    <div> 
      <label className="label1">Property ID:</label>
      <input className="input1" 
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
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
          >
            <option value="">Choose a time</option>
            <option>8:00-9:00</option>
            <option>9:00-10:00</option>
            <option>10:00-11:00</option>
            <option>12:00-13:00</option>
            <option>13:00-14:00</option>
            <option>15:00-16:00</option>
            <option>16:00-17:00</option>
           
          
          </select>
        </div>
        <br />
        <button className="button1">Book</button>
      </form>
    </div>
  );
};

export default BookAppointment;