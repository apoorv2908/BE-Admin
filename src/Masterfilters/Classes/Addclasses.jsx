import React, { useState } from "react";
import "../Cssfiles/Addclasses.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";
import Topbar from "../../Dashboard/Topbar";
import config from "../../Access/config";
import { Link } from "react-router-dom";

const Addclasses = () => {
  const [className, setClassName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${config.apiBaseUrl}/fullmarks-server/Masterfilter/Classes/addclasses.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ className }),
        }
      );
      const data = await response.json();
      if (data.success) {
        alert("Class added successfully");
        navigate("/classes");
      } else {
        alert("Failed to add class");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding class");
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
            <div className="text-grey fw-bold h4">Add Class</div>
            <hr></hr>
            <form onSubmit={handleSubmit}>
              <label className="fw-bold">
                Class Name<span className="text-danger h5">*</span>
              </label>
              <input
                className="custom-input mt-1 cursor"
                placeholder="Enter Class Name"
                required="true"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
              />
              <br />
              <br></br>
              <div className="d-flex justify-content-end">
                <button type="submit" className="btn-custom">
                  Submit Class{" "}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addclasses;
