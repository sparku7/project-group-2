import AddProperty from "../components/AddProperty";
import PropertyDisplay from "../components/PropertyTable";



function NewProperty() {

  return (

    <div className="body" >
      <div className="container1">
      <h1 className="pagetitle">Property Admin</h1>
      <br/>
        <AddProperty />
      
        <PropertyDisplay />
      </div>    
    </div>
  )
}


export default NewProperty;
