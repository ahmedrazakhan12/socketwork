import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Chip from "@mui/material-next/Chip";
import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useAppContext } from "../context/AppContext";
import { formatDate } from "../utils/helpers";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import DataTable from "./components/Table";
// function CustomTab({ data, activeTab, onClick }) {
//   return (
//     <div
//       className={`tk-sort ${activeTab === data ? "active" : ""}`}
//       onClick={() => onClick(data)}
//     >
//       <div className="tk-sortby">
//         <div className="tk-actionselect">
//           <div className="tk-select">
//             <span
//               className="select2-container select2-container--default "
//               style={{ width: "220px" }}
//             >
//               <span className="select2-selection select2-selection--single text-center">
//                 <span className="select2-selection__rendered">
//                   {" "}
//                   <i className="text-dark bi bi-file-text pe-1"></i> {data}{" "}
//                 </span>
//               </span>
//             </span>
//           </div>
//         </div>{" "}
//       </div>
//     </div>
//   );
// }

function Subscriptions() {
  // const [activeTab, setActiveTab] = useState("Subscriptions");

  // const handleTabClick = (tab) => {
  //   setActiveTab(tab);
  // };
  
  // const { profileSubscriptionData } = useFrontEndContext();

  // const ProfilesubscriptionColumns = [
  //   {
  //     field: "name",
  //     headerName: "Name",
  //     width: 180,
  //     editable: false,
  //     renderCell: (params) => {
  //       const name = params.row.promote_package?.name;
  //       return <div>{name}</div>;
  //     },
  //   },
  //   // { field: 'country', headerName: 'Country', width: 100 },
  //   { field: "category", headerName: "Category", width: 200 },
  //   { field: "days", headerName: "Days", width: 100 },
  //   { field: "budget", headerName: "Amount", width: 100 },
  //   {
  //     field: "start_date",
  //     headerName: "Start date",
  //     renderCell: (params) => {
  //       return formatDate(params?.row?.start_date);
  //     },
  //     width: 160,
  //     editable: false,
  //   },
  //   {
  //     field: "end_date",
  //     headerName: "End date",
  //     renderCell: (params) => {
  //       return formatDate(params?.row?.end_date);
  //     },
  //     width: 160,
  //     editable: false,
  //   },
  //   {
  //     field: "status",
  //     headerName: "Status",
  //     width: 200,
  //     editable: false,
  //     renderCell: (params) => {
  //       const endDate = params?.row?.end_date;
  //       let chipColor = "default";
  //       let chipValue = "";

  //       // If endDate exists and is a valid Date object
  //       if (endDate && new Date(endDate) > new Date()) {
  //         chipColor = "success";
  //         chipValue = "Ongoing";
  //       } else {
  //         chipColor = "tertiary";
  //         chipValue = "Expired";
  //       }
  //       return (
  //         <Chip
  //           label={chipValue}
  //           color={chipColor}
  //           variant="elevated"
  //           size="medium"
  //           style={{
  //             fontFamily: "inherit",
  //             width: "100px",
  //             boxShadow: "0px 0px 0px 0px",
  //           }}
  //         />
  //       );
  //     },
  //   },
  // ];
  const subscriptionColumns = [
    {
      field: "name",
      headerName: "Name",
      width: 180,
      editable: false,
      renderCell: (params) => {
        const name = params.row.subscription_package?.name;
        return <div>{name}</div>;
      },
    },
    {
      field: "description",
      headerName: "Description",
      width: 150,
      editable: false,
      renderCell: (params) => {
        const description = params.row.subscription_package?.description;
        return <div>{description}</div>;
      },
    },
    {
      field: "duration",
      headerName: "Days",
      width: 100,
      editable: false,
      renderCell: (params) => {
        const duration = params.row.subscription_package?.duration;
        return <div>{duration}</div>;
      },
    },
    { field: "amount", headerName: "Budget", width: 100 },
    {
      field: "start_date",
      headerName: "Start date",
      renderCell: (params) => {
        return formatDate(params?.row?.start_date);
      },
      width: 160,
      editable: false,
    },
    {
      field: "end_date",
      headerName: "End date",
      renderCell: (params) => {
        return formatDate(params?.row?.end_date);
      },
      width: 160,
      editable: false,
    },
    {
      field: "status",
      headerName: "Status",
      width: 200,
      editable: false,
      renderCell: (params) => {
        const endDate = params?.row?.end_date;
        let chipColor = "default";
        let chipValue = "";

        // If endDate exists and is a valid Date object
        if (endDate && new Date(endDate) > new Date()) {
          chipColor = "success";
          chipValue = "Ongoing";
        } else {
          chipColor = "tertiary";
          chipValue = "Expired";
        }
        return (
          <Chip
            label={chipValue}
            color={chipColor}
            variant="elevated"
            size="medium"
            style={{
              fontFamily: "inherit",
              width: "100px",
              boxShadow: "0px 0px 0px 0px",
            }}
          />
        );
      },
    },
  ];
  const { authUser, authUserSubscriptions } = useAppContext();
  const nav = useNavigate()
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <section className="tk-main-bg tk-main-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-12">
              <Sidebar />
            </div>
            <div className="col-lg-9 col-12">
              <div
                className="tk-project-wrapper tk-template-project"
                data-select2-id="11"
              >
                <div className="tk-template-serach d-flex justify-content-start" data-select2-id="10">
                  
                    <ArrowBackIosIcon onClick={() => {
                      nav(-1)
                    }} style={{ cursor: "pointer" }} />
              
                  <h5 className=""> My Subscriptions </h5>
                  
                </div>
              </div>
              <div className="tk-submitreview">
                {/* {activeTab === "Profile Subscriptions" &&
                  (authUserSubscriptions?.profilePackageHistory ? (
                    <DataTable

                      title={`Profile Subscriptions`}
                      columns={ProfilesubscriptionColumns}
                      rows={authUserSubscriptions.profilePackageHistory}
                    />
                  ) : (
                    <p>No Subscriptions available</p>
                  ))} */}
                {authUserSubscriptions.user_subscriptions && (
                  <DataTable
                    title={`Subscriptions`}
                    columns={subscriptionColumns}
                    rows={authUserSubscriptions.user_subscriptions}
                  />
                )}
              </div>

              {/* {activeTab == "Withdraws" && (
                <div className="tk-submitreview">
                  <DataTable title={`Withdraws`} columns={ProfilesubscriptionColumns}   rows={withdrawsRows} />
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

export default Subscriptions;