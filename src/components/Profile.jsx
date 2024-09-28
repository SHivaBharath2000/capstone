import React, { useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import { MyContext } from '../Routing';

function ProfileButton({ userName, toggleDropdown }) {
  return (
    <div className="profile-button" onClick={toggleDropdown}>
      <h5><span className="profile-name">{userName}</span></h5>
      <i className="fa-regular fa-user"></i>
    </div>
  );
}

function Profile() {
   
  const [isOpen, setIsOpen] = useState(false);
  const { token, setToken ,userName, setUserName} = useContext(MyContext); 
  const localtoken = localStorage.getItem('token');
  useEffect(() => {
    
    if (localtoken) {
      const userDetails = jwtDecode(localtoken);
      if (userDetails) {
        setUserName(userDetails.name);
      }
    }
  }, [localtoken]); 

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="app-container">
      <ProfileButton userName={userName} toggleDropdown={toggleDropdown}/>
      {isOpen && (
        <div className="dropdown-menu">
          <a onClick={() =>{localStorage.removeItem('token') ,setToken("")}} href="/logout">Logout</a>
        </div>
      )}
    </div>
  );
}

export default Profile;
