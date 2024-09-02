import AddIcon from '@mui/icons-material/Add';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import toast from "react-hot-toast";
import { httpForToastRequest } from "../Api/BaseApi";
import { useAppContext } from "../context/AppContext";
;

const generateNext7Days = () => {
  const today = new Date();
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    return date;
  });
};

function Hiu({ scheduler }) {
  const { mappedDataArray } = useAppContext();
  const [showCalendar, setShowCalendar] = useState(false);
  const [state, setState] = useState({
    start_time: '',
    end_time: '',
    date: '',
  });
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const handleChange = (e) => {
    setState(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    const { start_time, end_time, date } = state;

    if (!start_time || !end_time || !date) {
      toast.error("Please Fill All Fields");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("start_time", start_time);
      formData.append("end_time", end_time);
      formData.append("date", date);

      await toast.promise(
        httpForToastRequest({
          path: "store-schedule",
          method: "POST",
          data: formData,
        }),
        {
          loading: "Loading...",
          success: (res) => {
            if (res.status === 200) {
              // fetchAuthUser();
              toast.success(res.message);
            }
          },
          error: (err) => {
            if (err.response) {
              const errorMsg = err.response.status === 500 
                ? "Server Error. Please wait a moment." 
                : err.response.data.message;
              toast.error(errorMsg);
            } else {
              toast.error("An unexpected error occurred.");
            }
          },
        }
      );

      scheduler.loading(true);
      const addedUpdatedEvent = await new Promise((resolve) => {
        setTimeout(() => {
          const mappedDataArray = mappedDataArray.map((data, index) =>
            data.date ? {
              event_id: data.id || index,
              start: new Date(`${data.date}T${data.start_time}`),
              end: new Date(`${data.date}T${data.end_time}`),
            } : null
          );
          resolve(mappedDataArray);
        }, 3000);
      });

      scheduler.onConfirm(addedUpdatedEvent, "create");
      scheduler.close();
    } catch (error) {
      toast.error("Error while saving the schedule.");
    } finally {
      scheduler.loading(false);
    }
  };

  const handleIconClick = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDateClick = (date) => {
    const dateString = date.toLocaleDateString('en-CA'); // Use 'en-CA' format for consistent date representation
    setSelectedDate(dateString);
    setState(prev => ({ ...prev, date: dateString }));
  };
  console.log("mappedDataArray: " ,mappedDataArray);
  

  const filteredDataArray = mappedDataArray?.filter((data) => {
    const dataDate = new Date(data?.start).toISOString().split('T')[0];
    return dataDate === selectedDate;
  });

  const handleClose = () => {
    setShowCalendar(false);
    setState({
      start_time: '',
      end_time: '',
      date: '',
    });
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month' && date.getDay() === 0) {
      return <p style={{ color: 'black' }}></p>; // Custom content for Sundays
    }
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month' && date.getDate() === 1) {
      return 'special-day'; // Custom class for the 1st day of the month
    }
  };

  const next7Days = generateNext7Days();

    // Get today's date in the format yyyy-mm-dd
    const today = new Date().toISOString().split('T')[0];

    // Determine if the selected date is today
    const isToday = state.date === today;
  
    // Get current time in the format hh:mm
    const currentTime = new Date().toLocaleTimeString('it-IT', {
      hour: '2-digit',
      minute: '2-digit',
    });
  
  if (mappedDataArray?.length > 0) {
    return (

      <div className="container container-shadow" style={{ borderRadius: '5px', padding: '20px' }}>
    <div className="d-flex justify-content-between mx-3">
      <div>
        <div className="date-container">
        {next7Days.map((date, index) => {
  const formattedDate = `${date.toLocaleDateString('en-US', { weekday: 'short' })} ${date.getDate()}`;
  const isActive = selectedDate === date.toLocaleDateString('en-CA');
  return (
    <div
      key={index}
      className={`date-item ${isActive ? 'active-date' : 'not-active-date'}`}
      onClick={() => handleDateClick(date)}
      style={{ padding: '10px', cursor: 'pointer' }}
    >
      {formattedDate}
    </div>
  );
})}

          <CalendarTodayIcon
            style={{ color: 'white', marginTop: '15px', cursor: 'pointer', marginLeft: '1px', fontSize: '13.5px' }}
            onClick={handleIconClick}
          />
        </div>
      </div>
      {showCalendar && (
        <div className="calendar-container">
          <Calendar
            minDate={new Date()}
            onClickDay={handleDateClick}
            value={selectedDate}
            tileContent={tileContent}
            tileClassName={tileClassName}
          />
        </div>
      )}
      <div data-toggle="modal" data-target="#exampleModal" style={{ cursor: "pointer" }} className="add-slot btn">
        <AddIcon />
      </div>
    </div>

    <div className="container schedule-outer-container">
      <h5 className="time-slots-heading mx-1">Time Slots</h5>
      <div className="schedule-container">
      {filteredDataArray?.map((data, index) => {
// Format the start and end dates
const startDate = new Date(data?.start);
const endDate = new Date(data?.end);

// Format the date and time
const formattedDate = startDate.toLocaleDateString('en-CA'); // Use 'en-CA' for consistent date representation
const startTime = startDate.toLocaleTimeString();
const endTime = endDate.toLocaleTimeString();

return (
  <div
    className="schedule-box"
    style={{ border: "1px solid #9e9eda", borderRadius: "10px" }}
    key={index}
  >
    <div className="d-flex justify-content-between align-items-center" style={{ padding: "1rem" }}>
      <span>{startTime}</span> {/* Display the start and end times */}
      <span>{endTime}</span> {/* Disspanlay the formatted date */}
    </div>
  </div>
);
})}

        {filteredDataArray?.length === 0 && (
          <div className="add-slot-container">
            <AddIcon  className="add-slot-icon" data-toggle="modal" data-target="#exampleModal" />
            <p className="add-slot-text">Add Slot</p>
          </div>
        )}
      </div>
    </div>

    <div className="modal fade" id="exampleModal" style={{ top: '5%' }} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <form>
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Add Slot</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="start_time">Start Time</label>
                <TextField
                  id="start_time"
                  type="time"
                  name="start_time"
                  value={state.start_time}
                  onChange={handleChange}
                  fullWidth

                  inputProps={{
                    min: isToday ? currentTime : '00:00', // Restrict past time if the date is today
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="end_time">End Time</label>
                <TextField
                  id="end_time"
                  type="time"
                  name="end_time"
                  value={state.end_time}
                  onChange={handleChange}
                  fullWidth
                  inputProps={{
                    min: isToday ? currentTime : '00:00', // Restrict past time if the date is today
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="date">Date</label>
                <TextField
                  id="date"
                  type="date"
                  name="date"
                  value={state.date}
                  onChange={handleChange}
                  fullWidth
                  inputProps={{
                    min: isToday ? currentTime : '00:00', // Restrict past time if the date is todays
                  }}
                />
              </div>
            </div>
            <div className="modal-footer">
              <Button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleClose}>Close</Button>
              <Button type="button" className="btn btn-primary" onClick={handleSubmit}>Save</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
   
    );
  } else {
    return <p>Please Wait</p>;
  }

}

export default Hiu;













// import { Button, DialogActions, TextField } from "@mui/material";
// import { AxiosError } from "axios";
// import React, { useState } from "react";
// import toast from "react-hot-toast";
// import { httpForToastRequest } from "../Api/BaseApi";
// import { useAppContext } from "../context/AppContext";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCalendarPlus } from '@fortawesome/free-regular-svg-icons';
// import { faPlus } from '@fortawesome/free-solid-svg-icons';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';


// const generateNext7Days = () => {
//   const today = new Date();
//   return Array.from({ length: 7 }, (_, i) => {
//     const date = new Date(today);
//     date.setDate(today.getDate() + i);
//     return date;
//   });
// };

// function Hiu({ scheduler }) {
//   const { mappedDataArray } = useAppContext();
//   const [showCalendar, setShowCalendar] = useState(false);
//   const [state, setState] = useState({
//     start_time: null,
//     end_time: null,
//     date: null,
//   });
//   const [error, setError] = useState("");
//   const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

//   const handleChange = (value, name) => {
//     setState(prev => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async () => {
//     const { start_time, end_time, date } = state;

//     if (!start_time || !end_time || !date) {
//       toast.error("Please Fill All Fields");
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append("start_time", start_time);
//       formData.append("end_time", end_time);
//       formData.append("date", date);

//       await toast.promise(
//         httpForToastRequest({
//           path: "/store-schedule",
//           method: "POST",
//           data: formData,
//         }),
//         {
//           loading: "Loading...",
//           success: (res) => {
//             setScheduleData([]);
//             if (res.status === 200) {
//               fetchAuthUser();
//               return <b>{JSON.stringify(res.message)}</b>;
//             }
//             setIsLoading(false);
//           },
//           error: (err) => {
//             setIsLoading(false);
//             if (err instanceof AxiosError) {
//               if (err.response.status === 500) {
//                 return <b>{"Server Error Please Wait a moment"}</b>;
//               }
//               if (err.response.status === 400) {
//                 return <b>{JSON.stringify(err.response.data.message)}</b>;
//               }
//             }
//           },
//         }
//       );
//       scheduler.loading(true);
//       const addedUpdatedEvent = await new Promise((res) => {
//         // simulate async operation
//         setTimeout(() => {
//           const mappedDataArray = scheduleData.map((data, index) =>
//             data.date != null ? {
//               event_id: data?.id || index,
//               start: new Date(`${data.date}T${data.start_time}`),
//               end: new Date(`${data.date}T${data.end_time}`),
//             } : null
//           );
//           res(mappedDataArray);
//         }, 3000);
//       });

//       scheduler.onConfirm(addedUpdatedEvent, event ? "edit" : "create");
//       scheduler.close();
//     } finally {
//       scheduler.loading(false);
//     }
//   };

//   const handleIconClick = () => {
//     setShowCalendar(!showCalendar);
//   };

//   const handleDateChange = (event) => {
//     setSelectedDate(event.target.value);
//   };

//   const handleDateClick = (date) => {
//     const dateString = date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
//     setSelectedDate(dateString);
//   };

//   // Check if the date is selected
//   const isDateSelected = (date) => {
//     return date.toISOString().split('T')[0] === selectedDate;
//   };

//   // Filter the data based on the selected date
//   const filteredDataArray = mappedDataArray?.filter((data) => {
//     const dataDate = new Date(data?.start).toISOString().split('T')[0];
//     return dataDate === selectedDate;
//   });

//   console.log("filteredDataArray: " , filteredDataArray);
  
//   const handleClose = () => {
//     setShowCalendar(false);
//     setSelectedDate('');
//     setState({
//       start_time: null,
//       end_time: null,
//       date: null,
//     });
//   };

//   // Example: Add custom content to specific dates
//   const tileContent = ({ date, view }) => {
//     if (view === 'month' && date.getDay() === 0) {
//       return <p style={{ color: 'black' }}></p>; // Star icon on Sundays
//     }
//   };

//   // Example: Add a custom class to specific dates
//   const tileClassName = ({ date, view }) => {
//     if (view === 'month' && date.getDate() === 1) {
//       return 'special-day'; // Custom class for the 1st day of the month
//     }
//   };

//   const next7Days = generateNext7Days();

//   if (mappedDataArray?.length > 0) {
//     return (
//       <div className="container container-shadow" style={{ borderRadius: '5px', padding: '10px' }}>
      
//         <div className="d-flex justify-content-between mx-3">
//           <div>
//             <div className="date-container">
//             {next7Days.map((date, index) => {
//   const formattedDate = `${date.toLocaleDateString('en-US',{ weekday: 'short' })} ${date.getDate()}`;
//   const isActive = isDateSelected(date);
//   return (
//     <div
//       key={index}
//       className={`date-item ${isActive ? 'active-date' : 'not-active-date'}`}
//       onClick={() => handleDateClick(date)}
//       style={{ padding: '10px', cursor: 'pointer' }}
//     >
//       {formattedDate}
//     </div>
//   );
// })}


//      <FontAwesomeIcon
//       icon={faCalendarPlus} style={{color:'white ' , marginTop:'15px',cursor:'pointer' , marginLeft:'1px' , fontSize:'13.5px'}} onClick={handleIconClick}/>
//             </div>
//           </div>
//           {showCalendar && (
//             <div className="calendar-container">
//               <Calendar
//                 // onChange={handleDateChange}
//                 // value={selectedDate}
//                 minDate={new Date()}
//                 onClickDay={handleDateClick}
//                 tileContent={tileContent}
//                 tileClassName={tileClassName}
//               />
//             </div>
//           )}
//           <div data-toggle="modal" data-target="#exampleModal" style={{ cursor: "pointer" }} className="add-slot btn">
//             <FontAwesomeIcon icon={faPlus} />
//           </div>
//         </div>


//         <div className="container schedule-outer-container">
//           <h5 className="time-slots-heading mx-1">Time Slots</h5>
//           <div className="schedule-container">
//             {filteredDataArray?.map((data, index) => (
//               <div
//                 className="schedule-box"
//                 style={{ border: "1px solid #9e9eda", borderRadius: "10px" }}
//                 key={index}
//               >
//                 <div className="d-flex justify-content-between align-items-center" style={{ padding: "1rem" }}>
//                   <span>{new Date(data?.start).toLocaleTimeString()}</span>
//                   <span>{new Date(data?.end).toLocaleTimeString()}</span>
//                 </div>
//               </div>
//             ))}
//             {filteredDataArray?.length === 0 && (
//               <div className="add-slot-container">
//                 <FontAwesomeIcon icon={faPlus} className="add-slot-icon" data-toggle="modal" data-target="#exampleModal" />
//                 <p className="add-slot-text">Add Slot</p>
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="modal fade" id="exampleModal" style={{ top: '5%' }} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
//           <div className="modal-dialog" role="document">
//             <div className="modal-content">
//               <form>
//                 <div className="modal-header">
//                   <h5 className="modal-title" id="exampleModalLabel">Add Slot</h5>
//                   <button type="button" className="close" data-dismiss="modal" aria-label="Close">
//                     <span aria-hidden="true">&times;</span>
//                   </button>
//                 </div>
//                 <div className="modal-body">
//                   <div style={{ padding: "1rem" }}>
//                     <label htmlFor="">Start Time</label>
//                     <TextField
//                       type="time"
//                       value={state.start_time}
//                       onChange={(e) => handleChange(e.target.value, "start_time")}
//                       fullWidth
//                       InputProps={{ placeholder: "HH:MM" }}
//                     />
//                     <label htmlFor="">End Time</label>
//                     <TextField
//                       type="time"
//                       value={state.end_time}
//                       onChange={(e) => handleChange(e.target.value, "end_time")}
//                       fullWidth
//                       InputProps={{ placeholder: "HH:MM" }}
//                     />
//                     <label htmlFor="">Date</label>
//                     <TextField
//                       type="date"
//                       value={state.date}
//                       onChange={(e) => handleChange(e.target.value, "date")}
//                       fullWidth
//                       InputProps={{ placeholder: "YYYY-MM-DD" }}
//                     />
//                   </div>
//                 </div>
//                 <div className="modal-footer">
//                   <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleClose}>Close</button>
//                   <button type="button" className="btn" style={{ backgroundColor: '#ac04fc', color: 'white' }} onClick={handleSubmit}>Save changes</button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   } else {
//     return <p>Please Wait</p>;
//   }
// }

// const generateNext7Days = () => {
//   const today = new Date();
//   return Array.from({ length: 7 }, (_, i) => {
//     const date = new Date(today);
//     date.setDate(today.getDate() + i);
//     return date;
//   });
// };

// function Hiu({scheduler}) {
//   const { mappedDataArray } = useAppContext();
//   const [showCalendar, setShowCalendar] = useState(false);
  
//   console.log("mappedDataArray: " , mappedDataArray);
  

//   const [state, setState] = useState({
//     start_time: null,
//     end_time: null,
//     date: null,
//   });

//   const [error, setError] = useState("");

//   const handleChange = (value, name) => {
//     setState((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   console.log("State: ",state);
  
//   const handleSubmit = async () => {
//     const start_time = state.start_time;
//     const end_time = state.end_time;
//     const date = state.date;

//     if (!start_time || !end_time || !date) {
//       toast.error("Please Fill All Fields");
//       return;
//     }
//     try {
//       const formData = new FormData();
//       formData.append("start_time", state.start_time);
//       formData.append("end_time", state.end_time);
//       formData.append("date", state.date);
//       await toast.promise(
//         httpForToastRequest({
//           path: "/store-schedule",
//           method: "POST",
//           data: formData,
//         }),
//         {
//           loading: "Loading...",
//           success: (res) => {
//             setScheduleData([]);
//             console.log(res.message);
//             if (res.status == 200) {
//               fetchAuthUser();
//               return <b>{JSON.stringify(res["message"])}</b>;
//             }
//             setIsLoading(false);
//           },
//           error: (err) => {
//             setIsLoading(false);
//             if (err instanceof AxiosError) {
//               if (err.response.status == 500) {
//                 return <b>{"Server Error Please Wait while a moment"}</b>;
//               }
//               if (err.response.status == 400) {
//                 return <b>{JSON.stringify(err.response.data["message"])}</b>;
//               }
//             }
//           },
//         }
//       );
//       scheduler.loading(true);
//       console.log("werety56yu6yk89p908kjtgrf", scheduleData);
//       const added_updated_event = await new Promise((res) => {
//         //   setTimeout(() => {
//         //     const mappedDataArray = scheduleData.map(
//         //       (data, index) =>
//         //         data.date !=null && {
//         //           event_id: data?.id || index,
//         //           start: new Date(`${data.date}T${data.start_time}`),
//         //           end: new Date(`${data.date}T${data.end_time}`),
//         //         }
//         //     );
//         //     if(mappedDataArray){
//         //     res(mappedDataArray);
//         //     }
//         //   }, 3000);
//       });

//       scheduler.onConfirm(added_updated_event, event ? "edit" : "create");
//       scheduler.close();
//     } finally {
//       scheduler.loading(false);
//     }
//   };
//   const handleIconClick = () => {
//     setShowCalendar(!showCalendar);
//     // setTimeout(() => {
//     //   document.getElementById('date-input').focus();
//     // }, 0);
//   };

//   const [selectedDate, setSelectedDate] = useState(new Date());

//   const handleDateChange = (event) => {
//     setSelectedDate(new Date(event.target.value));
//   };
  
//   const fetchData = async () => {
//     mappedDataArray
//   }
//   const handleDateClick = (date) => {
//     const dateString = date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
//     // alert(dateString);
//     fetchData();
//     setSelectedDate(new Date(date));
//   };
//   // The handleIconClick and other functions should be defined here as well
//   const isDateSelected = (date) => {
//     return date.toISOString().split('T')[0] === selectedDate;
//   };
//   // Filter the data based on the selected date
//   const filteredDataArray = mappedDataArray?.filter((data) => {
//     const dataDate = new Date(data?.start).toDateString();
//     return dataDate === selectedDate.toDateString();
//   });

//   const handleClose = () => {
//     setShowCalendar(false);
//     setSelectedDate(new Date());
//     setState({
//       start_time: null,
//       end_time: null,
//       date: null,
//     });
//   };


//   const next7Days = generateNext7Days();


  // if (mappedDataArray?.length > 0) {
  //   return (

     
   
  //   );
  // } else {
  //   return <p>Please Wait</p>;
  // }
// }

// export default Hiu;



// const CustomEditor = ({ scheduler }) => {
//   const event = scheduler.edited;
//   const { scheduleData, setScheduleData, fetchAuthUser } = useAppContext();

//   const [isLoading, setIsLoading] = useState(false);
//   const [progresss, setProgress] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [isPreLoading, setIsPreLoading] = useState(false);

//   const [state, setState] = useState({
//     start_time: null,
//     end_time: null,
//     date: null,
//   });

//   const [error, setError] = useState("");

//   const handleChange = (value, name) => {
//     setState((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async () => {
//     const start_time = state.start_time;
//     const end_time = state.end_time;
//     const date = state.date;

//     if (!start_time || !end_time || !date) {
//       toast.error("Please Fill All Fields");
//       return;
//     }
//     try {
//       const formData = new FormData();
//       formData.append("start_time", state.start_time);
//       formData.append("end_time", state.end_time);
//       formData.append("date", state.date);
//       await toast.promise(
//         httpForToastRequest({
//           path: "store-schedule",
//           method: "POST",
//           data: formData,
//         }),
//         {
//           loading: "Loading...",
//           success: (res) => {
//             setScheduleData([]);
//             console.log(res.message);
//             if (res.status == 200) {
//               fetchAuthUser();
//               return <b>{JSON.stringify(res["message"])}</b>;
//             }
//             setIsLoading(false);
//           },
//           error: (err) => {
//             setIsLoading(false);
//             if (err instanceof AxiosError) {
//               if (err.response.status == 500) {
//                 return <b>{"Server Error Please Wait while a moment"}</b>;
//               }
//               if (err.response.status == 400) {
//                 return <b>{JSON.stringify(err.response.data["message"])}</b>;
//               }
//             }
//           },
//         }
//       );
//       scheduler.loading(true);
//       console.log("werety56yu6yk89p908kjtgrf", scheduleData);
//       const added_updated_event = await new Promise((res) => {
//         //   setTimeout(() => {
//         //     const mappedDataArray = scheduleData.map(
//         //       (data, index) =>
//         //         data.date !=null && {
//         //           event_id: data?.id || index,
//         //           start: new Date(`${data.date}T${data.start_time}`),
//         //           end: new Date(`${data.date}T${data.end_time}`),
//         //         }
//         //     );
//         //     if(mappedDataArray){
//         //     res(mappedDataArray);
//         //     }
//         //   }, 3000);
//       });

//       scheduler.onConfirm(added_updated_event, event ? "edit" : "create");
//       scheduler.close();
//     } finally {
//       scheduler.loading(false);
//     }
//   };
//   return (
//     <div>
//       <div style={{ padding: "1rem", width: "400px" }}>
//         <label htmlFor="">Start Date and Time</label>
//         <label htmlFor="">Start Time</label>
//         <TextField
//           // label="Start Time"
//           type="time"
//           value={state.start_time}
//           onChange={(e) => handleChange(e.target.value, "start_time")}
//           fullWidth
//           InputProps={{ placeholder: "HH:MM" }}
//         />

//         <label htmlFor="">End Time</label>
//         <TextField
//           // label="End Time"
//           type="time"
//           value={state.end_time}
//           onChange={(e) => handleChange(e.target.value, "end_time")}
//           fullWidth
//           InputProps={{ placeholder: "HH:MM" }}
//         />

//         <label htmlFor="">Date</label>
//         <TextField
//           // label="Date"
//           type="date"
//           value={state.date}
//           onChange={(e) => handleChange(e.target.value, "date")}
//           fullWidth
//           InputProps={{ placeholder: "YYYY-MM-DD" }}
//         />
//       </div>
//       <DialogActions>
//         <Button onClick={scheduler.close}>Cancel</Button>
//         <Button onClick={handleSubmit}>Confirm</Button>
//       </DialogActions>
//     </div>
//   );
// };

