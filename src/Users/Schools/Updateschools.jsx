import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Topbar from '../../Dashboard/Topbar';
import config from '../../Access/config';
import { decodeId } from '../../Access/Encodedecode';

const Updateschools = () => {
  const [schoolName, setSchoolName] = useState('');
  const [schoolAddress, setSchoolAddress] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [existingProfilePic, setExistingProfilePic] = useState('');
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const { school_id } = useParams();
  const decodedId = decodeId(school_id); // Decode the ID for internal use

  const navigate = useNavigate();

  const apiKey = 'SmNzN3BHZTFvRTlmQW43MG01M0hleThOVFFGVnF6c0RPbEF4cmJIRQ==';

  useEffect(() => {
    fetchSchoolDetails();
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

  const fetchSchoolDetails = async () => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/fullmarks-server/Users/Schools/getSchool.php?school_id=${decodedId}`);
      const data = await response.json();
      setSchoolName(data.school_name);
      setSchoolAddress(data.school_address);
      setPassword(data.password);
      setEmail(data.email);
      setContactNumber(data.contact_no);
      setCountry(data.country);
      setState(data.state);
      setCity(data.city);
      setExistingProfilePic(data.school_logo);
    } catch (error) {
      console.error('Error fetching school details:', error);
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

  const handleRemoveImage = () => {
    setExistingProfilePic('');
    setProfilePic(null);
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
      const response = await fetch(`${config.apiBaseUrl}/fullmarks-server/Users/Schools/updateschools.php?school_id=${decodedId}`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        alert('School updated successfully');
        navigate("/schools");
      } else {
        alert('Failed to update school');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error updating school');
    }
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <Topbar />
          <div className="col-md-12">
            <div className="container mt-3">
              <div className="row">
                <div className="col-md-12 bg-white shadow-lg p-3 mb-5 bg-white rounded">
                  <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className='text-grey h6'>Update School</div>
                    <hr></hr>
                    <label className='fw-bold'>School Name*</label><br />
                    <input
                      className='custom-input mt-3 cursor'
                      placeholder='Enter School Name'
                      value={schoolName}
                      onChange={(e) => setSchoolName(e.target.value)}
                      required
                    /><br /><br></br>
                    <label className='fw-bold'>School Address</label><br />
                    <input
                      className='custom-input mt-3 cursor'
                      placeholder='Enter School Address'
                      value={schoolAddress}
                      onChange={(e) => setSchoolAddress(e.target.value)}
                      required
                    /><br /><br></br>
                    <label className='fw-bold'>Password</label><br />
                    <input
                      className='custom-input mt-3 cursor'
                      type='password'
                      placeholder='Enter Password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    /><br /><br></br>
                    <label className='fw-bold'>Email*</label><br />
                    <input
                      className='custom-input mt-3 cursor'
                      type='email'
                      placeholder='Enter Email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    /><br /><br></br>
                    <label className='fw-bold'>Contact Number</label><br />
                    <input
                      className='custom-input mt-3'
                      placeholder='Enter Contact Number'
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                      required
                    /><br /><br></br>
                    <label className='fw-bold'>Country</label><br />
                    <select
                      className='custom-input mt-3'
                      value={country}
                      required
                      onChange={(e) => setCountry(e.target.value)}
                    >
                      <option value="">Select Country</option>
                      {countries.map((country) => (
                        <option key={country.iso2} value={country.iso2}>{country.name}</option>
                      ))}
                    </select><br /><br></br>
                    <label className='fw-bold'>State</label><br />
                    <select
                      className='custom-input mt-3'
                      value={state}
                      required
                      onChange={(e) => setState(e.target.value)}
                    >
                      <option value="">Select State</option>
                      {states.map((state) => (
                        <option key={state.iso2} value={state.iso2}>{state.name}</option>
                      ))}
                    </select><br /><br></br>
                    <label className='fw-bold'>City</label><br />
                    <select
                      className='custom-input mt-3'
                      value={city}
                      required
                      onChange={(e) => setCity(e.target.value)}
                    >
                      <option value="">Select City</option>
                      {cities.map((city) => (
                        <option key={city.id} value={city.name}>{city.name}</option>
                      ))}
                    </select><br /><br></br>
                    <label className='fw-bold'>School Logo <span className='h6 text-grey'>(max size: 2 MB, jpg/jpeg/png/gif)</span></label><br /><br></br>
                    {existingProfilePic && (
                      <div className="image-container">
                        <img src={`${config.apiBaseUrl}/fullmarks-server/uploads/school_logo/${existingProfilePic}`} alt="School Logo" style={{ width: '50px' }} />
                        <button type="button" className="btn btn-danger btn-sm" onClick={handleRemoveImage}>Add New</button>
                      </div>
                    )}
                    {!existingProfilePic && (
                      <>
                        <span className='text-grey h6'>Insert New School Logo</span>
                        <input
                          className='mt-3 cursor'
                          type='file'
                          onChange={(e) => setProfilePic(e.target.files[0])}
                        /><br /><br></br>
                      </>
                    )}
                    <div className='d-flex justify-content-end'>
                      <button type="submit" className="btn btn-primary mt-3">Update School</button>
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

export default Updateschools;
