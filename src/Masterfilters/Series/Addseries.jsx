import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Topbar from "../../Dashboard/Topbar";
import config from "../../Access/config";

const AddSeries = () => {
  const [seriesName, setSeriesName] = useState("");
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchClasses();
    fetchSubjects();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await fetch(
        `${config.apiBaseUrl}/fullmarks-server/Masterfilter/Classes/fetchclasses.php`
      );
      const data = await response.json();
      if (data.success) {
        setClasses(data.classes);
      } else {
        alert("Failed to fetch classes");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error fetching classes");
    }
  };

  const fetchSubjects = async () => {
    try {
      const response = await fetch(
        `${config.apiBaseUrl}/fullmarks-server/Masterfilter/Subjects/fetchsubjects.php`
      );
      const data = await response.json();
      if (data.success) {
        setSubjects(data.subjects);
      } else {
        alert("Failed to fetch subjects");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error fetching subjects");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${config.apiBaseUrl}/fullmarks-server/Masterfilter/Series/addseries.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ seriesName, selectedClass, selectedSubject }),
        }
      );
      const data = await response.json();
      if (data.success) {
        alert("Series added successfully");
        navigate("/series");

        // Optionally, redirect to series list page or clear form
      } else {
        alert("Failed to add series");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding series");
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
            <div className="text-grey fw-bold h4">Add Series</div>
            <hr></hr>
            <form onSubmit={handleSubmit}>
              <label className="fw-bold">
                Class Name<span className="text-danger">*</span>
              </label>
              <br />
              <select
                className="custom-input  cursor"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                required="true"
              >
                <option value="">--Select Class--</option>
                {classes.map((cls) => (
                  <option key={cls.class_id} value={cls.class_id}>
                    {cls.class_name}
                  </option>
                ))}
              </select>
              <br />
              <br></br>
              <label className="fw-bold">
                Subject<span className="text-danger">*</span>
              </label>
              <br />
              <select
                className="custom-input cursor"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                required="true"
              >
                <option value="">--Select Subject--</option>
                {subjects.map((sub) => (
                  <option key={sub.subject_id} value={sub.subject_id}>
                    {sub.subject_name}
                  </option>
                ))}
              </select>
              <br />
              <br></br>
              <label className="fw-bold">
                Series Name<span className="text-danger">*</span>
              </label>
              <br />
              <input
                className="custom-input cursor"
                placeholder="Enter Series Name"
                value={seriesName}
                required="true"
                onChange={(e) => setSeriesName(e.target.value)}
              />
              <br />
              <br></br>
              <div className="d-flex justify-content-end">
                <button type="submit" className=" btn-custom ">
                  Add Series
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSeries;
