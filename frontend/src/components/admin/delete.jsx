import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './deleteview.css';
import { useNavigate } from 'react-router-dom';
//import {Link} from 'react-router-dom'
//import { Link } from 'react-router-dom';
function HallViewing() {
  const [halls, setHalls] = useState([]);

  const navigate = useNavigate();
  const handleboard=()=>{
    navigate('/components/admin/admindashboard')
  }

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
   const handleDelete = (id) => {
    fetch(`http://localhost:5000/delete-hall/${id}`, {
        method: "DELETE",
    })
        .then((res) => {
            if (res.ok) {
                // Remove the deleted book from the state
                setHalls(halls.filter(hall => hall._id !== id));
                alert('hall deleted')
            } else {
                throw new Error('Failed to delete hall');
            }
        })
        .catch((error) => {
            console.error('Error deleting book:', error);
            // Handle error
        });
};


    return (
        <div>
            <div className="contains-delete">
                <header className="header">
                    <h1>Hall Viewing</h1>
                </header>
                {halls.map(hall => (
                 <div key={hall._id}>
                <ul className="hall-list">
                    <li className="hall-item">
                        <img src={hall.image} alt="Hall 1" style={{height: 'auto',width:'500px'}} className="hall-image" />
                        <h2>{hall.name}</h2>
                        <p><strong>Location:</strong> {hall.location}</p>
                        <p><strong>Description:</strong> {hall.description}</p>
                        <button onClick={() => handleDelete(hall._id)}>Delete</button>
                    </li>
                </ul>
                </div>))}
                <button onClick={handleboard}>back</button>
            </div>
        </div>
    );
}

export default HallViewing;
