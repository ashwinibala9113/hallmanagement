import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Addhall = () => {
  const [hall, setHall] = useState({
    image: '',
    name: '',
    location: '',
    description: ''
  });
  const navigate = useNavigate();
  const handleboard=()=>{
    navigate('/components/admin/admindashboard')
  }
  const handleUpload = async () => {
    try {
      const response = await fetch('http://localhost:5000/upload-hall', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(hall)
      });
      if (response.ok) {
        alert('hall uploaded successfully');
        navigate('/components/admin/add')
      } else {
        console.error('Failed to upload hall:', response.statusText);
      }
    } catch (error) {
      console.error('Error uploading hall:', error);
    }
  };

  return (
    <div className="upload-hall-container" style={{ backgroundColor:"wheat",height:"400px",width:"500px" }}>
      <h3 style={{padding:"10px"}}>Upload hall</h3>
      <div>
        <input
          type="text"
          placeholder="Image Source URL"
          value={hall.image}
          onChange={(e) => setHall({ ...hall, image: e.target.value })}
          className="upload-hall-input"
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Hall Name"
          value={hall.name}
          onChange={(e) => setHall({ ...hall, name: e.target.value })}
          className="upload-hall-input"
        />
      </div>
      <div>
        <input
        type="text"
          placeholder="Loction"
          value={hall.location}
          onChange={(e) => setHall({ ...hall, location: e.target.value })}
          className="upload-hall-textarea"
        ></input>
      </div>
      <div>
        <input
        type="text"
          placeholder="Description"
          value={hall.description}
          onChange={(e) => setHall({ ...hall, description: e.target.value })}
          className="upload-hall-textarea"
        ></input>
      </div>
      <button onClick={handleUpload} className="upload-hall-button">Upload</button>
      <button onClick={handleboard} className="upload-hall-button">back</button>
    </div>
  );
}

export default Addhall;