// Signup.js
import { Link } from 'react-router-dom';
import React from 'react';
import './login.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import { useState } from 'react';
//import HallManagementSystem from '../User/dashboard';
function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post( 'http://localhost:5000/register', {name,email, password})
    .then(result => {
        console.log(result);
        if(result.data === "Already register"){
            alert('Email already registered!');
            navigate('/components/login/login');
        }
        else{
            alert('Registered successfully,please proceed with login');
            navigate('/components/login/login');
        }
    })
    .catch(err => console.log(err));
  };

  return (
    <div className="container">
      <h1>Hall Management System</h1>
        <h3>Signup</h3>
        <div className='inputs'>
        <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(event)=> setName(event.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(event)=>setEmail(event.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(event)=>setPassword(event.target.value)} />
        </div>
        <button type="submit">Sign Up</button>
      </form>
        </div>
        <div className='text'>already have an account?</div>
        <Link to="/Components/login/login">login</Link>
        </div>      
  );
}

export default Signup;
