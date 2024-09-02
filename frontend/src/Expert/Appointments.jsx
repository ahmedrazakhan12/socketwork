import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import GppMaybeIcon from "@mui/icons-material/GppMaybe";
import { Box, Button, Typography } from "@mui/material";
import Chip from "@mui/material-next/Chip";
import Modal from "@mui/material/Modal";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Footer from "../components/Footer";
import { useAppContext } from "../context/AppContext";
import { useFrontEndContext } from "../context/FrontEndContext";
import { useAppointments } from '../context/AppointmentsContext';

import { useSocialAuth } from "../context/SocialAuthContext";
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import socketIO from "../socket/socket";
import {
  formatDate,
  getLoggedinUserData
} from "../utils/helpers";
import Header from "./components/Header";
import DataTable from "./components/Table";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function CustomTab({ data, activeTab, onClick }) {
  return (
    <div className={`tk-sort `} onClick={() => onClick(data)}>
      <div className="tk-sortby">
        <div className="tk-actionselect">
          <div
            className={`tk-select ${
              activeTab === data ? "active-tab-dashboard" : ""
            }`}
          style={{
            width: data === 'Upcoming Appointments' || data === 'Completed Appointments'  ? '214px' : '200px',
          }}
          >
            <span
              className=" select2-container select2-container--default "
              style={{ width: "220px" }}
            >
              <span className="select2-selection select2-selection--single text-center">
                <span className="select2-selection__rendered"  style={{padding:'0 8px 0 8px'}}>
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

function Appointments() {
  const [open, setOpen] = React.useState(false);
  const [activeTab, setActiveTab] = useState("All Appointments" );
  const { authUser, handleUpdateAppointment } = useAppContext();
  const [AppointmentsDates, setAppointmentsDates] = useState([]);
  const { Alert, setAlert } = useSocialAuth();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isLoader, setIsLoader] = useState(false);

  const {
    editAuthData,
    setOpenChat,
    openChat,
    onAnswer,
    remoteName,
    onRejectCall,
  } = useAppContext();
  const { singleUser } = useFrontEndContext();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    // handleOpen()
    // emailjs.send(serviceId, templateId, {
    //   message: 'message',
    //   from_name: "namee",
    //   from_email: "code@gmail.com",
    //   subject: "this is the subject"
    // }, publicKey).then(_ => console.log(_, "this is the email-send"))

    getLoggedinUserData().then((_) => {
      // const user = _?.data?.user
      console.log(
        _?.data?.user?.user_appointments
          .filter((_) => _.future_date !== null)
          .map((_) => new Date(_.future_date)),
        " appointments"
      );

      setAppointmentsDates(
        _?.data?.user?.user_appointments
          .filter((_) => _.future_date !== null)
          .map((_) => new Date(_.future_date)) || []
      );
    });

    // const isThereUpcommingAppointments = true;
    // if (isThereUpcommingAppointments) {
    //   // upcommingAppointments()
    // }
  }, []);

  const [enableChat, setEnableChat] = useState(false);

  // useEffect(() => {
  //   socketIO.on("openChatResponse", (data) => {
  //     console.log("openChatResponse", data);
  //     alert("Chat Is Opened Successfully");
  //     if(data){
  //       setEnableChat(true);
  //     }
  //   });
  // } , [])
  
  const { openChatModal, setOpenChatModal } = useAppContext();

  const handleTesting = () => {
    setOpenChatModal(true)
  }
  const AllApointmentsDataColumns = [
    // {
    //   field: "id", headerName: "S/no", renderCell: (params) => {
    //     return  ''
    //   }, width: 150
    // },
    // { field: "expert_name", headerName: "Expert", width: 130 },
    { field: "user_name", headerName: "Caller", width: 200  , 
       renderCell: (params) => {
        const status = params.value;
        let chipColor = "default";

        if (status === "accepted") {
          chipColor = "success";
        } else if (status === "pending" || status === "today") {
          chipColor = "primary";
        } else if (status === "completed") {
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
            {/* {openChat === true  && <MarkUnreadChatAltIcon style={{ fontSize: "1rem" , color:"#0a1833" , cursor: "pointer" }} onClick={handleTesting} />} */}
           <h1>
            hello world
            </h1>

          </div>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 180,
      editable: false,
      renderCell: (params) => {
        const status = params.value;
        let chipColor = "default";

        if (status === "accepted") {
          chipColor = "success";
        } else if (status === "pending" || status === "today") {
          chipColor = "primary";
        } else if (status === "completed") {
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
          
           <h1>
            hello world
            </h1>

          </div>
        );
      },
    },
    { field: "amount", headerName: "Amount", width: 130, editable: false },
    { field: "time", headerName: "Start Time", width: 130, editable: false },
    // {
    //   field: "time", headerName: "Time", renderCell: (params) => {
    //     return params?.row?.time
    //   }, width: 130, editable: true
    // },
    {
      field: "date",
      headerName: "Date",
      renderCell: (params) => {
        return formatDate(params?.row?.date);
      },
      width: 160,
      editable: false,
    },
    // {
    //   field: "accept",
    //   headerName: "Accept",
    //   width: 150,
    //   renderCell: (params) => {

    //     if (params.row.status !== "accepted" && params.row.status !== "rejected") {
    //       return (
    //         <CheckIcon

    //           style={{ cursor: "pointer", color: 'green' }}
    //           onClick={() => {
    //             // make-api-call to send email to the client.
    //             handleUpdateAppointment(params.row.id, 'accepted')
    //           }}
    //         />
    //       );
    //     }

    //     return null;
    //   },
    // },
    // {
    //   field: "reject",
    //   headerName: "Reject",
    //   width: 150,
    //   renderCell: (params) => {

    //     if (params.row.status !== "rejected" && params.row.status !== "completed") {
    //       return (
    //         <CloseIcon
    //           style={{ cursor: "pointer", color: 'red' }}
    //           onClick={() => {
    //             if (confirm("Maximum 3 Rejections Allowed. Exceeding Limit Resulting You A Ban.")) {
    //               handleUpdateAppointment(params.row.id, 'rejected')
    //             }

    //           }}
    //         />
    //       );
    //     }

    //     return null;
    //   },
    // },
    {
      field: "actions",
      headerName: "Actions",
      width: 300,
      renderCell: (params) => {
        const msg =
          "Appointment Is Completed Or Rejected , Actions Are Not Allowed Now";
        if (params.row.status !== "pending") {
          return (
            <div style={{ display: "flex", gap: "2rem", color: "gray" }}>
              <div
                onClick={() => {
                  toast.error(msg);

                  // make-api-call to send email to the client.

                  socketIO.emit("message", {
                    fromId: authUser.user.id,
                    toId: params.row.user_id,
                    text: {
                      type: "appointment",
                      expertId: authUser?.user?.id,
                      name: authUser?.user?.name || "",
                    },
                  });

                  console.log(params?.row, " pending");
                }}
                title={msg}
              >
                No Actions Are Allowed
              </div>
            </div>
          );
        }
        return (
          <div style={{ display: "flex", gap: "2rem" }}>
            {params.row.status !== "rejected" &&
              params.row.status !== "completed" && (
                <CloseIcon
                  style={{ cursor: "pointer", color: "red" }}
                  onClick={() => {
                    if (authUser?.user?.user_type === "expert") handleOpen();
                    handleUpdateAppointment(params.row.id, "rejected");
                  }}
                />
              )}
            {authUser?.user?.user_type === "expert" &&
              params.row.status !== "accepted" &&
              params.row.status !== "rejected" && (
                <CheckIcon
                  style={{ cursor: "pointer", color: "green" }}
                  onClick={async () => {
                    // make-api-call to send email to the client.
                    await handleUpdateAppointment(params.row.id, "accepted");
                    socketIO.emit("openchat", {
                      fromId: authUser.user.id,
                      toId: params.row.user_id,
                      time:params?.row?.time,
                      text: {
                        type: "appointment",
                        expertId: authUser?.user?.id,
                        name: authUser?.user?.name || "",
                      },
                    });
                    socketIO.emit("message", {
                      fromId: authUser.user.id,
                      toId: params.row.user_id,
                      text: {
                        type: "appointment",
                        expertId: authUser?.user?.id,
                        name: authUser?.user?.name || "",
                      },
                    });
                  }}
                />
              )}
          </div>
        );
      },
    },
  ];

  // un comment this for actual working
  // const futureDates = AppointmentsDates

  // comment-this, for actual working with realtime data, The proper dates of the appointments for the expert
  const futureDates = [
    new Date(2024, 4, 3, 17, 7, 0, 0),
    new Date(2024, 3, 4, 13, 57, 0, 0),
    new Date(2024, 3, 3, 5, 32, 0, 0),
    new Date(2024, 3, 3, 5, 29, 0, 0),
  ];
  const handleNotification = () => {
    // Open the chat when notification is clicked
    setOpenChat(true);
    setEnableChat(true);

    // Check if Notifications are supported and permission is granted
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        // Show notification
        new Notification('From Zyacom', {
          body: 'You Got An Upcoming Appointment Under 15 mins, Get Ready',
          icon: '/icon.png', // Optional: Path to an icon
          requireInteraction: true, // Keeps the notification until the user interacts with it
          tag: 'appointment-notification', // Unique tag to avoid duplicate notifications
          actions: [
            {
              action: 'open_chat',
              title: 'Open Chat',
              icon: '/chat-icon.png' // Optional: Path to an action icon
            }
          ]
        }).onclick = () => {
          // Handle click action
          setOpenChat(true);
        };
      } else if (Notification.permission !== 'denied') {
        // Request permission if not already denied
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            handleNotification(); // Retry showing notification if permission granted
          } else {
            console.log('Notification permission denied.');
          }
        });
      }
    } else {
      console.log('Notifications are not supported by this browser.');
    }
  };
  return (
    <div className="min-h-screen bg-gray-100">
      {/* <TimeTracker futureDates={futureDates} /> */}
      {/* Alert && <div style={{ display: 'flex', padding: '1rem', justifyContent: 'space-between' }}>
        <span>

          {Alert?.message}
          <span style={{ fontSize: '0.7rem', color: "gray", marginLeft: '1rem' }}>(Check Email, if Not Present)</span>
        </span>
        <span onClick={() => setAlert(null)} style={{ color: 'gray', cursor: "pointer" }}>
          X

        </span>
      </div>  */}
      <Header />


      <section className="tk-main-bg tk-main-section">
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              style={{ display: "flex", alignItems: "center", gap: "0.2rem" }}
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              <GppMaybeIcon style={{ fontSize: "2rem" }} />
              <span>Attention!</span>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              more than 3 cancels resultant Your Profile Ban
              {/* Duis mollis, est non commodo luctus, nisi erat porttitor ligula. */}
            </Typography>
            <div className="">
              <Button
                color="secondary"
                variant="outlined"
                style={{ marginTop: "1rem" }}
                onClick={() => handleClose()}
              >
                Close
              </Button>
              {/* <Button>Ok</Button> */}
            </div>
          </Box>
        </Modal>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div
                className="tk-project-wrapper tk-template-project"
                data-select2-id="11"
              >
                <div className="tk-template-serach " style={{justifyContent:'space-evenly'}}>
                  <h5
                    onClick={handleNotification}
                  >
                    {" "}
                    My Appointments{" "}
                    </h5>
                  <div className="tk-search-wrapper">
                    <CustomTab
                      data={"All Appointments"}
                      activeTab={activeTab}
                      onClick={handleTabClick}
                    />
                    <CustomTab
                      data={"Today Appointments"}
                      activeTab={activeTab}
                      onClick={handleTabClick}
                    />
                    <CustomTab
                      data={"Upcoming Appointments"}
                      activeTab={activeTab}
                      onClick={handleTabClick}
                    />
                    <CustomTab
                      data={"Completed Appointments"}
                      activeTab={activeTab}
                      onClick={handleTabClick}
                    />
                  </div>
                </div>
              </div>
              <div className="tk-submitreview">
                {activeTab == "All Appointments" &&
                  (authUser.user?.user_appointments && (
                    <>
                          {/* {openChat &&  <MarkUnreadChatAltIcon style={{ fontSize: "2rem" }} /> } */}
                                <DataTable
                                  title={`All Appointments` }
                                  columns={AllApointmentsDataColumns}
                                  rows={authUser.user.user_appointments}
                                  />

                            </>
                  ) )}
                {activeTab === "Today Appointments" &&
                  (authUser.user?.user_appointments ? (
                    <DataTable
                      title={`Today Appointments`}
                      columns={AllApointmentsDataColumns}
                      rows={authUser.user.user_appointments.filter(
                        (appointment) => appointment.status === "today"
                      )}
                      />
                    ) : (
                    <p></p>
                  ))}
                {activeTab === "Upcoming Appointments" &&
                  (authUser.user?.user_appointments ? (
                    <DataTable
                      title={`Upcoming Appointments`}
                      columns={AllApointmentsDataColumns}
                      rows={authUser.user.user_appointments.filter(
                        (appointment) => appointment.status === "upcoming"
                      )}
                    />
                  ) : (
                    <p></p>
                  ))}
                {activeTab === "Completed Appointments" &&
                  (authUser.user?.user_appointments ? (
                    <DataTable
                      title={`Completed Appointments`}
                      columns={AllApointmentsDataColumns}
                      rows={authUser.user.user_appointments.filter(
                        (appointment) => appointment.status === "completed"
                      )}
                    />
                  ) : (
                    <p></p>
                  ))}
                {activeTab == "false" && (
                  <figure>
                    <img
                      src="https://taskup.wp-guppy.com/images/empty.png"
                      alt="Oh, snap! there is no content to show this time"
                    />
                    <h4>Oh, snap! there is no content of appointments</h4>
                  </figure>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      

      <Footer />
    </div>
  );
}

export default Appointments;

// function TimeTracker({ futureDates }) {
//   // const futureDates = [
//   //   new Date('2024-03-29T12:00:00'), // Today at 12:00 PM
//   //   new Date('2024-03-30T10:30:00'), // Tomorrow at 10:30 AM
//   //   new Date('2024-04-01T15:00:00'), // April 1st at 3:00 PM
//   // ];
//   const { Alert, setAlert } = useSocialAuth()

//   function onDateReached() {
//     console.log('send email, karo')
//     // setAlert({ message: "You Got An Upcomming Appointment Under 15 mins, Get Ready" })
//     addNotification({
//       title: 'From Zyacom',
//       subtitle: 'Hurry Up!',
//       message: 'You Got An Upcomming Appointment Under 15 mins, Get Ready',
//       theme: 'darkblue',
//       native: true // when using native, your OS will handle theming.
//     });
//   }

//   useEffect(() => {

//     const timer = setInterval(() => {
//       // current-date
//       const currentDate = new Date();

//       // checking if the differnce between the future-dates and the current-date
//       futureDates.forEach(futureDate => {

//         console.log(currentDate, futureDate,
//           isEqualWithThreshold(currentDate.getTime() + 900000, futureDate.getTime(), 1000)
//         )
//         // console.log(futureDate, currentDate) adding milli-secs
//         if (isEqualWithThreshold(currentDate.getTime() + 900000, futureDate.getTime(), 1000)) {
//           onDateReached()
//         }
//       })

//     }, 1000);

//     return () => clearInterval(timer);
//   }, [futureDates, onDateReached]);

//   return null

// }
