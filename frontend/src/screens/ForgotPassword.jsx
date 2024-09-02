import React from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.PNG";
import { useAppContext } from "../context/AppContext";

function ForgotPassword() {
  const {
    userData,
    validationErrors,
    resetUserDataemail,
    setResetUserDataEmail,
    resetCondition,
    handleResetSubmit,
    isDisabled
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
              <a href="#">
                <img src={logo} alt="logo" />
              </a>
              <h5>
                Lost password? No need to worry, we’ll send you the password
                reset link
              </h5>{" "}
            </div>

            <fieldset>
              <div className="tk-themeform__wrap">
                <div className="form-group">
                  <Form.Group controlId="email" className="w-100">
                    <div className="tk-placeholderholder">
                      <Form.Control
                        type="text"
                        name="email"
                        value={resetUserDataemail}
                        onChange={(e)=>setResetUserDataEmail(e.target.value)}
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
                </div>
                <div className="tk-popup-terms">
                  <button type="button" onClick={handleResetSubmit} className="tk-btn-solid-lg text-white" disabled={isDisabled} style={{backgroundColor:`${isDisabled ? '#cfc9c9' : '#ac04fc'}`}}>
                    Email Password Reset Link
                  </button>
                </div>
                <div className="tk-lost-password">
                  <Link to="/sign-up">Sign Up</Link>
                  <Link to="/sign-in">Sign In</Link>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
