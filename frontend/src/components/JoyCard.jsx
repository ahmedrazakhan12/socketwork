import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { InputLabel, Tooltip } from "@mui/material";
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { AxiosError } from "axios";
import * as React from "react";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { httpForToastRequest } from "../Api/BaseApi";
import { useAppContext } from "../context/AppContext";
import { useFrontEndContext } from "../context/FrontEndContext";
import GlobalDialog from "./GlobalDialogue";

export default function JoyCard({ profileData }) {

  const {
    openDialog,
    setOpenDialog
  } = useFrontEndContext();
  const {
    fetchAuthUserSubscriptions,
    AUTHUSER
  } = useAppContext();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [packageId, setpackageId] = React.useState(profileData.id);
  const [duration, setDuration] = React.useState(profileData.duration);
  const [newAmount, setNewAmount] = React.useState(profileData.amount);

  const handleChange = (event) => {

    setDuration(event.target.value);
    setNewAmount(profileData.duration_amounts.filter((item) => item.duration === event.target.value)[0].amount)
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    // handleSubscribeSubmit(true)
  };
  const handleSubscribeSubmit = async (value) => {
    // setIsLoading(true);
    // Check if the user is logged in (token exists)
    if (!token) {
      navigate('/sign-in');
      return;
    }
    const formData = new FormData();
    formData.append('package_id', packageId);
    formData.append('amount', newAmount);
    formData.append('duration', duration);
    formData.append('confirmation', value);
    await toast.promise(
      httpForToastRequest({
        path: "subscribe-profile-package",
        method: 'POST',
        data: formData
      }),
      {
        loading: 'Loading...',
        success: (res) => {
          // if (res.status == 200) {
          fetchAuthUserSubscriptions();
          globalDialogRef.current.closeDialog();
          return <b>Upgraded Successfully</b>
          // }
        },
        error: (err) => {
          console.log('err', err)
          if (err instanceof AxiosError) {
            globalDialogRef.current.closeDialog();

            if (err.response.status == 500) {
              return <b>{"Server Error Please Wait while a moment"}</b>
            } if (err.response.status == 422) {
              return <b>{JSON.stringify(err.response.data['message'])}</b>
            }
            if (err.response.status == 501) {
              return <b>{JSON.stringify(err.response.data['message'])}</b>
            }
            if (err.response.status == 401) {
              return <b>{JSON.stringify(err.response.data['message'])}</b>
            }
          }
        }
      }
    );
  };
  const globalDialogRef = React.useRef();

  const handleOpenDialog = () => {
    // Call openDialog method using the ref
    globalDialogRef.current.openDialog();
  };

  return (
    <Card
      variant="outlined"
      sx={{
        width: 320,
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
        <Typography level="title-lg">${newAmount}</Typography>
        <FormControl
          fullWidth
          sx={{
            width: 150,
            height: 40,
          }}
        >
          <InputLabel id="demo-simple-select-label" onClick={() => {
            console.log('duration', profileData.duration_amounts)
          }}>Duration</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={duration}
            sx={{
              height: 40,
            }}
            label="Duration"
            onChange={handleChange}
          >
            {profileData.duration_amounts && profileData.duration_amounts.map((item, index) => (
              <MenuItem key={index} value={item.duration}>{item.duration === 30 ? 'One Month' : item.duration === 360 ? 'One Year' : 'One week'}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <CardContent>
        {/* <Typography level="title-lg">{profileData.name}</Typography> */}
        <Typography level="title-lg">Slot no : {profileData.ad_slot}</Typography>
        <Typography level="body-sm">{profileData.description}</Typography>
      </CardContent>
      <CardActions buttonFlex="0 1 120px">
       
        {AUTHUSER.user_type === 'expert' ? (
          <Button variant="outlined" color="success" sx={{ ml: "auto" }} onClick={handleOpenDialog}>
          Upgrade
        </Button>
        ) : (
          <Tooltip title="Available Only For Experts"  placement="bottom">
        <div className='justify-content-center d-flex'>
        <Button variant="outlined" color="success" disabled sx={{ ml: "auto" }} >
          Upgrade
        </Button>
        </div>
        </Tooltip>
    
        
        )}
      </CardActions>
      <GlobalDialog ref={globalDialogRef} title="Confirm Subscription" actions={false} size={'sm'}>
      Are you sure you want to upgrade your profile?  <br />
      you will be listed in {profileData?.ad_slot} and your card will be billed ${newAmount}. 
        <div className="row">
          <div className="col-9"></div>
          <div className="col-3">
            {/* <Button variant="outlined" color="warning" onClick={async () => {
              console.log(profileData?.ad_slot, ' war')
              await createCheckoutSession(newAmount, 'Promote Subscription', 'Subscription', {
                package_id: packageId,
                duration,
                confirmation: true,
                ad_slot: profileData?.ad_slot
              });
              // profileData?.ad_slot
              // 
              // handleSubscribeSubmit(true)
            }}>Subscribe</Button> */}
            <Button variant="outlined" color="warning" onClick={() =>handleSubscribeSubmit(true)}>Subscribe</Button>
          </div>
        </div>
      </GlobalDialog>
    </Card>
  );
}





