
import './App.css';
import NavBar from './components/NavBar';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import Buyers from './pages/Buyers';
import Sellers from './pages/Sellers';

import 'bootstrap/dist/css/bootstrap.min.css';
import NewProperty from './pages/NewProperty';

function App() {
  return (
   <div> <link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
  integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
  crossorigin="anonymous"
/>

    <div className="App">
     <BrowserRouter>
       <NavBar />
          <Routes>
             <Route path='/' element={<HomePage />} />
             <Route path='/buyers' element={<Buyers />} />
             <Route path='/sellers' element={ <Sellers />} />
             <Route path='/newproperty' element={ <NewProperty />} />
        </Routes>
     </BrowserRouter>
   
       </div> 
       </div>
  );
}

export default App;