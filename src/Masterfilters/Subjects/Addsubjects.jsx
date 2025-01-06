import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import Topbar from "../../Dashboard/Topbar";
import config from "../../Access/config";

const Addsubjects = () => {
  const [subjectName, setSubjectName] = useState("");
  const [subjectContent, setSubjectContent] = useState(""); // State for subject content
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${config.apiBaseUrl}/fullmarks-server/Masterfilter/Subjects/addsubjects.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ subjectName, subjectContent }), // Sending both subjectName and subjectContent
        }
      );
      const data = await response.json();
      if (data.success) {
        alert("Subject added successfully");
        navigate("/subjects");
      } else {
        alert("Failed to add subject");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding subject");
    }
  };

  return (
    <div>
      <Topbar />
      <div
        className="container bg-white mt-3 mb-3 p-3"
        style={{ boxShadow: "0px 0px 7px grey" }}
      >
        <div className="row">
          <div className="col-md-12">
            <div className="text-grey fw-bold h4">Add Subjects</div>
            <hr></hr>
            <form onSubmit={handleSubmit}>
              <label className="fw-bold">
                Subject Name<span className="text-danger h5">*</span>
              </label>
              <br />
              <th></th>
              <input
                className="custom-input  cursor"
                placeholder="Enter Subject Name"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                required
              />
              <br />
              <br></br>

              {/* Quill Editor for adding subject content */}
              <label className="fw-bold">Subject Content</label>
              <br />
              <ReactQuill
                value={subjectContent}
                onChange={setSubjectContent}
                placeholder="Enter Subject Content"
                className="cursor"
              />
              <br />

              <div className="d-flex justify-content-end">
                <button type="submit" className=" btn-custom">
                  Add Subject
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addsubjects;
