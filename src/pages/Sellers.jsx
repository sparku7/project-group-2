import { useNavigate, useParams } from "react-router-dom"; 

import { useState, useEffect } from "react"; 

import AddSeller from "../components/AddSeller";



 

const Sellers = ()=> { 

  const { id } = useParams(); 

  const [sellers, setSellers] = useState([]) 

  const navigate = useNavigate(); 

 

  const handleDelete = (id) => { 


    fetch('http://localhost:8002/sellers/' + id,  { 

    method: 'DELETE' ,

    }).then(res => res.json())
    .then(()=> { 
      setSellers(sell=> {return sell.filter(item => item.id !==id)})
      navigate('/'); 

    })  

  } 

  

  useEffect(() =>{ 

    fetch('http://localhost:8002/sellers') 

      .then((res) => res.json()) 

      .then((data) =>setSellers(data) ) 

  }, [sellers]) 




 
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