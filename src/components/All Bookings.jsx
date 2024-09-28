import React, { useEffect, useState } from "react";
import { getbookings } from "../../API/auth";


function AllBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getbookings();
        if (data.bookings) {
          
          setBookings(data.bookings);
          console.log(bookings);

        } else {
          alert("Something went wrong");
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
        alert("Something went wrong");
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="bookings-container">
      <h1>All Bookings</h1>
      <table className="bookings-table">
        <thead>
          <tr>
            <th>Equipment ID</th>
            <th>Equipment Name</th>
            <th>Booking ID</th>
            <th>User Name</th>
            <th>User ID</th>
            <th>From Date</th>
            <th>To Date</th>
            <th>No. of Days</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr key={index}>
              <td>{booking.equipmentId}</td>
              <td>{booking.equipmentName}</td>
              <td>{booking.bookingId}</td>
              <td>{booking.userName}</td>
              <td>{booking.userId}</td>
              <td>{booking.fromDate}</td>
              <td>{booking.toDate}</td>
              <td>{booking.noOfdays}</td>
              <td>{booking.totalAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllBookings;
