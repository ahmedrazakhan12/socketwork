import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Chip from "@mui/material-next/Chip";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import GlobalDialog from "../components/GlobalDialogue";
import JoyCard from "../components/JoyCard";
import { useAppContext } from "../context/AppContext";
import { useFrontEndContext } from "../context/FrontEndContext";
import { formatDate } from "../utils/helpers";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import DataTable from "./components/Table";
// function CustomTab() {
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

function ProfileSubscriptions() {
//   const [activeTab, setActiveTab] = useState("Subscriptions");

//   const handleTabClick = (tab) => {
//     setActiveTab(tab);
//   };
  const globalDialogRef = useRef();

  const handleOpenDialog = () => {
    // Call openDialog method using the ref
    globalDialogRef.current.openDialog();
  };
  const { profileSubscriptionData } = useFrontEndContext();

  const ProfilesubscriptionColumns = [
    {
      field: "name",
      headerName: "Name",
      width: 180,
      editable: false,
      renderCell: (params) => {
        const name = params.row.promote_package?.name;
        return <div>{name}</div>;
      },
    },
    // { field: 'country', headerName: 'Country', width: 100 },
    { field: "category", headerName: "Category", width: 200 },
    { field: "days", headerName: "Days", width: 100 },
    { field: "budget", headerName: "Amount", width: 100 },
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
                className="tk-project-wrapper tk-template-project row"
                data-select2-id="11"
              >
                <div className="tk-template-serach col-12   d-flex justify-content-between"  data-select2-id="10">
                  
                  <div className="d-flex flex-row ">
                  <ArrowBackIosIcon onClick={() => {
                      nav(-1)
                    }} style={{ cursor: "pointer" }} />
              
                  <h5 className=""> My profile Subscriptions </h5>
                  </div>
                  
                </div>
              </div>
              <div
                className="tk-project-wrapper tk-template-project row d-flex justify-content-center"
                data-select2-id="11"
              >
                <div className="tk-template-serach col-12   d-flex justify-content-between"  data-select2-id="10">
                  <h6 className=""> Boost Your Profile</h6>
                </div>
                <div className="tk-template-serach col-12   d-flex justify-content-between"  data-select2-id="10">
                  <h6 className="">Boost your profile to the next level by purchasing a slot. Each upgrade enhances your visibility and connects you with more opportunities. Click "Purchase +" to secure your spot!

                  </h6>
                </div>
                <div className="tk-template-serach col-12   d-flex justify-content-center"  data-select2-id="10">
                
                  {/*   <small>(Boost your profile and unlock premium features Click "Purchase +" )</small> */}
                    <button
                      onClick={handleOpenDialog}
                      className=" tk-btn-yellow-lg btn btn-primary"
                      style={{
                        width:'250px'
                      }}
                    >
                      Purchase +
                    </button>
                </div>
              </div>
              <div className="row">
              <div className="tk-submitreview col-12 ">
                
                {authUserSubscriptions?.profilePackageHistory && (
                  <DataTable

                    title={`Profile Subscriptions`}
                    columns={ProfilesubscriptionColumns}
                    rows={authUserSubscriptions.profilePackageHistory}
                  />
                )}
              
              
            </div>
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
              <GlobalDialog
                ref={globalDialogRef}
                title="Profile Packages"
                actions={false}
                size={"lg"}
              >
                <div className="container">
                  <div className="row">
                    {profileSubscriptionData &&
                    profileSubscriptionData?.length > 0
                      ? profileSubscriptionData?.map((profileData) => (
                          <div className="col-md-4 col-12" key={profileData.id}>
                            <JoyCard
                              profileData={profileData}
                              id={profileData.id}
                              key={profileData.id}
                            />
                          </div>
                        ))
                      : "No packages found"}
                  </div>
                </div>
              </GlobalDialog>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default ProfileSubscriptions;