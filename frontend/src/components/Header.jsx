import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.PNG";
import arrowRight from "../assets/svg/arrow-right.svg";
import personAdd from "../assets/svg/person-add.svg";
// import { HeaderLinks } from "../data";
import Avatars from "./Avatar";
// import Avatar from "./Avatar";
import {useFrontEndContext} from '../context/FrontEndContext'
function Header() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const{websiteData}=useFrontEndContext()

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      setUserLoggedIn(true);
    } else {
      setUserLoggedIn(false);
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [token]);
  const HeaderLinks = [
    {
      id: 1,
      title: "Home",
      path: "/",
    },
    // {
    //   'id': 22,
    //   'title': 'About Us',
    //   'path': '/'
    // },
    {
      id: 2,
      title: "Experts",
      path: "/experts",
    },
    {
      id: 123,
      title: "Options",
      path: "/options",
    },
    {
      id: 344,
      title: "Live Streaming",
      path: "/live-streamings",
    },
    // {
    //   'id': 5,
    //   'title': 'Terms & Conditions',
    //   'path': '/terms&conditions'
    // },
    ...(websiteData.isReferral_Module=="true"?[{
      id: 34,
      title: "Referral Program",
      path: "/referral-program",
    }]:[]),
    // {
    //   'id': 4,
    //   'title': 'FAQ',
    //   'path': '/faq'
    // },
    {
      id: 43434,
      title: "Blogs",
      path: "/blogs",
    },
    {
      id: 434312,
      title: "About Us",
      path: "/aboutus",
    },
    // {
    //    'id': 43434,
    //    'title': 'Career',
    //   'path': '/'
    // },
  ];
  return (
    <div>
      <header className="tb-header ">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="tb-headerwrap">
                <strong className="tk-logo">
                  <a href="http://zyacom.com/">
                    <img src={logo} alt="logo" />
                  </a>
                </strong>
                <nav className="tb-navbar navbar-expand-xl">
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#tenavbar"
                    aria-expanded="false"
                  >
                    <i className="bi bi-list"></i>
                  </button>
                  <div id="tenavbar" className="collapse navbar-collapse">
                    <ul className="navbar-nav tb-navbarnav">
                      {HeaderLinks.map((data) => (
                        <li key={data.id}>
                          <Link to={data.path}>{data.title}</Link>
                        </li>
                      ))}
                      {/* */}
                      {/* <select
      className="select d-inline-block w-auto ml-xl-3 langSel "
      style={{
        fontSize: "14px",
        fontWeight: "bold",
        color: "#12231a",
        opacity: "1",
        border: "0px",
        height: "60px",
      }}
    >
      <option defaultValue="English">English</option>
      {languagesData.map((language) => (
        <option key={language.value} value={language.value}>{language.value}</option>
      ))}
    </select> */}

                      {/* <select
                        className="select d-inline-block w-auto ml-xl-3 langSel "
                        defaultValue="English"
                        style={{
                          fontSize: "14px",
                          fontWeight: "bold",
                          color: "#12231a",
                          opacity: "1",
                          border: "0px",
                          height: "60px",
                        }}
                      >
                        
                        <option defaultValue="English">English</option>
                        <option value="ur">Spanish</option>
                        <option value="ur">French</option>
                        <option value="ur">German</option>
                        <option value="ur">Portuguese</option>
                      </select> */}
                      <li className="tk-themenav_signbtn">
                        <div className="button-container">
                          {userLoggedIn ? (
                            <Avatars />
                          ) : (
                            <>
                              <Link
                                className="tk-btn-solid-sm tk-registerbtn register-btn-copy m-lg-1 m-2"
                                to="/sign-up"
                              >
                                <label
                                  htmlFor=""
                                  className="mt-1"
                                  style={{
                                    fontWeight: "500",
                                    paddingTop: "4px",
                                  }}
                                >
                                  <img
                                    src={personAdd}
                                    alt=""
                                    className="me-1 mr-1"
                                  />{" "}
                                  Register
                                </label>
                              </Link>

                              <Link
                                className="tk-btn-solid-sm tk-btn-yellow text-white m-lg-1 m-2"
                                to="/sign-in"
                                style={{ color: "white" }}
                              >
                                <label
                                  htmlFor=""
                                  className="mt-1"
                                  style={{
                                    fontWeight: "500",
                                    paddingTop: "4px",
                                  }}
                                >
                                  <img
                                    src={arrowRight}
                                    alt=""
                                    className="me-1 mr-1 "
                                  />{" "}
                                  Sign in
                                </label>
                              </Link>
                            </>
                          )}
                        </div>
                        {/* {loading ? (
                          <div className="loading-indicator">
                            <Avatar>U</Avatar>
                          </div>
                        ) : (
                          <div className="button-container">
                            {userLoggedIn ? (
                              <Avatars />
                            ) : (
                              <>
                                <Link
                                  className="tk-btn-solid-sm tk-registerbtn register-btn-copy"
                                  to="/sign-up"
                                >
                                  <label htmlFor="" className="mt-1" style={{fontWeight :'500'}}>
                                  <img
                                    src={personAdd}
                                    alt=""
                                    className="me-1 mr-1"
                                  />{" "}
                                  Register
                                  </label>
                                </Link>

                                
                                <Link
                                  className="tk-btn-solid-sm tk-btn-yellow text-white"
                                  to="/sign-in"
                                  style={{ color: "white" }}
                                >
                                                    <label htmlFor="" className="mt-1" style={{fontWeight :'500'}}>
                  <i className="bi bi-arrow-right"></i> Sign in
                                                    </label>
                                </Link>
                                
                              </>
                            )}
                          </div>
                        )} */}
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
