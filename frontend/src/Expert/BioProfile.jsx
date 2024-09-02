import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseUrlImage } from "../Api/BaseApi";
import cover_placeholder from "../assets/images/coverplaceholder.jpg";
import profile_placeholder from "../assets/images/default_image.jpeg";
import Footer from "../components/Footer";
import { fetchBioProfile } from "../utils/helpers";
import MediaCard from "./components/MediaCard";
function BioProfile() {
  const { profile_url } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeLink, setActiveLink] = useState("about");
  const [activeTab, setActiveTab] = useState("posts");

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await fetchBioProfile(profile_url);
        setProfileData(data);
        console.log("///data", data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }

    loadProfile();
  }, [profile_url]);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleTabChange = (event, newTab) => {
    setActiveTab(newTab);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* <Header /> */}
      <div className="tk-banner">
        <figure>
          <img
            src={`${baseUrlImage}` + profileData?.cover_image}
            alt="image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = cover_placeholder;
            }}
          />
        </figure>
        {/* <Link
          to={"/settings"}
          style={{
            position: "absolute",
            right: "40px",
            top: "30px",
            color: "white",
            backgroundColor: "#808080b8",
            borderRadius: "5px",
            padding: "15px 5px",
          }}
        >
          <EditIcon /> Edit Profile
        </Link> */}
      </div>
      <main className="tk-bgwhite ">
        <section className="tk-profilemain">
          <div className="tk-bgback"></div>
          <div className="tk-newprofilewrap">
            <div className="container">
              <div className="row g-0">
                <div className="col-lg-4 col-xl-3 tk-hasborder">
                  <aside className="tk-asiderightbar">
                    <div className="tk-sideprofile">
                      <figure>
                        <img
                          src={`${baseUrlImage}` + profileData?.image}
                          alt={profileData?.name}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = profile_placeholder;
                          }}
                        />
                      </figure>
                      <div className="tk-infoprofile">
                        <h4 style={{textTransform: 'capitalize'}}>{profileData?.name}</h4>
                      </div>
                      <ul className="tk-blogviewdates tk-blogviewdatesmd">
                        <li>
                          <i className="fas fa-star text-warning"></i>
                          <em>0</em>
                          <em>/5.0</em>
                        </li>
                        <li>
                          <span>
                            <i className="bi bi-eye text-dark"></i>{" "}
                            <em>2 views</em>{" "}
                          </span>
                        </li>
                      </ul>
                    </div>
                    <ul className="tk-project-detail-list tk-sidedetailist">
                      {/* <li>
                        <div className="tk-project-detail-item">
                          <div className="tk-project-image">
                            <i className="bi bi-currency-dollar"></i>
                          </div>
                          <div className="tk-project-imgdetail">
                            <span>Profile URL:</span>
                            <h6 onClick={handleCopyClick}>
                              {profileData.profile_url && (
                                <p>
                                  {window.location.origin}/profile/
                                  {profileData.profile_url}
                                </p>
                              )}
                            </h6>
                            {isCopied && <p>Copied!</p>}
                          </div>
                        </div>
                      </li> */}
                      <li>
                        {profileData?.hourly_rate &&
                        profileData?.hourly_rate.length > 0 ? (
                          <div className="tk-project-detail-item">
                            <div className="tk-project-image">
                              <i className="bi bi-currency-dollar text-dark"></i>
                            </div>
                            <div className="tk-project-imgdetail">
                              <span>Hourly Charges:</span>
                              <h6>${profileData?.hourly_rate}</h6>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </li>
                      <li>
                        <div className="tk-project-detail-item">
                          <div className="tk-project-image">
                            <i className="bi bi-calendar"></i>
                          </div>
                          <div className="tk-project-imgdetail">
                            <span>Languages:</span>
                            <div className="tk-languagelist">
                              <ul className="tk-languages">
                                <li>English</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="tk-project-detail-item">
                          <div className="tk-project-image tk-bg-lightblue">
                            <i className="bi bi-archive"></i>
                          </div>
                          <div className="tk-project-imgdetail">
                            <span>English level:</span>
                            <h6>Conversational </h6>
                          </div>
                        </div>
                      </li>
                    </ul>
                    <div className="tk-asideadvertisment mt-5 pt-2">
                      {profileData?.linkedin && profileData?.linkedin && (
                        <a
                          href={profileData?.linkedin}
                          className="icon-button twitter"
                        >
                          <i className="bi bi-linkedin"></i>
                          <span></span>
                        </a>
                      )}
                      {profileData?.facebook && profileData?.facebook && (
                        <a
                          href={profileData?.facebook}
                          className="icon-button facebook"
                        >
                          <i className="bi bi-facebook"></i>
                          <span></span>
                        </a>
                      )}

                      {profileData?.twitter && profileData?.twitter && (
                        <a
                          href={profileData?.twitter}
                          className="icon-button facebook"
                        >
                          <i className="bi bi-twitter"></i>
                          <span></span>
                        </a>
                      )}

                      {profileData?.google && profileData?.google && (
                        <a
                          href={profileData?.google}
                          className="icon-button google-plus"
                        >
                          <i className="bi bi-google"></i>
                          <span></span>
                        </a>
                      )}

                      {profileData?.reddit && profileData?.reddit && (
                        <a
                          href={profileData?.reddit}
                          className="icon-button google-plus"
                        >
                          <i className="bi bi-reddit"></i>
                          <span></span>
                        </a>
                      )}
                      {profileData?.instagram && profileData?.instagram && (
                        <a
                          href={profileData?.instagram}
                          className="icon-button google-plus"
                        >
                          <i className="bi bi-instagram"></i>
                          <span></span>
                        </a>
                      )}
                      {profileData?.pinterest && profileData?.pinterest && (
                        <a
                          href={profileData?.pinterest}
                          className="icon-button pinterest"
                        >
                          <i className="bi bi-pinterest"></i>
                          <span></span>
                        </a>
                      )}

                      {profileData?.apple && profileData?.apple && (
                        <a
                          href={profileData?.apple}
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
                    <ul id="list-example" className="tk-linklist">
                      <Tabs
                        value={activeTab}
                        onChange={handleTabChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                      >
                        <Tab label="Posts" value="posts" />
                        <Tab label="Skills" value="skills" />
                        <Tab label="Portfolio" value="portfolio" />
                        <Tab label="Qualification" value="qualification" />
                      </Tabs>
                    </ul>
                    <div
                      id="about"
                      className="tk-profilebox"
                      role="tabpanel"
                      hidden={activeTab !== "posts"}
                    >
                      <div className="tk-project-holder">
                        <div className="tk-project-title">
                          <h4>Posts</h4>
                        </div>
                        <div className="tk-jobdescription">
                          <div className="row">
                            {profileData?.user_posts.length > 0
                              ? profileData.user_posts.map((data, i) => (
                                  <MediaCard
                                    data={data}
                                    key={i}
                                    user={profileData}
                                  />
                                ))
                              : "no data found"}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      id="skills"
                      className="tk-profilebox"
                      role="tabpanel"
                      hidden={activeTab !== "skills"}
                    >
                      <div className="tk-content-box">
                        <h4>Skills</h4>
                        <ul className="tk-skills-tags tk-skills-tagsvtwo">
                          {profileData?.skills?.map((skill, index) => (
                            <li key={index}>
                              <a href="#">{skill.name}</a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div
                      id="portfolio"
                      className="tk-profilebox"
                      role="tabpanel"
                      hidden={activeTab !== "portfolio"}
                    >
                      <div className="tk-content-box">
                        <h4>Portfolio</h4>
                      </div>
                      <div className="row">
                        <div className="col-6 col-lg-4">
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
                                <h6>dummy dummy</h6>
                                <p>
                                  dummy dummy dummy dummy dummy dummy dummy
                                  dummy dummy dummy
                                </p>
                              </div>
                            </div>{" "}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      id="qualification"
                      className="tk-profilebox"
                      role="tabpanel"
                      hidden={activeTab !== "qualification"}
                    >
                      <div className="tk-content-box">
                        <h4>Qualification</h4>
                      </div>
                      <div className="tk-acordian-wrapper">
                        <ul
                          id="tk-accordion"
                          className="tk-qualification tk-qualificationvtwo"
                        >
                          <li>
                            <div
                              className="tk-accordion_title "
                              data-bs-toggle="collapse"
                              role="button"
                              data-bs-target="#education-1"
                              aria-expanded="true"
                            >
                              <div className="tk-qualification-title">
                                <h5>Web &amp; Apps Project Manager</h5>
                                <ul className="tk-qualifinfo">
                                  <li>
                                    <span>
                                      <i className="bi bi-house"></i> Amento
                                      tech
                                    </span>
                                  </li>
                                  <li>
                                    <span>
                                      <i className="bi bi-calendar"></i>
                                      May 03, 2003&nbsp;&nbsp;- &nbsp;&nbsp;May
                                      03, 2005
                                    </span>
                                  </li>
                                </ul>
                              </div>
                              <i className="bi bi-plus"></i>
                            </div>
                            <div
                              className="collapse show"
                              id="education-1"
                              data-bs-parent="#tk-accordion"
                            >
                              <div className="tk-accordion_info">
                                <p>
                                  dummy dummya bore et dolore magna dummy
                                  dummyniamac quis nostrud exercitation ullamco
                                  laboris.
                                </p>
                              </div>
                            </div>
                          </li>{" "}
                        </ul>
                      </div>
                    </div>
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

export default BioProfile;
