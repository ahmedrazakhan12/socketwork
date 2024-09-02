import { Rating } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { baseUrlImage } from "../Api/BaseApi";
import cover_placeholder from "../assets/images/coverplaceholder.jpg";
import profile_placeholder from "../assets/images/default_image.jpeg";
import Footer from "../components/Footer";
import { useAppContext } from "../context/AppContext";
import { useFrontEndContext } from "../context/FrontEndContext";
import Header from "./components/Header";
function Profile() {
  const { AUTHUSER, portfoliosData, qualificationsData, allReviews } =
    useAppContext();
    const { featuredExperts,websiteData } = useFrontEndContext();

  const [activeLink, setActiveLink] = useState("about");
  const handleLinkClick = (id) => {
    setActiveLink(id);
  };
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    const referralCode = AUTHUSER?.referral_code;
    navigator.clipboard.writeText(referralCode);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };
  const copyLinkToClipboard = () => {
    const referralCode = `${window.origin}/sign-up?ref=${AUTHUSER?.referral_code}`;
    navigator.clipboard.writeText(referralCode);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };
  const copyProfileLinkToClipboard = () => {
    const profile_url = `${window.origin}/profile/${AUTHUSER.profile_url}`;
    navigator.clipboard.writeText(profile_url);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };
  const handleCloseSnackbar = () => {
    setIsCopied(false);
  };

  const handleOpenDialog = () => {
    // Call openDialog method using the ref
    setFundOpen(true);
  };
  const handleCloseModal = () => {
    // Call openDialog method using the ref
    setFundOpen(false);
  };
  const [openFund, setFundOpen] = React.useState(false);
 
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="tk-banner">
        <figure>
          <img
            src={`${baseUrlImage}` + AUTHUSER?.cover_image}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = cover_placeholder;
            }}
            alt="image"
          />
        </figure>
      </div>
      <main className="tk-bgwhite ">
        <section className="tk-profilemain">
          <div className="tk-bgback position-stati"></div>
          <div className="tk-newprofilewrap">
            <div className="container">
              <div className="row g-0">
                <div className="col-lg-4 col-xl-3 tk-hasborder">
                  <aside className="tk-asiderightbar">
                    <div className="tk-sideprofile">
                      <figure>
                        <img
                          src={`${baseUrlImage}${AUTHUSER?.image}`}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = profile_placeholder;
                          }}
                          alt={AUTHUSER.name}
                        />
                      </figure>
                      <div className="tk-infoprofile">
                        <h4 style={{ textTransform: "capitalize" }}>
                          {AUTHUSER?.name}
                        </h4>
                      </div>
                      <Modal
      show={openFund}
      onHide={handleCloseModal}
      animation={true}
      centered
    >
   
      <Modal.Body>
          <fieldset>
          <Modal.Header style={{border:'0px'}}>
        {/* <Modal.Title>You can copy your referral code</Modal.Title> */}
        <h4 className="">You can copy your referral code</h4>
      </Modal.Header>
          <div className="container mt-2">
                            <div className="row">
                              <div className="col-lg-5 col-12">
                                <h4 className="mt-3">Referral code</h4>
                              </div>
                              <div className="col-lg-7 col-12">
                                <div className="tk-project-detail-item">
                                  <div className="container">
                                    <div
                                      className="tk-project-imgdetail"
                                      style={{ cursor: "pointer" }}
                                      onClick={copyToClipboard}
                                    >
                                      <div className="copy-text">
                                        <input
                                          type="text"
                                          className="text"
                                          value={AUTHUSER?.referral_code}
                                        />
                                        <button
                                          // onClick={handleOpenDialog}
                                          className="ms-lg-2 ms-5"
                                        >
                                          <i className="fa fa-clone"></i>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-5 col-12 mt-3">
                                <h4 className="mt-3">Referral Link</h4>
                              </div>
                              <div className="col-lg-7 col-12 mt-3">
                                <div className="tk-project-detail-item">
                                  <div className="container">
                                    <div
                                      className="tk-project-imgdetail"
                                      style={{ cursor: "pointer" }}
                                      onClick={copyLinkToClipboard}
                                    >
                                      <div className="copy-text">
                                        <input
                                          type="text"
                                          className="text"
                                          value={`${window.origin}/sign-up?ref=${AUTHUSER?.referral_code}`}
                                        />
                                        <button
                                          // onClick={handleOpenDialog}
                                          className="ms-lg-2 ms-5"
                                        >
                                          <i className="fa fa-clone"></i>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
          </fieldset>
      </Modal.Body>
    </Modal>
                      {/* {AUTHUSER.user_type === 'expert' ? (
                        featuredExperts && featuredExperts.length > 0 ? (
                          featuredExperts.map((data, d) => (
                            data?.average_rating ? ( 
                              <>

                                <div className="tk-content-box tk-review-box">
                                  <em>
                                    <i className="fas fa-star text-warning"></i>
                                    <span>{Math.round(data?.average_rating * 100) / 100}</span>/5
                                  </em>
                                </div>
                              </>
                            ) : ''
                          ))
                        ) : ''
                      ) : ''} */}
                    </div>
                    <ul className="tk-project-detail-list tk-sidedetailist">
                    {websiteData.isReferral_Module=="true"?<li>
                        {AUTHUSER?.referral_code &&
                        AUTHUSER?.referral_code.length > 0 ? (
                          <div className="container">
                            <div
                              className="tk-project-imgdetail "
                              style={{ cursor: "pointer" }}
                              // onClick={copyToClipboard}
                            >
                              <span className="mt-2 mb-1 m-1">
                                Referral Code:
                              </span>
                              <div
                                class="copy-text"
                                style={{ right: "5px", width: "250px" }}
                              >
                                <input
                                  type="text"
                                  class="text"
                                  value={AUTHUSER?.referral_code}
                                />
                                <button
                                  style={{
                                    position: "relative",
                                    right: "35px",
                                  }}
                                  onClick={handleOpenDialog}
                                >
                                  <i class="fa fa-clone"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                        <Snackbar
                          open={isCopied}
                          autoHideDuration={2000}
                          onClose={handleCloseSnackbar}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                          }}
                        >
                          <MuiAlert
                            elevation={6}
                            variant="filled"
                            severity="success"
                          >
                            Copied!
                          </MuiAlert>
                        </Snackbar>
                      </li>:''}
                      <li>
                        {AUTHUSER?.profile_url &&
                        AUTHUSER?.profile_url.length > 0 ? (
                          <div className="container">
                            <div
                              className="tk-project-imgdetail "
                              style={{ cursor: "pointer" }}
                              // onClick={copyProfileLinkToClipboard}
                            >
                              <span className="mt-2 mb-1 m-1">
                                Bio Profile Url:
                              </span>
                              <div
                                class="copy-text"
                                style={{ right: "5px", width: "250px" }}
                              >
                                <input
                                  type="text"
                                  class="text"
                                  value={`${window.origin}/profile/${AUTHUSER?.profile_url}`}
                                />
                                <button
                                  style={{
                                    position: "relative",
                                    right: "35px",
                                  }}
                                  onClick={copyProfileLinkToClipboard}
                                >
                                  <i class="fa fa-clone"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                        <Snackbar
                          open={isCopied}
                          autoHideDuration={2000}
                          onClose={handleCloseSnackbar}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                          }}
                        >
                          <MuiAlert
                            elevation={6}
                            variant="filled"
                            severity="success"
                          >
                            Copied!
                          </MuiAlert>
                        </Snackbar>
                      </li>
                      {AUTHUSER.user_type === "expert" ? (
                        <li>
                          <div className="tk-project-detail-item">
                            <div className="tk-project-image">
                              <i className="bi bi-currency-dollar"></i>
                            </div>
                            <div className="tk-project-imgdetail">
                              <span>Hourly charges:</span>
                              <h6>${AUTHUSER?.hourly_rate}</h6>
                            </div>
                          </div>
                        </li>
                      ) : (
                        ""
                      )}
                      {AUTHUSER.user_type === "expert" ? (
                        <li>
                          <div className="tk-project-detail-item">
                            <div className="tk-project-image">
                              <i className="bi bi-calendar"></i>
                            </div>
                            <div className="tk-project-imgdetail">
                              <div className="tk-languagelist">
                                <ul className="tk-languages">
                                  <span>Languages:</span>
                                  {AUTHUSER?.languages?.map(
                                    (language, index) => (
                                      <li
                                        style={{ cursor: "default" }}
                                        key={index}
                                      >
                                        {language.name}
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </li>
                      ) : (
                        ""
                      )}
                    </ul>
                    <div className="tk-asideadvertisment mt-5 pt-2">
                      {AUTHUSER?.linkedin && AUTHUSER?.linkedin && (
                        <a
                          href={AUTHUSER?.linkedin}
                          className="icon-button twitter"
                        >
                          <i className="bi bi-linkedin"></i>
                          <span></span>
                        </a>
                      )}
                      {AUTHUSER?.facebook && AUTHUSER?.facebook && (
                        <a
                          href={AUTHUSER?.facebook}
                          className="icon-button facebook"
                        >
                          <i className="bi bi-facebook"></i>
                          <span></span>
                        </a>
                      )}

                      {AUTHUSER?.twitter && AUTHUSER?.twitter && (
                        <a
                          href={AUTHUSER?.twitter}
                          className="icon-button facebook"
                        >
                          <i className="bi bi-twitter"></i>
                          <span></span>
                        </a>
                      )}

                      {AUTHUSER?.google && AUTHUSER?.google && (
                        <a
                          href={AUTHUSER?.google}
                          className="icon-button google-plus"
                        >
                          <i className="bi bi-google"></i>
                          <span></span>
                        </a>
                      )}

                      {AUTHUSER?.reddit && AUTHUSER?.reddit && (
                        <a
                          href={AUTHUSER?.reddit}
                          className="icon-button google-plus"
                        >
                          <i className="bi bi-reddit"></i>
                          <span></span>
                        </a>
                      )}
                      {AUTHUSER?.instagram && AUTHUSER?.instagram && (
                        <a
                          href={AUTHUSER?.instagram}
                          className="icon-button google-plus"
                        >
                          <i className="bi bi-instagram"></i>
                          <span></span>
                        </a>
                      )}
                      {AUTHUSER?.pinterest && AUTHUSER?.pinterest && (
                        <a
                          href={AUTHUSER?.pinterest}
                          className="icon-button pinterest"
                        >
                          <i className="bi bi-pinterest"></i>
                          <span></span>
                        </a>
                      )}

                      {AUTHUSER?.apple && AUTHUSER?.apple && (
                        <a
                          href={AUTHUSER?.apple}
                          className="icon-button bg-dark text-white"
                        >
                          <i className="bi bi-apple"></i>
                          <span></span>
                        </a>
                      )}
                      {/* <img
                              src="https://taskup.wp-guppy.com/demo-content/adsense_612x612.png"
                              alt="google adsense"
                            /> */}
                    </div>
                  </aside>
                </div>
                <div className="col-lg-8 col-xl-9">
                  <div className="tk-pofilelinks">
                    <ul
                      id="list-example"
                      className="tk-linklist position-stati"
                    >
                      <li>
                        <a
                          href="#about"
                          className={activeLink === "about" ? "active" : ""}
                          onClick={() => handleLinkClick("about")}
                        >
                          About
                        </a>
                      </li>
                      {AUTHUSER && AUTHUSER.skills?.length > 0 ? (
                        <li>
                          <a
                            href="#skills"
                            className={activeLink === "skills" ? "active" : ""}
                            onClick={() => handleLinkClick("skills")}
                          >
                            Skills
                          </a>
                        </li>
                      ) : (
                        ""
                      )}
                      {portfoliosData && portfoliosData?.length > 0 ? (
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
                      ) : (
                        ""
                      )}
                      {qualificationsData && qualificationsData?.length > 0 ? (
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
                      ) : (
                        ""
                      )}
                    </ul>
                    <div id="about" className="tk-profilebox">
                      <div className="tk-project-holder">
                        <div className="tk-project-title">
                          <h4>About</h4>
                        </div>
                        <div className="tk-jobdescription">
                          <p>
                            {AUTHUSER?.bio?.length > 0 ? AUTHUSER?.bio : ""}
                          </p>
                        </div>
                      </div>
                    </div>
                    {AUTHUSER.skills && AUTHUSER.skills?.length > 0 ? (
                      <div id="skills" className="tk-profilebox">
                        <div className="tk-content-box">
                          <h4>Skills</h4>
                          <ul className="tk-skills-tags tk-skills-tagsvtwo">
                            {AUTHUSER?.skills?.map((skill, index) => (
                              <li style={{ cursor: "default" }} key={index}>
                                <a style={{ cursor: "default" }}>
                                  {skill.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}

                    {portfoliosData && portfoliosData?.length > 0 ? (
                      <div id="portfolio" className="tk-profilebox">
                        <div className="tk-content-box">
                          <h4>Portfolio</h4>
                        </div>
                        <div className="row">
                          {portfoliosData.map((item, index) => (
                            <div className="col-12 col-lg-4" key={index}>
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
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      ""
                    )}

                    {qualificationsData && qualificationsData?.length > 0 ? (
                      <div id="qualification" className="tk-profilebox">
                        <div className="tk-content-box">
                          <h4>Qualification</h4>
                        </div>
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
                    ) : (
                      ""
                    )}
{AUTHUSER.user_type === 'expert' ? (
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
                    ) : ''}
                    {/* {AUTHUSER.user_type === 'expert' ? (
                      featuredExperts && featuredExperts.length > 0 ? (
                        featuredExperts.map((data, d) => (
                          data?.average_rating > 0 ? (
                            <div id="reviews" className="tk-profilebox" key={d}>
                              <div className="tk-noskills">
                                <div className="tk-content-box tk-review-box">
                                  <h4>
                                    Reviews
                                    <i className="fas fa-star text-warning"></i>
                                    <em>
                                      <span>0</span>
                                    </em>
                                  </h4>
                                </div>
                              </div>
                            </div>
                          ) : ''
                        ))
                      ) : ''
                    ) : ''} */}
                    {/* <div id="reviews" className="tk-profilebox">
                      <div className="tk-noskills">
                        <div className="tk-content-box tk-review-box">
                          <h4>
                            Reviews
                            <i className="fas fa-star text-warning"></i>
                            <em>
                              <span>{}</span>
                            </em>
                          </h4>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Profile;
