import React from "react";
import { Link } from "react-router-dom";
import android from "../assets/images/android.png";
import ios from "../assets/images/ios.png";
import logo from "../assets/images/logo.PNG";
import { useFrontEndContext } from "../context/FrontEndContext";

function Footer() {
  const { websiteData } = useFrontEndContext();

  return (
    <div className="footer-block__7 tk-footerwrap ">
      <footer className="tk-footer-two tk-footerv2  ">
        <div className="container">
          <div className="row tk-footer-two_head">
            <div className="col-12 col-xl-4">
              <div className="tk-footer-two_info">
                <strong className="tk-footerlogo">
                  <a href="#">
                    <img src={logo} alt="logo" />
                  </a>
                </strong>
                <div className="tk-description">
                  {/* <p> */}
                    {" "}
                    <h4 style={{ color: "white" }}>Disclaimer</h4>
                    {websiteData?.footer_disclaimer}
                  {/* </p> */}
                </div>
                <div className="tk-footer-mobile-app">
                  <div className="tk-title">
                    <h3>Get our mobile app</h3>
                  </div>
                  <ul className="tk-socailapp">
                    <li>
                      <a href="#">
                        <img
                          src={ios}
                          alt="App store"
                        />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img
                          src={android}
                          alt="Play store"
                        />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-12 col-xl-4 mt-lg-5">
              <div className="tk-fwidget">
                <div className="tk-fwidget_title">
                  <h5>Useful Links</h5>
                </div>
                <ul className="tk-fwidget_list">
                  <li>
                    <Link to="/experts">Find Experts</Link>
                  </li>
                  <li>
                    <Link to="/options">Options</Link>
                  </li>
                  {websiteData.isReferral_Module=="true"?<li>
                    <Link to="/referral-program">Referral Program</Link>
                  </li>:''}
                  <li>
                    <Link to="/sign-up">Become An Expert</Link>
                  </li>
                  {/* <li>
                    <a href="/#popular-categories">
                      Explore Popular Categories
                    </a>
                  </li> */}
                  <li>
                    <Link to="/privacy-policy">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link to="/blogs">Explore Articles</Link>
                  </li>
                  <li>
                    <Link to="/live-streamings">Live Stream</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-12 col-xl-4 mt-lg-5">
              <div className="tk-footernewsletter tk-footernewsletterv2">
                <div className="tk-fwidget_title">
                  <h5>Address</h5>
                </div>
                <ul className="tk-fwidget_contact_list">
                  <p href="#">Address: {websiteData?.footer_address}</p>
                </ul>
                <div className="tk-fwidget_title">
                  <h5>Contact details</h5>
                </div>
                <ul className="tk-fwidget_contact_list">
                  <li>
                    <i className="bi bi-envelope"></i>
                    <a href="zyacom.com" target="__blank">
                      {websiteData?.footer_email}
                    </a>
                  </li>
                  <li>
                    {/* <i className="bi bi-envelope"></i> */}
                    <a href="zyacom.com" target="__blank">
                      Report@zyacom.com,
                    </a>
                  </li>
                  <li>
                    {/* <i className="bi bi-envelope"></i> */}
                    <a href="zyacom.com" target="__blank">
                      Suggestions@zyacom.com{" "}
                    </a>
                  </li>
                </ul>

                <ul className="tk-socialicons">
                  <li>
                    <a href="https://www.facebook.com/" className="wk-facebook">
                      <i className="bi bi-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://twitter.com" className="wk-twitter-x">
                      <i className="bi bi-twitter-x"></i>{" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-twitter-x"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/" className="wk-linkedin">
                      <i className="bi bi-linkedin"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://reddit.com/" className="wk-dribbble">
                      <i className="bi bi-reddit"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://pinterest.com/" className="wk-dribbble">
                      <i className="bi bi-pinterest"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://instagram.com/" className="wk-dribbble">
                      <i className="bi bi-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://tiktok.com/" className="wk-tiktok">
                      <i className="bi bi-tiktok"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://youtube.com/" className="wk-youtube">
                      <i className="bi bi-youtube"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div
          className="tk-footer-two_copyright"
          style={{ position: "relative", top: "2rem", background: "#0A1833" }}
        >
          <div className="container">
            <div className="wk-fcopyright">
              <span className="wk-fcopyright_info">
                Copyright © 2024 Zyacom International LLC. All Rights Reserved.
              </span>

              <nav className="wk-fcopyright_list">
                <ul className="wk-copyrights-list">
                  <li>
                    <Link to="/terms&conditions">Terms &amp; condition</Link>
                  </li>
                  <li>
                    <Link to="/faq">FAQ</Link>
                  </li>
                  <li>
                    <Link to="/aboutus">About us</Link>
                  </li>
                  <li>
                    <Link to="/">Career</Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
