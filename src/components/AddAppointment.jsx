import { useState } from "react"; 

import { useNavigate } from "react-router-dom";

import '../css/RegisterUser.css'

const BookAppointment = ()=> {
    
      const [firstName, setFirstname] = useState(''); 
    
      const [surname, setSurname] = useState(''); 

      const [propertyid, setPropertyId] = useState(''); 

      const [date, setDate] = useState(''); 

      const [timeslot, setTimeSlot] = useState([
        {id: 1, start: '10:00 AM', end: '11:00 AM', booked: false},
        {id: 1, start: '11:30 AM', end: '12:30 AM', booked: false},
        {id: 1, start: '13:00 AM', end: '14:00 AM', booked: false},
        {id: 1, start: '14:30 AM', end: '15:30 AM', booked: false},
        {id: 1, start: '16:00 AM', end: '17:00 AM', booked: false}

      ]); 
    
      const navigate = useNavigate(); 
    
     
    
      const handleSubmit = (e) => { 
    
        e.preventDefault(); 
    
        const addSeller = { firstName, surname, propertyid, date, timeslot }; 
    
     
    
        fetch('http://localhost:8003/appointments', { 
    
          method: 'POST', 
    
          headers: { "Content-Type": "application/json" }, 
    
          body: JSON.stringify(addSeller) 
    
        })
        
        .then(() => {
    
          alert("Appointment Booked");
          setFirstname('');
          setSurname('');
          setPropertyId('');
          setDate('');
          setTimeSlot('');
    
      });
      } 
    
     
    
      return ( 
    
        <div className="bookappointment"> 
    
          <h2>Book an Appointment</h2> 
    
          <form onSubmit={handleSubmit}> 
          <div> 
            <label className="label1">Firstname</label>
            
    
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
        <div> <label className="label1">PropertyId:</label> 
    
            <input className="input1" 
    
            type="text" 
    
            value={propertyid} 
    
            onChange={(e) => setSurname(e.target.value)} 
    
          /> 
        </div>
        <br />
        <div> <label className="label1">Date:</label> 
    
            <input className="input1" 
    
            type="text" 
    
            value={date} 
    
            onChange={(e) => setSurname(e.target.value)} 
    
          /> 
          </div>
      
          <br />

          <div> <label className="label1">Time:</label> 
    
         <input className="input1" 

        type="text" 

        value={date} 

        onChange={(e) => setSurname(e.target.value)} 

  /> 
</div>

    <br />
            <button className='button1'>Submit</button> 
    
          </form> 
        
        </div> 
    
      ); 
    
    } 
    export default BookAppointment;