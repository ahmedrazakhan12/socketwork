// import Chip from '@mui/material/Chip';
import Chip from '@mui/material-next/Chip';
import React from 'react';
import { extractTimeFromDate, formatDate, getDateDifference } from '../utils/helpers';




// const [open, setOpen] = useState(false);

// export const AllApointmentsDataColumns = [
//   { field: "id", headerName: "ID", width: 150 },
//   // { field: "expert_name", headerName: "Expert", width: 130 },
//   { field: "user_name", headerName: "Caller", width: 150 },
//   {
//     field: 'status',
//     headerName: 'Status',
//     width: 150,
//     editable: true,
//     renderCell: (params) => {
//       const status = params.value;
//       let chipColor = 'default';

//       if (status === 'accepted') {
//         chipColor = 'success';
//       } else if (status === 'pending' || status === 'today') {
//         chipColor = 'primary';
//       } else if (status === 'completed') {
//         chipColor = 'success';
//       } else if (status === 'rejected') {
//         chipColor = 'tertiary';
//       }
//       return (
//         <div>
//           <Chip
//             label={status}
//             color={chipColor}
//             variant="elevated"
//             size="medium"
//             style={{
//               fontFamily: 'inherit',
//               width: '100px',
//               boxShadow: '0px 0px 0px 0px',
//             }}
//           />
//         </div>
//       );
//     },
//   },
//   { field: "amount", headerName: "Amount", width: 130, editable: true },
//   { field: "time", headerName: "Time", width: 130, editable: true },
//   { field: "date", headerName: "Date", width: 130, editable: true },
//   {
//     field: "accept",
//     headerName: "Accept",
//     width: 100,
//     renderCell: (params) => {
//       const { handleUpdateAppointment } = useAppContext();
//       const status = "accepted";

//       if (params.row.status !== "accepted" && params.row.status !== "rejected") {
//         return (
//           <CheckIcon
//             style={{ cursor: "pointer", color: 'green' }}
//             onClick={() => handleUpdateAppointment(params.row.id, status)}
//           />
//         );
//       }

//       return null;
//     },
//   },
//   {
//     field: "reject",
//     headerName: "Reject",
//     width: 100,
//     renderCell: (params) => {
//       const { handleUpdateAppointment } = useAppContext();
//       const status = "rejected";

//       if (params.row.status !== "rejected" && params.row.status !== "completed") {
//         return (
//           <CloseIcon
//             style={{ cursor: "pointer", color: 'red' }}
//             onClick={() => handleUpdateAppointment(params.row.id, status)}
//           />
//         );
//       }

//       return null;
//     },
//   },
// ];





// export const RequestColumns = [
//   { field: "id", headerName: "ID", width: 300 },
//   { field: "category_id", headerName: "Category", width: 300 },
//   { field: "reason", headerName: "Reason", width: 300 },

//   {
//     field: 'status',
//     headerName: 'Status',
//     width: 230,
//     renderCell: (params) => {
//       const { handleMessageShow} = useAppContext();

//       const status = params.value;
//       let chipColor = 'default';

//       // Set the chip color based on the status value
//       if (status === 'waiting') {
//         chipColor = 'primary';
//       } else if (status === 'open') {
//         chipColor = 'success';
//       } else if (status === 'closed') {
//         chipColor = 'tertiary';
//       }
//       return (
//         <div onClick={(e)=>{handleMessageShow(params.row.id,params.row.status)}}>
//           <Chip
//             label={status}
//             color={chipColor}
//             variant="elevated"
//             size="medium"
//             style={{
//               fontFamily:'inherit',
//               width :'100px',
//               boxShadow : '0px 0px 0px 0px'

//             }}
//           />
//         </div>
//       )}
//   },

// ];




export const transactionsColumns = [
  { field: "amount", headerName: "Amount", width: 300 },
  { field: "description", headerName: "Description", width: 300 },
  {
    field: "datetime",
    headerName: "Datetime",
    type: "date",
    width: 400,
    editable: false,
    valueGetter: (params) => {
      const dateString = params.row.datetime;
      const dateParts = dateString.split(" ");
      const date = dateParts[0];
      const time = dateParts[1];
      const dateSplit = date.split("-");
      const timeSplit = time.split(":");
      const year = parseInt(dateSplit[0], 10);
      const month = parseInt(dateSplit[1], 10) - 1;
      const day = parseInt(dateSplit[2], 10);
      const hours = parseInt(timeSplit[0], 10);
      const minutes = parseInt(timeSplit[1], 10);
      const seconds = parseInt(timeSplit[2], 10);
      return new Date(year, month, day, hours, minutes, seconds);
    },
  },

];








export const withdrawsColumns = [
  { field: 'amount', headerName: 'Amount', width: 300 },
  { field: 'description', headerName: 'Description', width: 300 },
  {
    field: 'status',
    headerName: 'Status',
    width: 400,
    editable: true,
    renderCell: (params) => {
      const status = params.value;
      let chipColor = 'default';

      if (status === 'completed') {
        chipColor = 'success';
      } else if (status === 'Rejected') {
        chipColor = 'tertiary';
      } else if (status === 'pending') {
        chipColor = 'primary';
      }

      return (
        <Chip
          label={status}
          color={chipColor}
          variant="elevated"
          size="medium"
          style={{
            fontFamily: 'inherit',
            width: '120px',
            boxShadow: '0px 0px 0px 0px'
          }}
        />
      );
    },
  },

];
export const ProfilesubscriptionColumns = [
  {
    field: 'name',
    headerName: 'Name',
    width: 180,
    editable: false,
    renderCell: (params) => {
      const name = params.row.promote_package?.name;
      return <div>{name}</div>
    },
  },
  // { field: 'country', headerName: 'Country', width: 100 },
  { field: 'category', headerName: 'Category', width: 200 },
  { field: 'days', headerName: 'Days', width: 100 },
  { field: 'budget', headerName: 'Budget', width: 100 },
  {
    field: "start_date", headerName: "Start date", renderCell: (params) => {
      return (
        formatDate(params?.row?.start_date))
    }, width: 160, editable: false
  },
  {
    field: "end_date", headerName: "End date", renderCell: (params) => {
      return (
        formatDate(params?.row?.end_date))
    }, width: 160, editable: false
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 200,
    editable: false,
    renderCell: (params) => {
      const status = params.value;
      let chipColor = 'default';
      let chipValue = '';

      if (status == '1') {
        chipColor = 'success';
        chipValue = 'Ongoing';

      } else if (status == '0') {
        chipColor = 'tertiary';
        chipValue = 'Expired';

      }
      return (
        <Chip
          label={chipValue}
          color={chipColor}
          variant="elevated"
          size="medium"
          style={{
            fontFamily: 'inherit',
            width: '100px',
            boxShadow: '0px 0px 0px 0px'
          }}
        />
      );
    },
  },

];

export const subscriptionColumns = [
  {
    field: 'name',
    headerName: 'Name',
    width: 180,
    editable: false,
    renderCell: (params) => {
      const name = params.row.subscription_package?.name;
      return <div>{name}</div>
    },
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 150,
    editable: false,
    renderCell: (params) => {
      const description = params.row.subscription_package?.description;
      return <div>{description}</div>
    },
  },
  {
    field: 'duration',
    headerName: 'Days',
    width: 100,
    editable: false,
    renderCell: (params) => {
      const duration = params.row.subscription_package?.duration;
      return <div>{duration}</div>
    },
  },
  { field: 'amount', headerName: 'Budget', width: 100 },
  {
    field: "start_date", headerName: "Start date", renderCell: (params) => {
      return (
        formatDate(params?.row?.start_date))
    }, width: 160, editable: false
  },
  {
    field: "end_date", headerName: "End date", renderCell: (params) => {
      return (
        formatDate(params?.row?.end_date))
    }, width: 160, editable: false
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 200,
    editable: false,
    renderCell: (params) => {
      const status = params.value;
      let chipColor = 'default';
      let chipValue = '';

      if (status == '1') {
        chipColor = 'success';
        chipValue = 'Ongoing';

      } else if (status == '0') {
        chipColor = 'tertiary';
        chipValue = 'Expired';

      }
      return (
        <Chip
          label={chipValue}
          color={chipColor}
          variant="elevated"
          size="medium"
          style={{
            fontFamily: 'inherit',
            width: '100px',
            boxShadow: '0px 0px 0px 0px'
          }}
        />
      );
    },
  },

];







export const callLogsColumns = [
  // { field: "duration", headerName: "Duration", width: 200 },
  // { field: "ended_at", headerName: "Date", width: 200 },
  // { field: "started_at", headerName: "Start Time", width: 200 },
  // { field: "receiver_name", headerName: "receiver_name", width: 200 },

  {
    field: "receiver_name", renderCell: (params) => {
      return (
        (params?.row?.receiver_name)
      )
    }, width: 160, editable: false
    , headerName: "Caller",
  },
  {
    field: "started_at", renderCell: (params) => {
      return (

        extractTimeFromDate(params?.row?.started_at)
      )
    }, width: 160, editable: false
    , headerName: "Start Time", 
  },
  {
    field: "call_type", renderCell: (params) => {
      return (

        (params?.row?.call_type)
      )
    }, width: 160, editable: false, headerName: "Call Type"
  },

  {
    field: "ended_at", renderCell: (params) => {
      return (

        extractTimeFromDate(params?.row?.ended_at)
      )
    }, headerName: "End Time", width: 160
  },
  {
    field: "duratiohn", renderCell: (params) => {
      return getDateDifference(params?.row?.started_at, params?.row?.ended_at)
    }, headerName: "Call Duration", width: 160
  },
  {
    field: "date", renderCell: (params) => {
      return formatDate(params?.row?.started_at)
    }, headerName: "Date", width: 160
  },
];




export const EVENTS = [
  {
    event_id: 1,
    start: new Date("2023 10 2 09:30"),
    end: new Date("2023 10 2 10:30")
  },
  {
    event_id: 2,
    start: new Date("2023 10 4 10:00"),
    end: new Date("2023 10 4 11:00")
  },
  {
    event_id: 3,
    start: new Date("2023 10 27 09:00"),
    end: new Date("2023 10 28 10:00")
  },
  {
    event_id: 4,
    start: new Date("2023 10 4 9:00"),
    end: new Date("2023 10 4 10:36")
  },
  {
    event_id: 5,
    start: new Date("2023 5 1 10:00"),
    end: new Date("2023 5 18 11:00")
  },
  {
    event_id: 6,
    start: new Date("2023 5 2 11:00"),
    end: new Date("2023 5 2 12:00")
  },
  {
    event_id: 7,
    start: new Date("2023 5 1 12:00"),
    end: new Date("2023 5 1 13:00")
  },
  {
    event_id: 8,
    start: new Date("2023 5 1 13:00"),
    end: new Date("2023 5 1 14:00")
  },

];
