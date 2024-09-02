import Modal from "@mui/joy/Modal";
import React from "react";
import VideoCall from './components/VideoCall';
function CallModal({ openCall, setOpenCall }) {
  return (
    <React.Fragment>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={openCall}
        onClose={() => setOpenCall(false)}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        hideBackdrop
      >
        <VideoCall/>
      </Modal>
    </React.Fragment>
  );
}

export default CallModal;
