import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import config from "../Access/config";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("success"); // 'success' or 'danger'

  const handleSubscribe = (e) => {
    e.preventDefault();

    fetch(
      `${config.apiBaseUrl}/fullmarks-user/addtnl/subscribe_newsletter.php`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded", // Ensure the correct content type for form data
        },
        body: new URLSearchParams({ email }), // Use URLSearchParams to format the data correctly
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setAlertMessage(data.error);
          setAlertVariant("danger");
        } else {
          setAlertMessage("Thank you for subscribing!");
          setAlertVariant("success");
          setEmail(""); // Clear the input field
        }
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000); // Hide the alert after 3 seconds
      })
      .catch((error) => {
        setAlertMessage("An error occurred. Please try again.");
        setAlertVariant("danger");
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000); // Hide the alert after 3 seconds
      });
  };

  return (
    <footer>
      <div className="text-center py-3">
        <Container>
          <Row>
            <Col>
              &copy; 2024 All Rights Reserved. Developed By Aritone Global
              Ventures
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
