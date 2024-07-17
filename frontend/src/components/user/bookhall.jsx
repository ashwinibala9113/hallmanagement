import React, { useState } from 'react';
import './HallForm.css'; // Import CSS file for styling
import { useNavigate } from 'react-router-dom';

function HallForm() {
    const [event, setEvent] = useState({
        hallname: '',
        name: '',
        email: '',
        phone: '',
        eventName: '',
        date: '',
        startTime: '',
        endTime: '',
        amount: '50000',
        isconfirmed: 'booked'
    });
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');

    const navigate = useNavigate();

    const handleBoard = () => {
        navigate('/components/user/dashboard');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateEmail(event.email)) {
          setEmailError('Please enter a valid email address.');
          return;
      } else {
          setEmailError('');
      }

      if (!validatePhoneNumber(event.phone)) {
          setPhoneError('Please enter a valid phone number.');
          return;
      } else {
          setPhoneError('');
      }

        try {
            const response = await fetch('http://localhost:5000/upload-event', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(event)
            });
            if (response.ok) {
                alert('Paid successfully');
            } else {
                console.error('Failed to upload event:', response.statusText);
            }
        } catch (error) {
            console.error('Error uploading hall:', error);
        }
    };

    const validateEmail = (email) => {
        // Regular expression for validating email address
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validatePhoneNumber = (phone) => {
        // Regular expression for validating phone number
        const regex = /^\d{10}$/;
        return regex.test(phone);
    };

    return (
            <div className="form-container">
            <h1><center>Hall Booking Form</center></h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="hallName">Hall Name:</label>
                    <input type="text" id="hallname" name="hallname" value={event.hallname}
          onChange={(e) => setEvent({ ...event, hallname: e.target.value })}/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="text" id="email" name="email" value={event.email}
          onChange={(e) => setEvent({ ...event, email: e.target.value })} />
           <span className="error">{emailError}</span>
                </div>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={event.name}
          onChange={(e) => setEvent({ ...event, name: e.target.value })} />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone Number:</label>
                    <input type="number" id="phone" name="phone" value={event.phone}
          onChange={(e) => setEvent({ ...event, phone: e.target.value })} />
           <span className="error">{phoneError}</span>
                </div>
                <div className="form-group">
                    <label htmlFor="eventName">Event Name:</label>
                    <input type="text" id="eventName" name="eventName" value={event.eventName}
          onChange={(e) => setEvent({ ...event, eventName: e.target.value })} />
                </div>
                <div className="form-group">
                    <label htmlFor="date">Date:</label>
                    <input type="date" id="date" name="date" value={event.date}
          onChange={(e) => setEvent({ ...event, date: e.target.value })} />
                </div>
                <div className="form-group">
                    <label htmlFor="startTime">Start Time:</label>
                    <input type="time" id="startTime" name="startTime" value={event.startTime}
          onChange={(e) => setEvent({ ...event, startTime: e.target.value })}  />
                </div>
                <div className="form-group">
                    <label htmlFor="endTime">End Time:</label>
                    <input type="time" id="endTime" name="endTime" value={event.endTime}
          onChange={(e) => setEvent({ ...event, endTime: e.target.value })}/>
                </div>
                <div className="form-group">
                    <label htmlFor="amount">Amount</label>
                    <input type="number" id="amount" name="amount" value="50000" readOnly/>
                </div>
                <button type="submit">pay</button>
                <button onClick={handleBoard} className="upload-hall-button">back</button>
            </form>
        </div>
    );
}

export default HallForm;
