import AddProperty from "../components/AddProperty";
import PropertyDisplay from "../components/PropertyTable";



function NewProperty() {

  return (

    <div >
      <div className="container1">
      <AddProperty />
      </div>
      <PropertyDisplay />
    </div>
  )
}


export default NewProperty;
