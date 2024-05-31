import { Alert } from "bootstrap";
import { useState } from "react"; 

import { useNavigate } from "react-router-dom";
import '../css/RegisterUser.css'



 

const AddSeller = () => { 

  const [firstName, setFirstname] = useState(''); 

  const [surname, setSurname] = useState(''); 

  const navigate = useNavigate(); 

 

  const handleSubmit = (e) => { 

    e.preventDefault(); 

    const addSeller = { firstName, surname }; 

 

    fetch('http://localhost:8002/sellers', { 

      method: 'POST', 

      headers: { "Content-Type": "application/json" }, 

      body: JSON.stringify(addSeller) 

    })
    
    alert("Seller Added")
   

  } 

 

  return ( 

    <div className="addseller"> 

      <h2>Register A New Seller</h2> 

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
        <button className='button1'>Submit</button> 

      </form> 
    
    </div> 

  ); 

} 

  

export default AddSeller; 
