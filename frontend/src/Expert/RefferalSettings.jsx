import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Typography } from "@mui/material";
import React from "react";
import { Button } from "react-bootstrap";
import Footer from "../components/Footer";

import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useSettingsContext } from "../context/Settings";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
function RefferalSettings() {
  const {
    handleRefferalSubmit,
    refferalCode,
    validationErrors,
    setRefferalCode,
  } = useSettingsContext();
  const{
    userReferrar
  }=useAppContext();
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
                <div className="tb-dhb-mainheading d-flex justify-content-start gap-2">
                      <ArrowBackIosIcon
                        onClick={() => {
                          nav(-1);
                        }}
                        style={{ cursor: "pointer" }}
                      />
                      <h2>
                        Referral Code
                      </h2>
                    </div>
                    <span className="tk-label">
                          {
                            "(This  allows you to enter a code, which associates you with a particular referrer.) "}
                     </span>
                  <form className="tk-themeform mt-5" id="tb_save_settings">
                    <fieldset>
                      <div className="tk-themeform__wrap">
                        <div className="form-group-half  form-group_vertical">
                          <div className="d-flex justify-content-start gap-2">
                            <label className={`${userReferrar ? 'tk-label': 'tk-label tk-required'}`}>
                            {userReferrar ? (<>You are already associated with  <Link to={`${userReferrar.user_type === 'expert' ? '/view-profile/' : '/update-refferal'} ` + userReferrar?.id} className="text-bold m-1" >  {'('}{userReferrar?.name}{')'}</Link> </>) : 'Enter referral code'}   
                            </label>
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            name="name"
                            placeholder={`${userReferrar ? userReferrar.referral_code : 'Enter Referral Code'}`}
                            value={refferalCode}
                            disabled={userReferrar}
                            onChange={(e) => setRefferalCode(e.target.value)}
                          />
                          {validationErrors.refferalCode && (
                            <Typography className="text-danger">
                              {validationErrors.refferalCode}
                            </Typography>
                          )}
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
                      className="tk-btn-solid-lg"
                      onClick={handleRefferalSubmit}
                      // disabled={isLoading}
                    >
                      <span style={{ color: "white" }}>Save &amp; Update</span>
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

export default RefferalSettings;
