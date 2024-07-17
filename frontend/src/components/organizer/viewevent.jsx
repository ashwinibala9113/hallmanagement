import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
//import './view.css';
//import {Link} from 'react-router-dom'
//import { Link } from 'react-router-dom';
function OrganizerViewing() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  const handleback = () => {
    // Navigate to the next page
    navigate('/components/organizer/organizerboard');
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
                        <p><strong>phone number:</strong> {event.phone}</p>
                        <p><strong>Date:</strong> {event.date}</p>
                        <p><strong>startTime:</strong> {event.startTime}</p>
                        <p><strong>EndTime:</strong> {event.endTime}</p>
                        <p>Booling status:{event.isconfirmed}</p>       </li>
                </ul>
                </div>))}
                <button onClick={handleback}> back</button>
            </div>
        </div>
    );
}

export default OrganizerViewing;
