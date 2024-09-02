// import * as React from 'react';
// import Avatar from '@mui/material/Avatar';
// import Stack from '@mui/material/Stack';
// import { useAppContext } from '../context/AppContext';
// import { baseUrlImage } from '../Api/BaseApi';

//  function Avatars() {
//     const{
//         editAuthData
//     }=useAppContext();
//   return (
//     <Stack direction="row" spacing={1}>
//       <Avatar alt="Cindy Baker"  />
//     </Stack>
//   );
// }
import Logout from "@mui/icons-material/Logout";
import Settings from "@mui/icons-material/Settings";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import * as React from "react";
import { Link } from "react-router-dom";
import { baseUrlImage } from "../Api/BaseApi";
import Confirmation from "../Expert/components/Confirmation";
import { useAppContext } from "../context/AppContext";

export default function AccountMenu() {
  const {
    editAuthData,
    // assets
    anchorEl,
    openDropdown,
    handleDropdownClick,
    handleDropdownClose,
    handleLogoutSubmit,
    userDataAuth
  } = useAppContext();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleDropdownClick}
            size="small"
            aria-controls={openDropdown ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openDropdown ? "true" : undefined}
          >
            <Avatar src={`${baseUrlImage}` + userDataAuth?.image} />
          </IconButton>
        </Tooltip>
      </Box>
      <Confirmation
        open={open}
        handleClose={handleClose}
        handleClick={handleLogoutSubmit}
      />

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={openDropdown}
        onClose={handleDropdownClose}
        onClick={handleDropdownClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <a href="/profile" className="text-dark">
          <MenuItem>
            <Avatar /> Profile
          </MenuItem>
        </a>
        <Link to="/dashboard" className="text-dark">
          <MenuItem>
            <Avatar /> My account
          </MenuItem>
        </Link>
        <Divider />
        {/* <MenuItem onClick={handleDropdownClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem> */}

        <Link to="/settings" className="text-dark">
          <MenuItem onClick={handleDropdownClose}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
        </Link>

        <MenuItem onClick={handleClickOpen}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
