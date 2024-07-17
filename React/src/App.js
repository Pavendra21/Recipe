import './App.css';
import About from './Components/About';
import Allrecipes from './Components/Allrecipes';
import Contact from './Components/Contact';
import Form from './Components/Form';
// import Footer from './Components/Footer';
import Landing from './Components/Landing';
import Navabar from './Components/Navabar';
import Recipe from './Components/Recipe';
import {BrowserRouter as Router,Routes,Route,} from "react-router-dom";

function App() {
  return (
    <>
      <Router>

        <div className="container">
          <div className="row">
            <div className="col-12">
              <Navabar />
            </div>
            
            <div className="col-12">
              <Routes>
                <Route exact path="/" element={<Landing/>} />
                <Route exact path='/Cards/:id/:rcategory' element={<Allrecipes/>} />
                <Route exact path='/Cards/:id/Form' element={<Form />} />
                <Route exact path='/Contact' element={<Contact />} />
                <Route exact path='/About' element={<About/>} />
               <Route exact path="/allrecipes/:rcategory/:recipeId" element={<Recipe />} />
              </Routes>
            </div>


            {/* <div className="col-12">
        <Footer/>
        </div> */}



             
          </div>
        </div>


      </Router>
    </>


  );
}

export default App;
