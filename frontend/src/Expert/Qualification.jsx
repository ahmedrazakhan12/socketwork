import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useAppContext } from "../context/AppContext";
import { useConfirmationDialog } from "../context/ConfirmationDialogContext";
import { useSettingsContext } from "../context/Settings";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

function QualificationSettings() {
  const [anchorEl, setAnchorEl] = useState(null);
  const nav = useNavigate();
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const {
    handleCloseQualification,
    handleInputChangeQualification,
    qualificationData,
    handleSubmitQ,
    showModalQualification,
    setShowModalQualification,
    settingsdata,
    handleSubmitQUpdate,
    handleCloseQualificationUpdate,
    showModalQualificationUpdate,
    fetchQualificationData,
    handleQualificationDelete,
  } = useSettingsContext();
  const { qualificationsData } = useAppContext();

  const showConfirmationDialog = useConfirmationDialog();
  const handleDeleteClick = (id) => {
    showConfirmationDialog(async () => {
      await handleQualificationDelete(`delete-qualification/${id}`);
    });
  };
  useEffect(() => {
    if (showModalQualificationUpdate) {
      setAnchorEl(null);
    }
  }, [showModalQualificationUpdate]);
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
                  <div className="tb-tabtasktitle tb-tabtasktitletwo d-flex justify-content-between ">
                    {/* <div className="d-flex align-items-center gap-2">
                      <ArrowBackIosIcon
                        onClick={() => {
                          nav(-1);
                        }}
                        style={{ cursor: "pointer" }}
                      />
                    </div> */}
                    <div className="tb-dhb-mainheading d-flex justify-content-start gap-2">
                        <ArrowBackIosIcon
                          onClick={() => {
                            nav(-1);
                          }}
                          style={{ cursor: "pointer" }}
                        />
                      <h2>Qualification</h2>


                      </div>
                    <a
                      onClick={() => setShowModalQualification(true)}a
                      data-type="add"
                      className="tk-btn-solid-lg text-white"
                    >
                      Add new
                    </a>
                  </div>
                  <div id="qualification" className="tk-profilebox">
                    <div className="tk-acordian-wrapper">
                      <ul
                        id="tk-accordion"
                        className="tk-qualification tk-qualificationvtwo"
                      >
                        {qualificationsData &&
                        qualificationsData?.length > 0 ? (
                          qualificationsData?.map((item, index) => (
                            <li key={index}>
                              <div
                                className="tk-accordion_title "
                                data-bs-toggle="collapses"
                                role="button"
                                data-bs-target={`#education-${index}`}
                                aria-expanded="true"
                                style={{ position: "relative" }}
                              >
                                <div
                                  style={{
                                    position: "absolute",
                                    top: "20px",
                                    right: "10px",
                                  }}
                                >
                                  <IconButton
                                    onClick={() => handleDeleteClick(item.id)}
                                    className="m-1"
                                    style={{ backgroundColor: "white" }}
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                  <IconButton
                                    onClick={() =>
                                      fetchQualificationData(item.id)
                                    }
                                    className="m-1"
                                    style={{ backgroundColor: "white" }}
                                  >
                                    <CreateIcon />
                                  </IconButton>
                                </div>
                                <div className="tk-qualification-title">
                                  <h5>{item.title}</h5>
                                  <ul className="tk-qualifinfo">
                                    <li>
                                      <span>
                                        <i className="bi bi-house"></i>{" "}
                                        {item.insitute}
                                      </span>
                                    </li>
                                    <li>
                                      <span>
                                        <i className="bi bi-calendar"></i>
                                        {item.start_date}&nbsp;&nbsp;-
                                        &nbsp;&nbsp;{item.end_date}
                                      </span>
                                    </li>
                                  </ul>
                                </div>
                                <i className="bi bi-plus"></i>
                              </div>
                              <div
                                className="collapse show"
                                id={`education-${index}`}
                                data-bs-parent="#tk-accordion"
                              >
                                <div className="tk-accordion_info">
                                  <p>{item.description}</p>
                                </div>
                                {/* <button onClick={()=>fetchQualificationData(item.id)}>Update Qualification</button> */}
                                {/* <button onClick={()=>handleDeleteClick(item.id)}>Delete Qualification</button> */}
                              </div>
                            </li>
                          ))
                        ) : (
                          <div>not found</div>
                        )}
                      </ul>
                    </div>
                  </div>
                  {/* <div className="tk-submitreview">
                    <figure>
                      <img
                        src="https://taskup.wp-guppy.com/images/empty.png"
                        alt="Oh, snap! there is no content to show this time"
                      />
                    </figure>
                    <h4>Oh, snap! there is no content to show this time</h4>
                  </div> */}
                </div>

                <Modal
                  show={showModalQualification}
                  onHide={handleCloseQualification}
                  animation={true}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Add qualification</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <form className="tk-themeform" id="tb_update_education">
                      <fieldset>
                        <div className="form-group">
                          <label className="tk-label tk-required">Title</label>
                          <input
                            type="text"
                            name="title"
                            className="form-control"
                            placeholder="Enter title"
                            autoComplete="off"
                            onChange={handleInputChangeQualification}
                            value={qualificationData.title}
                          />
                        </div>
                        <div className="form-group">
                          <label className="tk-label tk-required">
                            Institute
                          </label>
                          <input
                            type="text"
                            name="insitute"
                            className="form-control"
                            placeholder="Enter Institute"
                            autoComplete="off"
                            onChange={handleInputChangeQualification}
                            value={qualificationData.insitute}
                          />
                        </div>
                        <div className="form-group">
                          <label className="tk-label">
                            Qualification Description
                          </label>
                          <textarea
                            name="description"
                            className="form-control"
                            placeholder="Enter qualification description"
                            onChange={handleInputChangeQualification}
                            value={qualificationData.description}
                          ></textarea>
                        </div>
                        <div className="form-group-wrap ">
                          <div className="form-group form-group-half">
                            <div className="">
                              <label className="tk-label mb-0">
                                Start date
                              </label>
                              <input
                                id="edu_start_date_"
                                name="start_date"
                                type="date"
                                className="form-control  "
                                placeholder="Date from"
                                onChange={handleInputChangeQualification}
                                value={qualificationData.start_date}
                              />
                            </div>
                          </div>
                          <div className="form-group form-group-half">
                            <div className="">
                              <label className="tk-label mb-0">End date</label>
                              <input
                                id="edu_end_date_"
                                name="end_date"
                                type="date"
                                className="form-control"
                                placeholder="Date to"
                                onChange={handleInputChangeQualification}
                                value={qualificationData.end_date}
                              />
                            </div>
                          </div>
                          {/* <div className="form-group mt-lg-2">
                            <div className="tk-form-checkbox">
                              <input
                                id="education_is_going"
                                name="education_is_going"
                                type="checkbox"
                                className="form-check-input"
                                placeholder="profile_settings.isgoing"
                              />
                              <label
                                for="education_is_going"
                                className="form-check-label"
                              >
                                <span>
                                  This degree/course is currently ongoing
                                </span>
                              </label>
                            </div>
                          </div> */}
                        </div>
                        {/* <DatePickerValue /> */}
                        <div className="form-group ">
                          <div className="form-group">
                            <div className="tk-savebtn text-white">
                              <Button
                                onClick={handleSubmitQ}
                                className="tb-btn text-white"
                              >
                                Save &amp; Update
                              </Button>
                            </div>
                          </div>
                        </div>
                      </fieldset>
                    </form>
                  </Modal.Body>
                </Modal>

                <Modal
                  show={showModalQualificationUpdate}
                  onHide={handleCloseQualificationUpdate}
                  animation={true}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Update qualification</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <form className="tk-themeform" id="tb_update_education">
                      <fieldset>
                        <div className="form-group">
                          <label className="tk-label tk-required">Title</label>
                          <input
                            type="text"
                            name="title"
                            className="form-control"
                            placeholder="Enter title"
                            autoComplete="off"
                            onChange={handleInputChangeQualification}
                            value={qualificationData.title}
                          />
                        </div>
                        <div className="form-group">
                          <label className="tk-label tk-required">
                            Institute
                          </label>
                          <input
                            type="text"
                            name="insitute"
                            className="form-control"
                            placeholder="Enter title"
                            autoComplete="off"
                            onChange={handleInputChangeQualification}
                            value={qualificationData.insitute}
                          />
                        </div>
                        <div className="form-group">
                          <label className="tk-label">
                            Qualification Description
                          </label>
                          <textarea
                            name="description"
                            className="form-control"
                            placeholder="Enter qualification description"
                            onChange={handleInputChangeQualification}
                            value={qualificationData.description}
                          ></textarea>
                        </div>
                        <div className="form-group-wrap ">
                          <div className="form-group form-group-half">
                            <div className="">
                              <label className="tk-label mb-0">
                                Start date
                              </label>
                              <input
                                id="edu_start_date_"
                                name="start_date"
                                type="date"
                                className="form-control  "
                                placeholder="Date from"
                                onChange={handleInputChangeQualification}
                                value={qualificationData.start_date}
                              />
                            </div>
                          </div>
                          <div className="form-group form-group-half">
                            <div className="">
                              <label className="tk-label mb-0">End date</label>
                              <input
                                id="edu_end_date_"
                                name="end_date"
                                type="date"
                                className="form-control"
                                placeholder="Date to"
                                onChange={handleInputChangeQualification}
                                value={qualificationData.end_date}
                              />
                            </div>
                          </div>
                          {/* <div className="form-group mt-lg-2">
                            <div className="tk-form-checkbox">
                              <input
                                id="education_is_going"
                                name="education_is_going"
                                type="checkbox"
                                className="form-check-input"
                                placeholder="profile_settings.isgoing"
                              />
                              <label
                                for="education_is_going"
                                className="form-check-label"
                              >
                                <span>
                                  This degree/course is currently ongoing
                                </span>
                              </label>
                            </div>
                          </div> */}
                        </div>
                        {/* <DatePickerValue /> */}
                        <div className="form-group ">
                          <div className="form-group">
                            <div className="tk-savebtn text-white">
                              <Button
                                className="tb-btn text-white"
                                onClick={async () =>
                                  await handleSubmitQUpdate(
                                    `update-qualification/`
                                  )
                                }
                              >
                                Save &amp; Update
                              </Button>
                            </div>
                          </div>
                        </div>
                      </fieldset>
                    </form>
                  </Modal.Body>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default QualificationSettings;
