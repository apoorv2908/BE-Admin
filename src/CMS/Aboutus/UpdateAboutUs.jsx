import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill"; // Ensure you have installed react-quill
import "react-quill/dist/quill.snow.css";
import config from "../../Access/config";
import Topbar from "../../Dashboard/Topbar";

// Define the modules and formats for Quill
const modules = {
  toolbar: [
    [{ font: [] }, { size: [] }], // Add font and size dropdowns
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ["link", "image"],
    ["clean"], // Remove formatting button
  ],
};

const formats = [
  "font",
  "size", // Include size in formats
  "header",
  "list",
  "bullet",
  "bold",
  "italic",
  "underline",
  "color",
  "background",
  "align",
  "link",
  "image",
];

const UpdateAboutUs = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    // Fetch existing About Us content
    fetch(`${config.apiBaseUrl}/fullmarks-server/CMS/Aboutus/getaboutus.php`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setContent(data.content);
        } else {
          alert("Failed to fetch content");
        }
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(
      `${config.apiBaseUrl}/fullmarks-server/CMS/Aboutus/updateaboutus.php`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("About Us content updated successfully");
        } else {
          alert("Failed to update content");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div>
      <Topbar />
      <div
        className="container bg-white mt-3 mb-3 p-3"
        style={{ boxShadow: "0px 0px 5px lightgrey" }}
      >
        <div className="row">
          <div className="col-md-12">
            <div className="text-grey fw-bold h4">Update CMS</div>
            <hr />
            <form onSubmit={handleSubmit}>
              <ReactQuill
                value={content}
                onChange={setContent}
                modules={modules}
                formats={formats}
              />
              <div className="d-flex justify-content-end">
                <button type="submit" className="btn-custom mt-3">
                  Update Content
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateAboutUs;
