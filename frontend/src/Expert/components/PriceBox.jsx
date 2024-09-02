import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { AxiosError } from 'axios';
import React, { useRef, useState } from "react";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { httpForToastRequest } from '../../Api/BaseApi';
import GlobalDialog from '../../components/GlobalDialogue';
import { InsufficientFundsDialog } from '../../components/InsufficientFundsDialog';
import { useAppContext } from '../../context/AppContext';

export default function PriceBox({
  pkgid,
  title,
  subtitle,
  price,
  duration,
  features,
  isPopular,
  isBtn,
  wallet,
  counts
}) {

  const {
    fetchAuthUserSubscriptions,
    AUTHUSER,
    fetchAuthUser
  } = useAppContext();

  const walletRate = parseFloat(AUTHUSER.wallet);
  const navigate = useNavigate();
  const globalDialogRef = useRef();

  const handleOpenDialog = () => {
    globalDialogRef.current.openDialog();
  };

  const [insufficientFundsDialogOpen, setInsufficientFundsDialogOpen] = useState(false);

  const openInsufficientFundsModal = () => {
    setInsufficientFundsDialogOpen(true);
  };

  const closeInsufficientFundsModal = () => {
    setInsufficientFundsDialogOpen(false);
  };

  const handleChoosePlan = async (id, status) => {
    if (price > walletRate) {
      openInsufficientFundsModal();
      return;
    }
    await toast.promise(
      httpForToastRequest({
        path: `subscribe-package/${id}`,
        method: 'POST',
      }),
      {
        loading: 'Loading...',
        success: (res) => {
          console.log(res);
          if (res.status === 200) {
            fetchAuthUser();
            fetchAuthUserSubscriptions();
            navigate('/subscription');
            return <b>{JSON.stringify(res['message'])}</b>
          }
        },
        error: (err) => {
          console.log('err', err)
          if (err instanceof AxiosError) {
            if (err.response.status === 500) {
              return <b>{"Server Error Please Wait while a moment"}</b>
            } if (err.response.status === 400) {
              return <b>{JSON.stringify(err.response.data['message'])}</b>
            }
            if (err.response.status === 401) {
              return <b>{JSON.stringify(err.response.data['message'])}</b>
            }
          }
        }
      }
    );
  };

  return (
    <div className={`price-box ${isPopular ? "popular" : ""}`} key={pkgid}>
      <div className="box-top-section">
        {isPopular && (
          <div className="top-bar">
            <span>Master</span>
          </div>
        )}
        <div className="plan-name">
          <strong style={{ color: isPopular ? "#fff" : "#000" }}>
            {title}
          </strong>
        </div>
        <div className="price-section">
          <strong
            className="price"
            style={{ color: isPopular ? "#fff" : "#000" }}
          >
            <span style={{ color: isPopular ? "#fff" : "#000" }}>$</span>
            <strong style={{ color: isPopular ? "#fff" : "#000" }}>
              {price}
            </strong>
            <span style={{ color: isPopular ? "#fff" : "#000" }}>/{duration === '30' ? 'monthly' : 'yearly'}</span>
          </strong>
        </div>
        <span
          className="per-month"
          style={{ color: isPopular ? "#fff" : "#000" }}
        >
          <strong>${price}</strong> 
        </span>
      </div>

      <div className="box-features-section">
        {Object.entries(features).map(([key, value]) => {
          return(
          <div className="features-box" key={`${key}-${value}`}>
            <i
              className={`fas ${value === "" ? "fa-times text-danger" : "fa-check"}`}
            ></i>
            <span>{`${key === 'Live Stream' ? key + ' limit ('+counts+')' :  key  }`}</span>
          </div>
        )})}
        <div className="features-box">
          <i className={`fas fa-check`}></i>
          <span>{`${title}`}</span>
        </div>
      </div>

      <div className="row justify-content-center mt-2 mb-2">
        {AUTHUSER.user_type === 'expert' ? (
          <Button
            variant="contained"
            color="primary"
            className="tk-btn-yellow-lg w-50"
            style={{ marginTop: `${isBtn ? '45px' : ''}` }}
            onClick={handleOpenDialog}
          >
            Choose Plan <i className="fas fa-chevron-right"></i>
          </Button>
        ) : (
          <Tooltip title="Available Only For Experts"  placement="bottom">
        <div className='justify-content-center d-flex'>
        <Button
          variant="contained"
          color="primary"
          className="tk-btn-yellow-lg w-50"
          style={{ marginTop: `${isBtn ? '45px' : ''}` }}
          onClick={handleOpenDialog}
          disabled
        >
          Choose Plan <i className="fas fa-chevron-right"></i>
        </Button>
        </div>
        </Tooltip>
    
        
        )}
      </div>

      <GlobalDialog ref={globalDialogRef} title="Confirm Subscription" actions={false} size={'sm'}>
        Are you sure you want to subscribe to this package? <br />
        Your card will be billed ${price}.
        <div className="row">
          <div className="col-9"></div>
          <div className="col-3">
            <Button variant="outlined" color="warning" onClick={() => handleChoosePlan(pkgid)}>Subscribe</Button>
          </div>
        </div>
      </GlobalDialog>
      <InsufficientFundsDialog
        open={insufficientFundsDialogOpen}
        onClose={closeInsufficientFundsModal}
      />
    </div>
  );
}
