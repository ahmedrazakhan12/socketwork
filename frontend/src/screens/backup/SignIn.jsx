import React from "react";
import Header from "../components/Header";
import signUp from "../assets/images/signup.png";
import logo from "../assets/images/logo.PNG";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import {Form, Button } from "react-bootstrap";
function SignIn() {

  const {
    userData,
    handleInputChange,
    validationErrors,
    handleLoginSubmit,
    isLoading,
  } = useAppContext();
  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header start */}
      {/* <Header /> */}
      {/* Header End */}
      <div
        className="tk-loginconatiner tk-loginconatiner-two"
        style={{
          backgroundImage:
            "url(https://taskup.wp-guppy.com/storage/optionbuilder/uploads/auth-background.jpg)",
        }}
      >
        <div className="tk-popupcontainer w-100">
          <div className="tk-login-content">
            <div className="tk-login-info">
              <Link to="/">
                <img src={logo} alt="logo" />
              </Link>
              <h5>Login With Zyacom Account</h5>{" "}
            </div>

            <fieldset>
              <div className="tk-themeform__wrap">
              <Form.Group controlId="email" className="w-100">
                    <div className="tk-placeholderholder">
                      <Form.Control
                        type="text"
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                        placeholder="Your email address"
                        required
                      />
                    </div>
                    {validationErrors.email && (
                      <Form.Text className="text-danger">
                        {validationErrors.email}
                      </Form.Text>
                    )}
                  </Form.Group>
                  <Form.Group controlId="password" className="w-100">
                  <div className="tk-placeholderholder">
                    <Form.Control
                      type="password"
                      name="password"
                      value={userData.password}
                      onChange={handleInputChange}
                      placeholder="Enter password"
                      required
                    />
                  </div>
                  {validationErrors.password && (
                    <Form.Text className="text-danger">
                      {validationErrors.password}
                    </Form.Text>
                  )}
                </Form.Group>
                <div className="row justify-content-center w-100 m-0">
                <p className="text-muted text-center border-bottom">Or Continue With </p>
                <a href="#" className="icon-button twitter">
                  <i className="bi bi-twitter"></i>
                  <span></span>
                </a>
                <a href="#" className="icon-button facebook">
                  <i className="bi bi-facebook"></i>
                  <span></span>
                </a>
                <a href="#" className="icon-button google-plus">
                  <i className="bi bi-google"></i>
                  <span></span>
                </a>
                <a href="#" className="icon-button youtube">
                  <i className="bi bi-apple"></i>
                  <span></span>
                </a>
                <a href="#" className="icon-button youtube">
                  <i className="bi bi-github"></i>
                  <span></span>
                </a>
                <a href="#" className="icon-button pinterest">
                  <i className="bi bi-pinterest"></i>
                  <span></span>
                </a>
                <a href="#" className="icon-button twitter">
                  <i className="bi bi-linkedin"></i>
                  <span></span>
                </a>
                <a href="#" className="icon-button google-plus">
                  <i className="bi bi-instagram"></i>
                  <span></span>
                </a>
                </div>
                <div className="form-group">
                  <div className="tk-form-checkbox">
                    <input
                      id="remember_me"
                      type="checkbox"
                      className="form-check-input form-check-input-lg"
                      name="remember"
                    />
                    <label htmlFor="remember_me" className="form-check-label">
                      <span> Remember Me </span>
                    </label>
                  </div>
                </div>
                <div className="tk-popup-terms">
                <Button
                    className="tk-btn-solid-lg text-white"
                    onClick={handleLoginSubmit}
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : "Sign in"}
                  </Button>
                </div>
                <div className="tk-lost-password">
                  <Link to="/sign-up">Sign up </Link>
                  <Link className="tk-password-clr_light" to="/forgot-password">
                    Lost password
                  </Link>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
