import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { DataGrid, GridOverlay } from "@mui/x-data-grid";
import React from "react";

const CustomNoRowsOverlay = styled(GridOverlay)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  "& .MuiTypography-root": {
    marginTop: theme.spacing(1),
  },
}));
function DataTable({ title, columns, rows, setOpen }) {
  // const columns = [
  //   { field: "id", headerName: "ID", width: 70 },
  //   { field: "expert_id", headerName: "Expert_id", width: 130 },
  //   { field: "user_id", headerName: "User_id", width: 130 },
  //   { field: "status", headerName: "Status", width: 130 },
  //   { field: "amount", headerName: "Amount", width: 130, editable: true },
  //   {
  //     field: "datetime",
  //     headerName: "Datetime",
  //     type: "date",
  //     width: 130,
  //     editable: true,
  //     valueGetter: (params) => {
  //       const dateString = params.row.datetime;
  //       const dateParts = dateString.split("/");
  //       const year = parseInt(dateParts[2], 10);
  //       const month = parseInt(dateParts[1], 10) - 1;
  //       const day = parseInt(dateParts[0], 10);
  //       return new Date(year, month, day);
  //     },
  //   },
  //   {
  //     field: "duration",
  //     headerName: "Duration",
  //     description: "This column has a value getter and is not sortable.",
  //     sortable: false,
  //     width: 160,
  //     valueGetter: (params) =>
  //       `${params.row.expert_id || ""} ${params.row.user_id || ""}`,
  //   },
  //   {
  //     field: "edit",
  //     headerName: "Edit",
  //     width: 90,
  //     renderCell: (params) => (
  //       <div>
  //         <EditIcon
  //           style={{ cursor: "pointer" }}
  //           onClick={() => handleEdit(params.row.id)}
  //         />
  //       </div>
  //     ),
  //   },
  //   {
  //     field: "delete",
  //     headerName: "Delete",
  //     width: 90,
  //     renderCell: (params) => (
  //       <div>
  //         <DeleteIcon
  //           style={{ cursor: "pointer" }}
  //           onClick={() => handleDelete(params.row.id)}
  //         />
  //       </div>
  //     ),
  //   },
  // ];

  // const initialRows = [
  //   {
  //     id: 1,
  //     expert_id: "Snow",
  //     user_id: "Jon",
  //     status: "35",
  //     amount: "Snow",
  //     datetime: "02/20/2023",
  //     duration: "35",
  //   },
  //   {
  //     id: 2,
  //     expert_id: "Snow",
  //     user_id: "Jon",
  //     status: "35",
  //     amount: "Snow",
  //     datetime: "02/20/2023",
  //     duration: "35",
  //   },
  //   {
  //     id: 3,
  //     expert_id: "Snow",
  //     user_id: "Jon",
  //     status: "35",
  //     amount: "Snow",
  //     datetime: "02/20/2023",
  //     duration: "35",
  //   },
  //   {
  //     id: 4,
  //     expert_id: "Snow",
  //     user_id: "Jon",
  //     status: "35",
  //     amount: "Snow",
  //     datetime: "02/20/2023",
  //     duration: "35",
  //   },
  //   {
  //     id: 5,
  //     expert_id: "Snow",
  //     user_id: "Jon",
  //     status: "35",
  //     amount: "Snow",
  //     datetime: "02/20/2023",
  //     duration: "35",
  //   },
  //   {
  //     id: 6,
  //     expert_id: "Snow",
  //     user_id: "Jon",
  //     status: "35",
  //     amount: "Snow",
  //     datetime: "02/20/2023",
  //     duration: "35",
  //   },
  //   {
  //     id: 7,
  //     expert_id: "Snow",
  //     user_id: "Jon",
  //     status: "35",
  //     amount: "Snow",
  //     datetime: "02/20/2023",
  //     duration: "35",
  //   },
  //   {
  //     id: 8,
  //     expert_id: "Snow",
  //     user_id: "Jon",
  //     status: "35",
  //     amount: "Snow",
  //     datetime: "02/20/2023",
  //     duration: "35",
  //   },
  // ];
  const handleEdit = (id) => {
    setOpen(true);
    console.log(`Edit button clicked for row with ID ${id}`);
  };

  const handleDelete = (id) => {
    // const updatedRows = rows.filter((row) => row.id !== id);
    // setRows(updatedRows);
    console.log(`Delete button clicked for row with ID ${id}`);
  };

  // const [rows, setRows] = useState(initialRows);
  const reversedData = rows ? [...rows].reverse() : [];
  return (
    <>
      {reversedData.length > 0 ?
     <>
      <div style={{height:'400px',width:'100%'}}>
        <div className="d-flex justify-content-start align-items-start">
        <h4
          className="mb-2 text-left text-capitalize "
          style={{ textAlign: "left" }}
        >
          {" "}
          {title}
        </h4>
        </div>
        
        <DataGrid
          rows={reversedData}
          columns={columns}
          // editMode="cell"
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          componentsProps={{
            noRowsOverlay: {
              children: <Typography>No Data Found</Typography>,
            },
          }}
          components={{
            NoRowsOverlay: CustomNoRowsOverlay,
          }}
          pageSizeOptions={[5, 10]}
          // checkboxSelection
          style={{
            padding: "5px 30px",
            textTransform: "capitalize",
          }}
        />
      </div>
     </>
      :<div className="d-flex justify-content-center align-items-center" style={{height:"100%"}}><h6>No {title} Data Found</h6>
        </div>}
    </>
  );
}

export default DataTable;
