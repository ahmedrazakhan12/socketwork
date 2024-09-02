import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";

export default function FormDialog({
  handleCloseReview,
  openReview,
  handleInputReviewChange,
  reviewData,
  handleReviewSubmit,
  expertId,
  bookingId,
}) {
  const [value, setValue] = React.useState(0);
  
  return (
    <div>
      <Dialog open={openReview} onClose={handleCloseReview} fullWidth="sm">
        <DialogTitle> How was your experience ? </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Box
              sx={{
                "& > legend": { mt: 2 },
              }}
            >
              <Box className="row justify-content-center">
                <Box className="col-4">
                  <Typography component="legend">Give Your Rating</Typography>
                  <Rating
                    name="rating"
                    onChange={handleInputReviewChange}
                    value={reviewData.rating}
                    size="large"
                  />
                </Box>
              </Box>
            </Box>
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Share Your Review"
            type="textarea"
            fullWidth
            name="review"
            variant="standard"
            onChange={handleInputReviewChange}
            value={reviewData.review}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseReview}>Cancel</Button>
          <Button onClick={async () => await handleReviewSubmit(expertId,bookingId)}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
