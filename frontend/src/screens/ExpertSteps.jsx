import React, { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import Footer from "../components/Footer";
import Header from "../components/Header";
// import { categoriesData, options } from "../data";
import SchoolIcon from "@mui/icons-material/School";
import { Link, useNavigate } from "react-router-dom";
import makeAnimated from "react-select/animated";
import ExpertSelect2 from "../Expert/components/ExpertSelect";
import { useCompletionContext } from "../context/CompletionContext";
import {
  validationWithCountriesForID_Card_number,
  validationsWithCountries,
} from "../utils/constants";
import { convertToTitleCase } from "../utils/helpers";
const animatedComponents = makeAnimated();
const totalNumberOfSteps = 3;
function ExpertSteps() {
  const {
    current,
    imageUrl,
    handleFileChange,
    stepNames,
    setCurrent,
    handleSave,
    handleDelete,
    dattaa,
    portfolioData,
    handlePortfolioDelete,
    handleCategoryChange,
    selectedCategory,
    categoriesData,
    handleSubCategoryChange,
    selectedSubCategory,
    handleSubmit,
    skillsData,
    handleSelectedSkills,
    handleInputChange,
    userData,
    selectedSkillIds,
    errors,
    FilteredSubcategories,
    paymentDetails,
    handlePaymentsInputChange,
    qerrors,
    selectedSkill,
    SelectedCountry,
    setSelectedCountry,
    SelectedCountryForIdCardNum,
    setSelectedCountryForIdCardNum,
  } = useCompletionContext();
  const formContainerRef = useRef(null);

  useEffect(() => {
    if (formContainerRef.current) {
      formContainerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [current]);
  const [] = useState();
  const nav = useNavigate();
  // const handleNextClick = () => {
  //   if (current < stepsContent.length) {
  //     setCurrent(current + 1);
  //   }
  // };
  // const handleNextClick = () => {
  //   if(!userData.bio && current === 1){
  //     toast.error("Please fill out the bio field");
  //     return;
  //   }else if(!selectedCategory && current === 1){
  //     toast.error("Please fill out the category field");
  //     return;
  //   }else if(!selectedSubCategory && current === 1){
  //     toast.error("Please fill out the subCategory field");
  //     return;
  //   }
  //   setCurrent(current => current < stepsContent.length ? current + 1 : current);
  // };
  const [personalErrors, setPersonalErrors] = useState({});
  const [qualificationError, setQualificationError] = useState({});
  const handleNextClick = () => {
    const newErrors = {};

    if (!userData.image && current === 1) {
      newErrors.image = "Please upload your profile image";
    }

    if (!userData.bio && current === 1) {
      newErrors.bio = "Please fill out the bio field";
    }

    if (!selectedCategory && current === 1) {
      newErrors.category = "Please select a Category";
    }

    if (!selectedSubCategory && current === 1) {
      newErrors.subCategory = "Please select a Sub Category";
    }

    if (dattaa.length === 0 && current === 2) {
      newErrors.qualification = "Add at least one qualification";
    }

    // if(errors["account_number"])

    // console.log(errors["account_number"], errors, " errrr");

    setPersonalErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setCurrent((current) =>
        current < stepsContent.length ? current + 1 : current
      );
    }
  };
  const handlePreviousClick = () => {
    if (current > 1) {
      setCurrent(current - 1);
    }
  };
  const CustomAlert = ({ value }) => {
    return (
      <p className="" style={{ color: "red" }}>
        {convertToTitleCase(value)}
      </p>
    );
  };

  const stepsContent = [
    // Step 1 content
    <fieldset className="step step-1" >
      {/* Content for step 1 */}
      <div className="form-card">
        <div className="row">
          <div className="col-7">
            <h2 className="fs-title">Account Information </h2>
          </div>
          <div className="col-5">
            <h2 className="steps">Step 1 - {totalNumberOfSteps}</h2>
          </div>
        </div>
        <div className="col-12">
          <div className="row justify-content-center">
            <div className="profile-pic">
              <label className="-label" htmlFor="file">
                <span className="bi bi-camera"></span>
              </label>
              <input id="file" type="file" onChange={handleFileChange} />
              <img src={imageUrl} id="output" width="200" />
            </div>

            <h4 className="text-center text-muted">
              Upload your image
              <br />
              {personalErrors.image && (
                <p style={{ color: "red", fontSize: "18px" }}>
                  {personalErrors.image}
                </p>
              )}
            </h4>
          </div>
        </div>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label className="fieldlabels fieldlabels mt-3 fs-6 fw-bold text-dark ">
            Your Bio *
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="bio"
            value={userData.bio}
            onChange={handleInputChange}
          />
          {personalErrors.bio && <CustomAlert value={personalErrors.bio} />}
        </Form.Group>
        <label className="fieldlabels fieldlabels mt-2 fs-6 fw-bold text-dark ">
          Select Category *
        </label>
        <Form.Select
          name="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">Select Category</option>
          {categoriesData?.map((category, index) => (
            <option key={index} value={category.id}>
              {category.name}
            </option>
          ))}
        </Form.Select>
        {personalErrors.category && (
          <CustomAlert value={personalErrors.category} />
        )}

        <label className="fieldlabels mt-3 fieldlabels fs-6 fw-bold text-dark ">
          Select Sub-Category *
        </label>
        <Form.Select
          name="subcategory"
          value={selectedSubCategory}
          onChange={handleSubCategoryChange}
        >
          <option value="">Select Sub Category</option>
          {FilteredSubcategories?.map((category, index) => (
            <option key={index} value={category.id}>
              {category.name}
            </option>
          ))}
        </Form.Select>
        {personalErrors.subCategory && (
          <CustomAlert value={personalErrors.subCategory} />
        )}

        <label className="fieldlabels fieldlabels mt-3 fs-6 fw-bold text-dark ">
          Select Skill *
        </label>
        <div className="tk-select">
          <span
            className="select2 select2-container select2-container--default "
            dir="ltr"
            data-select2-id="8946"
            style={{ width: "904.4px" }}
          >
            <ExpertSelect2
              options={skillsData}
              // selectedOptions={skillOptions}
              handleSelectedPermission={handleSelectedSkills}
            />
          </span>
        </div>
      </div>
      {/* <Button variant="dark" onClick={handleSubmit}>check</Button> */}
    </fieldset>,
    // Step 2 content
    <fieldset className="step step-2">
      {/* Content for step 2 */}
      <div className="form-card">
        <div className="row">
          <div className="col-7">
            <h2 className="fs-title">Qualifications </h2>
          </div>
          <div className="col-5">
            <h2 className="steps">Step 2 - {totalNumberOfSteps}</h2>
          </div>
          <h5 className="text-center">
            {personalErrors.qualification && (
              <CustomAlert value={personalErrors.qualification} />
            )}
          </h5>
          <div className="col-md-6 col-12">
            <Form.Group>
              <Form.Label className="fieldlabels fieldlabels fs-6 fw-bold text-dark ">
                Title *
              </Form.Label>
              <Form.Control
                as="input"
                name="title"
                placeholder="Title"
                //   value={currentData.title}
                // onChange={handleChange}
              />

              {qerrors.title && <CustomAlert value={qerrors.title} />}
            </Form.Group>
          </div>
          <div className="col-md-6 col-12">
            <Form.Group>
              <Form.Label className="fieldlabels fieldlabels fs-6 fw-bold text-dark ">
                Insitute  *
              </Form.Label>
              <Form.Control
                as="input"
                name="insitute"
                placeholder="School/college/university"
              />
              {qerrors.insitute && <CustomAlert value={qerrors.insitute} />}
            </Form.Group>
          </div>
          <div className="col-md-6 col-12">
            <Form.Group>
              <Form.Label className="fieldlabels mt-3 fieldlabels fs-6 fw-bold text-dark  ">
                Start Date *
              </Form.Label>
              <input
                type="date"
                className="form-control"
                name="start_date"
                placeholder="Start Date"
              />
              {qerrors.start_date && <CustomAlert value={qerrors.start_date} />}
            </Form.Group>
          </div>
          <div className="col-md-6 col-12">
            <Form.Group>
              <Form.Label className="fieldlabels mt-3 fieldlabels fs-6 fw-bold text-dark  ">
                End Date *
              </Form.Label>
              <input
                type="date"
                className="form-control"
                name="end_date"
                placeholder="Start Date"
                // value={currentData.end_date}
                // onChange={handleChange}
              />
              {qerrors.end_date && <CustomAlert value={qerrors.end_date} />}
              {qerrors.date && <CustomAlert value={qerrors.date} />}
            </Form.Group>
          </div>
          <div className="col-12">
            {" "}
            <Form.Group>
              <Form.Label className="fieldlabels mt-3 fieldlabels fs-6 fw-bold text-dark ">
                Qualification Summary *
              </Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                className="mb-3"
                rows={3}
                // value={currentData.title}
                // onChange={handleChange}
              />
              {qerrors.description && (
                <CustomAlert value={qerrors.description} />
              )}
            </Form.Group>

          </div>
          <div className="offset-10 col-2 float-right">
            {/* <button
              className="btn btn-dark float-right w-75  py-2"
              onClick={handleSave}
              style={{ marginLeft: "2.3rem" }}
              id="steps-add-button"
            >
              <span style={{ fontSize: "1.2rem", margin: "0 0.3rem 0 0" }}>
                Add
              </span>
              <SchoolIcon />
            </button> */}
           

            {/* <button
              className="btn btn-dark float-right w-100  "
              onClick={handleQualificationSubmit}
            >
              submit
            </button>  */}
          </div>
          <div className="d-flex justify-content-end">
        {/* <div className="col-2"> */}
        <button
              className="btn btn-dark d-flex"
              onClick={handleSave}
              // style={{ marginRight: "2.3rem" }}
              id="steps-add-button"
            >
                Add
              <SchoolIcon />
            </button>
        {/* </div> */}
        </div>
        </div>
      </div>

      {/* Add other fields for step 2 */}
    </fieldset>,
    // Step 3 content
    <fieldset className="step step-3">
      {/* Content for step 3 */}
      <div className="row">
        <div className="col-7">
          <h2 className="fs-title">Payment Details </h2>
        </div>
        <div className="col-5">
          <h2 className="steps">Step 3 - {totalNumberOfSteps}</h2>
        </div>
      </div>
      <div className="form-card">
        <div className="row">
          <div className="col-12 row" style={{}}>
            <div className="col-md-6 col-12 mt-lg-3 " style={{}}>
              <Form.Group sx={{ height: "100px" }}>
                <Form.Label className="fieldlabels fs-6 fw-bold text-dark ">
                  Bank Username *
                </Form.Label>
                <Form.Control
                  as="input"
                  name="username"
                  placeholder="Bank Username"
                  value={paymentDetails.username}
                  onChange={handlePaymentsInputChange}
                />
                {errors.username && (
                  <p className="text-danger">
                    {convertToTitleCase(errors.username)}
                  </p>
                )}
              </Form.Group>
            </div>

            <div className="col-md-6 col-12 mt-lg-3">
              <Form.Group>
                <Form.Label className="fieldlabels  fs-6 fw-bold text-dark ">
                  Bank Name *
                </Form.Label>
                <Form.Control
                  as="input"
                  name="name"
                  placeholder="Bank Name"
                  value={paymentDetails.name}
                  onChange={handlePaymentsInputChange}
                />
                {errors.name && (
                  <p className="text-danger">
                    {convertToTitleCase(errors.name)}
                  </p>
                )}
              </Form.Group>
            </div>
          </div>
          <div className="  col-12 mt-lg-3 ">
            <Form.Group>
              <Form.Label className="fieldlabels fieldlabels fs-6 fw-bold text-dark ">
                ID Card Number *
              </Form.Label>
              <div className="d-flex" style={{ paddingRight: "1.4rem" }}>
                <select
                  value={SelectedCountryForIdCardNum}
                  style={{ background: "#eee", width: "10.3rem" }}
                  onChange={(e) => {
                    setSelectedCountryForIdCardNum(e.currentTarget.value);
                    setSelectedCountry(e.currentTarget.value);
                  }}
                >
                  <option value={"no-country"}>{"Select Country"}</option>

                  {/* <option value="">Select Country</option> */}
                  {Object.keys(validationWithCountriesForID_Card_number).map(
                    (country) => {
                      return <option value={country}>{country}</option>;
                    }
                  )}
                </select>
                <Form.Control
                  as="input"
                  type="number"
                  name="card_number"
                  value={paymentDetails.card_number}
                  onChange={handlePaymentsInputChange}
                  placeholder="ID Card Number"
                  style={{}}
                />
              </div>
              {errors.card_number && (
                <p className="text-danger">
                  {convertToTitleCase(errors.card_number)}
                </p>
              )}
            </Form.Group>
          </div>

          <div className=" col-12 mt-lg-3 ">
            <Form.Group>
              <Form.Label className="fieldlabels fieldlabels fs-6 fw-bold text-dark ">
                Bank Address *
              </Form.Label>
              <Form.Control
                as="textarea"
                name="address"
                placeholder="Bank Address"
                value={paymentDetails.address}
                onChange={handlePaymentsInputChange}
                // style={{ paddingRight: "1.4rem" }}
                style={{ width: "97.5%" }}
              />
              {errors.address && (
                <p className="text-danger">
                  {convertToTitleCase(errors.address)}
                </p>
              )}
            </Form.Group>
          </div>

          <div className="col-md-12 col-12  mt-lg-3 ">
            <Form.Group>
              <Form.Label className="fieldlabels fieldlabels fs-6 fw-bold text-dark ">
                Bank Account Number *
              </Form.Label>
              <div className="d-flex">
                <select
                  style={{ background: "#eee",width:'10.3rem' }}
                  value={SelectedCountry}
                  onChange={(e) => {
                    setSelectedCountry(e.currentTarget.value);
                    setSelectedCountryForIdCardNum(e.currentTarget.value);
                  }}
                >
                  <option value={"no-country"}>{"Select Country"}</option>
                  {/* <option value="">Select Country</option> */}
                  {Object.keys(validationsWithCountries).map((country) => {
                    return <option value={country}>{country}</option>;
                  })}
                </select>
                <Form.Control
                  as="input"
                  name="account_number"
                  type="number"
                  placeholder="Bank Account Number"
                  value={paymentDetails.account_number}
                  onChange={handlePaymentsInputChange}
                  style={{ marginRight: "1.5rem" }}
                />
              </div>
              {errors.account_number && (
                <p className="text-danger">
                  {convertToTitleCase(errors.account_number)}
                </p>
              )}
            </Form.Group>
          </div>
        </div>
      </div>
      {/* Add other fields for step 3 */}
    </fieldset>,
    // Step 4 content
    <fieldset className="step step-4">
      {/* Content for step 4 */}
      <div className="form-card">
        <div className="row">
          <div className="col-7">
            <h2 className="fs-title">Finish</h2>
          </div>
          <div className="col-5">
            <h2 className="steps">Step 4 - 4</h2>
          </div>
        </div>
        <br />
        <br />
        <h2 className="purple-text text-center">
          <strong>Successfully Completed !</strong>
          {/* <button onClick={handleSubmit}>Submit to check</button> */}
        </h2>
        <br />
        <div className="row justify-content-center" >
          <div className="col-3">
            <img
              src="https://i.imgur.com/GwStPmg.png"
              className="fit-image"
              alt="Success"
            />
          </div>
        </div>
        <br />
        <br />
        <div className="row justify-content-center">
          <div className="col-7 text-center">
            <h5 className="purple-text text-center">
              <p style={{ fontSize: "1.5rem" }}>
                You Have Successfully Completed Your Profile
              </p>

              <Link
                className=""
                style={{
                  marginLeft: "0.8rem",
                  color: "white",
                  background: "#661FB2",
                  // boxShadow: "0 2px 10px 10px solid black",
                  padding: "0.8rem 2rem 0.8rem 2rem",
                  borderRadius: "2rem",
                }}
                // onClick={handleSubmit}
                to={"/profile"}
              >
                Go To Profile
              </Link>
            </h5>
          </div>
        </div>
      </div>
      {/* Add other content for step 4 */}
    </fieldset>,
  ];

  return (
    <>
      {/* Your progress bar */}
      <Header />

      {/* Display current step content */}
      <div className="container-fluid mb-5" ref={formContainerRef}>
        <div className="row justify-content-center">
          <div className="col-11 col-sm-10 col-md-10 col-lg-6 col-xl-9 text-center p-0 mt-3 mb-2">
            <div className="card p-4   mt-3 mb-3">
              <div className="progress mb-2">
                <div
                  className="progress-bar"
                  style={{
                    width: current === 4 ? "100%" : (current - 1) * 25 + "%",
                  }}
                ></div>
              </div>
              <h2 id="heading">Update Profile</h2>
              <p>Fill all form fields to go to the next step</p>
              <div id="msform">
                <ul id="progressbar" className="ps-0">
                  {stepNames.map(({ name, id }, index) => (
                    <li
                      key={index}
                      id={id}
                      className={index < current ? "active" : ""}
                    >
                      <strong
                        style={{
                          fontWeight: "bold",
                          color: "black",
                          fontSize: "1.2rem",
                        }}
                        id="steps-font"
                      >
                        {name}
                      </strong>
                    </li>
                  ))}
                </ul>
                {stepsContent[current - 1]}
                {current < stepsContent.length && (
                  <input
                    type="button"
                    name="next"
                    className="next action-button"
                    value={` ${current === 3 ? "Finish" : "Next"}`}
                    onClick={
                      current === 3
                        ? async (e) => {
                            if (await handleSubmit(e)) {
                              setCurrent(current + 1);
                            }
                          }
                        : handleNextClick
                    }
                  />
                )}

                {current > 1 && current !== 4 && (
                  <input
                    type="button"
                    name="previous"
                    className="previous action-button-previous"
                    value="Previous"
                    onClick={handlePreviousClick}
                  />
                )}
              </div>
            </div>
          </div>
          {current === 3 ? (
            portfolioData &&
            portfolioData.map((item, index) => (
              <div
                className="col-9 border-0 border-none tk-project-wrapper-two tk-find-talent"
                key={index}
              >
                <div className="shadow-none tk-projectlisting border-0 border-none">
                  <div className="tk-price-holder">
                    <div className="tk-project-img">
                      <img src={item.image} alt="" />
                    </div>
                    <div className="tk-verified-info">
                      <a href="#">
                        {item.title}
                        <i className="bi bi-check-circle tk-theme-tooltip tippy"></i>
                      </a>
                      <h5>{item.description.slice(0, 20)}</h5>
                      <ul className="tk-template-view">
                        <a href="{item.url}"> {item.link}</a>
                      </ul>
                    </div>
                    <div className="tk-price">
                      <span onClick={() => handlePortfolioDelete(index)}>
                        <i
                          className="text-dark bi bi-x"
                          style={{ color: "black", fontSize: "20px" }}
                        ></i>
                      </span>
                      <div className="tk-project-option"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div></div>
          )}
          {current === 2 ? (
            dattaa &&
            dattaa.map((item, index) => (
              <div
                className="col-9 border-0 border-none tk-project-wrapper-two tk-find-talent"
                key={index}
              >
                <div className="shadow-none tk-projectlisting border-0 border-none">
                  <div className="tk-price-holder">
                    <div className="tk-verified-info">
                      <a href="#">
                        {item.title}
                        <i className="bi bi-check-circle tk-theme-tooltip tippy"></i>
                      </a>
                      {/* <h5>{item.description.slice(0, 20)}</h5> */}
                      <ul className="tk-template-view">
                        <li>
                          <i className="bi bi-calendar"></i>
                          <span>Start date {item.start_date}</span>
                        </li>
                        <li>
                          <i className="bi bi-calendar"></i>
                          <span>End date {item.end_date}</span>
                        </li>
                        <li>
                          <i className="bi bi-bag"></i>
                          <span>insitute {item.insitute}</span>
                        </li>
                      </ul>
                    </div>
                    <div className="tk-price">
                      <span onClick={() => handleDelete(index)}>
                        <i
                          className="text-dark bi bi-x"
                          style={{ color: "black", fontSize: "20px" }}
                        ></i>
                      </span>
                      <div className="tk-project-option"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div></div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ExpertSteps;