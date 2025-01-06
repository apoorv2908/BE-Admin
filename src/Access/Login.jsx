import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { useEffect } from "react";
import { Button, Form, Modal, Row, Col } from "react-bootstrap";
import config from "./config";
import logo from "./Assets/logo-2.jpeg";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [captchaText, setCaptchaText] = useState(""); // Generated CAPTCHA
  const [userCaptcha, setUserCaptcha] = useState(""); // User-entered CAPTCHA
  const [captchaError, setCaptchaError] = useState(""); // CAPTCHA error
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [forgotPasswordError, setForgotPasswordError] = useState("");

  const { login } = useContext(AuthContext);
  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleForgotPassword = async () => {
    // Check if required fields are filled
    if (!forgotEmail || !newPassword || !confirmPassword) {
      setForgotPasswordError("Please fill in all required fields");
      return;
    }

    if (userCaptcha !== captchaText) {
      setCaptchaError("CAPTCHA does not match");
      return;
    }
    setCaptchaError(""); // Clear error if valid

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      setForgotPasswordError("Passwords do not match");
      return;
    }

    const formData = new FormData();
    formData.append("email", forgotEmail);
    formData.append("newPassword", newPassword);

    try {
      const response = await fetch(
        `${config.apiBaseUrl}/fullmarks-server/Admin_access/forgotpassword.php`,
        { method: "POST", body: formData }
      );
      const data = await response.json();

      if (data.success) {
        alert("Password reset successful");
        setShowForgotPasswordModal(false);
        setForgotPasswordError("");
      } else {
        setForgotPasswordError(data.message || "Failed to reset password");
      }
    } catch (error) {
      console.error("Error:", error);
      setForgotPasswordError("Error resetting password");
    }
  };

  const generateCaptcha = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZqwertyuiolkphgasdfzxcvbnm0123456789!@#$%&";
    let result = "";
    for (let i = 0; i < 7; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    setCaptchaText(result);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(
        `${config.apiBaseUrl}/fullmarks-server/Admin_access/login.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      if (userCaptcha !== captchaText) {
        setCaptchaError("CAPTCHA does not match");
        return;
      }
      setCaptchaError(""); // Clear error if valid

      const data = await response.json();

      if (data.success) {
        login(username);
        navigate("/homepage");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred during login");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <div
        className=" container mt-3 mb-3 p-3 bg-white"
        style={{ boxShadow: "0px 0px 7px grey", width: "500px" }}
      >
        <div className="card-body">
          <h2 className="card-title text-center">
            <img
              style={{ width: "100px", borderRadius: "5px" }}
              src={logo}
              alt="Logo"
            />
          </h2>
          <hr></hr>

          <form onSubmit={handleLogin} className="mt-3">
            {error && <p className="text-danger text-center">{error}</p>}

            <div className="mb-3 mt-2">
              <label>
                Username<span className="text-danger">*</span>
              </label>
              <input
                className="custom-input"
                id="username"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label>
                Password<span className="text-danger">*</span>
              </label>
              <input
                type="password"
                className="custom-input"
                id="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label>
                CAPTCHA<span className="text-danger">*</span>
              </label>
              <div className="captcha-box">
                <span className="captcha-text">{captchaText}</span>
                <button
                  className="btn btn-sm  btn-danger"
                  onClick={generateCaptcha}
                >
                  <i class="bi bi-arrow-repeat"></i>
                </button>
              </div>
              <input
                placeholder="Enter CAPTCHA"
                value={userCaptcha}
                onChange={(e) => setUserCaptcha(e.target.value)}
                className="custom-input cursor mt-3"
                required
              />
              {captchaError && (
                <div className="text-danger mt-2">{captchaError}</div>
              )}
            </div>
            <div className="d-flex justify-content-between">
              <p>
                <span
                  onClick={() => setShowForgotPasswordModal(true)}
                  style={{ cursor: "pointer", color: "#0A1172" }}
                >
                  Forgot Password?
                </span>
              </p>
              <button type="submit" className="  btn-custom ">
                Login
              </button>
            </div>
          </form>
        </div>
        <Modal
          show={showForgotPasswordModal}
          onHide={() => setShowForgotPasswordModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Reset Password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="forgotEmail">
                <Form.Label>
                  Email<span className="text-danger">*</span>
                </Form.Label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="custom-input cursor"
                  required
                />
              </Form.Group>
              <Form.Group controlId="newPassword" className="mt-3">
                <Form.Label>
                  New Password<span className="text-danger">*</span>
                </Form.Label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  className="custom-input cursor"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="confirmPassword" className="mt-3">
                <Form.Label>
                  Confirm Password
                  <span className="text-danger ">*</span>
                </Form.Label>
                <input
                  type="password"
                  className="custom-input cursor"
                  placeholder="Confirm new password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Label className="mt-3">
                CAPTCHA <span className="text-danger ">*</span>
              </Form.Label>
              <div className="captcha-box">
                <span className="captcha-text">{captchaText}</span>
                <button
                  type="button"
                  className="refresh-captcha"
                  onClick={generateCaptcha}
                >
                  Refresh
                </button>
              </div>
              <input
                placeholder="Enter CAPTCHA"
                value={userCaptcha}
                onChange={(e) => setUserCaptcha(e.target.value)}
                className="custom-input cursor mt-3"
                required
              />
              {captchaError && (
                <div className="text-danger mt-2">{captchaError}</div>
              )}
              {forgotPasswordError && (
                <div className="text-danger mt-2">{forgotPasswordError}</div>
              )}
            </Form>
          </Modal.Body>
          <div className="d-flex justify-content-end m-3 ">
            <button className="btn-custom" onClick={handleForgotPassword}>
              Reset Password
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Login;
