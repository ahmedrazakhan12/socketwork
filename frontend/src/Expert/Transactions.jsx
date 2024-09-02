import Chip from '@mui/material-next/Chip';
import React, { useState } from "react";
import Footer from "../components/Footer";
import { useAppContext } from "../context/AppContext";
import { formatDate } from '../utils/helpers';
import Header from "./components/Header";
import DataTable from "./components/Table";
// import { transactionsColumns } from "./dummyData";
const transactionsColumns = [
  {
    field: 'amount',
    headerName: 'Amount',
    width: 200,
    renderCell: (params) => (
      <div>
        {'$ '} 
        {`${params.value}`} 
      </div>
    ),
  },
  { field: "description", headerName: "Description", width: 200 },
  {
    field: "date",
    renderCell: (params) => {
      return formatDate(params?.row?.datetime);
    },
    headerName: "Datetime",
    width: 200,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 200,
    editable: false,
    renderCell: (params) => {
      const status = params.value;
      let chipColor = 'default';
      let chipMessage = 'default';

      if (status === 'completed') {
        chipColor = 'success';
        chipMessage = 'completed'
      } else if (status === 'pending' || status === 'in-process') {
        chipMessage = 'pending';
        chipColor = 'primary';
      }
      return (
        <div>
          <Chip
            label={chipMessage}
            color={chipColor}
            variant="elevated"
            size="medium"
            style={{
              fontFamily: 'inherit',
              width: '120px',
              boxShadow: '0px 0px 0px 0px',
            }}
          />
        </div>
      );
    },
  },
];
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

function Transactions() {
  const [activeTab, setActiveTab] = useState("Transactions");

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
                  <h5> My Transactions </h5>
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
              {activeTab === "Transactions" &&
                  (authUser.user?.transactions ? (
                    <DataTable
                      title={`Transactions`}
                      columns={transactionsColumns}
                      rows={authUser.user.transactions}
                    />
                  ) : (
                    <p>No Transactions available</p>
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

export default Transactions;
