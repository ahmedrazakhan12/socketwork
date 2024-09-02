import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.PNG";
import { useAppContext } from "../context/AppContext";
import axios from "axios";
import { useSocialAuth } from "../context/SocialAuthContext";
import toast from "react-hot-toast";
import { baseurl } from "../Api/BaseApi";

function Information() {
  const navigate = useNavigate();

  const {
    userData,
    handleInputChange,
    validationErrors,

    userNavigation,
    setUserNavigation,
  } = useAppContext();
  const { socialUser } = useSocialAuth(); // global-state for social-user

  // if (userNavigation == true && user_type == "expert") {
  //   navigate("/expert-steps");
  //   setUserNavigation(false);
  // } else if (userNavigation == true && user_type == "user") {
  //   navigate("/user-steps");
  //   setUserNavigation(false);
  // }

  const [phone, setPhone] = useState("");
  const [user_type, setUserType] = useState("user");
  const [loading, setLoading] = useState(false);
  const [refral, setRefral] = useState("");
  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };
  async function handleSocialSubmit() {
    const { email, name } = socialUser;
    console.log(
      email,
      name,
      "now make api call and handle Local-storage",
      phone,
      user_type,
      refral
    );

    const url = baseurl + "/register";
    const data = new FormData();
    data.append("name", name);
    data.append("contact", phone);
    data.append("email", email);
    // data.append('email', socialUser?.email);
    data.append("user_type", user_type);
    data.append("password", "social-auth");
    data.append("password_confirmation", "social-auth");
    setLoading(true);

    try {
      const response = await axios.post(url, data);
      setLoading(false);
      toast.success("registered success");
      console.log(response.data);

      localStorage.setItem("token", response.data?.token);
      console.log(response.data, " continue");

        navigate("/expert-steps");
    } catch (error) {
      // refactor the toast soon, almost that error comes, but will add custom toast error manager soon.
      toast.error("Already Registered, Try Login");
    }
  }
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
                      name="refral"
                      placeholder="Refferal Code"
                      required
                      value={refral}
                      onChange={(e) => setRefral(e.target.value)}
                    />
                  </div>
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
                      <Link to="/terms&conditions">
                        {" "}
                        Terms &amp; conditions
                      </Link>{" "}
                    </span>{" "}
                  </label>
                </div>

                <div className="tk-popup-terms">
                  <Button
                    className="tk-btn-solid-lg text-white"
                    onClick={handleSocialSubmit}
                    // disabled={loading}
                  >
                    Signup
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

export default Information;
