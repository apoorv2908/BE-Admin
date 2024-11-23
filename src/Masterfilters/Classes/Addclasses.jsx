import React, { useState } from 'react';
import '../Cssfiles/Addclasses.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';
import Topbar from '../../Dashboard/Topbar';
import config from "../../Access/config"
import { Link } from 'react-router-dom';

const Addclasses = () => {
  const [className, setClassName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${config.apiBaseUrl}/fullmarks-server/Masterfilter/Classes/addclasses.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ className }),
      });
      const data = await response.json();
      if (data.success) {
        alert('Class added successfully');
        navigate("/classes")
      } else {
        alert('Failed to add class');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding class');
    }
  };

  return (
    <div className='bg-grey'>
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <Topbar/>
          {/* Main content */}
          <div className="col-md-12">
            <div className="container mt-3">
              {/* Topbar */}
              <div className="row">
                <div className="col-md-12 bg-white shadow-lg p-3 mb-5 bg-white rounded">
                <div className='text-dark h6 fw-bold'>Add Class</div>
                <hr></hr>
                  <form onSubmit={handleSubmit}>
                    <label className= 'fw-bold'>Class<span className= 'text-danger'>*</span></label>
                    <input
                      className='custom-input mt-1 cursor'
                      placeholder='Enter Class Name'
                      required = "true"
                      value={className}
                      onChange={(e) => setClassName(e.target.value)}
                    /><br /><br></br>
                    <div className= 'd-flex justify-content-end'>
                    <button type="submit" className="btn btn-primary mt-3 mx-3">Add Class</button>
                    <Link to = "/classes"><button className="btn btn-danger mt-3">Cancel</button></Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addclasses;
