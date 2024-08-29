import './App.css';
import About from './Components/About';
import Allrecipes from './Components/Allrecipes';
import Contact from './Components/Contact';
import Form from './Components/Form';
import Landing from './Components/Landing';
import Navabar from './Components/Navabar';
import Recipe from './Components/Recipe';
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}

function MainContent() {
  const location = useLocation();

  // Determine if the current path is Login or SignUp
  const hideNavbar = location.pathname === '/Login' || location.pathname === '/';

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          {/* Conditionally render the Navbar */}
          {!hideNavbar && <Navabar />}
        </div>

        <div className="col-12">
          <Routes>
            <Route exact path="/" element={<SignUp />} />
            <Route exact path="/Login" element={<Login />} />
            <Route exact path="/Landing" element={<Landing />} />
            <Route exact path='/Cards/:id/:rcategory' element={<Allrecipes />} />
            <Route exact path='/Cards/:id/Form' element={<Form />} />
            <Route exact path='/Contact' element={<Contact />} />
            <Route exact path='/About' element={<About />} />
            <Route exact path="/allrecipes/:rcategory/:recipeId" element={<Recipe />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
