import React from "react";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import Chip from "@mui/material-next/Chip";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { baseUrlImage } from "../Api/BaseApi";
import Footer from "../components/Footer";
import { useAppContext } from "../context/AppContext";
import { useSettingsContext } from "../context/Settings";
import Header from "./components/Header";
import Select2 from "./components/Select2";
import Sidebar from "./components/Sidebar";
import DataTable from "./components/Table";

const user = {
  name: "John Doe",
  skill: "JavaScript Developer",
  address: "123 Main St, Anytown, USA",
  document: "https://example.com/resume.pdf",
};
const UserProfile = ({ name, skill, address, document }) => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>{name}</h2>
        <p>Skill: {skill}</p>
        <p>Address: {address}</p>
        <p>
          <a href={document} target="_blank" rel="noopener noreferrer">
            Document
          </a>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
  },
  card: {
    background: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "293px",
    textAlign: "center",
  },
  link: {
    color: "#007BFF",
    textDecoration: "none",
  },
  linkHover: {
    textDecoration: "underline",
  },
};

function IdentityVerification() {
  const {
    identityVerificationData2,
    handleInputChangeIdentity,
    handleSubmitI,
    isLoading,
    handleFileChange,
    selectedOptions,
options,
handleSkillChange,
  } = useSettingsContext();

  const { skillRequests,userDataAuth } = useAppContext();
  console.log("skillRequests", skillRequests);
  const nav = useNavigate();
  const RequestColumns = [
    { field: "name", headerName: "Name", width: 230 },
    {
      field: "media",
      headerName: "Document",
      width: 230,
      renderCell: (params) => {
        const fileExtension = params.row.media
          ? params.row.media.split(".").pop().toLowerCase()
          : "";

        return (
          <div>
            <a
              href={baseUrlImage + params.row.media}
              download
              rel="noreferrer"
              target="_blank"
            >
              {" "}
              {fileExtension === "pdf" ? (
                <PictureAsPdfIcon style={{ color: "red" }} />
              ) : (
                <TextSnippetIcon style={{ color: "blue" }} />
              )}
            </a>
          </div>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 230,
      renderCell: (params) => {
        const status = params.value;
        let chipColor = "default";

        // Set the chip color based on the status value
        if (status === "pending") {
          chipColor = "primary";
        } else if (status === "accepted") {
          chipColor = "success";
        } else if (status === "rejected") {
          chipColor = "tertiary";
        }
        return (
          <div>
            <Chip
              label={status}
              color={chipColor}
              variant="elevated"
              size="medium"
              style={{
                fontFamily: "inherit",
                width: "100px",
                boxShadow: "0px 0px 0px 0px",
              }}
            />
          </div>
        );
      },
      // return (
      //   <Link to={`/request/${params.row.id}`}>
      //     <Chip
      //       label={status}
      //       color={chipColor}
      //       variant="elevated"
      //       size="medium"
      //       style={{
      //         fontFamily:'inherit',
      //         width :'100px',
      //         boxShadow : '0px 0px 0px 0px'

      //       }}
      //     />
      //   </Link>
      // )}
    },
  ];
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
                        Skill Verification Request
                       
                      </h2>
                    
                    </div>
                    <p className="tk-label ">
                          {
                            "(Your request will be sent to the admin for approval.)"
                          }
                        </p>{" "}
                    {/* {!identityVerificationData?.name ||
                    !identityVerificationData?.skill_name ||
                    !identityVerificationData?.address ? ( */}
                    <form className="tk-themeform mt-5" id="tb_identity_save">
                      <fieldset>
                        <div className="tk-themeform__wrap">
                          <div className="form-group">
                            <label className="tk-label tk-required">
                              Your name
                            </label>
                            <input
                              type="text"
                              className="form-control "
                              name="name"
                              placeholder="Your name"
                              value={userDataAuth?.name }
                              onChange={handleInputChangeIdentity}
                              disabled={skillRequests[0]?.status === 'pending' || skillRequests[0]?.status === 'accepted' ? true : false}
                            />
                          </div>
                          <div className="form-group ">
                            <label className="tk-label tk-required">
                              Skills  <span className="m-1" style={{fontSize: "14px"}}> {" ("}You can edit skills from your <Link to={'/settings'} style={{color:'#1f1fd5d9',textDecoration:'underline'}}>profile settings</Link>{")"}</span>  
                            </label>
                            <Select2
                              selectedOptions={selectedOptions}
                              options={options}
                              // handleSelectedPermission={handleSkillChange}
                            />
                          </div>

                          <div className="form-group ">
                            <label className="tk-label tk-required">
                              Document{" "}
                              <span
                                className="tk-label m-1"
                                style={{ fontSize: "14px" }}
                              >
                                {" "}
                                {
                                  " (  Ensure this document is related to your mentioned skill and government-verified)."
                                }
                              </span>{" "}
                              *
                            </label>
                            <input
                              type="file"
                              className="form-control "
                              name="image"
                              onChange={handleFileChange}
                              accept=".pdf,.doc,.docx"
                              disabled={skillRequests[0]?.status === 'pending' || skillRequests[0]?.status === 'accepted' ? true : false}
                            />
                          </div>
                          <div className="form-group">
                            <label className="tk-label tk-required">
                              Add address
                            </label>
                            <textarea
                              className="form-control "
                              name="address"
                              placeholder="Add address"
                              value={identityVerificationData2?.address}
                              onChange={handleInputChangeIdentity}
                              disabled={skillRequests[0]?.status === 'pending' || skillRequests[0]?.status === 'accepted' ? true : false}
                            >
                              {identityVerificationData2?.address}
                            </textarea>
                          </div>
                        </div>
                      </fieldset>
                    </form>
                    {/* {  // ) : ( }
                    //   <UserProfile
                    //     name={identityVerificationData?.name}
                    //     skill={identityVerificationData?.skill_name}
                    //     address={identityVerificationData?.address}
                    //     document={user.document}
                    //   />
                    // )}*/}
                  </div>
                  {/* Display the captured photo */}
                  <div className="tk-profileform__holder">
                    <div className="tk-dhbbtnarea">
                      <em>Click To “Send Request“</em>
                      <Button
                        className="tk-btn-solid-lg"
                        onClick={async () =>
                          await handleSubmitI(`update-identity-info`)
                        }
                        disabled={isLoading || skillRequests[0]?.status === 'pending' || skillRequests[0]?.status === 'accepted' ? true : false}
                      >
                        <span style={{ color: "white" }}>Send Request</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              {skillRequests &&(
               <div className="tb-dhb-profile-settings" id='request-skill'  >
                <div className="tk-project-wrapper">
                  <div className="tk-profile-form">
                    <div className="tb-dhb-mainheading d-flex justify-content-start gap-2">
                      <h2>
                        My Request
                        <span className="tk-label m-1">
                        {skillRequests[0]?.status.length>0?skillRequests[0]?.status:'(Request Status)'}
                        </span>{" "}
                      </h2>
                    </div>

                    <DataTable columns={RequestColumns} rows={skillRequests} title={'Requests'} />
                  </div>
                  {/* Display the captured photo */}
                </div>
              </div>
              )}
             
              {/* {skillRequests && skillRequests.length > 0 ? (
                ) : (
                  <figure className="">
                    <img
                      src="https://taskup.wp-guppy.com/images/empty.png"
                      alt="Oh, snap! there is no content to show this time"
                    />
                    <h4>Oh, snap! there is no content of requests</h4>
                  </figure>
                  // 'No request available'
                )} */}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default IdentityVerification;
