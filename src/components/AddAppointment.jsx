import React, { useState, useEffect } from 'react';
import '../css/RegisterUser.css';

const BookAppointment = () => {
  const [selectedTime, setSelectedTime] = useState('');
  const [firstName, setFirstname] = useState('');
  const [surname, setSurname] = useState('');
  const [propertyid, setPropertyId] = useState('');
  const [date, setDate] = useState('');
  const [timeslot, setTimeslot] = useState([
    { id: 1, start: '10:00', end: '11:00', booked: false },
    { id: 2, start: '11:30', end: '12:30', booked: false },
    { id: 3, start: '13:00', end: '14:00', booked: false },
    { id: 4, start: '14:30', end: '15:30', booked: false },
    { id: 5, start: '16:00', end: '17:00', booked: false }
  ]);

  useEffect(() => {
    // Fetch data from the API and update state or perform other actions
    fetch('http://localhost:8888/timeslots')
      .then((response) => response.json())
      .then((data) => {
        // Update state or perform other actions with the fetched data
        // For example, setTimeslot(data) if the data contains time slots
      });
  }, []);

  const handleBookSlot = (slotId) => {
    const updatedSlots = timeslot.map((slot) =>
      slot.id === slotId ? { ...slot, booked: true } : slot
    );
    setTimeslot(updatedSlots);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const appointments = { firstName, surname, propertyid, date, timeslot };
    fetch('http://localhost:8888/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(appointments)
    })
      .then((response) => response.json())
      .then((data) => {
      
        alert(`Appointment Booked. Your Booking ID is ${data.id}`);
        setFirstname('');
        setSurname('');
        setPropertyId('');
        setDate('');
        setTimeslot([]);
      })
  };

  return (
    <div className="bookappointment">
      <form onSubmit={handleSubmit}>
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
          value={propertyid} 
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
            {timeslot.map((slot) => (
              <option key={slot.id} value={slot.start}>
                {slot.start} - {slot.end}
              </option>
            ))}
          </select>
        </div>
        <br />
        <button className="button1">Book</button>
      </form>
    </div>
  );
};

export default BookAppointment;