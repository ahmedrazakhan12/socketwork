import { Alert, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { baseUrlImage } from "../../Api/BaseApi";
import profile_placeholder from "../../assets/images/default_image.jpeg";
import logo from "../../assets/images/logo.PNG";
import { useAppContext } from "../../context/AppContext";
import { expertHeaderLinks } from "../../data";
import Confirmation from "./Confirmation";
import CreateRoomDialog from "./CreateRoomDialogue";
// import { IconButton } from "material-ui";
import { createVerificationSession } from "../../utils/helpers";
// import FingerprintIcon from "@mui/icons-material/Fingerprint";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
function Header() {
  const [activeLink, setActiveLink] = useState(null);

  const handleLinkClick = (index) => {
    setActiveLink(index);
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [dialogOpen, setDialogOpen] = useState(false);
  //  useEffect(()=>{
  //   fetchAuthUser().then((_) => {
  //     setUserDataAuth(_)
  //   });
  //  },[])
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleCreateRoom = (roomId) => {
    // Handle room creation logic here with the received roomId
    console.log("Room created with ID:", roomId);
    // Add logic to create room using the received roomId
  };

  const {
    handleLogoutSubmit,
    editAuthData,
    authUser,
    authUserSubscriptionPackages,
    authUserActiveSubscription,
    AUTHUSER,
    userDataAuth,
  } = useAppContext();
  // authUserActiveSubscription.subscription_package.live_stream_counts
  // authUserActiveSubscription.subscription_package.
  const userType = authUser.user?.user_type;
  const [isLiveStreamEnabled, setIsLiveStreamEnabled] = useState(false);
  useEffect(() => {
    if (authUserActiveSubscription !== null) {
      if (authUserActiveSubscription?.subscription_package?.features) {
        try {
          const features = JSON.parse(
            authUserActiveSubscription.subscription_package.features
          );

          if (features && features["Live Stream"] === "Live Stream") {
            setIsLiveStreamEnabled(true);
          }
        } catch (error) {
          console.error("Error parsing features JSON:", error);
        }
      }
    }
  }, [authUserActiveSubscription]);

  function isItEligableForLiveStream() {
    const liveStreamsCompleted =
      authUserActiveSubscription.expert_live_stream_count;
    const totalLiveStreamCounts =
      authUserActiveSubscription?.subscription_package?.live_stream_counts;

    console.log(liveStreamsCompleted, totalLiveStreamCounts, " live streams");
    return liveStreamsCompleted < totalLiveStreamCounts;
  }
  return (
    <>
      {AUTHUSER && Number(AUTHUSER?.status) === 2 && (
        <Alert severity="error">
          {" "}
          Your Account has been suspended contact Zyacom Administrator to
          reinstate.
        </Alert>
      )}
      {AUTHUSER && (
        <>
          {(AUTHUSER.image == null ||
            AUTHUSER.cover_image == null ||
            AUTHUSER.bio == null) && (
            <Alert severity="warning">
              Please Upload{" "}
              {AUTHUSER.image == null && AUTHUSER.cover_image == null
                ? "upload"
                : ""}{" "}
              {AUTHUSER.image == null ? "a profile picture" : ""}{" "}
              {AUTHUSER.image == null &&
              (AUTHUSER.cover_image == null || AUTHUSER.bio == null)
                ? ","
                : ""}{" "}
              {AUTHUSER.cover_image == null ? "a banner image" : ""}{" "}
              {AUTHUSER.cover_image == null && AUTHUSER.bio == null
                ? "and"
                : ""}{" "}
              {AUTHUSER.bio == null ? "write about yourself" : ""} from
              settings.
            </Alert>
          )}
        </>
      )}

      {AUTHUSER && AUTHUSER.identity_verified == "0" && (
        <Alert
          severity="warning"
          action={
            <IconButton
              onClick={async () => {
                try {
                  await createVerificationSession();
                } catch (error) {
                  console.error("Error creating verification session:", error);
                }
              }}
            >
              <FingerprintIcon />
            </IconButton>
          }
        >
          You are not verified ! please verify yourself.
        </Alert>
      )}

      <header className="tb-header tk-headervtwo">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="tb-headerwrap tk-sellermenu">
                <div style={{ background: "white" }} id="bg-div"></div>
                <strong className="tk-logo">
                  <a href="/">
                    <img src={logo} alt="logo" />
                  </a>
                </strong>
                <nav className="tb-navbar navbar-expand-xl">
                  {/* <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#tenavbar"
                    aria-expanded="false"
                  >
                    <i className="bi bi-list"></i>
                  </button> */}
                  <div id="tenavbar" className="collapse navbar-collapse">
                    <ul className="navbar-nav tb-navbarnav">
                      <li className="tb-find-projects cool-link">
                        <Link to="/dashboard">
                          <i className=" responsive-text-expert bi bi-bar-chart pe-1"></i>{" "}
                          Dashboard{" "}
                        </Link>
                      </li>
                      {/* <li className="tb-find-projects cool-link">
                        <Link to="/refferal-team">
                          <i className=" responsive-text-expert bi bi-calendar pe-1"></i>{" "}
                          Referral Team{" "}
                        </Link>
                      </li> */}
                      <li className="tb-find-projects cool-link">
                        <Link to="/settings">
                          {" "}
                          <i className="responsive-text-expert  bi bi-gear pe-1"></i>{" "}
                          Settings{" "}
                        </Link>
                      </li>
                    </ul>
                  </div>
                </nav>
                <div className="tb-headerwrap__right">
                  <div className="tb-userlogin sub-menu-holder">
                    <a
                      href="#"
                      id="profile-avatar-menue-icon"
                      className="tb-hasbalance"
                    >
                      <div
                        className="tk-wallet"
                        style={{ textTransform: "capitalize" }}
                      >
                        <span>
                          <strong>
                            {userDataAuth?.user?.name ||
                              userDataAuth?.name ||
                              ""}
                          </strong>
                        </span>
                      </div>
                      <img
                        src={`${baseUrlImage + userDataAuth?.image}`}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = profile_placeholder;
                        }}
                        alt="images/default-user-60x60.png"
                      />
                    </a>
                    <ul className="sub-menu">
                      <strong>Current Balance: </strong>
                      <span style={{ fontSize: "0.96rem", color: "black" }}>
                        $ {editAuthData?.wallet || "00.0"}
                      </span>
                      <li className="tb-account-settings cool-link">
                        <Link to="/profile">
                          {" "}
                          <i className="bi bi-person"></i>Profile{" "}
                        </Link>
                      </li>
                      <li className="tb-account-settings cool-link">
                        <Link to="/settings">
                          {" "}
                          <i className="bi bi-gear"></i>Settings{" "}
                        </Link>
                      </li>

                      <li className="tb-logout cool-link">
                        <form action="#">
                          <Link to="" onClick={handleClickOpen}>
                            <i className="bi bi-power"></i>Log out{" "}
                          </Link>
                        </form>
                      </li>
                    </ul>
                  </div>
                </div>
                <Confirmation
                  open={open}
                  handleClose={handleClose}
                  handleClick={handleLogoutSubmit}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="tk-headerbottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="tk-seller-tabs">
                <nav className="tb-navbar tb-navbarbtm navbar-expand-xl">
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavvtwo"
                    aria-expanded="false"
                  >
                    <i className="bi bi-menu-button"></i>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarNavvtwo">
                    <ul
                      className="nav nav-tabs tk-seller-list navbar-nav"
                      id="myTab"
                      role="tablist"
                    >
                      {expertHeaderLinks.map((data, index) => {
                        if (userType === "expert") {
                          if (data.title !== "Find experts") {
                            return (
                              <li
                                className="tk-seller-item cool-link"
                                key={index}
                              >
                                <NavLink
                                  className={({ isActive }) =>
                                    isActive ? "active" : ""
                                  }
                                  onClick={() => {
                                    if (data.path.includes("/appointments"))
                                      window.location.href = "/appointments";
                                    handleLinkClick(index);
                                  }}
                                  to={data.path}
                                >
                                  <i className={data.icoClass}></i>
                                  {data.title}
                                </NavLink>
                              </li>
                            );
                          }
                        } else {
                          if (
                            data.title !== "Schedule" &&
                            data.title !== "Withdrawals"
                          ) {
                            return (
                              <li
                                className="tk-seller-item cool-link"
                                key={index}
                              >
                                <NavLink
                                  className={({ isActive }) =>
                                    isActive ? "active" : ""
                                  }
                                  onClick={() => handleLinkClick(index)}
                                  to={data.path}
                                >
                                  <i className={data.icoClass}></i>
                                  {data.title}
                                </NavLink>
                              </li>
                            );
                          }
                        }
                      })}
                      {userType === "user" ? (
                        <li className="tk-seller-item cool-link">
                          <NavLink
                            className={({ isActive }) =>
                              isActive ? "active" : ""
                            }
                            onClick={() => handleLinkClick(10)}
                            to={"/add-wallet"}
                          >
                            <i className={`bi bi-bag`}></i>
                            Deposit
                          </NavLink>
                        </li>
                      ) : (
                        <li></li>
                      )}

                      {userType == "expert" &&
                      isItEligableForLiveStream() &&
                      isLiveStreamEnabled ? (
                        <Button
                          className="ms-4 tk-btn-yellow-lg"
                          onClick={handleDialogOpen}
                          style={{
                            height: "43px",
                          }}
                        >
                          <i className={`fas fa-video me-1`}></i>
                          Go live
                        </Button>
                      ) : (
                        <li></li>
                      )}

                      <CreateRoomDialog
                        open={dialogOpen}
                        onClose={handleDialogClose}
                        onCreate={handleCreateRoom}
                        userType={userType}
                      />
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
