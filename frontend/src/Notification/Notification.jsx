import { Close, Phone } from "@mui/icons-material";
import { Avatar, Box, Button, Divider, Typography } from "@mui/material";

import React from "react";

function Notification({ isShow = false ,onAnswer,onDismiss,title}) {
  return (
    <div>
      {isShow && (
        <Box
          sx={{
            width: "20rem",
            height: "6.5rem",
            background: "#fff",
            borderRadius: 2,
            position: "absolute",
            right: 10,
            top: 20,
            zIndex: 9999,
          }}
        >
          <Box display={"flex"} alignItems={"center"} px={1} py={1}>
            <Avatar></Avatar>
            <Box px={1}>
              <p id="userNameCall">{title}</p>
              <Typography>Calling...</Typography>
            </Box>
          </Box>
          <Divider />
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-evenly"}
            px={1}
            pb={0.5}
          >
            <Button  onClick={onDismiss} sx={{ color: "#777" }}>
              <Close />
              DISMISS
            </Button>
            <Box width={10}></Box>
            <Button onClick={onAnswer} sx={{ color: "#777" }}>
              <Phone />
              ANSWER
            </Button>
          </Box>
          <Box height={10}></Box>
        </Box>
      )}
    </div>
  );
}

export default Notification;
