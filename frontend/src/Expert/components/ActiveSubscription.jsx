import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import * as React from "react";
import GlobalDialog from "../../components/GlobalDialogue";
export default function ActiveSubscriptionCard({ profileData }) {
  const globalDialogRef = React.useRef();

  const handleOpenDialog = () => {
    globalDialogRef.current.openDialog();
  };
  const endDateTime = new Date(profileData?.end_date).getTime();
  const [remainingTime, setRemainingTime] = React.useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  React.useEffect(() => {
    const calculateRemainingTime = () => {
      const currentTime = new Date().getTime();
      const timeDifference = endDateTime - currentTime;

      if (timeDifference > 0) {
        const hours = Math.floor(timeDifference / (1000 * 60 * 60));
        const minutes = Math.floor(
          (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        setRemainingTime({
          hours: hours,
          minutes: minutes,
          seconds: seconds,
        });
      } else {
        // If the time has already passed, set remaining time to 0
        setRemainingTime({
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
      }
    };

    const intervalId = setInterval(calculateRemainingTime, 1000);

    return () => clearInterval(intervalId);
  }, [remainingTime]);
  return (
    <Card
      variant="outlined"
      color="success"
      fullWidth
      sx={{
        //   width: 320,
        overflow: "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography level="title-lg">
          ${profileData?.promote_package?.amount}
        </Typography>
        <Typography level="title-lg" color="success">
          Advertisement slots {profileData?.promote_package?.ad_slot}
        </Typography>
      </Box>
      <CardContent>
        <Typography level="title-lg">
          {profileData?.promote_package?.name}
        </Typography>
        <Typography level="body-sm">
          {profileData?.promote_package?.description}
        </Typography>
      </CardContent>
      <CardActions buttonFlex="0 1 120px">
        <Button
          variant="outlined"
          color="success"
          sx={{ ml: "auto" }}
          onClick={handleOpenDialog}
        >
          Duration
        </Button>
      </CardActions>
      <GlobalDialog
        ref={globalDialogRef}
        title="Your Promote Me Package expires in"
        actions={false}
        size={"xs"}
      >
        <h2>{`${remainingTime.hours}h : ${remainingTime.minutes}m : ${remainingTime.seconds}s `}</h2>
        <div className="row">
          <div className="col-9"></div>
          <div className="col-3">
            <Button
              variant="outlined"
              color="warning"
              fullWidth
              onClick={() => globalDialogRef.current.closeDialog()}
            >
              Okay
            </Button>
          </div>
        </div>
      </GlobalDialog>
    </Card>
  );
}
