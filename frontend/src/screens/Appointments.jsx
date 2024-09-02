import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Chip from '@mui/material-next/Chip';
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { useAppContext } from "../context/AppContext";
import Header from "./components/Header";
import DataTable from "./components/Table";
import { formatDate, getLoggedinUserData, isEqualWithThreshold } from '../utils/helpers';
import emailjs from '@emailjs/browser';
import { publicKey, serviceId, templateId } from '../utils/constants';
import { useSocialAuth } from '../context/SocialAuthContext';

import Modal from '@mui/material/Modal';
import { Box, Button, Typography } from '@mui/material';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
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
            className={`tk-select ${activeTab === data ? "active-tab-dashboard" : ""
              }`}
          >
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

function Appointments() {
  const [open, setOpen] = React.useState(false);
  const [activeTab, setActiveTab] = useState("All Appointments");
  const { authUser, handleUpdateAppointment } = useAppContext();
  const [Appoinments, setAppoinments] = useState([])
  const { Alert, setAlert } = useSocialAuth()
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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

    // * TODO: Issuefrom-laravel, would make an laravel-api to fetch all appointments efficiently, (currently-not-working the api)
    getLoggedinUserData().then(
      _ => {

        // const user = _?.data?.user
        console.log(_, ' appointments')
        // setAppoinments(_?.data)
      }
    )

    const isThereUpcommingAppointments = true;
    if (isThereUpcommingAppointments) {
      // upcommingAppointments()
    }


  }, [])

  const AllApointmentsDataColumns = [
    // {
    //   field: "id", headerName: "S/no", renderCell: (params) => {
    //     return  ''
    //   }, width: 150
    // },
    // { field: "expert_name", headerName: "Expert", width: 130 },
    { field: "user_name", headerName: "Caller", width: 200 },
    {
      field: 'status',
      headerName: 'Status',
      width: 180,
      editable: false,
      renderCell: (params) => {
        const status = params.value;
        let chipColor = 'default';

        if (status === 'accepted') {
          chipColor = 'success';
        } else if (status === 'pending' || status === 'today') {
          chipColor = 'primary';
        } else if (status === 'completed') {
          chipColor = 'success';
        } else if (status === 'rejected') {
          chipColor = 'tertiary';
        }
        return (
          <div>
            <Chip
              label={status}
              color={chipColor}
              variant="elevated"
              size="medium"
              style={{
                fontFamily: 'inherit',
                width: '100px',
                boxShadow: '0px 0px 0px 0px',
              }}
            />
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
      field: "date", headerName: "Date", renderCell: (params) => {
        return (
          formatDate(params?.row?.date))
      }, width: 160, editable: false
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

        return <div style={{ display: 'flex', gap: '2rem' }}>

          {(params.row.status !== "accepted" && params.row.status !== "rejected") &&

            <CheckIcon
              style={{ cursor: "pointer", color: 'green' }}
              onClick={() => {
                // make-api-call to send email to the client.
                handleUpdateAppointment(params.row.id, 'accepted')
              }}
            />}
        </div>



      }

    },
  ];

  // The proper dates of the appointments for the expert
  const futureDates = [new Date(2024, 3, 3, 6, 7, 0, 0),
  new Date(2024, 3, 4, 13, 57, 0, 0), new Date(2024, 3, 3, 5, 32, 0, 0), new Date(2024, 3, 3, 5, 29, 0, 0)]


  return (
    <div className="min-h-screen bg-gray-100">
      <TimeTracker futureDates={futureDates} />
      {Alert && <div style={{ display: 'flex', padding: '1rem', justifyContent: 'space-between' }}>
        <span>

          {Alert?.message}
          <span style={{ fontSize: '0.7rem', color: "gray", marginLeft: '1rem' }}>(Check Email, if Not Present)</span>
        </span>
        <span onClick={() => setAlert(null)} style={{ color: 'gray', cursor: "pointer" }}>
          X
          {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg> */}
        </span>
      </div>}
      <Header />
      <section className="tk-main-bg tk-main-section">
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Attention!
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              more than 3 cancels resultant Your Profile Ban
              {/* Duis mollis, est non commodo luctus, nisi erat porttitor ligula. */}
            </Typography>
            <div className="">

              <Button onClick={() => handleClose()}>Close</Button>
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
                <div className="tk-template-serach ">
                  <h5> My Appointments </h5>
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
                  (authUser.user?.user_appointments ? (
                    <DataTable
                      title={`all appointments`}
                      columns={AllApointmentsDataColumns}
                      rows={authUser.user.user_appointments}
                    />
                  ) : (
                    <p>No appointments available</p>
                  ))}
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
                    <p>No appointments available</p>
                  ))}
                {activeTab === "Upcoming Appointments" &&
                  (authUser.user?.user_appointments ? (
                    <DataTable
                      title={`upcoming Appointments`}
                      columns={AllApointmentsDataColumns}
                      rows={authUser.user.user_appointments.filter(
                        (appointment) => appointment.status === "upcoming"
                      )}
                    />
                  ) : (
                    <p>No appointments available</p>
                  ))}
                {activeTab === "Completed Appointments" &&
                  (authUser.user?.user_appointments ? (
                    <DataTable
                      title={`completed Appointments`}
                      columns={AllApointmentsDataColumns}
                      rows={authUser.user.user_appointments.filter(
                        (appointment) => appointment.status === "completed"
                      )}
                    />
                  ) : (
                    <p>No appointments available</p>
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


function TimeTracker({ futureDates }) {
  // const futureDates = [
  //   new Date('2024-03-29T12:00:00'), // Today at 12:00 PM
  //   new Date('2024-03-30T10:30:00'), // Tomorrow at 10:30 AM
  //   new Date('2024-04-01T15:00:00'), // April 1st at 3:00 PM
  // ];
  const { Alert, setAlert } = useSocialAuth()


  function onDateReached() {
    console.log('send email, karo')
    setAlert({ message: "You Got An Upcomming Appointment Under 15 mins, Get Ready" })
  }

  useEffect(() => {

    const timer = setInterval(() => {
      // current-date
      const currentDate = new Date();

      // checking if the differnce between the future-dates and the current-date
      futureDates.forEach(futureDate => {

        console.log(currentDate, futureDate,
          isEqualWithThreshold(currentDate.getTime(), futureDate.getTime(), 1000)
        )
        // console.log(futureDate, currentDate)
        if (isEqualWithThreshold(currentDate.getTime(), futureDate.getTime(), 1000)) {
          onDateReached()
        }
      })


    }, 1000);

    return () => clearInterval(timer);
  }, [futureDates, onDateReached]);



  return null

}
