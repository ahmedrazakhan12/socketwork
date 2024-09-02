import React, { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.PNG";
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
    onChange,
    handleCheckboxChange,
    isChecked,
    setPhone,
    phone,
    referralCode,
    setReferralCode,
    termsCondi,
  } = useAppContext();

  // if (userNavigation == true && user_type == "expert") {
  //   navigate("/expert-steps");
  //   setUserNavigation(false);
  // } else if (userNavigation == true && user_type == "user") {
  //   navigate("/user-steps");
  //   setUserNavigation(false);
  // }
  const location = useLocation();

  useEffect(() => {
    // Function to extract referral code from URL query parameters
    const getReferralCodeFromURL = () => {
      const searchParams = new URLSearchParams(location.search);
      const ref = searchParams.get("ref");
      if (ref) {
        setReferralCode(ref);
      }
    };

    getReferralCodeFromURL();
  }, [location.search]);

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
                {referralCode && (
                  <Form.Group controlId="Name" className="w-100">
                    <div className="tk-placeholderholder">
                      <Form.Control
                        type="text"
                        name="name"
                        placeholder="Refferal Code"
                        required
                        value={referralCode}
                        readOnly={!referralCode}
                      />
                    </div>
                  </Form.Group>
                )}
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
                  {/* <div className="tk-placeholderholder"> */}

                  <PhoneInput
                    country={"eg"}
                    // enableSearch={true}
                    value={phone}
                    onChange={(phone) => setPhone(phone)}
                    style={{
                      width: "100%",
                    }}
                  />
                  {/* </div> */}
                  {validationErrors.phone && (
                    <Form.Text className="text-danger">
                      {validationErrors.phone}
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
                      Caller
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
                <div className="row justify-content-center w-100 m-0"></div>
                <div className="tk-login-condition form-group ">
                  <input
                    className="form-check-input form-check-input-lg"
                    id="user_terms_agree"
                    type="checkbox"
                    name="user_terms_agree"
                    defaultValue="yes"
                    required="required"
                    onChange={handleCheckboxChange}
                  />

                  <label
                    htmlFor="user_terms_agree"
                    className="form-check-label"
                  >
                    <span style={{ color: termsCondi ? "red" : "inherit" }}>
                      I have read and agree to all
                      <Link to="/terms&conditions">
                        {" "}
                        Terms &amp; conditions
                      </Link>
                    </span>
                  </label>
                </div>
                {validationErrors.isChecked && (
                  <Form.Text className="text-danger m-0">
                    {validationErrors.isChecked}
                  </Form.Text>
                )}

                <div className="captcha">
                  <ReCAPTCHA
                    sitekey="6LdWLswpAAAAAODrD3fuInEOUi-NRlcVQdK5XlPQ"
                    onChange={onChange}
                  />
                  {validationErrors.value && (
                    <Form.Text className="text-danger">
                      {validationErrors.value}
                    </Form.Text>
                  )}
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
