import { useState, createContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import About from './components/About';
import Payment from './components/Payment';
import Equipments from './components/Equipment';
import Navbar from './components/NavBar';
import Signup from './components/Signup';
import Login from './components/Login';
import TermsAndConditions from './components/Terms and condition';
import Addequipment from './components/Addequipment';
import { getEquipments } from '../API/auth';
import { jwtDecode } from 'jwt-decode';
import Allbookings from './components/All Bookings';
import ForgotPassword from './components/forgotPassword';
import ResetPassword from './components/resetPassword';

const MyContext = createContext("");

function App() {
  const [token, setToken] = useState("");
  const [items, setItems] = useState([]);
  const [booking, setBooking] = useState([]);
  const [admin, setAdmin] = useState(false);
  const [userName, setUserName] = useState("");

  const fetchData = async () => {
    try {
      const data = await getEquipments();
      if (data.code === 1) {
        setItems(data.data);
        console.log(items);
      } else {
        alert("Records not added");
      }
    } catch (error) {
      console.error("Error fetching equipment:", error);
      alert("An error occurred while fetching the equipment.");
    }
  };

  useEffect(() => {
    fetchData()
  }, []);


  return (
    <div>
      <BrowserRouter>
        <MyContext.Provider value={{ token, setToken, items, setItems, booking, setBooking,admin,setAdmin,userName,setUserName }}>
          <Navbar />
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/Bookings' element={<About />} />
            <Route exact path='/Payments' element={<Payment />} />
            <Route exact path='/Equipment' element={
              <div className='equipment'>
                {admin ? (
                  <Link to='/addequipment'>
                    <button className="add-button">
                      <span className="add-label">
                        Add <i className="fa-solid fa-plus"></i>
                      </span>
                    </button>
                  </Link>
                ) : null}
                {Array.isArray(items) && items.map(e => (
                  <Equipments
                    key={e.id}
                    {...e}
                  />
                ))}
              </div>
            } />
            <Route exact path='/Signup' element={<Signup />} />
            <Route exact path='/Login' element={<Login />} />
            <Route exact path='/TermsAndConditions' element={<TermsAndConditions />} />
            <Route exact path='/addequipment' element={<Addequipment />} />
            <Route exact path='/allbookings' element={<Allbookings />} />
            <Route exact path='/forgotpassword' element={<ForgotPassword />} />
            <Route exact path='/resetpassword' element={<ResetPassword />} />
          </Routes>
        </MyContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export { MyContext };
export default App;
