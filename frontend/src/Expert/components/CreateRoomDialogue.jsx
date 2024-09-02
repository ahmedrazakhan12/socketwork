import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import PropTypes from 'prop-types';
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { createLiveStream } from "../../utils/helpers";

const CreateRoomDialog = ({ open, onClose, onCreate, userType }) => {
  const [roomId, setRoomId] = useState("");
  const [price, setPrice] = useState(0);
  const [title, setTitle] = useState("");
  const [scheduleType, setScheduleType] = useState("instant");
  const [duration, setDuration] = useState(0);
  const [selectedDate, setSelectedDate] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleCreate = async () => {
    onCreate(roomId);
    const response = await createLiveStream(
      roomId,
      price,
      title,
      description,
      scheduleType,
      startTime,
      endTime,
      selectedDate
    );
    if (scheduleType === "instant") {
      window.location.href = `/room/${response.id}/${userType}`;
      onClose();
    } else {
      toast.success("Your livestream scheduled successfully");
      onClose();
      setRoomId("");
      setPrice(0);
      setTitle("");
      setScheduleType("instant");
      setSelectedDate("");
      setDescription("");
      setStartTime("");
      setEndTime("");
    }
  };

  const { authUserActiveSubscription } = useAppContext();
  const livestreamCounts = authUserActiveSubscription?.subscription_package
    ? authUserActiveSubscription?.subscription_package?.live_stream_counts
    : "0";
  const ExpertlivestreamCounts =
    authUserActiveSubscription?.expert_live_stream_count
      ? authUserActiveSubscription?.expert_live_stream_count
      : "0";

  const handleDurationClick = (hours) => {
    setDuration(hours);
    const now = new Date();
    const start = now.toLocaleTimeString("en-GB", { hour12: false });
    const end = new Date(
      now.getTime() + hours * 60 * 60 * 1000
    ).toLocaleTimeString("en-GB", { hour12: false });
    setStartTime(start);
    setEndTime(end);
    console.log("startTime", start);
    console.log("endTime", end);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth="sm">
      <DialogTitle>
        <Link to='/expert-livestreams' style={{fontSize: '14px', color: 'blue',textDecoration: 'underline',float:'right'}}>View LiveStreams</Link>
        Create Room 
        <span style={{ fontWeight: "bold", fontSize: "18px" }}>
          <br /> (You have {livestreamCounts} livestreams in total and have used{" "}
          {ExpertlivestreamCounts} of them.) 
          
        </span>{" "}
      </DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin="dense" className="mt-2">
          <InputLabel id="schedule-type-label">Schedule Type</InputLabel>
          <Select
            labelId="schedule-type-label"
            id="schedule-type"
            value={scheduleType}
            onChange={(e) => setScheduleType(e.target.value)}
            label="Schedule Type"
          >
            <MenuItem value="instant">Instant</MenuItem>
            <MenuItem value="schedule">Schedule</MenuItem>
          </Select>
        </FormControl>
        <TextField
          autoFocus
          margin="dense"
          id="room-id"
          label="Room ID"
          type="text"
          className="w-100 "
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <TextField
          autoFocus
          margin="dense"
          id="title"
          label="Title"
          type="text"
          className="w-100 mt-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          autoFocus
          margin="dense"
          id="price"
          label="Price"
          type="text"
          className="w-100 mt-2"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        {scheduleType === "schedule" && (
          <>
            <TextField
              margin="dense"
              id="date"
              type="date"
              className="w-100 mt-2"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
            <TextField
              margin="dense"
              id="description"
              label="Description"
              type="text"
              className="w-100 mt-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="row mt-3">
              <div className="col">
                <Button
                  variant={duration === 1 ? "contained" : "outlined"}
                  color="secondary"
                  onClick={() => handleDurationClick(1)}
                  className=" w-100"
                >
                  1 Hour
                </Button>
              </div>
              <div className="col">
                <Button
                  variant={duration === 2 ? "contained" : "outlined"}
                  color="secondary"
                  onClick={() => handleDurationClick(2)}
                  className=" w-100"
                >
                  2 Hours
                </Button>
              </div>
              <div className="col">
                <Button
                  variant={duration === 3 ? "contained" : "outlined"}
                  color="secondary"
                  onClick={() => handleDurationClick(3)}
                  className=" w-100"
                >
                  3 Hours
                </Button>
              </div>
            </div>
          </>
        )}

        <div className="row">
          <div className="col-9"></div>
          <div className="col-3">
            <Button
              onClick={handleCreate}
              variant="outlined"
              color="primary"
              className="tk-btn-yellow-lg mt-5 w-100"
            >
              Create
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
CreateRoomDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  userType: PropTypes.string.isRequired,
};
export default CreateRoomDialog;
