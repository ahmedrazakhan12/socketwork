import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import React from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useAppContext } from "../context/AppContext";
import Header from "./components/Header";

import Sidebar from "./components/Sidebar";

function AccountSettings() {
  const nav = useNavigate();
  const {
    handlePasswordChangeSubmit,
    handlePasswordChange,
    changePasswordData,
    handleHourlyChange,
    hourlyRate,
    handleHourlyRateSubmit,
    userDataAuth
  } = useAppContext();
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
              <div className="tb-dhb-account-settings">
                <div className="tb-profile-settings-box tb-changepassword">
                  <div className="tb-dhb-box-wrapper">
                    <div className="tk-deactive-holder tk-changepassword">
                      <div className="tb-dhb-mainheading d-flex justify-content-start gap-2">
                        <ArrowBackIosIcon
                          onClick={() => {
                            nav(-1);
                          }}
                          style={{ cursor: "pointer" }}
                        />
                        <h2>Account Settings</h2>
                      </div>
                      <div className="form-group form-group_vertical">
                        <label className="tk-label tk-required">
                          Current Password
                        </label>
                        <input
                          type="password"
                          className="form-control "
                          name="current_password"
                          placeholder="Enter password"
                          onChange={handlePasswordChange}
                          value={changePasswordData.current_password}
                        />
                      </div>
                      <div className="form-group form-group_vertical">
                        <label className="tk-label tk-required">
                          New Password
                        </label>
                        <input
                          type="password"
                          className="form-control "
                          name="password"
                          placeholder="Enter new password"
                          onChange={handlePasswordChange}
                          value={changePasswordData.password}
                        />
                      </div>
                      <div className="form-group form-group_vertical">
                        <label className="tk-label tk-required">
                          Retype Password
                        </label>
                        <input
                          type="password"
                          className="form-control "
                          name="password_confirmation"
                          placeholder="Enter retype password"
                          onChange={handlePasswordChange}
                          value={changePasswordData.password_confirmation}
                        />
                      </div>
                    </div>
                    <div className="tb-profileform__holder">
                      <div className="tb-dhbbtnarea tb-dhbbtnareav2">
                        <em></em>
                        <Button
                          className="tb-btn text-white"
                          onClick={handlePasswordChangeSubmit}
                        >
                          {" "}
                          Submit{" "}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
{userDataAuth?.user_type === 'expert' && (
   <div className="tb-profile-settings-box tb-privacy-wrapper">
   <div className="tb-tabtasktitle">
     <h5>Balance </h5>
   </div>
   <div className="tb-dhb-box-wrapper">
     <div className="tb-profileform__holder">
       <div className="form-group form-group_vertical">
         <label className="tk-label tk-required">
           Add your hourly rate $
         </label>
         <input
           type="number"
           className="form-control "
           placeholder="Enter hourly rate"
           onChange={handleHourlyChange}
           value={hourlyRate.hourly_rate}
           name="hourly_rate"
         />
       </div>
     </div>
     <div className="tb-profileform__holder">
       <div className="tb-dhbbtnarea tb-dhbbtnareav2">
         <em></em>
         <Button
           className="tb-btn text-white"
           onClick={handleHourlyRateSubmit}
         >
           {" "}
           Submit{" "}
         </Button>
       </div>
     </div>
   </div>
 </div>
)}
               
                

                <div className="tb-profile-settings-box tb-privacy-wrapper">
                  <div className="tb-tabtasktitle">
                    <h5>Delete Your Account </h5>
                  </div>
                  <div className="tb-dhb-box-wrapper">
                    <div className="tb-profileform__holder">
                     <p style={{fontWeight:'bold'}}>Are you sure? This will permanently delete your account and all associated data.</p>
                    </div>
                    <div className="tb-profileform__holder">
                      <div className="tb-dhbbtnarea tb-dhbbtnareav2">
                        <em></em>
                        <Link to={"/user/account/delete"}>
                          <Button className="tb-btn text-white" style={{backgroundColor:'#dc3545'}}>
                            {" "}
                            Delete{" "}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="tb-profile-settings-box tb-privacy-wrapper">
                  <div className="tb-tabtasktitle d-block">
                    <Row>
                      <Col lg={9}>
                        <h5 className="mt-lg-2">Delete Your Account ? </h5>
                      </Col>
                      <Col lg={3}>
                        <Link to={"/user/account/delete"}>
                          <Button className="p-2 w-75 btn btn-danger  text-white ">
                            {" "}
                            Delete{" "}
                          </Button>
                        </Link>
                      </Col>
                    </Row>
                  </div>

               
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default AccountSettings;
