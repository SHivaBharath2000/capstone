import React, { useState, useContext, useEffect } from "react";
import { MyContext } from "../Routing";
import "./About.css";
import { useNavigate } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import { bookings as createBooking } from "../../API/auth";
import { stripePayment } from "../../API/auth";
import { savePayment } from "../../API/auth";

function About() {
  const { booking, setBooking } = useContext(MyContext);
  const [bookingList, setBookingList] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [noOfdays, setNoOfdays] = useState(0);
  const [amount, setAmount] = useState(0);
  const [Status, setStatus] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(amount);
  }, [amount]);

  const handleFromDateChange = (event) => {
    setFromDate(event.target.value);
    if (toDate) {
      const days = calculateDaysBetweenDates(event.target.value, toDate);
      setNoOfdays(days);
      setAmount(days * Number(booking.amount));
    }
  };

  const handleToDateChange = (event) => {
    setToDate(event.target.value);
    if (fromDate) {
      const days = calculateDaysBetweenDates(fromDate, event.target.value);
      setNoOfdays(days);
      setAmount(days * Number(booking.amount));
    }
  };

  const calculateDaysBetweenDates = (fromDate, toDate) => {
    const startDate = new Date(fromDate);
    const endDate = new Date(toDate);
    const timeDifference = endDate.getTime() - startDate.getTime();
    const dayDifference = timeDifference / (1000 * 3600 * 24);
    return Math.round(dayDifference);
  };

  const handleToken = async (token) => {
    const payment = await stripePayment(token, amount, booking.name);
    if (payment) {
      const status = await handlePayment();
      if (status) {
        setStatus(true);
        createNewBooking(true);//
      }
    }
  };

  const handlePayment = async () => {
    try {
      let userData = {
        paymentId: Date.now().toString(),
        equipmentId: booking.id,
        equipmentName: booking.name,
        bookingId: booking.billId,
        userName: booking.userName,
        userId: booking.userid,
        noOfdays: noOfdays,
        totalAmount: amount,
        paymentStatus: "Paid"
      };
      const save = await savePayment(userData);
      return save ? true : false;
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
      return false;
    }
  };

  const createNewBooking = async (status) => {
    const newBooking = {
      bookingId: booking.billId,
      userId: booking.userid,
      userName: booking.userName,
      equipmentId: booking.id,
      equipmentName: booking.name,
      fromDate: fromDate.toString(),
      toDate: toDate.toString(),
      noOfdays: noOfdays.toString(),
      totalAmount: amount.toString(),
    };
    setBookingList([...bookingList, newBooking]);
    try {
      if (status) {//after the payment has been save in payments database only the status parameter true,otherwise false.it has been true in handletoken function
        const data = await createBooking(newBooking);
        if (data.Code === 1) {
          alert("Booked Successfully");
          navigate("/Payments");
        } else {
          alert("Something went wrong");
        }
      }
    } catch (error) {
      alert("Error occurred: " + error.message);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createNewBooking(Status);
  };

  return (
    <div className="row">
      <div className="col-lg-6">
        <div className="booking-form">
          <h2>Booking Details</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Booking ID:</label>
              <input
                type="text"
                name="bookingId"
                value={booking.billId || ""}
                readOnly
              />
            </div>
            <div>
              <label>User ID:</label>
              <input
                type="text"
                name="userId"
                value={booking.userid || ""}
                readOnly
              />
            </div>
            <div>
              <label>User Name:</label>
              <input
                type="text"
                name="userName"
                value={booking.userName || ""}
                readOnly
              />
            </div>
            <div>
              <label>Equipment ID:</label>
              <input
                type="text"
                name="equipmentId"
                value={booking.id || ""}
                readOnly
              />
            </div>
            <div>
              <label>Equipment Name:</label>
              <input
                type="text"
                name="equipmentName"
                value={booking.name || ""}
                readOnly
              />
            </div>
            <div>
              <label>From Date:</label>
              <input
                type="date"
                name="fromDate"
                onChange={handleFromDateChange}
              />
            </div>
            <div>
              <label>To Date:</label>
              <input type="date" name="toDate" onChange={handleToDateChange} />
            </div>
            <div>
              <label>No of Days/Rent:</label>
              <input
                type="number"
                name="noOfDaysRent"
                value={noOfdays || ""}
                readOnly
              />
            </div>
            <div>
              <label>Total Amount:</label>
              <input
                type="number"
                name="totalAmount"
                value={amount || ""}
                readOnly
              />
            </div>
            <button type="submit">Submit</button>
          </form>
          <StripeCheckout
            style={{ height: "50%" }}
            name={booking.name}
            amount={amount * 100}
            currency="INR"
            token={handleToken}
            stripeKey="pk_test_51Q2DelFadwIWXwELGQD2oIPh7x8mJsBUqEZqNDT5xEhLxQ5EabHqIAMz8oDMeXelQGDYaVKnyKfNSGUYe96eszGu009vSKmbMj"
          />
        </div>
      </div>
      <div className="col-lg-6">
        <h2>Booking History</h2>
        <table className="booking-history">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>User ID</th>
              <th>User Name</th>
              <th>Equipment ID</th>
              <th>Equipment Name</th>
              <th>From Date</th>
              <th>To Date</th>
              <th>No of Days/Rent</th>
              <th>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {bookingList.map((booking, index) => (
              <tr key={index}>
                <td>{booking.bookingId}</td>
                <td>{booking.userId}</td>
                <td>{booking.userName}</td>
                <td>{booking.equipmentId}</td>
                <td>{booking.equipmentName}</td>
                <td>{booking.fromDate}</td>
                <td>{booking.toDate}</td>
                <td>{booking.noOfdays}</td>
                <td>{booking.totalAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default About;
