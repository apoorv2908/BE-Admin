import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import config from '../../Access/config';
import Topbar from '../../Dashboard/Topbar';
import { decodeId } from '../../Access/Encodedecode';

const Updatesubject = () => {
  const { id } = useParams();
  const decodedId = decodeId(id); // Decode the ID for internal use
  const navigate = useNavigate();
  const [subjectData, setSubjectData] = useState({ subjectName: '', subjectContent: '' });

  useEffect(() => {
    fetchSubjectData();
  }, [id]);

  const fetchSubjectData = async () => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/fullmarks-server/Masterfilter/Subjects/getSubject.php?subject_id=${decodedId}`);
      const data = await response.json();
      if (data.success) {
        setSubjectData({ 
          subjectName: data.subject.subject_name, 
          subjectContent: data.subject.subject_content 
        });
      } else {
        alert('Failed to fetch subject data');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error fetching subject data');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSubjectData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleContentChange = (content) => {
    setSubjectData((prevState) => ({
      ...prevState,
      subjectContent: content,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${config.apiBaseUrl}/fullmarks-server/Masterfilter/Subjects/updatesubjects.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subject_id: decodedId, ...subjectData }),
      });
      const data = await response.json();
      if (data.success) {
        alert('Subject updated successfully');
        navigate('/subjects');
      } else {
        alert('Failed to update subject');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error updating subject');
    }
  };

  return (
    <div className='bg-grey'>
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
                  <div className='text-grey h6'>Update Subject</div>
                  <hr />
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="subjectName" className='mb-2'><b>Subject</b></label>
                      <input
                        type="text"
                        className="custom-input cursor"
                        id="subjectName"
                        name="subjectName"
                        value={subjectData.subjectName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <br />
                    <div className="form-group">
                      <label htmlFor="subjectContent" className='mb-2'><b>Subject Content</b></label>
                      <ReactQuill
                        theme="snow"
                        value={subjectData.subjectContent}
                        onChange={handleContentChange}
                        id="subjectContent"
                        required
                      />
                    </div>
                    <br />
                    <div className='d-flex justify-content-end'>
                      <button type="submit" className="btn btn-primary mt-3 mx-3">Update Subject</button>
                      <Link to="/subjects"><button className="btn btn-danger mt-3">Cancel</button></Link>
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

export default Updatesubject;
