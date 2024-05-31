import { useNavigate, useParams } from "react-router-dom"; 

import { useState, useEffect } from "react"; 

import AddSeller from "../components/AddSeller";
import Table from 'react-bootstrap/Table';


 

const Sellers = ()=> { 

  const { id } = useParams(); 

  const [sellers, setSellers] = useState([]) 

  const navigate = useNavigate(); 

 

  const handleClick = () => { 

    fetch('http://localhost:8000/sellers/' + sellers.id, { 

      method: 'DELETE' 

    }).then(() => { 

      navigate('/sellers'); 

    })  

  } 

 

  useEffect(() =>{ 

    fetch('http://localhost:8000/sellers') 

      .then((res) => res.json()) 

      .then((data) =>setSellers(data) ) 

  }, [sellers]) 

 
  return (
    <div>
     <AddSeller/>

    <br/> <br />

    { sellers.map((sell)=>( 
    <Table striped="columns">
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Surame</th>
          <th>Delete Seller</th>
        
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{sell.id}</td>
          <td>{sell.firstName}</td>
          <td>{sell.surname}</td>
          <td><button onClick={handleClick}>delete</button></td>

       
        </tr>
    
      
      </tbody>
    </Table>

))} 
    </div>
  );
}

  

export default Sellers; 