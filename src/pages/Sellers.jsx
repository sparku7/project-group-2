 import { useState, useEffect } from "react";
 import '../css/RegisterUser.css'
 
import AddSeller from "../components/AddSeller";


 
//this fetch uses the useEffect to get all the data instantly, and by passing a parameter we can set the url in our state
const useFetch = (url) => {
  const [data, setData] = useState([]);
 
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [data]);
  //we have to return data here as we have made a function expecting some kind of data back
  //comment the bit of code and look at the error you get in the browser
  return [data];
};
 
 
const Sellers = ()=> {
 
  //this is how we are going to use the id
  const [deleteId, setDeleteId] = useState('')
  //this is our data call, using the useFetch function containing the useEffect
  const [data] = useFetch('http://localhost:8002/sellers')
 
  const handleDelete = (e, deleteId) => {
    e.preventDefault()

    if (window.confirm('Are you sure you want to delete this seller?')) {
 
    fetch('http://localhost:8002/sellers/' + deleteId, {
 
    method: 'DELETE' ,
 
    }).then(res => res.json())
    //because we are deleting, there is no data we need to return, so we dont need that extra .then
  }}
 
 
  return (
    <div className="container2">
        <h1>Register a New Seller</h1>
        <br></br>
        <br></br>
     <AddSeller/>
 
   
    <div>
    <br/> <br />
    <div className='table-container'>
    <table>
      <thead>
          <th>Sellers ID</th>
          <th>First Name</th>
          <th>Surname</th>
          <th>Delete Seller</th>
      </thead>
      <tbody>
      {data && data.map((sell)=>(
        <tr>
          {/* We are setting the deleteId (The one we use in our handleDelete function to input the id directly at the end of the url) */}
          {/* We are extracting the value from the data on the page so we cant make a mistake */}
          <td value={deleteId} onChange={(e) => setDeleteId(e.target.value)}>{sell.id}</td>
          <td>{sell.firstName}</td>
          <td>{sell.surname}</td>
          {/* We use the handleDelete to use the sell.id, it makes the request, and disappears from the screen and json file */}
          <td><button className="delete-btn" onClick={(e) => handleDelete(e, sell.id)}>Delete</button></td>
       
        </tr>
     ))}
     
      </tbody>
    </table>
    </div>
    </div>
 
 
    </div>
  );
}
 
 
 
export default Sellers;