import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
//import './view.css';
//import {Link} from 'react-router-dom'
//import { Link } from 'react-router-dom';
function Eventadmin() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const [emailInput, setEmailInput] = useState('');

  // Define a function to handle the change in the input field
  const handleInputChange = (event) => {
    setEmailInput(event.target.value);
  };

  const handleCancelBooking = async (emailInput) => {
    try {
      const response = await axios.put(`http://localhost:5000/cancel-event/${encodeURIComponent(emailInput)}`);
      console.log(response.data)
      alert('Event canceled successfully:');
      navigate('/components/admin/eventbook')
      // Optionally, you can update your UI or state here
    } catch (error) {
      console.error('Error canceling event:', error.response ? error.response.data : error.message);
      // Handle error response or display a generic error message
    }
}
const handleClick = () => {
  // Do whatever you want with the email input value here
  console.log('Email clicked:', emailInput);
  // Call handleCancelBooking function with email input value
  handleCancelBooking(emailInput);
  // You can also reset the input value after processing it if needed
  setEmailInput('');
};
  const handleback = () => {
    // Navigate to the next page
    navigate('/components/admin/admindashboard');
  };
  useEffect(() => {
    // Fetch all halls data
    axios.get(`http://localhost:5000/all-event`)
      .then(response => {
        setEvents(response.data);
        console.log(response.data); // Log the data to verify
      })
      .catch(error => {
        console.error('Error fetching event:', error);
      });
  }, []);

    return (
        <div>
            <div className="contains">
                <header className="header">
                    <h1>Hall Viewing</h1>
                </header>
                {events.map(event => (
                 <div key={event._id}>
                <ul className="hall-list">
                    <li className="hall-item">
                        <h2>{event.hallname}</h2>
                        <p><strong>name:</strong> {event.name}</p>
                        <p><strong>Email:</strong> {event.email}</p>
                        <p><strong>phone number:</strong> {event.phone}</p>
                        <p><strong>Date:</strong> {event.date}</p>
                        <p><strong>startTime:</strong> {event.startTime}</p>
                        <p><strong>EndTime:</strong> {event.endTime}</p>
                        <p>Booking status:{event.isconfirmed}</p>
                    </li>
                </ul>
                </div>))}
                <input 
        type="email" 
        placeholder="Enter your email" 
        value={emailInput} 
        onChange={handleInputChange} 
      />
      {/* Button to trigger handleClick */}
      <button onClick={handleClick}>CancelBooking</button>
                <button onClick={handleback}> back</button>
            </div>
        </div>
    );
}

export default Eventadmin;
