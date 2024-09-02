import FacebookLogin from '@greatsumini/react-facebook-login';
import { Box, CircularProgress } from "@mui/material";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
import toast from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { baseurl } from "../Api/BaseApi";
import logo from "../assets/images/logo.PNG";
import { useAppContext } from "../context/AppContext";
import { useSocialAuth } from "../context/SocialAuthContext";
import { fbAppId } from "../utils/constants";
import {
  fetchUserDataForGoogleSocialAuth,
  isRegistered,
} from "../utils/helpers";

// const registered = true
function SignIn() {
  const {
    userData,
    handleInputChange,
    validationErrors,
    isLoading,
    handleLoginSubmit,
    onChange,
  } = useAppContext();
  const nav = useNavigate();

  const { login, socialUser } = useSocialAuth(); // from social-auth-context
  const [Busy, setBusy] = useState(false);
  const [registeredd, setIsRegistered] = useState(false);
  // * Signin-With Popup
  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const { access_token } = tokenResponse;

      // * fetching user profile through access_token
      const userProfile = await fetchUserDataForGoogleSocialAuth(access_token);
      console.log(access_token, " logged in from popup");
      const { picture, name, email } = userProfile;

      login(userProfile);
      // fetch user from the api if the USER registered or not? if registered, then don't take more data, but if not then ask for more data
      console.log(userProfile, " after signin");

      //-1 check if the email exists in db (make api for that)
      try {
        // TODO: Currently the laravel-api is not found, after production of laravel-api, needed to test again if needed
        const { success: registered } = await isRegistered(email);
        console.log(registered, email, "registered or not");
        setIsRegistered(true);
        console.log(registered);
        if (!registered) {
          return nav("/info");
        }
      } catch (error) {
        // toast.error("can't recognize if you are register");
      }

      //-2 if yes, then call/use prepared login-submit fn,  issue Bearer-Token for that user and redirect to '/' () -> for password provide 'social-auth'

      //-3 if not, then ask for the addiotnal info to call register function, -> for password field, set it to 'social-auth' and save it while registering

      // return nav('/')
    },
    onError: () => {
      // login(null)
    },
  });

  const handleCallback = async (res) => {
    console.log(res);
    const { status } = res;

    if (status === "unknown") {
      console.log(status);
    } else {
      login(res);

      try {
        const { success: registered } = await isRegistered(res?.email);

        if (!registered) {
          return nav("/info");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const MyFacebookButton = ({ onClick }) => (
    <button onClick={onClick} className="icon-button facebook">
      <i className="bi bi-facebook"></i>
      <span></span>
    </button>
  );
  // * Sign-In With One Tap
  // useGoogleOneTapLogin({
  //   // promptMomentNotification: "Welcome To Zyacom",
  //   onSuccess: credentialResponse => {
  //     const socialLoggedInUser = jwtDecode(credentialResponse.credential);
  //     login(socialLoggedInUser)

  //   },
  //   onError: () => {
  //     // login(null)
  //     console.log('Google Login Failed');
  //   },
  // });

  async function handleSocialLoginSubmit() {
    // console.log(socialUser)
    const { email, name } = socialUser;
    console.log(email, name, "now make api call and handle in Local-storage");
    console.log("code google");
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", "social-auth");

    // setBusy(true)

    try {
      setBusy(true);
      const { data } = await axios.post(baseurl + "/login", {
        email,
        password: "social-auth",
      });
      setBusy(false);
      console.log(data?.token);
      const token = data?.token;
      localStorage.setItem("token", token);
      toast.success("Successfully Logged In");
      console.log("logged in successfully", data);
      const user = data?.user;
      const redirect_url = user?.user_type === "user" ? "/" : "/expert-steps";
      nav(redirect_url);
    } catch (error) {
      toast.error("You're not registered");
    }
  }

  // const MyFacebookButton = ({ onClick }) => (
  //   <button onClick={onClick} className="icon-button facebook">
  //     <i className="bi bi-facebook"></i>
  //     <span></span>
  //   </button>
  // );
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState();
  useEffect(() => {
    // Function to extract referral code from URL query parameters
    const getReferralCodeFromURL = () => {
      const searchParams = new URLSearchParams(location.search);
      const msg = searchParams.get("message");
      if (msg) {
        setErrorMessage(msg);
      }
    };

    getReferralCodeFromURL();
  }, [location.search]);
  return (
    <div className="min-h-screen bg-gray-100" style={{ height: "104vh" }}>
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
              <h5>{socialUser ? "Continue" : "Login"} With Zyacom Account</h5>
            </div>

            {socialUser ? (
              <div className="tk-popup-terms">
                <Button
                  className="tk-btn-solid-lg text-white"
                  onClick={handleSocialLoginSubmit}
                >
                  <span>Continue {socialUser && "as " + socialUser?.name}</span>
                  &nbsp; &nbsp;
                  {Busy && (
                    <CircularProgress disableShrink color="inherit" size={18} />
                  )}{" "}
                </Button>{" "}
              </div>
            ) : (
              <fieldset>
                <div className="tk-themeform__wrap">
                  {socialUser ? (
                    <SocialRegisteration />
                  ) : (
                    <>
                      {" "}
                      <Form.Group controlId="email" className="w-100">
                        {errorMessage && (
                          <div className="tk-verifyemail_alert  mt-3 ">
                            {errorMessage}
                          </div>
                        )}
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
                      </Form.Group>{" "}
                    </>
                  )}
                  {!socialUser && (
                    <div className="row justify-content-center w-100 m-0">
                      <p className="text-muted text-center border-bottom">Or</p>
                      <FacebookLogin
      appId={fbAppId}
      onSuccess={handleCallback}
      onFail={(error) => console.log('Login failed', error)}
      onProfileSuccess={(response) => console.log('Profile retrieved', response)}
      render={({ onClick }) => (
        <MyFacebookButton onClick={onClick} />
      )}
    />
                      {/* <FacebookAuth
                        appId={fbAppId}
                        callback={async (res) => {
                          console.log(res);
                          const { status } = res;

                          if (status === "unknown") {
                          } else {
                            login(res);

                            try {
                              const { success: registered } =
                                await isRegistered(res?.email);

                              if (!registered) {
                                return nav("/info");
                              }
                            } catch (error) {
                             
                            }
                          }
                        }}
                        component={MyFacebookButton}
                      /> */}
                      <button
                        onClick={() => loginWithGoogle()}
                        className="icon-button google-plus"
                      >
                        <i className="bi bi-google"></i>
                        <span></span>
                      </button>
                    </div>
                  )}

                  {!socialUser && (
                    <>
                      {" "}
                      <div className="form-group">
                        {/* <div className="tk-form-checkbox">
                    <input
                      id="remember_me"
                      type="checkbox"
                      className="form-check-input form-check-input-lg"
                      name="remember"
                    />
                    <label htmlFor="remember_me" className="form-check-label">
                      <span> Remember Me </span>
                    </label>
                  </div> */}
                        <Box className="captcha">
                          <ReCAPTCHA
                            sitekey="6LdWLswpAAAAAODrD3fuInEOUi-NRlcVQdK5XlPQ"
                            onChange={onChange}
                          />
                          {validationErrors.value && (
                            <Form.Text className="text-danger">
                              {validationErrors.value}
                            </Form.Text>
                          )}
                        </Box>
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
                    </>
                  )}
                  {!socialUser && (
                    <div className="tk-lost-password">
                      <Link to="/sign-up">Sign up </Link>
                      <Link
                        className="tk-password-clr_light"
                        to="/forgot-password"
                      >
                        Lost password
                      </Link>
                    </div>
                  )}
                </div>
              </fieldset>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SocialRegisteration() {
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
    setPhone,
    phone,
  } = useAppContext();

  const { socialUser } = useSocialAuth();
  return (
    <>
      <Form.Group controlId="Name" className="w-100">
        <div className="tk-placeholderholder">
          <Form.Control
            type="text"
            name="name"
            placeholder="Refferal Code"
            required
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
      <div className="tk-popup-terms">
        <Button
          className="tk-btn-solid-lg text-white"
          onClick={() => handleSubmit()}
        >
          {/* {isLoading ? "Loading..." : "Sign Up"} */}
          Continue
        </Button>
      </div>
    </>
  );
}

export default SignIn;
