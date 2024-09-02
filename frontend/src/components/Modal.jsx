import {
  Button,
  Grid,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import * as React from "react";
import toast from "react-hot-toast";
import { httpForToastRequest } from "../Api/BaseApi";
import { InsufficientFundsDialog } from "./InsufficientFundsDialog";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 800,
  bgcolor: "background.paper",
  border: "0px solid #000",
  boxShadow: 24,
  p: 4,
  maxHeight: "100vh",
  overflowY: "auto",
};

function formatTime(timeString) {
  const date = new Date(timeString);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  const formattedHours = hours % 12 || 12;
  return `${formattedHours}:${minutes < 10 ? "0" : ""}${minutes} ${ampm}`;
}

function getDayFromDate(dateString) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const date = new Date(dateString);
  const dayIndex = date.getDay();
  return days[dayIndex];
}

export default function ScheduleModal({
  open,
  handleClose,
  setOpen,
  availability_data,
  UserId,
  hourly_rate,
  authWallet,
}) {
  const [selectedSlots, setSelectedSlots] = React.useState([]);
  const [selectedSlotData, setSelectedSlotData] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [totalPrice, setTotalPrice] = React.useState(0); // Add state for total price
  const [walletBalance, setWalletBalance] = React.useState(authWallet); // User's wallet balance
  const [insufficientFundsDialogOpen, setInsufficientFundsDialogOpen] =
    React.useState(false);

  const openInsufficientFundsModal = () => {
    setInsufficientFundsDialogOpen(true);
  };

  const closeInsufficientFundsModal = () => {
    setInsufficientFundsDialogOpen(false);
  };

  const [selectedDate, setSelectedDate] = React.useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = React.useState([]);
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    setSelectedTimeSlot(null);
  };

  const handleTimeSlotChange = (timeSlot) => {
    setSelectedTimeSlot([...timeSlot]);
  };

  React.useEffect(() => {
    setTotalPrice(
      hourly_rate * (!selectedTimeSlot ? 1 : selectedTimeSlot?.length)
    );
  }, [selectedTimeSlot, hourly_rate]);

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const slotsData = selectedDate
    ? availability_data?.find((item) => item.date === selectedDate)
    : [];
  const slots = selectedDate
    ? availability_data?.find((item) => item.date === selectedDate)?.slots
    : [];

  const handleBookButtonClick = async () => {
    if (totalPrice > authWallet) {
      console.log(walletBalance, "wallet is not valid");
      openInsufficientFundsModal();
      return;
    }
    console.log(totalPrice, "wallet is not valid");

    const formattedData = selectedTimeSlot.map((timeSlot) => {
      const [selectedDate, selectedTime] = timeSlot.split(" ");
      const slotData = availability_data
        .find((item) => item.date === selectedDate)
        ?.slots.find((slot) => slot.time === selectedTime);

      return {
        expert_id: UserId,
        schedule_id: slotsData?.schedule_id,
        amount: hourly_rate,
        date: slotsData?.date,
        time: selectedDate,
      };
    });
    console.log(formattedData, "/formattedData");
    setIsLoading(true);
    await toast.promise(
      httpForToastRequest({
        path: "store-appointment",
        method: "POST",
        data: { data: formattedData },
      }),
      {
        loading: "Loading...",
        success: (res) => {
          console.log(res.message);
          if (res.status === 200) {
            setOpen(false);
            return (
              <div>
                <p>{JSON.stringify(res["message"])}</p>
                <p>Total Price: ${totalPrice}</p>
              </div>
            );
          }
          setIsLoading(false);
        },
        error: (err) => {
          console.log("err", err);
          setIsLoading(false);
          if (err instanceof AxiosError) {
            if (err.response.status == 500) {
              return <b>{"Server Error Please Wait while a moment"}</b>;
            }
            if (err.response.status == 400) {
              return <b>{JSON.stringify(err.response.data["message"])}</b>;
            }
          }
        },
      }
    );
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="div">
            <div className="row">
              <div className="col-md-6 col-12">
                <h3>Time Schedule</h3>
              </div>
              <div className="col-md-6 col-12">
                <h3 className="text-right">
                  Total Price: $
                  {selectedDate && selectedTimeSlot ? totalPrice : 0}
                </h3>
              </div>
              <TextField
                id="date"
                label="Select Date"
                type="date"
                onChange={handleDateChange}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  min: getCurrentDate(),
                }}
              />
              <Grid container>
                {slots
                  ?.reduce((acc, slot, index) => {
                    if (index % 2 === 0) {
                      acc.push([]);
                    }
                    acc[acc.length - 1].push(slot);
                    return acc;
                  }, [])
                  .map((slotPair, index) => (
                    <Grid key={index} item xs={12} sm={4}>
                      <ToggleButtonGroup
                        value={selectedTimeSlot}
                        exclusive={false}
                        onChange={(event, newTimeSlot) =>
                          handleTimeSlotChange(newTimeSlot)
                        }
                        style={{ width: "100%", margin: "5px" }}
                      >
                        {slotPair.map((slot, innerIndex) => (
                          <ToggleButton
                            key={innerIndex}
                            value={slot.time}
                            disabled={!slot.available}
                            style={{
                              textTransform: "none",
                              border: "1px solid #9904f5",
                              borderRadius: "5px",
                              width: "100%",
                              margin: "5px",
                            }}
                            variant={slot.available ? "contained" : "outlined"}
                          >
                            {slot.time}
                          </ToggleButton>
                        ))}
                      </ToggleButtonGroup>
                    </Grid>
                  ))}
              </Grid>
            </div>
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}
          >
            <Button
              variant="contained"
              color="success"
              className="mt-2 w-50"
              disabled={!selectedTimeSlot}
              onClick={handleBookButtonClick}
            >
              Book
            </Button>
          </Typography>
          <InsufficientFundsDialog
            open={insufficientFundsDialogOpen}
            onClose={closeInsufficientFundsModal}
          />
        </Box>
      </Modal>
    </div>
  );
}

function FundModal() {
  const [openFund, setFundOpen] = React.useState(true);
  <Modal
    open={openFund}
    aria-labelledby="parent-modal-title"
    aria-describedby="parent-modal-description"
  >
    <Box>
      <h2 id="parent-modal-title">Text in a modal</h2>
      <p id="parent-modal-description">
        Duis mollis, est non commodoluctus, nisi erat porttitor ligula.
      </p>
    </Box>
  </Modal>;
}
