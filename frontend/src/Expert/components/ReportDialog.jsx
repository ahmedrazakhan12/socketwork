import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import React from "react";
import { useSettingsContext } from "../../context/Settings";

const ReportDialog = ({ExpertId,userId}) => {
  const {
    openReportModal,
    reportReason,
    selectedReportType,
    handleClickOpenReport,
    handleCloseReport,
    handleReport,
    handleInputReportChange,
    validationErrors,
    reportData,
    handleReportChange,
  } = useSettingsContext();

  return (
    <div>
      <Dialog
        open={openReportModal}
        onClose={handleCloseReport}
        fullWidth={true}
        maxWidth={"xs"}
      >
        <DialogTitle>Report Expert Profile</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel>Report Type</InputLabel>
            <Select value={selectedReportType} onChange={handleReportChange}>
              <MenuItem value="">Select an option</MenuItem>
              <MenuItem value="Inappropriate Content">
                Inappropriate Content
              </MenuItem>
              <MenuItem value="Spam">Spam</MenuItem>
              <MenuItem value="Misleading Information">
                Misleading Information
              </MenuItem>
              {/* Add more report types as needed */}
            </Select>
            {validationErrors.report_type && (
              <Typography className="text-danger">
                {validationErrors.report_type}
              </Typography>
            )}
          </FormControl>
          <TextField
            margin="dense"
            label="Reason for Report"
            type="text"
            name="message"
            fullWidth
            value={reportData.message}
            onChange={handleInputReportChange}
          />
          {validationErrors.name && (
            <Typography className="text-danger">
              {validationErrors.name}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseReport}>Cancel</Button>
          <Button  onClick={
            async () => 
            await handleReport(ExpertId,userId)} color="error">
            Submit Report
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ReportDialog;
