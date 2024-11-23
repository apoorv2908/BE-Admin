import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import config from '../../Access/config';
import Topbar from '../../Dashboard/Topbar';

const Addschools = () => {
  const [schoolName, setSchoolName] = useState('');
  const [schoolAddress, setSchoolAddress] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const navigate = useNavigate();

  const apiKey = 'SmNzN3BHZTFvRTlmQW43MG01M0hleThOVFFGVnF6c0RPbEF4cmJIRQ==';

  useEffect(() => {
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
    formData.append('schoolName', schoolName);
    formData.append('schoolAddress', schoolAddress);
    formData.append('password', password);
    formData.append('email', email);
    formData.append('contactNumber', contactNumber);
    formData.append('country', country);
    formData.append('state', state);
    formData.append('city', city);
    if (profilePic) {
      formData.append('profilePic', profilePic);
    }

    try {
      const response = await fetch(`${config.apiBaseUrl}/fullmarks-server/Users/Schools/addschools.php`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        alert('School added successfully');
        navigate("/schools");
      } else {
        alert('Failed to add school');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding school');
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
              <div className="row">
                <div className="col-md-12 bg-white shadow-lg p-3 mb-5 bg-white rounded">
                  <div className='text-grey h6 fw-bold'>
                     Add School
                  </div>
                  <hr></hr>
                  <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <label className='fw-bold'>School Name<span className= 'text-danger'>*</span></label>
                    <input
                      className='custom-input mt-1 cursor'
                      placeholder='Enter School Name'
                      value={schoolName}
                      onChange={(e) => setSchoolName(e.target.value)}
                      required
                    /><br /><br></br>
                    <label className='fw-bold'>School Address<span className= 'text-danger'>*</span></label>
                    <input
                      className='custom-input mt-1 cursor'
                      placeholder='Enter School Address'
                      value={schoolAddress}
                      onChange={(e) => setSchoolAddress(e.target.value)}
                      required
                    /><br /><br></br>
                    <label className='fw-bold'>School Email<span className= 'text-danger'>*</span></label><br />
                    <input
                      className='custom-input mt-1 cursor'
                      type='email'
                      placeholder='Enter Email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    /><br /><br></br>
                    <label className='fw-bold'>School Contact Number<span className= 'text-danger'>*</span></label><br />
                    <input
                      className='custom-input mt-1 cursor'
                      placeholder='Enter Contact Number'
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                      required
                    /><br /><br></br>
                    <label className='fw-bold'>Country<span className= 'text-danger'>*</span></label><br />
                    <select
                      className='custom-input mt-1 cursor'
                      value={country}
                      required
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
                      required
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
                      required
                      onChange={(e) => setCity(e.target.value)}
                    >
                      <option value="">--Select City--</option>
                      {cities.map((city) => (
                        <option key={city.id} value={city.name}>{city.name}</option>
                      ))}
                    </select><br /><br></br>
                    <label className='fw-bold'>School Logo <span className= 'text-success' style = {{fontSize: "13px"}}>[ jpg, jpeg, png (max size: 2 MB) ]</span></label><br />
                    <input
                      className='form-control mt-1 cursor'
                      type='file'
                      onChange={(e) => setProfilePic(e.target.files[0])}
                    /><br></br>
                    <hr></hr>
                    <label className='fw-bold'>Password<span className= 'text-danger'>*</span></label><br />
                    <input
                      className='custom-input mt-1 cursor'
                      type='password'
                      placeholder='Enter Password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    /><br /><br></br>
                    <div className='d-flex justify-content-end'>
                    <Link to = "/schools"><button  className="btn btn-danger mt-3">Cancel</button></Link>
                      <button type="submit" className="btn btn-primary mx-3 mt-3">Add School</button>
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

export default Addschools;
