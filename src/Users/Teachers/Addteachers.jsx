import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Topbar from '../../Dashboard/Topbar';
import config from '../../Access/config';

const Addteachers = () => {
  const [teacherName, setTeacherName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [school, setSchool] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [schools, setSchools] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [manualSchool, setManualSchool] = useState('');
  const [manualEntry, setManualEntry] = useState(false); // State for manual entry flag
  const navigate = useNavigate();

  const apiKey = 'SmNzN3BHZTFvRTlmQW43MG01M0hleThOVFFGVnF6c0RPbEF4cmJIRQ==';

  useEffect(() => {
    fetchSchools();
    fetchCountries();
  }, []);

  useEffect(() => {
    if (country) {
      fetchStates();
    }
  }, [country]);

  useEffect(() => {
    if (state) {
      fetchCities();
    }
  }, [state]);

  const fetchSchools = async () => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/fullmarks-server/Users/Schools/fetchschools.php`);
      const data = await response.json();
      if (data.success) {
        setSchools(data.schools);
      } else {
        console.error('Failed to fetch schools');
      }
    } catch (error) {
      console.error('Error fetching schools:', error);
    }
  };

  const fetchCountries = async () => {
    try {
      const response = await fetch('https://api.countrystatecity.in/v1/countries', {
        headers: {
          'X-CSCAPI-KEY': apiKey
        }
      });
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const fetchStates = async () => {
    try {
      const response = await fetch(`https://api.countrystatecity.in/v1/countries/${country}/states`, {
        headers: {
          'X-CSCAPI-KEY': apiKey
        }
      });
      const data = await response.json();
      setStates(data);
    } catch (error) {
      console.error('Error fetching states:', error);
    }
  };

  const fetchCities = async () => {
    try {
      const response = await fetch(`https://api.countrystatecity.in/v1/countries/${country}/states/${state}/cities`, {
        headers: {
          'X-CSCAPI-KEY': apiKey
        }
      });
      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('teacherName', teacherName);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('contactNumber', contactNumber);
    formData.append('country', country);
    formData.append('state', state);
    formData.append('city', city);
    formData.append('zipcode', zipcode);
    formData.append('school', manualEntry ? manualSchool : school); // Use manualSchool if manual entry is checked
    if (profilePic) {
      formData.append('profilePic', profilePic);
    }

    try {
      const response = await fetch(`${config.apiBaseUrl}/fullmarks-server/Users/Teachers/addteachers.php`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        alert('Teacher added successfully');
        navigate("/teachers");
      } else {
        alert('Failed to add teacher');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding teacher');
    }
  };

  return (
    <div>
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <Topbar />
        {/* Main content */}
        <div className="col-md-12">
          <div className="container mt-3">
            {/* Topbar */}
            <div className="row">
              <div className="col-md-12 bg-white shadow-lg p-3 mb-5 bg-white rounded">
                <div className='text-grey h6 fw-bold'>
                  <span>
                  </span> Add Teacher
                </div>
                <hr></hr>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                  <label className='fw-bold'>Teacher Name<span className= 'text-danger'>*</span></label><br />
                  <input
                    className='custom-input mt-1 cursor'
                    placeholder='Enter Teacher Name'
                    value={teacherName}
                    onChange={(e) => setTeacherName(e.target.value)}
                    required
                  /><br /><br></br>
                  <label className='fw-bold'>Teacher Email<span className= 'text-danger'>*</span></label><br />
                  <input
                    className='custom-input mt-1 cursor'
                    type='email'
                    placeholder='Enter Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  /><br /><br></br>
                  
                  <label className='fw-bold'>Contact Number<span className= 'text-danger'>*</span></label><br />
                  <input
                    className='custom-input mt-1 cursor'
                    placeholder='Enter Contact Number'
                    value={contactNumber}
                    required
                    onChange={(e) => setContactNumber(e.target.value)}
                  /><br /><br></br>
      
                  <label className='fw-bold'>School<span className= 'text-danger'>*</span></label><br />
                    <select
                      className='custom-input mt-1 cursor'
                      value={school}
                      onChange={(e) => setSchool(e.target.value)}
                      disabled={manualEntry} // Disable dropdown if manual entry is enabled
                    >
                      <option value="">--Select School--</option>
                      {schools.map((school) => (
                        <option key={school.school_id} value={school.school_id}>{school.school_name}</option>
                      ))}
                    </select><br />
                    <br></br>
                  <label className='fw-bold'>Country<span className= 'text-danger'>*</span></label><br />
                  <select
                    className='custom-input mt-1 cursor'
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    <option value="">--Select Country--</option>
                    {countries.map((country) => (
                      <option key={country.iso2} value={country.iso2}>{country.name}</option>
                    ))}
                  </select><br /><br></br>
                  <label className='fw-bold'>State<span className= 'text-danger'>*</span></label><br />
                  <select
                    className='custom-input mt-1 cursor'
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  >
                    <option value="">--Select State--</option>
                    {states.map((state) => (
                      <option key={state.iso2} value={state.iso2}>{state.name}</option>
                    ))}
                  </select><br /><br></br>
                  <label className='fw-bold'>City<span className= 'text-danger'>*</span></label><br />
                  <select
                    className='custom-input mt-1 cursor'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  >
                    <option value="">--Select City--</option>
                    {cities.map((city) => (
                      <option key={city.id} value={city.name}>{city.name}</option>
                    ))}
                  </select><br /><br></br>
                  <label className='fw-bold'>Zipcode</label><br />
                  <input
                    className='custom-input mt-1 cursor'
                    placeholder='Enter Zipcode'
                    value={zipcode}
                    onChange={(e) => setZipcode(e.target.value)}
                  /><br /><br></br>
                  <label className='fw-bold'>Profile Picture<span className= 'text-success mx-2' style = {{fontSize: "13px"}}>[ jpg, jpeg, png (max size: 2 MB) ]</span> </label><br />
                  <input
                    className='form-control mt-1 cursor'
                    type='file'
                    onChange={(e) => setProfilePic(e.target.files[0])}
                  /><br />
                  <hr></hr>
                  <label className='fw-bold'>Password<span className= 'text-danger'>*</span></label><br />
                  <input
                    className='custom-input mt-1 cursor'
                    type='password'
                    placeholder='Enter Password'
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  /><br /><br></br>
                  <div className='d-flex justify-content-end'>
                    <button type="submit" className="btn btn-primary mt-3">Add Teacher</button>
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

export default Addteachers;
