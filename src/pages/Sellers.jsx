import { useNavigate, useParams } from "react-router-dom"; 

import { useState, useEffect } from "react"; 

import AddSeller from "../components/AddSeller";
import Table from 'react-bootstrap/Table';


 

const Sellers = ()=> { 

  const { id } = useParams(); 

  const [sellers, setSellers] = useState([]) 

  const navigate = useNavigate(); 

 

  const handleDelete = () => { 


    fetch(`http://localhost:8002/sellers/${id}`, { 

    method: 'DELETE' ,

    }).then(res => res.json())
    .then(data=> { 

      navigate('/sellers'); 

    })  

  } 
  

  useEffect(() =>{ 

    fetch('http://localhost:8002/sellers') 

      .then((res) => res.json()) 

      .then((data) =>setSellers(data) ) 

  }, [sellers]) 


  useEffect(() =>{ 

    fetch('http://localhost:8002/sellers/' + id) 

      .then(res => res.json()) 

      .then(data =>setSellers(data) ) 

  }, []) 




 
  return (
    <div className="container1">
     <AddSeller/>

    <br/> <br />

    <div className='table-container'>
    <table>
      <thead>
          <th>ID</th>
          <th>First Name</th>
          <th>Surname</th>
          <th>Delete Seller</th>
      </thead>
      <tbody>
      { sellers.map((sell)=>( 
        <tr>
          <td>{sell.id}</td>
          <td>{sell.firstName}</td>
          <td>{sell.surname}</td>
          <td><button onClick={handleDelete}>delete</button></td>

       
        </tr>
    ))} 
      
      </tbody>
    </table>
    </div>


    </div>
  );
}

  

export default Sellers; 