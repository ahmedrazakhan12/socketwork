import React from "react";
import { Button } from "react-bootstrap";
import Footer from "../components/Footer";
import { useAppContext } from "../context/AppContext";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

function SocialMedia() {
  const {
    // social media
    socialMediaData,
    handleInputChangeS,
    handleSocialSubmit,
  } = useAppContext();
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
              <div className="tk-project-wrapper">
                <div className="tk-profile-form">
                  <div className="tb-dhb-profile-settings">
                    <div className="tb-dhb-mainheading d-flex justify-content-start gap-2">
                      <ArrowBackIosIcon
                        onClick={() => {
                          nav(-1);
                        }}
                        style={{ cursor: "pointer" }}
                      />
                      <h2>Social Media Links </h2>
                    </div>
                  </div>
                  <form className="tk-themeform">
                    <fieldset>
                      <div className="tk-themeform__wrap">
                        <div className="form-group-half form-group_vertical">
                          <label className="tk-label">Facebook</label>
                          <input
                            type="text"
                            className="form-control"
                            name="facebook"
                            value={socialMediaData.facebook}
                            onChange={handleInputChangeS}
                            placeholder="Enter facebook profile link"
                          />
                        </div>
                        <div className="form-group-half form-group_vertical">
                          <label className="tk-label">Linkedin</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter linkedin profile link"
                            name="linkedin"
                            value={socialMediaData.linkedin}
                            onChange={handleInputChangeS}
                          />
                        </div>
                        <div className="form-group-half form-group_vertical">
                          <label className="tk-label">Twitter</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter twitter profile link"
                            name="twitter"
                            value={socialMediaData.twitter}
                            onChange={handleInputChangeS}
                          />
                        </div>
                        <div className="form-group-half form-group_vertical">
                          <label className="tk-label">Dribble</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter dribbble profile link"
                            name="dribbble"
                            value={socialMediaData.dribbble}
                            onChange={handleInputChangeS}
                          />
                        </div>
                        <div className="form-group form-group_vertical">
                          <label className="tk-label">Google</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter google profile link"
                            name="google"
                            value={socialMediaData.google}
                            onChange={handleInputChangeS}
                          />
                        </div>
                        <div className="form-group form-group_vertical">
                          <label className="tk-label">Youtube</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Youtube profile link"
                            name="youtube"
                            value={socialMediaData.youtube}
                            onChange={handleInputChangeS}
                          />
                        </div>

                        <div className="form-group-half form-group_vertical">
                          <label className="tk-label">Reddit</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter redit profile link"
                            name="reddit"
                            value={socialMediaData.reddit}
                            onChange={handleInputChangeS}
                          />
                        </div>
                        <div className="form-group-half form-group_vertical">
                          <label className="tk-label">Instagram</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter instagram profile link"
                            name="instagram"
                            value={socialMediaData.instagram}
                            onChange={handleInputChangeS}
                          />
                        </div>
                        <div className="form-group-half form-group_vertical">
                          <label className="tk-label">Pinterest</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter pinterest profile link"
                            name="pinterest"
                            value={socialMediaData.pinterest}
                            onChange={handleInputChangeS}
                          />
                        </div>
                        <div className="form-group-half form-group_vertical">
                          <label className="tk-label">Apple</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter apple profile link"
                            name="apple"
                            value={socialMediaData.apple}
                            onChange={handleInputChangeS}
                          />
                        </div>
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
                      onClick={handleSocialSubmit}
                      className="tk-btn-solid-lg text-white"
                    >
                      Save &amp; Update
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

export default SocialMedia;
