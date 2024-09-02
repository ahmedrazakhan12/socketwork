import {
    Box
} from "@mui/material";
import React from "react";
import DataTable from "../components/Datatable";
import { useAppContext } from "../context/AppContext";
import { useThemeContext } from "../context/ThemeContext";
    
    
    function Emails() {
      const {
          usersData
      } = useAppContext();
      const { isDark } = useThemeContext();
      const AllEmailColumns = [
        {
          field: "email",
          headerName: "Email",
          width: 300,
          renderCell: (params) => (
              <div
              className="badge badge-opacity-warning "
              style={{
                width: "200px",
                padding:'10px'
              }}
            >
                {params.value}
            </div>
          ),
        },
      { field: "user_type", headerName: "User Type", width: 300 },
        {
            field: "created_at",
            headerName: "Joined date",
            width: 300,
            renderCell: (params) => (
              <div>
                {new Date(params.value).toLocaleDateString()}
              </div>
            ),
          },
     
      ];
    
      return (
        <div className="row">
          <div className="col-lg-12 grid-margin stretch-card">
            <div
              className={`${isDark ? "dark-basic-card" : "light-basic-card"} card`}
            >
              <div className="card-body">
                <Box className="row">
                  <Box className="col-10">
                    <h4
                      className={`${
                        isDark ? "" : "card-title-light-mode"
                      } text-left card-title `}
                    >
                      Emails
                    </h4>
                  </Box>
                  <Box className="col-2">
                    {/* <Link className="w-100 btn btn-outline-primary rounded-3 " to={'/create-category'}>
                        Create +
                      </Link> */}
                  </Box>
                </Box>
    
                {usersData && <DataTable data={usersData} columns={AllEmailColumns} />}
                      
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    export default Emails;
    