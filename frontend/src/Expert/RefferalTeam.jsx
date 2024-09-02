import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import React, { useState } from "react";
import Footer from "../components/Footer";
import { useSettingsContext } from "../context/Settings";
import { formatDate } from "../utils/helpers";
import Header from "./components/Header";
import DataTable from "./components/Table";

import { useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
function CustomTab({ data, activeTab, onClick }) {
  return (
    <div
      className={`tk-sort ${activeTab === data ? "active" : ""}`}
      onClick={() => onClick(data)}
    >
      <div className="tk-sortby">
        <div className="tk-actionselect">
          <div className="tk-select">
            <span
              className=" select2-container select2-container--default "
              style={{ width: "220px" }}
            >
              <span className="select2-selection select2-selection--single text-center">
                <span className="select2-selection__rendered">
                  {" "}
                  <i className="text-dark bi bi-file-text pe-1"></i> {data}{" "}
                </span>
              </span>
            </span>
          </div>
        </div>{" "}
      </div>
    </div>
  );
}

function RefferalTeam() {
  const [activeTab, setActiveTab] = useState("Transactions");
  const teamColumns = [
    { field: "name", headerName: "Name", width: 300 },
    { field: "refferal_code_used", headerName: "Referral code", width: 300 },
    {
      field: "joined_date",
      headerName: "Date",
      renderCell: (params) => {
        return formatDate(params?.row?.joined_date);
      },
      width: 300,
      editable: false,
    },
    // {
    //   field: 'status',
    //   headerName: '',
    //   width: 150,
    //   editable: true,
    //   renderCell: (params) => {
    //     const status = 'View';

    //     let chipColor = 'success';
    //     return (
    //       <div>
    //         <Chip
    //           label={status}
    //           color={chipColor}
    //           variant="elevated"
    //           size="medium"
    //           style={{
    //             fontFamily: 'inherit',
    //             width: '100px',
    //             boxShadow: '0px 0px 0px 0px',
    //           }}
    //         />
    //       </div>
    //     );
    //   },
    // },
  ];

  const nav = useNavigate();

  const { refferalTeam } = useSettingsContext();
  const refferalTeamWithIds = refferalTeam.map((member, index) => ({
    ...member,
    id: index + 1,
  }));
  console.log("refferalTeamrefferalTeam", refferalTeam);
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <section className="tk-main-bg tk-main-section">
        <div className="container">
          <div className="row ">
            <div className="col-lg-3 col-12">
              <Sidebar />
            </div>
            <div className="col-lg-9 col-12">
              <div
                className="tk-project-wrapper tk-template-project"
                data-select2-id="11"
              >
                <div className="tk-template-serach " data-select2-id="10">
                  <div className="d-flex justify-content-start gap-2">
                    <ArrowBackIosIcon
                      onClick={() => {
                        nav(-1);
                      }}
                      style={{ cursor: "pointer" }}
                    />
                    <h5> My Referral Team </h5>
                  </div>
                  <div className="tk-search-wrapper" data-select2-id="9">
                    {/* <CustomTab
                      data={"Transactions"}
                      activeTab={activeTab}
                      onClick={handleTabClick}
                    /> */}
                  </div>
                </div>
              </div>
              <div className="tk-submitreview">
                {refferalTeamWithIds && refferalTeamWithIds.length > 0 ? (
                  <DataTable
                    title={`Referral Team`}
                    columns={teamColumns}
                    rows={refferalTeamWithIds}
                  />
                ) : (
                  <p>No Team Members Data Found</p>
                )}
                {activeTab === "Referral Team" &&
                  (refferalTeamWithIds && refferalTeamWithIds.length > 0 ? (
                    <DataTable
                      title={`Referral Team`}
                      columns={teamColumns}
                      rows={refferalTeamWithIds}
                    />
                  ) : (
                    <p>No Team Members Data Found</p>
                  ))}
              </div>

              {activeTab == "false" && (
                <div className="tk-submitreview">
                  <figure>
                    <img
                      src="https://taskup.wp-guppy.com/images/empty.png"
                      alt="Oh, snap! there is no content to show this time"
                    />
                  </figure>
                  <h4>Oh, snap! there is no content of transactions</h4>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default RefferalTeam;
