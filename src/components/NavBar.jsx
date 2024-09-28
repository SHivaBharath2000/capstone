import './nav.css';
import { Link } from 'react-router-dom';
import Profile from './Profile';
import { useContext, useEffect } from 'react';
import { MyContext } from '../Routing';
import { jwtDecode } from 'jwt-decode';

function Navbar() {
  const { admin, setAdmin } = useContext(MyContext); 
  const localtoken = localStorage.getItem('token');

  useEffect(() => {
    const initialize = async () => {
      if (localtoken) {
        try {
          const userDetails = jwtDecode(localtoken);
          if (userDetails.isAdmin) {
            setAdmin(true);
          }
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      }
    };

    initialize();
  }, [localtoken, setAdmin]);

  return (
    <nav className="navbar">
      <img className="image" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfDOnr9Yr1pqp00u-JVKP22rLrNlSWZygQHA&s' alt="Logo" />
      <h2 className='nav-logo'>Market Rental</h2>
      <ul className='nav-links'>
        <li><Link to="/" className='nav-link'>Home</Link></li>
        <li><Link to="/Equipment" className='nav-link'>Equipments</Link></li>
        {admin ? (
          <li><Link to="/allbookings" className='nav-link'>All Bookings</Link></li>
        ) : (
          <li><Link to='/Bookings' className='nav-link'>Bookings</Link></li>
        )}
        <li><Link to="/Payments" className='nav-link'>Payments</Link></li>
      </ul>
      <div className='buttons-group'>
        {!localtoken && <li><Link to="/login" className='button'>Log In</Link></li>}
        {!localtoken && <li><Link to="/signup" className='button'>Sign up</Link></li>}
      </div>
      <div><Profile /></div>
    </nav>
  );
}

export default Navbar;
