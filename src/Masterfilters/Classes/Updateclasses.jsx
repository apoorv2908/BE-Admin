import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Sidebar from "../../Dashboard/Sidebar";
import Header from "../../Dashboard/Header";
import Topbar from "../../Dashboard/Topbar";
import config from "../../Access/config";
import { decodeId } from "../../Access/Encodedecode";

const Updateclass = () => {
  const { id } = useParams();
  const decodedId = decodeId(id); // Decode the ID for internal use
  const navigate = useNavigate();
  const [classData, setClassData] = useState({ className: "", sortOrder: "" });

  useEffect(() => {
    fetchClassData();
  }, [decodedId]);

  const fetchClassData = async () => {
    try {
      const response = await fetch(
        `${config.apiBaseUrl}/fullmarks-server/Masterfilter/Classes/getClass.php?class_id=${decodedId}`
      );
      const data = await response.json();
      if (data.success) {
        setClassData({
          className: data.class.class_name,
          sortOrder: data.class.sort_order,
        });
      } else {
        alert("Failed to fetch class data");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error fetching class data");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClassData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${config.apiBaseUrl}/fullmarks-server/Masterfilter/Classes/updateclasses.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ class_id: decodedId, ...classData }),
        }
      );
      const data = await response.json();
      if (data.success) {
        alert("Class updated successfully");
        navigate("/classes");
      } else {
        alert("Failed to update class");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error updating class");
    }
  };

  return (
    <div className="bg-grey">
      <div>
        <Topbar />
        <div
          className="container bg-white mt-3 mb-3 p-3"
          style={{ boxShadow: "0px 0px 7px grey" }}
        >
          <div className="row">
            <div className="col-md-12">
              <div className="text-grey fw-bold h4">Update Class</div>
              <hr></hr>
              <form onSubmit={handleSubmit}>
                <label className="fw-bold">
                  Class Name<span className="text-danger h5">*</span>
                </label>
                <input
                  type="text"
                  className="custom-input cursor"
                  id="className"
                  name="className"
                  value={classData.className}
                  onChange={handleChange}
                  required="true"
                />
                <br></br>
                <br></br>
                <div className="d-flex justify-content-end">
                  <button type="submit" className="btn-custom">
                    Update Class
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Updateclass;
