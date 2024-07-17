import React, { useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const EventStatus = () => {
  const [userEmail, setUserEmail] = useState('');
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleEmailChange = (e) => {
    setUserEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userEmail) {
      setError('Please enter a valid email');
      return;
    }
    fetchEvent();
  };

  const fetchEvent = async () => {
    try {
      setLoading(true);
      // Make a GET request to fetch the event
      const response = await axios.get(`http://localhost:5000/event/${encodeURIComponent(userEmail)}`);
      setEvent(response.data);
      setError(null);
    } catch (error) {
      setEvent(null);
      setError(error.response.data.message || 'An error occurred while fetching event');
    } finally {
      setLoading(false);
    }
  };
  const navigate = useNavigate();
      const handleboard=()=>{
        navigate('/components/user/dashboard')
      }
  const handleCancelBooking = async () => {
    try {
      setLoading(true);
      // Make a DELETE request to cancel the booking
      await axios.delete(`http://localhost:5000/event/${encodeURIComponent(userEmail)}`);
      alert('booking cancelled sucessfully');
      // After successful deletion, set event to null to indicate no booking
      setEvent(null);
      setError(null);
    } catch (error) {
      setError(error.response.data.message || 'An error occurred while cancelling the booking');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <h1>View Event Status</h1>
      <form onSubmit={handleSubmit}>
        <label>
          User Email:
          <input type="email" value={userEmail} onChange={handleEmailChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {event && (
        <div style={{backgroundColor:'white'}}>
          <h2 style={{padding:'20px'}}>Event Details</h2>
          <p>Hall Name:{event.hallname}</p>
          <p>Name: {event.name}</p>
          <p>phonenumber: {event.phone}</p>
          <p>Date: {event.date}</p>
          <p>startTime:{event.startTime}</p>
          <p>endTime:{event.endTime}</p>
          <p>amount paid:{event.amount}</p>
          <p>Booling status:{event.isconfirmed}</p>
          {/* Display more event details as needed */}
          <button onClick={handleCancelBooking} style={{marginBottom:'20px'}}> cancel booking </button>
        </div>
       
      )}
       <button onClick={handleboard} className="upload-hall-button">back</button>
    </div>
  );
};

export default EventStatus;
