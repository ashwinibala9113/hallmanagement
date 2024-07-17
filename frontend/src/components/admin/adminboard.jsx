import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './hallview.css';
import { useNavigate } from 'react-router-dom';
//import {Link} from 'react-router-dom'
//import { Link } from 'react-router-dom';
function HallViewing() {
  const [halls, setHalls] = useState([]);
  const navigate = useNavigate();

  const handladd = () => {
    // Navigate to the next page
    navigate('/components/admin/add');
  };
  const handldelete = () => {
    // Navigate to the next page
    navigate('/components/admin/delete');
  };
 const handleback=()=>{
  navigate('/components/login/login')
 };
 const handleevent=()=>{
  navigate('/components/admin/eventbook')
 };
  useEffect(() => {
    // Fetch all halls data
    axios.get(`http://localhost:5000/all-hall`)
      .then(response => {
        setHalls(response.data);
        console.log(response.data); // Log the data to verify
      })
      .catch(error => {
        console.error('Error fetching halls:', error);
      });
  },
   []);

    return (
        <div>
            <div className="contains-view" style={{marginTop:"4000px"}}>
                <header className="header">
                    <h1>Hall Viewing</h1>
                </header>
                <div>
              <button onClick={handladd}>add hall</button>
              <button onClick={handldelete}>delete hall</button>
              <button onClick={handleevent}>view event</button>
              <button onClick={handleback}>logout</button>
            </div>
                {halls.map(hall => (
                 <div key={hall._id}>
                <ul className="hall-list">
                    <li className="hall-item">
                        <img src={hall.image} alt="Hall 1" style={{height: 'auto',width:'500px'}} className="hall-image" />
                        <h2>{hall.name}</h2>
                        <p><strong>Location:</strong> {hall.location}</p>
                        <p><strong>Description:</strong> {hall.description}</p>
                    </li>
                </ul>
                </div>))}
            </div>
        </div>
    );
}

export default HallViewing;
