import React from "react";
import Header from "../components/Header";
import signUp from "../assets/images/signup.png";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.PNG";
import { Form, Button, Modal, Row, Col, FormGroup } from "react-bootstrap";
import { useAppContext } from "../context/AppContext";

function Registerations() {
  const navigate = useNavigate();
  const {
    userData,
    handleInputChange,
    validationErrors,
    user_type,
    handleUserTypeChange,
    handleSubmit,
    isLoading,
    userNavigation,
    setUserNavigation,
  } = useAppContext();

  // if (userNavigation == true && user_type == "expert") {
  //   navigate("/expert-steps");
  //   setUserNavigation(false);
  // } else if (userNavigation == true && user_type == "user") {
  //   navigate("/user-steps");
  //   setUserNavigation(false);
  // }
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
              <h5>Register Your Account On Zyacom</h5>{" "}
            </div>

            <fieldset>
              <div className="tk-themeform__wrap">
                <Form.Group controlId="Name" className="w-100">
                  <div className="tk-placeholderholder">
                    <Form.Control
                      type="text"
                      name="name"
                      value={userData.name}
                      onChange={handleInputChange}
                      placeholder="Username"
                      required
                    />
                  </div>
                  {validationErrors.name && (
                    <Form.Text className="text-danger">
                      {validationErrors.name}
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group controlId="contact" className="w-100">
                  <div className="tk-placeholderholder">
                    <Form.Control
                      type="number"
                      name="contact"
                      value={userData.contact}
                      onChange={handleInputChange}
                      placeholder="Phone Number"
                      required
                    />
                  </div>
                  {validationErrors.contact && (
                    <Form.Text className="text-danger">
                      {validationErrors.contact}
                    </Form.Text>
                  )}
                </Form.Group>

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

                <Form.Group controlId="password_confirmation" className="w-100">
                  <div className="tk-placeholderholder">
                    <Form.Control
                      type="password"
                      name="password_confirmation"
                      value={userData.password_confirmation}
                      onChange={handleInputChange}
                      placeholder="Confirm password"
                      required
                    />
                  </div>
                  {validationErrors.password_confirmation && (
                    <Form.Text className="text-danger">
                      {validationErrors.password_confirmation}
                    </Form.Text>
                  )}
                </Form.Group>

                <div className="form-group form-group-radio">
                  <div className="tk-form-checkbox">
                    <input
                      className="form-check-input tk-form-check-input-sm tk-payout-opt"
                      type="radio"
                      name="user_type"
                      value="user"
                      checked={user_type === "user"}
                      onChange={handleUserTypeChange}
                    />
                    <label
                      className="block font-medium text-sm  form-check-label"
                      htmlFor="user"
                    >
                      User
                    </label>
                  </div>
                  <div className="tk-form-checkbox">
                    <input
                      className="form-check-input tk-form-check-input-sm tk-payout-opt"
                      type="radio"
                      name="user_type"
                      value="expert"
                      checked={user_type === "expert"}
                      onChange={handleUserTypeChange}
                    />
                    <label
                      className="block font-medium text-sm  form-check-label"
                      htmlFor="expert"
                    >
                      Expert
                    </label>
                  </div>
                </div>
                <div className="row justify-content-center w-100 m-0">
                  <p className="text-muted text-center border-bottom">
                    Or Continue With{" "}
                  </p>
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
                  <a href="#" className="icon-button pinterest">
                    <i className="bi bi-reddit"></i>
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
                <div className="tk-login-condition form-group">
                  <input
                    className="form-check-input form-check-input-lg"
                    id="user_terms_agree"
                    type="checkbox"
                    name="user_terms_agree"
                    defaultValue="yes"
                    required="required"
                  />
                  <label
                    htmlFor="user_terms_agree"
                    className="form-check-label"
                  >
                    {" "}
                    <span>
                      I have read and agree to all
                      <a href="#"> Terms &amp; conditions</a>{" "}
                    </span>{" "}
                  </label>
                </div>

                <div className="tk-popup-terms">
                  <Button
                    className="tk-btn-solid-lg text-white"
                    onClick={handleSubmit}
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : "Sign Up"}
                  </Button>
                  {/* <button  className="tk-btn-solid-lg text-white" onClick={handleSubmit} disabled={isLoading}>
                    {isLoading ? 'Loading...' : 'Sign in'}
                  </button> */}
                </div>
                <div className="tk-lost-password">
                  <Link to="/sign-in"> Sign In </Link>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registerations;
