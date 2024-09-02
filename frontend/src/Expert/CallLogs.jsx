import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { useAppContext } from "../context/AppContext";
import { extractTimeFromDate, formatDate, getCallLogsForUser, getDateDifference } from "../utils/helpers";
import Header from "./components/Header";
import DataTable from "./components/Table";

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

function CallLogs() {
  const [activeTab, setActiveTab] = useState("Call Logs");
  const [CallLogs, setCallLogs] = useState([]);
  const { authUser } = useAppContext();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    getCallLogsForUser().then((_) => setCallLogs(_?.data?.call_logs));
  }, []);
  const callLogsDataRows = CallLogs || [];

  const callLogsCols = [
    // { field: "duration", headerName: "Duration", width: 200 },
    // { field: "ended_at", headerName: "Date", width: 200 },
    // { field: "started_at", headerName: "Start Time", width: 200 },
    // { field: "receiver_name", headerName: "receiver_name", width: 200 },

    {
      field: "receiver_name",
      renderCell: (params) => {
        if (params?.row?.receiver_name) {
          return params?.row?.receiver_name;
        }
        if (authUser?.user?.user_type == "user") {
          return "You";
        }
        if (authUser?.user?.user_type == "expert") {
          return authUser?.user?.name;
        }
      },
      width: 160,
      editable: false,
      headerName: "Caller",
    },
    {
      field: "started_at",
      renderCell: (params) => {
        return extractTimeFromDate(params?.row?.started_at);
      },
      width: 160,
      editable: false,
      headerName: "Start Time",
    },
    {
      field: "call_type",
      renderCell: (params) => {
        return params?.row?.call_type;
      },
      width: 160,
      editable: false,
      headerName: "Call Type",
    },

    {
      field: "ended_at",
      renderCell: (params) => {
        return extractTimeFromDate(params?.row?.ended_at);
      },
      headerName: "End Time",
      width: 160,
    },
    {
      field: "duratiohn",
      renderCell: (params) => {
        return getDateDifference(
          params?.row?.started_at,
          params?.row?.ended_at
        );
      },
      headerName: "Call Duration",
      width: 160,
    },
    {
      field: "date",
      renderCell: (params) => {
        return formatDate(params?.row?.started_at);
      },
      headerName: "Date",
      width: 160,
    },
  ];
  return (
    <div div className="min-h-screen bg-gray-100">
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
                  <h5> My Call Logs </h5>
                  <div className="tk-search-wrapper" data-select2-id="9"></div>
                </div>
              </div>

              <div className="tk-submitreview">
                {activeTab == "Call Logs" &&
                  (authUser.user?.call_logs.length > 0 ? (
                    <DataTable
                      title={`My Call Logs`}
                      columns={callLogsCols}
                      rows={callLogsDataRows}
                    />
                  ) : (
                    <div className="d-flex justify-content-center align-items-center" style={{height:"100%"}}><h6>No Call logs Data Found</h6>
        </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default CallLogs;
// import React, { useEffect, useState } from 'react';
// import socketIO from '../socket/socket';

// const CallLogs = () => {
//   const [callLogs, setCallLogs] = useState([]);
//   const [totalDuration, setTotalDuration] = useState(0);

//   useEffect(() => {
//     // Event listeners for incoming calls and accepted calls
//     socketIO.on('makeCallFromSever', (data) => {
//       const startTime = new Date();
//       addCallLog(`Outgoing call to ${data.userId} - Peer ID: ${data.peerId}`, startTime);
//     });

//     socketIO.on('acceptedFromServer', (data) => {
//       const endTime = new Date();
//       addCallLog(`Incoming call from ${data.fromId} - Peer ID: ${data.peerId}`, null, endTime);
//     });

//     return () => {
//       socketIO.off('makeCallFromSever');
//       socketIO.off('acceptedFromServer');
//     };
//   }, [socketIO]);

//   const addCallLog = (log, startTime, endTime) => {
//     setCallLogs((prevLogs) => [...prevLogs, { log, startTime, endTime }]);

//     if (startTime && endTime) {
//       const duration = endTime - startTime;
//       setTotalDuration((prevDuration) => prevDuration + duration);
//     }
//   };

//   return (
//     <div>
//       <h1>Call Logs</h1>
//       <p>Total Duration: {totalDuration} milliseconds</p>
//       <ul>
//         {callLogs.map((logItem, index) => (
//           <li key={index}>
//             {logItem.log}
//             {logItem.startTime && (
//               <span>Started at: {logItem.startTime.toLocaleString()}</span>
//             )}
//             {logItem.endTime && (
//               <span>Ended at: {logItem.endTime.toLocaleString()}</span>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default CallLogs;
