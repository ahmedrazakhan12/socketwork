/* eslint-disable jsx-a11y/anchor-is-valid */
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { baseUrlImage } from "../Api/BaseApi";
import Footer from "../components/Footer";
import { useAppContext } from "../context/AppContext";
import { useConfirmationDialog } from "../context/ConfirmationDialogContext";
import { useSettingsContext } from "../context/Settings";

import { useNavigate } from "react-router-dom";
import Header from "./components/Header";
import PortfolioUpdateModal from "./components/PortfolioModalUpdate";
import Sidebar from "./components/Sidebar";
function PortfolioSettings() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const {
    handleDropPortfolio,
    handleDragOverPortfolio,
    handleInputChangePortfolio,
    selectedFilesPortfolio,
    handleSubmitP,
    handleClosePortfolio,
    handleClosePortfolioUpdate,
    showModalPortfolio,
    setShowModalPortfolio,
    portfolioData,
    fileValue,
    handleUpdatePortfolio,
    showModalPortfolioUpdate,
    fetchPortfolioData,
    handlePortfolioDelete,
  } = useSettingsContext();
  const { portfoliosData } = useAppContext();

  const showConfirmationDialog = useConfirmationDialog();
  const handleDeleteClick = (id) => {
    showConfirmationDialog(async () => {
      await handlePortfolioDelete(`delete-portfolio/${id}`);
    });
  };

  const nav = useNavigate();
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
                <div className="tk-project-wrapper ">
                  <div className="tb-tabtasktitle tb-tabtasktitletwo d-flex justify-content-between">
                    {/* <div className="d-flex justify-content-between align-items-center">
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
                                             <h2>Portfolio Settings</h2>

                      </div>
                    <a
                      onClick={() => setShowModalPortfolio(true)}
                      data-type="add"
                      className="tk-btn-solid-lg text-white"
                    >
                      {" "}
                      Add new{" "}
                    </a>
                  </div>

                  <div id="portfolio" className="tk-profilebox">
                    <div className="row">
                      {portfoliosData && portfoliosData.length > 0 ? (
                        portfoliosData.map((item, index) => (
                          <div className="col-6 col-lg-4" key={index}>
                            <div
                              className="swiper-slide swiper-slide-active"
                              role="group"
                              aria-label="1 / 3"
                            >
                              <div
                                className="tk-potfolioitem"
                                style={{ position: "relative" }}
                              >
                                <figure>
                                  <img
                                    src={baseUrlImage + item.image}
                                    alt="Learn all about podcast from this politician."
                                  />
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
                                        fetchPortfolioData(item.id)
                                      }
                                      className="m-1"
                                      style={{ backgroundColor: "white" }}
                                    >
                                      <CreateIcon />
                                    </IconButton>
                                  </div>
                                </figure>
                                <div className="tk-portinfo">
                                  <a
                                    target="_blank"
                                    href={item.link}
                                    rel="noreferrer"
                                  >
                                    {item.link}
                                  </a>
                                  <h6>{item.title}</h6>
                                  <p>{item.description}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div>Not found</div>
                      )}
                      <PortfolioUpdateModal
                        showModalPortfolio={showModalPortfolioUpdate}
                        handleClosePortfolio={handleClosePortfolioUpdate}
                        handleInputChangePortfolio={handleInputChangePortfolio}
                        handleDropPortfolio={handleDropPortfolio}
                        handleDragOverPortfolio={handleDragOverPortfolio}
                        fileValue={fileValue}
                        portfolioData={portfolioData}
                        selectedFilesPortfolio={selectedFilesPortfolio}
                        handleUpdatePortfolio={handleUpdatePortfolio}
                      />
                      <div className="col-6 col-lg-4">
                        <div
                          className="swiper-slide"
                          role="group"
                          aria-label="3 / 3"
                        ></div>
                      </div>
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
                  show={showModalPortfolio}
                  onHide={handleClosePortfolio}
                  animation={true}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Add portfolio</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="tk-themeform">
                      <fieldset>
                        <div className="form-group">
                          <label className="tk-label tk-required">Title</label>
                          <input
                            type="text"
                            name="title"
                            className="form-control"
                            placeholder="Enter title"
                            autoComplete="off"
                            onChange={handleInputChangePortfolio}
                            value={portfolioData.title}
                          />
                        </div>
                        <div className="form-group">
                          <label className="tk-label tk-required">
                            Portfolio URL
                          </label>
                          <input
                            type="text"
                            name="link"
                            className="form-control"
                            placeholder="Enter portfolio URL"
                            autoComplete="off"
                            onChange={handleInputChangePortfolio}
                            value={portfolioData.link}
                          />
                        </div>

                        <div className="form-group">
                          <label className="tk-label">
                            Portfolio description
                          </label>
                          <textarea
                            className="form-control"
                            onChange={handleInputChangePortfolio}
                            value={portfolioData.description}
                            name="description"
                            placeholder="Enter portfolio description"
                          ></textarea>
                        </div>

                        <div className="form-group">
                          <div className="tk-draganddropwrap form-group">
                            <div
                              className="tk-draganddrop"
                              onDrop={handleDropPortfolio}
                              onDragOver={handleDragOverPortfolio}
                            >
                              <svg>
                                <rect width="100%" height="100%"></rect>
                              </svg>
                              <input
                                className="tk-drag-imagearea"
                                type="file"
                                id="at_upload_files"
                                accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.csv,.jpg,.jpeg,.gif,.png,.mp4,.mp3,.3gp,.flv,.ogg,.wmv,.avi,.txt"
                                multiple=""
                                onChange={fileValue}
                              />
                              <div className="tk-dragfile">
                                <div className="tk-fileareaitem">
                                  {selectedFilesPortfolio.length > 0 ? (
                                    // Render previews for selected files
                                    selectedFilesPortfolio.map(
                                      (file, index) => (
                                        <div
                                          key={index}
                                          className="file-preview"
                                        >
                                          <img
                                            src={URL.createObjectURL(file)}
                                            alt={file.name}
                                            className="preview-image"
                                          />
                                          <span className="file-name">
                                            {file.name}
                                          </span>
                                        </div>
                                      )
                                    )
                                  ) : (
                                    // Show this when no files are selected
                                    <img
                                      src="https://taskup.wp-guppy.com/images/image-uploader.jpg"
                                      alt=""
                                    />
                                  )}
                                </div>
                                <div className="tk-filearea">
                                  <div className="text-center d-none">
                                    <span className="fw-normal">
                                      Uploading...
                                    </span>
                                  </div>
                                  <div className="text-center tk-text-flex">
                                    <span>Drop your files here to upload</span>
                                    <label
                                      className="tk-drag-label"
                                      htmlFor="at_upload_files"
                                    >
                                      <em>Click here</em>
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="form-group">
                            <div className="tk-savebtn text-white">
                              <Button
                                className="tb-btn text-white"
                                onClick={handleSubmitP}
                              >
                                Save &amp; Update
                              </Button>
                            </div>
                          </div>
                        </div>
                      </fieldset>
                    </div>
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

export default PortfolioSettings;
