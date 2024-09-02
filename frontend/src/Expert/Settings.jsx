import React, { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import { baseUrlImage } from "../Api/BaseApi";
import cover_placeholder from "../assets/images/coverplaceholder.jpg";
import profile_placeholder from "../assets/images/default_image.jpeg";
import Footer from "../components/Footer";
import { useAppContext } from "../context/AppContext";
import { useSettingsContext } from "../context/Settings";
import Header from "./components/Header";
import Select2 from "./components/Select2";
import Sidebar from "./components/Sidebar";

function Settings() {
  const {
    profilePicSrc,
    bannerPicSrc,
    editAuthData,
    handleInputChange,
    handleSubmitU,
    isLoading,
    selectedOptions,
    handleSkillChange,
    options,
    selectedImage,
    handleImageChange,
    setSelectedImage,
    selectedImageProfile,
    setSelectedImageProfile,
    handleImageChangeProfile,
    languages,
    selectedLanguages,
    handleLanguageChange,

    // countries
    selectedCountry,
    countriesData,
    selectedState,
    selectedCity,
    handleCountryChange,
    handleStateChange,
    handleCityChange,
    setSelectedCountry,
    setSelectedState,
    setSelectedCity,
    phoneContact,
    setPhoneContact,
  } = useSettingsContext();

  const { AUTHUSER } = useAppContext();

  useEffect(() => {
    setSelectedCountry(
      countriesData.filter((e) => e.name === editAuthData.country) &&
        countriesData.filter((e) => e.name === editAuthData.country)[0]?.id
    );
  }, [editAuthData.country, countriesData, setSelectedCountry]);

  useEffect(() => {
    setSelectedState(
      countriesData
        .find((country) => country.id === parseInt(selectedCountry))
        ?.states.filter((e) => e.name === editAuthData.state)[0]?.id
    );
  }, [selectedCountry, countriesData, editAuthData.state, setSelectedState]);

  useEffect(() => {
    setSelectedCity(
      countriesData
        .find((country) => country.id === parseInt(selectedCountry))
        ?.states.find((state) => state.id === parseInt(selectedState))
        ?.cities.filter((e) => e.name === editAuthData.city)[0]?.id
    );
  }, [
    selectedCountry,
    selectedState,
    countriesData,
    editAuthData.city,
    setSelectedCity,
  ]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <section className="tk-main-section tk-main-bg">
        <div className="container">
          <div className="gy-lg-0 gy-4 row">
            <div className="col-lg-4 col-xl-3 ">
              <Sidebar />
            </div>
            <div className="col-lg-8 col-xl-9">
              <div className="tk-project-wrapper">
                <div className="tk-project-box">
                  <div className="tb-dhb-profile-settings">
                    <div className="tb-dhb-mainheading">
                      <h2>Profile Settings</h2>
                    </div>
                  </div>
                  <div className="tk-employerproject-title">
                    <div className="tk-uploadprofilepic">
                      <figure>
                        {selectedImageProfile ? (
                          <img src={selectedImageProfile} alt="" />
                        ) : (
                          <img
                            src={`${baseUrlImage}${
                              editAuthData?.image || profilePicSrc
                            }`}
                            alt=""
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = profile_placeholder;
                            }}
                          />
                        )}
                      </figure>
                      <div className="tk-freelancer-content-two">
                        <h4>Upload profile photo</h4>
                        <p>
                          Profile image should have jpg, jpeg, gif, png
                          extension and size should not be more than 5MB
                        </p>
                        <div className="tk-uploadbtnpic">
                          <div className="tk-uploadbtn">
                            <label
                              htmlFor="upload_image"
                              className="tk-btn tk-btn-small"
                            >
                              <input
                                id="upload_image"
                                type="file"
                                accept=".jpg,.jpeg,.gif,.png"
                                onChange={handleImageChangeProfile}
                              />
                              <span style={{ color: "white " }}>
                                Upload photo
                              </span>
                            </label>
                          </div>
                          <button
                            className="tk-btn tk-btn-small tk-btnlight"
                            onClick={() =>
                              setSelectedImageProfile(profile_placeholder)
                            }
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tk-project-box">
                  <div className="tk-employerproject-title">
                    <div className="tk-uploadprofilepic">
                      <figure>
                        <div className="tk-hasloader d-none">
                          <div className="spinner-border" role="status">
                            <span className="visually-hidden">
                              Uploading...
                            </span>
                          </div>
                        </div>

                        {selectedImage ? (
                          <img src={selectedImage} alt="" />
                        ) : (
                          <img
                            src={`${baseUrlImage}${
                              editAuthData?.cover_image || bannerPicSrc
                            }`}
                            alt=""
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = cover_placeholder;
                            }}
                          />
                        )}
                      </figure>
                      <div className="tk-freelancer-content-two">
                        <h4>Upload profile banner</h4>
                        <p>
                          Profile banner should have jpg, jpeg, gif, png
                          extension and size should not be more than 5MB
                        </p>
                        <div className="tk-uploadbtnpic">
                          <div className="tk-uploadbtn">
                            <label
                              htmlFor="upload_banner"
                              className="tk-btn tk-btn-small"
                            >
                              <input
                                id="upload_banner"
                                type="file"
                                onChange={handleImageChange}
                                accept=".jpg,.jpeg,.gif,.png"
                              />
                              <span style={{ color: "white " }}>
                                Upload photo
                              </span>
                            </label>
                          </div>
                          <button
                            className="tk-btn tk-btn-small tk-btnlight"
                            onClick={() => setSelectedImage(cover_placeholder)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tk-profile-form">
                  <form className="tk-themeform" id="tb_save_settings">
                    <fieldset>
                      <div className="tk-themeform__wrap">
                        <div className="form-group-half form-group_vertical">
                          <label className="tk-label tk-required">
                            Username
                          </label>
                          <input
                            type="text"
                            className="form-control  "
                            name="name"
                            placeholder="Username"
                            value={editAuthData?.name}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="form-group-half form-group_vertical">
                          <label className="tk-label tk-required">Email</label>
                          <input
                            type="email"
                            className="form-control "
                            name="email"
                            value={editAuthData?.email}
                            onChange={handleInputChange}
                            placeholder="Email"
                            disabled
                          />
                        </div>
                        <div className="form-group form-group_vertical">
                          <label className="tk-label">Your Bio</label>
                          <textarea
                            name="bio"
                            id=""
                            cols="30"
                            rows="10"
                            placeholder="Bio"
                            onChange={handleInputChange}
                            className="form-control"
                            value={editAuthData?.bio}
                          >
                            {editAuthData?.bio}
                          </textarea>
                        </div>
                        <div className="form-group form-group-half">
                          <label className="tk-label tk-required">
                            Country:
                          </label>
                          <div className="">
                            <div className="tk-select">
                              <select
                                id="countryID"
                                className="tk-select2  form-select"
                                onChange={handleCountryChange}
                                value={selectedCountry}
                              >
                                <option selected>Select a country</option>
                                {countriesData.map((country) => (
                                  <option key={country.id} value={country.id}>
                                    {country.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="form-group form-group-half">
                          <label className="tk-label tk-required">State</label>
                          <div className="">
                            <div className="tk-select">
                              <select
                                onChange={handleStateChange}
                                value={selectedState}
                                className="tk-select2 form-select "
                              >
                                <option>Select a state</option>
                                {selectedCountry &&
                                  countriesData
                                    .find(
                                      (country) =>
                                        country.id === parseInt(selectedCountry)
                                    )
                                    ?.states.map((state) => (
                                      <option key={state.id} value={state.id}>
                                        {state.name}
                                      </option>
                                    ))}
                              </select>
                            </div>
                          </div>
                        </div>{" "}
                        <div className="form-group form-group-half">
                          <label className="tk-label tk-required">City:</label>
                          <div className="tk-select">
                            <select
                              onChange={handleCityChange}
                              value={selectedCity}
                              className="tk-select2  form-select"
                            >
                              <option value="">Select a city</option>
                              {selectedState &&
                                countriesData
                                  .find(
                                    (country) =>
                                      country.id === parseInt(selectedCountry)
                                  )
                                  ?.states.find(
                                    (state) =>
                                      state.id === parseInt(selectedState)
                                  )
                                  ?.cities.map((city) => (
                                    <option key={city.id} value={city.id}>
                                      {city.name}
                                    </option>
                                  ))}
                            </select>
                          </div>
                        </div>
                        <div className="form-group-half form-group_vertical">
                          <label className="tk-label tk-required">
                            Contact #:
                          </label>
                          {/* <input
                            type="number"
                            className="form-control "
                            name="contact"
                            value={editAuthData?.contact}
                            onChange={handleInputChange}
                            placeholder="Contact"
                          /> */}
                          <Form.Group controlId="contact" className="w-100">
                            {/* <div className="tk-placeholderholder"> */}
                            <PhoneInput
                              country={"eg"}
                              // enableSearch={true}
                              value={phoneContact}
                              onChange={(phone) => setPhoneContact(phone)}
                              style={{
                                width: "100%",
                              }}
                            />

                            {/* </div> */}
                            {/* {validationErrors.phone && (
          <Form.Text className="text-danger">
            {validationErrors.phone}
          </Form.Text>
        )} */}
                          </Form.Group>
                        </div>
                        {AUTHUSER && AUTHUSER.user_type === "user" ? null : (
                          <>
                            <div className="form-group form-group_vertical">
                              <label className="tk-label">Skills:</label>
                              <div className="tk-select">
                                <span
                                  className="select2 select2-container select2-container--default"
                                  dir="ltr"
                                  data-select2-id="8946"
                                  style={{ width: "904.4px" }}
                                >
                                  <Select2
                                    selectedOptions={selectedOptions}
                                    options={options}
                                    handleSelectedPermission={handleSkillChange}
                                  />
                                  <span
                                    className="dropdown-wrapper"
                                    aria-hidden="true"
                                  ></span>
                                </span>
                              </div>
                            </div>
                            <div className="form-group form-group_vertical">
                              <label className="tk-label">Languages:</label>
                              <Select2
                                options={languages}
                                selectedOptions={selectedLanguages}
                                handleSelectedPermission={handleLanguageChange}
                              />
                            </div>
                          </>
                        )}
                        {/* <div className="form-group form-group_vertical">
                          <label className="tk-label">Description</label>
                          <div className="tk-placeholderholder">
                            <div className="tk-perfix-default">
                              <textarea
                                id=""
                                cols="30"
                                rows="10"
                                name="description"
                                placeholder="Description"
                                className="form-control"
                                onChange={handleInputChange}
                                value={editAuthData?.description}
                              >
                                {editAuthData?.description}
                              </textarea>
                            </div>{" "}
                          </div>
                        </div> */}
                      </div>
                    </fieldset>
                  </form>
                </div>
                <div className="tk-profileform__holder">
                  <div className="tk-dhbbtnarea">
                    <em>
                      Click “Save &amp; Update” to update the latest changes
                    </em>

                    <Button
                      className="tk-btn-solid-lg"
                      onClick={async () => {
                        if (!isLoading) {
                          await handleSubmitU(`update-profile`);
                        }
                      }}
                      disabled={isLoading}
                    >
                      <span style={{ color: "white" }}>
                        {isLoading ? "Saving..." : "Save & Update"}
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Settings;
