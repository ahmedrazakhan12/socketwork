import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { useAppContext } from "../context/AppContext";
import Header from "./components/Header";
import DataTable from "./components/Table";
import { withdrawsColumns } from "./dummyData";

function CustomTab({ data, activeTab, onClick }) {
  return (
    <div
      className={`tk-sort ${activeTab === data ? "active" : ""}`}
      onClick={() => onClick(data)}
    >
      <div className="tk-sortby">
        <div className="tk-actionselect">
          <div className="tk-select" style={{ width: "250px" }}>
            <span
              className="select2-container select2-container--default "
              style={{ width: "300px" }}
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

function Withdraws() {
  const [activeTab, setActiveTab] = useState("Withdraws");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const { authUser } = useAppContext();

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <section className="tk-main-bg tk-main-section">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div
                className="tk-project-wrapper tk-template-project"
                data-select2-id="11"
              >
                <div className="tk-template-serach " data-select2-id="10">
                  <h5> My Withdrawals </h5>
                  <div className="tk-search-wrapper" data-select2-id="9">
                    <Link to='/add-wallet'>
                    <CustomTab
                      data={"Withdraw Your Amount"}
                      activeTab={activeTab}
                      onClick={handleTabClick}
                    />
                    </Link>
                  </div>
                </div>
              </div>
                                     <div className="tk-submitreview">
              {activeTab === "Withdraws" &&
                  (authUser.user?.withdraws ? (
                    <DataTable
                      title={`Withdrawals`}
                      columns={withdrawsColumns}
                      rows={authUser.user.withdraws}
                    />
                  ) : (
                    <p>No Withdrawals available</p>
                  ))}
                            </div>
              {/* {activeTab == "Withdraws" && (
                <div className="tk-submitreview">
                  <DataTable title={`Withdraws`} columns={withdrawsColumns}   rows={withdrawsRows} />
                </div>
              )}
              {activeTab == "false" && (
                <div className="tk-submitreview">
                  <figure>
                    <img
                      src="https://taskup.wp-guppy.com/images/empty.png"
                      alt="Oh, snap! there is no content to show this time"
                    />
                  </figure>
                  <h4>Oh, snap! there is no content of Withdraw</h4>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Withdraws;
