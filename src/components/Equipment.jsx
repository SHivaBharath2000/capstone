import React, { useContext, useEffect } from 'react';
import { MyContext } from '../Routing';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function Equipments({ src, rentRates, description, equipmentName, equipmentId }) {
  const { items, setItems, booking, setBooking,admin,setAdmin } = useContext(MyContext);
  const navigate = useNavigate();

  const handleClick = (event) => {
    const name = event.currentTarget.getAttribute('data-name');
    const id = event.currentTarget.getAttribute('data-id');
    const amount=event.currentTarget.getAttribute('data-amount');

    try {
      const users = jwtDecode(localStorage.getItem('token'));
      const userName = users.name;
      const userid = users.id;
      const billId=Date.now().toString();
      if (users) {
        setBooking({ name, id,userName,userid,billId,amount});
        navigate("/Bookings");
      } else {
        alert("Please Login First");
      }
    } catch {
      alert("Please Login First");
    }
    console.log(name);
    console.log(id);
  };

  useEffect(() => {
    const initialize = async () => {

      const token = localStorage.getItem('token');
      if (token) {
        try {
          const userDetails = jwtDecode(token);
          if (userDetails.isAdmin) {
            setAdmin(true);
          }
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      }
    };

    initialize();
  }, []);

  return (
    <div className="col">
      <div className="card mb-3" style={{ maxWidth: "540px" }}>
        <div className="row g-0">
          <div className="col-md-4">
            <img src={src} className="img-fluid rounded-start" alt={equipmentName} />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h3 className="card-title">{equipmentName}</h3>
              <h4 className="card-text">{description}</h4>
              <h5 className="card-text">₹{rentRates}</h5>
              <p style={{ color: "white" }}>{equipmentId}</p>

              <div className="add-group">
                <button 
                  onClick={handleClick} 
                  className='new-equip' 
                  data-name={equipmentName} 
                  data-id={equipmentId}
                  data-amount={rentRates}
                >
                  Book now <i className="fa-solid fa-right-arrow"></i>
                </button>

                <button type="button" className="btn btn-success">
                  Available
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Equipments;
