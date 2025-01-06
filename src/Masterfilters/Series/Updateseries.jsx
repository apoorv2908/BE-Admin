import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Topbar from "../../Dashboard/Topbar";
import config from "../../Access/config";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { decodeId } from "../../Access/Encodedecode";

const UpdateSeries = () => {
  const { id } = useParams();
  const decodedId = decodeId(id); // Decode the ID for internal use
  const [seriesName, setSeriesName] = useState("");
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchSeries();
    fetchClasses();
    fetchSubjects();
  }, [id]);

  const fetchSeries = async () => {
    try {
      const response = await fetch(
        `${config.apiBaseUrl}/fullmarks-server/Masterfilter/Series/getSeries.php?series_id=${decodedId}`
      );
      const data = await response.json();
      if (data.success) {
        const { series_name, class_id, subject_id, class_name, subject_name } =
          data.series;
        setSeriesName(series_name);
        setSelectedClass(class_id);
        setSelectedSubject(subject_id);
      } else {
        alert("Failed to fetch series data");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error fetching series data");
    }
  };

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
        `${config.apiBaseUrl}/fullmarks-server/Masterfilter/Series/updateseries.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            series_id: decodedId,
            seriesName,
            selectedClass,
            selectedSubject,
          }),
        }
      );
      const data = await response.json();
      if (data.success) {
        alert("Series updated successfully");
        navigate("/series");
        // Optionally, redirect to series list page or clear form
      } else {
        alert("Failed to update series");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error updating series");
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
            <div className="text-grey fw-bold h4">Update Series</div>
            <hr></hr>
            <form onSubmit={handleSubmit}>
              <label className="fw-bold">
                Series Name<span className="text-danger">*</span>
              </label>
              <br />
              <input
                className="custom-input  cursor"
                placeholder="Enter Series Name"
                value={seriesName}
                onChange={(e) => setSeriesName(e.target.value)}
              />
              <br />
              <br></br>
              <label className="fw-bold">
                Class Name<span className="text-danger">*</span>
              </label>
              <br />
              <select
                className="custom-input  cursor"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <option value="">Select Class</option>
                {classes.map((cls) => (
                  <option key={cls.class_id} value={cls.class_id}>
                    {cls.class_name}
                  </option>
                ))}
              </select>
              <br />
              <br></br>
              <label className="fw-bold">
                Subject Name<span className="text-danger">*</span>
              </label>
              <br />
              <select
                className="custom-input  cursor"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
              >
                <option value="">Select Subject</option>
                {subjects.map((sub) => (
                  <option key={sub.subject_id} value={sub.subject_id}>
                    {sub.subject_name}
                  </option>
                ))}
              </select>
              <br />
              <br></br>
              <div className="d-flex justify-content-end">
                <button type="submit" className=" btn-custom">
                  Update Series
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateSeries;
