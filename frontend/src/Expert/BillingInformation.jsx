import React from "react";
import { Button } from "react-bootstrap";
import Footer from "../components/Footer";
import { useAppContext } from "../context/AppContext";
import { useSettingsContext } from "../context/Settings";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

function BillingInfortmation() {
  const {
    handleInputChangeBilling,
    handleSubmitB,
    billingData,
    isLoading,
    countriesData,
    // countries
    selectedCountry,
    selectedState,
    selectedCity,
    handleCountryChange,
    handleStateChange,
    handleCityChange,
    setSelectedCountry,
    setSelectedState,
    setSelectedCity,
  } = useSettingsContext();
    const{
      userDataAuth
    }=useAppContext();
  console.log('dedede',billingData);
  // useEffect(() => {
  //   setSelectedCountry(
  //     countriesData.filter((e) => e.name == billingData.country) &&
  //       countriesData.filter((e) => e.name == billingData.country)[0]?.id
  //   );
  // }, [billingData]);

  // useEffect(() => {
  //   setSelectedState(
  //     countriesData
  //       .find((country) => country.id === parseInt(selectedCountry))
  //       ?.states.filter((e) => e.name == billingData.state)[0]?.id
  //   );
  // }, [selectedCountry]);

  // useEffect(() => {
  //   setSelectedCity(
  //     countriesData
  //       .find((country) => country.id === parseInt(selectedCountry))
  //       ?.states.find((state) => state.id === parseInt(selectedState))
  //       ?.cities.filter((e) => e.name == billingData.city)[0]?.id
  //   );
  // }, [selectedCountry, selectedState]);

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
              <div className="tb-dhb-profile-settings">
                <div className="tk-project-wrapper">
                  <div className="tk-profile-form">
                    <div className="tb-dhb-mainheading">
                      <h2>Billing Information</h2>
                    </div>
                    <form className="tk-themeform" id="tb_billing_info">
                      <fieldset>
                        <div className="tk-themeform__wrap">
                          <div className="form-group form-group-half">
                            <label className="tk-label tk-required">
                              First name:
                            </label>
                            <input
                              type="text"
                              className="form-control  "
                              name="name"
                              value={userDataAuth?.name}
                              onChange={handleInputChangeBilling}
                              placeholder="Enter first name"
                            />
                          </div>
                          <div className="form-group form-group-half">
                            <label className="tk-label tk-required">
                              Last name:
                            </label>
                            <input
                              type="text"
                              className="form-control "
                              name="lastname"
                              value={billingData?.lastname}
                              onChange={handleInputChangeBilling}
                              placeholder="Enter last name"
                            />
                          </div>
                          <div className="form-group form-group-half">
                            <label className="tk-label">Company title:</label>
                            <input
                              type="text"
                              className="form-control"
                              name="company_title"
                              value={billingData?.company_title}
                              onChange={handleInputChangeBilling}
                              placeholder="Enter your company title"
                            />
                          </div>
                          {/* <div className="form-group form-group-half">
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
                          </div> */}
                          {/* <div className="form-group form-group-half">
                            <label className="tk-label tk-required">
                              State
                            </label>
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
                                          country.id ===
                                          parseInt(selectedCountry)
                                      )
                                      ?.states.map((state) => (
                                        <option key={state.id} value={state.id}>
                                          {state.name}
                                        </option>
                                      ))}
                                </select>
                              </div>
                            </div>
                          </div>{" "} */}
                          {/* <div className="form-group form-group-half">
                            <label className="tk-label tk-required">
                              City:
                            </label>
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
                          </div> */}
                          <div className="form-group form-group-half">
                            <label className="tk-label tk-required">
                              Postal code:
                            </label>
                            <input
                              type="number"
                              className="form-control  "
                              name="code"
                              value={billingData?.code}
                              onChange={handleInputChangeBilling}
                              placeholder="Enter postal code"
                            />
                          </div>
                          <div className="form-group ">
                            <label className="tk-label tk-required">
                              Email:
                            </label>
                            <input
                              type="email"
                              className="form-control  "
                              name="email"
                              value={billingData?.email ? billingData?.email : userDataAuth?.email}
                              onChange={handleInputChangeBilling}
                              placeholder="Enter email"
                            />
                          </div>
                          <div className="form-group ">
                            <label className="tk-label tk-required">
                              Address:
                            </label>
                            {/* <input
                              type="text"
                              className="form-control  "
                              name="address"
                              value={billingData?.address}
                              onChange={handleInputChangeBilling}
                              placeholder="Enter Address"
                            /> */}
                            <textarea
                              className="form-control"
                              value={billingData?.address}
                              name="address"
                              onChange={handleInputChangeBilling}
                            >
                              {billingData?.address}
                            </textarea>
                          </div>

                          {/* <div className="form-group form-group-half">
                            <label className="tk-label tk-required">
                              Phone:
                            </label>
                            <input
                              type="number"
                              className="form-control  "
                              name="contact"
                              value={billingData?.contact}
                              onChange={handleInputChangeBilling}
                              placeholder="Enter phone"
                            />
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
                        onClick={async () =>
                          await handleSubmitB(`update-billing`)
                        }
                        disabled={isLoading}
                      >
                        <span style={{ color: "white" }}>
                          Save &amp; Update
                        </span>
                      </Button>
                    </div>
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

export default BillingInfortmation;
