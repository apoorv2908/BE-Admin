import React, { useState } from 'react';
import ReactQuill from 'react-quill'; // Ensure you have installed react-quill
import 'react-quill/dist/quill.snow.css';
import config from '../../Access/config';

const AddAboutUs = () => {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${config.apiBaseUrl}/fullmarks-server/CMS/Aboutus/addaboutus.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert('About Us content added successfully');
        } else {
          alert('Failed to add content');
        }
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <h2>Add About Us Content</h2>
      <form onSubmit={handleSubmit}>
        <ReactQuill value={content} onChange={setContent} />
        <button type="submit" className="btn btn-primary mt-3">Save Content</button>
      </form>
    </div>
  );
};

export default AddAboutUs;
