import React, { useEffect, useState, useContext } from 'react';
import './payment.css';
import { MyContext } from '../Routing';
import { payment } from '../../API/auth';
import { jwtDecode } from 'jwt-decode';

const Payment = () => {
  const [records, setRecords] = useState([]);
  const { userName } = useContext(MyContext);

  const fetchRecords = async () => {
    const localtoken = localStorage.getItem('token');
    const userDetails=jwtDecode(localtoken)
    try {
      const response = await payment({userName:userDetails.name});
      setRecords(response.userPayments);
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [userName]);

  return (
    <div>
      <h2 style={{ marginTop: '20px' }}>Payment Records</h2>
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>User Name</th>
            <th>Booking ID</th>
            <th>Equipment ID</th>
            <th>Equipment Name</th>
            <th>No. of Days</th>
            <th>Payment Status</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => (
            <tr key={index}>
              <td>{record.userId}</td>
              <td>{record.userName}</td>
              <td>{record.bookingId}</td>
              <td>{record.equipmentId}</td>
              <td>{record.equipmentName}</td>
              <td>{record.noOfdays}</td>
              <td>{record.paymentStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Payment;
