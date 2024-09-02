import TextsmsIcon from "@mui/icons-material/Textsms";
import { Button, Rating } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { baseUrlImage, baseurl } from "../Api/BaseApi";
import ReportDialog from "../Expert/components/ReportDialog";
import Notification from "../Notification/Notification";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ScheduleModal from "../components/Modal";
import Preloader from "../components/Preloader";
import FormDialog from "../components/Reviews";
import { useAppContext } from "../context/AppContext";
import { useFrontEndContext } from "../context/FrontEndContext";
import { useSettingsContext } from "../context/Settings";
// import Button from '@mui/material/Button';
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import toast from "react-hot-toast";
import cover_placeholder from "../assets/images/coverplaceholder.jpg";
import profile_placeholder from "../assets/images/default_image.jpeg";

import { useAppointments } from "../context/AppointmentsContext";
import {
  createInstantAppointment,
  mapToObject,
  updateToCompleteApt,
} from "../utils/helpers";

import axios from "axios";
import socketIO from "../socket/socket";
// import MyTimer from '../myComponents/MyTimer';
// import MyTimer from '../myComponents/MyTimer';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
function ExpertProfile() {
  const {
    ViewProfile,
    singleUser,
    scheduleData,
    ViewExpertSchedule,
    allReviews,
    singleReview,
    slotData,
    loading,
    MODALOPENED, setMODALOPENED
  } = useFrontEndContext();
  const searchParams = mapToObject(
    new URLSearchParams(window?.location.search)
  );

  const [isLoader, setIsLoader] = useState(false);
  const {
    editAuthData,
    setOpenChat,
    openChat,
    onAnswer,
    remoteName,
    onRejectCall,
  } = useAppContext();
  const { handleClickOpenReport } = useSettingsContext();
  const { UserId } = useParams();
  const {
    isCallNotification,
    // openReview,
    // handleCloseReview,
    // handleClickOpen,
    // handleReviewSubmit,
    // handleInputReviewChange,
    // setReviewData,
    // reviewData,
    AUTHUSER,
  } = useAppContext();

  const {
    openReview,
    handleClickOpen,
    handleCloseReview,
    handleInputReviewChange,
    handleReviewSubmit,
    setReviewData,
    reviewData,
  } = useFrontEndContext();
  const { InstantAppointment, setInstantAppointment, IsModalOpen, setIsModalOpen } = useAppointments();

  useEffect(() => {
    ViewProfile(UserId);
    if ("profile" in searchParams) {
      console.log(" successs", searchParams);
      // toast.success("Successfully Appointment Completed");
      // alert("Your Appointment Successfully Completed ");
      handleClickOpen();

      (async () => {
        const res = await updateToCompleteApt(searchParams?.profile);
        console.log("Successfully Completed" + searchParams?.profile, res);
        if (res?.status === 200) {
          alert("Your Appointment Successfully Completed ");
          toast.success("Successfully Appointment Complete");
          handleClickOpen();
        } else {
        }
      })();
    }
    // if (!Array.isArray(reviewData)) {
    //   reviewData = [];
    // }
    // setReviewData([...reviewData, { expert_id: UserId }]);
  }, [UserId]);

  useEffect(() => {
    ViewExpertSchedule(UserId);
  }, [UserId]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [activeLink, setActiveLink] = useState("about");

  // Function to handle link clicks and update the active link
  const handleLinkClick = (id) => {
    setActiveLink(id);
  };
  useEffect(() => {}, [editAuthData]);

  const [IsOpen, setIsOpen] = React.useState(false);
  const handlePayOpen = () => setIsOpen(true);
  const handlePayClose = () => setIsOpen(false);

  const handleChat = () => {
    // setIsModalOpen(true)
    setMODALOPENED(true)
    // M = true;

    if (onlineExpertUser && onlineExpertUser[singleUser?.id]) {
       handlePayOpen();
    } else {
      toast.error("Expert is Not currently Online, Try again later");
    }
  };
  async function handlePaymentCredits() {
    // // - inproduction uncomment
    // handlePayClose();
    // setOpenChat(true);
    // setIsLoader(true);

    // return

    // console.log(singleUser?.id, ' exp')
    // api-call to book appointment and pay
    const res = await createInstantAppointment(singleUser?.id);

    console.log(res, "res");
    const appointmentBooked = res?.status === 200 ? true : false;
    if (appointmentBooked) {
      setInstantAppointment(res?.appointment);
      handlePayClose();
      // setOpenChat(true);

      setIsLoader(true);

      const { data } = await axios.get(baseurl + "/auth-user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const user = data?.user || null;
      socketIO.emit("message", {
        fromId: user.id,
        toId: singleUser?.id,
        text: {
          type: "instant-appointment",
          userId: user?.id,
          name: user?.name || "",
        },
      });

      // socketIO.emit("message", {
      //   fromId: AUTHUSER.user.id,
      //   toId: singleUser?.id,
      //   text: {
      //     type: "instant-appointment",
      //     userId: AUTHUSER?.user?.id,
      //     name: AUTHUSER?.user?.name || "",
      //   },
      // });
    } else {
      toast.error("Payment Failed, Try Again");
    }
  }

  const { onlineExpertUser } = useAppContext();
  //  <Button variant="outlined" onClick={handleClickOpen}>
  //       Open form dialog
  //  </Button>
  // console.log(slotData?.original.availability_data,"/user_schedule")
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <Modal
        open={IsOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Pay: ${singleUser?.hourly_rate}
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2, mb: 3 }}
            onClick={async () => {
              const { data } = await axios.get(baseurl + "/auth-user", {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              });

              // console.log("clicked", {
              //   fromId: user?.id,
              //   toId: singleUser?.id,
              //   text: {
              //     type: "instant-appointment",
              //     userId: user?.id,
              //     name: user?.name || "",
              //   },
              // });

              const user = data?.user || null;
              console.log("socket ", {
                fromId: user.id,
                toId: singleUser?.id,
                text: {
                  type: "instant-appointment",
                  userId: user?.id,
                  name: user?.name || "",
                },
              });
              socketIO.emit("message", {
                fromId: user.id,
                toId: singleUser?.id,
                text: {
                  type: "instant-appointment",
                  userId: user?.id,
                  name: user?.name || "",
                },
              });
            }}
          >
            Are You Sure, You Want Instant Appointment With The Expert
          </Typography>

          <Button
            color="secondary"
            sx={{ mr: 3 }}
            onClick={() => handlePayClose()}
          >
            Close
          </Button>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => handlePaymentCredits()}
          >
            Confirm And Pay
          </Button>
          {/* <Button color="secondary" variant="contained" onClick={() => handlePaymentCredits()}>Chat With Expert</Button> */}
        </Box>
      </Modal>

      {loading ? (
        <Preloader /> // Render the loader when loading is true
      ) : (
        <>
          <div className="tk-banner">
            <figure>
              <img
                src={`${baseUrlImage}` + singleUser?.cover_image}
                alt="image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = cover_placeholder;
                }}
                style={{ height: "16rem" }}
              />
            </figure>
          </div>

          <main className="tk-bgwhite ">
            <section className="tk-profilemain">
              <div className="tk-bgback"></div>
              <div className="tk-newprofilewrap">
                <div className="container">
                  <ScheduleModal
                    open={open}
                    setOpen={setOpen}
                    handleOpen={handleOpen}
                    handleClose={handleClose}
                    availability_data={slotData?.original?.availability_data}
                    UserId={UserId}
                    hourly_rate={singleUser?.hourly_rate}
                    authWallet={editAuthData?.wallet}
                  />

                  <div className="row g-0">
                    <div className="col-lg-4 col-xl-3 tk-hasborder">
                      <aside className="tk-asiderightbar">
                        <div className="tk-sideprofile">
                          {/* <MyTimer /> */}
                          <figure>
                            <img
                              src={`${baseUrlImage}` + singleUser?.image}
                              alt="userImage"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = profile_placeholder;
                              }}
                            />
                            {onlineExpertUser &&
                              onlineExpertUser[singleUser?.id] && (
                                <span
                                  style={{
                                    width: "5px",
                                    height: "5px",
                                    background: "green",
                                    padding: "10px",
                                    position: " absolute",
                                    bottom: "-4px",
                                    right: "17px",
                                    borderRadius: "50%",
                                  }}
                                ></span>
                              )}
                          </figure>
                          <div className="tk-infoprofile">
                            <h4 style={{ textTransform: "capitalize" }}>
                              {singleUser?.name}
                            </h4>
                            <p className="text-center">
                              {singleUser?.categories[0]?.name}
                            </p>
                          </div>
                          <ul className="tk-blogviewdates tk-blogviewdatesmd">
                            <li>
                              <i className="fas fa-star text-warning"></i>
                              {/* <em>0</em> */}
                              {/* <em>/{singleReview}</em> */}
                              <em>4</em>
                            </li>
                            <li>
                              <span>
                                {/* <i className="bi bi-eye text-dark"></i>{" "} */}
                                {/* <em>2 views</em>{" "} */}
                              </span>
                            </li>
                          </ul>
                          <div className="tk-shareprolink">
                            <a
                              className="tk-heart tk-call tk-btn-solid-sm "
                              onClick={handleOpen}
                            >
                              <i className="bi bi-telephone text-white"></i>
                              <em className="text-white">Book Now</em>
                            </a>
                          </div>
                          <div className="tk-shareprolink">
                            <Link
                              className="tk-heart tk-call tk-btn-solid-sm "
                              onClick={handleChat}
                            >
                              <TextsmsIcon
                                style={{
                                  color: "white",
                                  marginRight: "0.4rem",
                                }}
                              />
                              <em className="text-white">Chat Now</em>
                            </Link>
                          </div>

                          <div className="tk-shareprolink">
                            <a
                              className="tk-heart tk-call tk-btn-solid-sm bg-danger"
                              onClick={handleClickOpenReport}
                            >
                              <i className="bi bi-exclamation-diamond text-white"></i>
                              <em className="text-white">Report profile</em>
                            </a>
                          </div>
                        </div>
                        <ReportDialog ExpertId={UserId} userId={AUTHUSER?.id} />
                        <FormDialog
                          openReview={openReview}
                          handleCloseReview={handleCloseReview}
                          handleInputReviewChange={handleInputReviewChange}
                          reviewData={reviewData}
                          setReviewData={setReviewData}
                          handleReviewSubmit={handleReviewSubmit}
                          expertId={UserId}
                          bookingId={0}
                        />
                        <ul className="tk-project-detail-list tk-sidedetailist">
                          <li>
                            <div className="tk-project-detail-item">
                              <div className="tk-project-image">
                                <i className="bi bi-currency-dollar"></i>
                              </div>
                              <div className="tk-project-imgdetail">
                                <span>Hourly charges:</span>
                                <h6>${singleUser?.hourly_rate}</h6>
                              </div>
                            </div>
                          </li>
                          {/* <li>
                            <div className="tk-project-detail-item">
                              <div className="tk-project-image">
                                <i className="bi bi-currency-dollar"></i>
                              </div>
                              <div className="tk-project-imgdetail">
                                <span>Group Session charges:</span>
                                <h6>${"00"}</h6>
                              </div>
                            </div>
                          </li> */}
                               <li>
                        <div className="tk-project-detail-item">
                          <div className="tk-project-image">
                            <i className="bi bi-calendar"></i>
                          </div>
                          <div className="tk-project-imgdetail">
                            <div className="tk-languagelist">
                              <ul className="tk-languages">
                            <span>Languages:</span>
                                {singleUser?.languages?.map((language, index) => (
                                  <li style={{ cursor: "default" }} key={index}>
                                    {language.name}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </li>
                        </ul>
                        <div className="tk-asideadvertisment  pt-5">
                          {singleUser?.linkedin && singleUser?.linkedin && (
                            <a
                              href={singleUser?.linkedin}
                              className="icon-button twitter"
                            >
                              <i className="bi bi-linkedin"></i>
                              <span></span>
                            </a>
                          )}
                          {singleUser?.facebook && singleUser?.facebook && (
                            <a
                              href={singleUser?.facebook}
                              className="icon-button facebook"
                            >
                              <i className="bi bi-facebook"></i>
                              <span></span>
                            </a>
                          )}

                          {singleUser?.twitter && singleUser?.twitter && (
                            <a
                              href={singleUser?.twitter}
                              className="icon-button facebook"
                            >
                              <i className="bi bi-twitter"></i>
                              <span></span>
                            </a>
                          )}

                          {/* {singleUser?.google && singleUser?.google && (
                        <a
                          href={singleUser?.google}
                          className="icon-button google-plus"
                        >
                          <i className="bi bi-google"></i>
                          <span></span>
                        </a>
                      )} */}

                          {singleUser?.reddit && singleUser?.reddit && (
                            <a
                              href={singleUser?.reddit}
                              className="icon-button google-plus"
                            >
                              <i className="bi bi-reddit"></i>
                              <span></span>
                            </a>
                          )}
                          {singleUser?.instagram && singleUser?.instagram && (
                            <a
                              href={singleUser?.instagram}
                              className="icon-button google-plus"
                            >
                              <i className="bi bi-instagram"></i>
                              <span></span>
                            </a>
                          )}
                          {singleUser?.pinterest && singleUser?.pinterest && (
                            <a
                              href={singleUser?.pinterest}
                              className="icon-button pinterest"
                            >
                              <i className="bi bi-pinterest"></i>
                              <span></span>
                            </a>
                          )}

                          {/* {singleUser?.apple && singleUser?.apple && (
                        <a
                          href={singleUser?.apple}
                          className="icon-button bg-dark text-white"
                        >
                          <i className="bi bi-apple"></i>
                          <span></span>
                        </a>
                      )} */}
                        </div>
                      </aside>
                    </div>
                    <div className="col-lg-8 col-xl-9">
                      <div className="tk-pofilelinks">
                        <ul id="list-example" className="tk-linklist">
                          <li>
                            <a
                              href="#about"
                              className={activeLink === "about" ? "active" : ""}
                              onClick={() => handleLinkClick("about")}
                            >
                              About
                            </a>
                          </li>
                          <li>
                            <a
                              href="#skills"
                              className={
                                activeLink === "skills" ? "active" : ""
                              }
                              onClick={() => handleLinkClick("skills")}
                            >
                              Skills
                            </a>
                          </li>
                          <li>
                            <a
                              href="#portfolio"
                              className={
                                activeLink === "portfolio" ? "active" : ""
                              }
                              onClick={() => handleLinkClick("portfolio")}
                            >
                              Portfolio
                            </a>
                          </li>
                          <li>
                            <a
                              href="#qualification"
                              className={
                                activeLink === "qualification" ? "active" : ""
                              }
                              onClick={() => handleLinkClick("qualification")}
                            >
                              Qualification
                            </a>
                          </li>
                          <li>
                            <a
                              href="#reviews"
                              className={
                                activeLink === "reviews" ? "active" : ""
                              }
                              onClick={() => handleLinkClick("reviews")}
                            >
                              Reviews
                            </a>
                          </li>
                        </ul>
                        <div id="about" className="tk-profilebox">
                          <div className="tk-project-holder">
                            <div className="tk-project-title">
                              <h4>About</h4>
                            </div>
                            <div className="tk-jobdescription">
                              <p>
                                {singleUser?.bio}
                                <br />
                              </p>
                            </div>
                          </div>
                        </div>
                        <div id="skills" className="tk-profilebox">
                          <div className="tk-content-box">
                            <h4>Skills</h4>
                            <ul className="tk-skills-tags tk-skills-tagsvtwo">
                              {singleUser?.skills?.map((skill, index) => (
                                <li style={{ cursor: "default" }} key={index}>
                                  <a href="#">{skill.name}</a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div id="portfolio" className="tk-profilebox">
                          <div className="tk-content-box">
                            <h4>Portfolio</h4>
                          </div>
                          <div className="row">
                            {singleUser && singleUser?.portfolio?.length > 0 ? (
                              singleUser?.portfolio
                                ?.slice(0, 3)
                                .map((item, index) => (
                                  <div className="col-6 col-lg-4" key={index}>
                                    <div
                                      className="swiper-slide swiper-slide-active"
                                      role="group"
                                      aria-label="1 / 3"
                                    >
                                      <div className="tk-potfolioitem">
                                        <figure>
                                          <img
                                            src={baseUrlImage + item.image}
                                            alt="Learn all about podcast from this politician."
                                          />
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
                                      </div>{" "}
                                    </div>
                                  </div>
                                ))
                            ) : (
                              <div>Not found</div>
                            )}
                            {/* <div className="col-6 col-lg-4">
                          <div
                            className="swiper-slide swiper-slide-active"
                            role="group"
                            aria-label="1 / 3"
                          >
                            <div className="tk-potfolioitem">
                              <figure>
                                <img
                                  src="https://taskup.wp-guppy.com/storage/portfolios/item-1-32.jpg"
                                  alt="Learn all about podcast from this politician."
                                />
                              </figure>
                              <div className="tk-portinfo">
                                <a
                                  target="_blank"
                                  href="https://stackoverflow.com"
                                >
                                  https://stackoverflow.com
                                </a>
                                <h6>Pretry Glory</h6>
                                <p>
                                Dive into the heart of my portfolio, where I present a curated selection of impactful projects I've spearheaded. Each project encapsulates my commitment to solving complex problems and delivering innovative solutions. From system architecture design to successful implementation, these projects showcase the breadth and depth of my skills.
                                </p>
                              </div>
                            </div>{" "}
                          </div>
                        </div> */}
                          </div>
                        </div>

                        <div id="qualification" className="tk-profilebox">
                          <div className="tk-content-box">
                            <h4>Qualification</h4>
                          </div>
                          <div className="tk-acordian-wrapper">
                            <ul
                              id="tk-accordion"
                              className="tk-qualification tk-qualificationvtwo"
                            >
                              {singleUser &&
                              singleUser?.qualifications?.length > 0 ? (
                                singleUser?.qualifications
                                  ?.slice(0, 3)
                                  .map((item, index) => (
                                    <li
                                      key={
                                        index +
                                        Math.floor(
                                          Math.random() * (100 - 8 + 1)
                                        ) +
                                        8
                                      }
                                    >
                                      <div
                                              className="tk-accordion_title "
                                              data-bs-toggle="collapse"
                                              role="button"
                                              data-bs-target={`#education-${index}`}
                                              aria-expanded="true"
                                      >
                                        <div className="tk-qualification-title">
                                          <h5>{item.title}</h5>
                                          <ul className="tk-qualifinfo">
                                            <li>
                                              <span>
                                                <i className="bi bi-house"></i>{" "}
                                                {item.insitute ? item.insitute : ""}
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
                                      </div>
                                    </li>
                                  ))
                              ) : (
                                <div>Not found</div>
                              )}
                            </ul>
                          </div>
                        </div>

                        <div id="reviews" className="tk-profilebox">
                          <div className="tk-content-box tk-review-box">
                            <div className="row">
                              <div className="col-md-10 col-8">
                                <h4>
                                  Reviews
                                  <i className="fas fa-star text-warning"></i>
                                  <em>({allReviews.length} reviews)</em>
                                </h4>
                              </div>
                              <div className="col-md-2 col-2">
                                <Button
                                  variant="outlined"
                                  color="secondary"
                                  onClick={handleClickOpen}
                                >
                                  Review
                                </Button>
                              </div>
                            </div>

                            {allReviews.length > 0
                              ? allReviews.map((data, i) => (
                                  <div
                                    className="tk-acordian-wrapper mt-4"
                                    key={i}
                                  >
                                    <ul
                                      id="tk-accordion"
                                      className="tk-qualification tk-qualificationvtwo"
                                    >
                                      <li>
                                        <div
                                          className="tk-accordion_title "
                                          data-bs-toggle="collapse"
                                          role="button"
                                          data-bs-target={`#education-${i}`}
                                          aria-expanded="true"
                                        >
                                          <div className="tk-qualification-title">
                                            <h5>{data.user_name}</h5>

                                            <ul
                                              className="tk-qualifinfo"
                                              style={{
                                                fontSize: "inherit",
                                                color: "#ffc107",
                                              }}
                                            >
                                              <li style={{ color: "#ffc107" }}>
                                                <Rating
                                                  name="read-only"
                                                  sx={{ color: "#ffc107" }}
                                                  value={data?.rating}
                                                  readOnly
                                                />
                                              </li>

                                              <li>
                                                {/* <span>
                                      <i className="bi bi-calendar"></i>
                                      May 03, 2003&nbsp;&nbsp;- &nbsp;&nbsp;May
                                      03, 2005
                                    </span> */}
                                              </li>
                                            </ul>
                                          </div>
                                          <i className="bi bi-plus"></i>
                                        </div>
                                        <div
                                          className="collapse show"
                                          id={`education-${i}`}
                                          data-bs-parent="#tk-accordion"
                                        >
                                          <div className="tk-accordion_info">
                                            <p>{data.review}</p>
                                          </div>
                                        </div>
                                      </li>{" "}
                                    </ul>
                                  </div>
                                ))
                              : "No Data Found"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </>
      )}

      <Footer />

      {isCallNotification && (
        <Notification
          onAnswer={onAnswer}
          title={remoteName}
          isShow={isCallNotification}
          onDismiss={onRejectCall}
        />
      )}
    </div>
  );
}

export default ExpertProfile;