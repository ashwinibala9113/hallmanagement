import React, { useState } from 'react';
import './login.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Email validation
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    axios.post('http://localhost:5000/login', { email, password })
      .then(result => {
        console.log(result);
        if (result.data.message === "Success") {
          console.log("Login Success");
          alert('Login successful!')
          navigate('/Components/User/dashboard');
        } else if (result.data.message === "Admin") {
          console.log("Admin Login Success");
          alert('Admin login successful!');
          navigate('/Components/admin/admindashboard');
        } else if (result.data.message === "Organizer") {
          console.log("organizer Login Success");
          alert('organizer login successful!');
          navigate('/components/organizer/organizerboard');
        } else {
          alert('Incorrect password! Please try again.');
        }
      })
      .catch(err => console.log(err));
  };

  const validateEmail = (email) => {
    // Basic email validation using regular expression
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <div className='container'>
      <h1>Hall Management System</h1>
      <h3>Login</h3>
      <div className='inputs'>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input type="text" value={email} onChange={(event) => setEmail(event.target.value)} />
            {emailError && <span className="error">{emailError}</span>}
          </div>
          <div>
            <label>Password:</label>
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
      <div className='text'>Don't have an account?</div>
      <Link to='/Components/login/signup'>Signup</Link>
    </div>
  );
}

export default Login;
