import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import React, { useState } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useAppContext } from "../context/AppContext";
import { useCompletionContext } from "../context/CompletionContext";
import { convertToTitleCase, createCheckoutSession } from "../utils/helpers";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
function Wallet() {
  const {
    handleWalletChange,
    handleWalletSubmit,
    walletBalance,
    editAuthData,
    //withdraw
    handleWithDrawChange,
    withDrawbalance,
    handleWithDrawSubmit,
    authUser,
    handleClosePayment,
    OpenPaymentModel,
    showModalPayment,
    bankDetails
  } = useAppContext();
  const{
    paymentDetails,
    handlePaymentsInputChange,
    errors,
    SelectedCountry,
    setSelectedCountry,
    SelectedCountryForIdCardNum,
    setSelectedCountryForIdCardNum,
  }=useCompletionContext();
  const [isDepositButtonDisabled, setIsDepositButtonDisabled] = useState(false);
  const [isWithdrawButtonDisabled, setIsWithdrawButtonDisabled] =
    useState(false);
  const [depositError, setDepositError] = useState("");
  const [withdrawError, setWithdrawError] = useState("");

  const userType = authUser.user?.user_type;

  const handleDepositClick = async () => {
    if (!walletBalance.wallet || parseFloat(walletBalance.wallet) <= 0) {
      setDepositError("Please enter a valid amount to deposit.");
      return;
    }
    setDepositError("");
    setIsDepositButtonDisabled(true);
    await createCheckoutSession(
      walletBalance.wallet,
      "Deposited in your wallet",
      "Deposit"
    );
    // Optionally handle post-deposit actions here
  };

  const handleWithdrawClick = async () => {
    if (!withDrawbalance.amount || parseFloat(withDrawbalance.amount) <= 0) {
      setWithdrawError("Please enter a valid amount to withdraw.");
      return;
    }
    setWithdrawError("");
    setIsWithdrawButtonDisabled(true);
    await handleWithDrawSubmit();
    setIsWithdrawButtonDisabled(false); // Optional: Re-enable button after the operation is complete
  };
  const nav = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <section className="tk-main-section tk-main-bg">
        <div className="container">
          <div className="gy-lg-0 gy-4 row">
            <div className="col-lg-4 col-xl-3 ">
              <Sidebar />
            </div>
            <div className="col-lg-8 col-xl-9">
              <div className="tb-profile-settings-box tb-privacy-wrapper mb-5">
                <div className="tb-tabtasktitle">
                  <ArrowBackIosIcon
                    onClick={() => {
                      nav(-1);
                    }}
                    style={{ cursor: "pointer" }}
                  />
                  <h5>
                    Current Balance : $ {editAuthData?.wallet || " 00.0"}{" "}
                  </h5>
                </div>
                <div className="tb-dhb-box-wrapper">
                  <div className="tb-profileform__holder">
                    <div className="form-group form-group_vertical">
                      <label className="tk-label tk-required">
                        Add balance into your wallet $
                      </label>
                      <input
                        type="text"
                        className="form-control "
                        placeholder=" Add balance into your wallet"
                        onChange={handleWalletChange}
                        value={walletBalance.wallet}
                        name="wallet"
                      />
                      {depositError && (
                        <div className="text-danger">{depositError}</div>
                      )}
                    </div>
                  </div>
                  <div className="tb-profileform__holder">
                    <div className="tb-dhbbtnarea tb-dhbbtnareav2">
                      <em></em>
                      <Button
                        className="tb-btn text-white"
                        // onClick={async () =>
                        //   await createCheckoutSession(walletBalance.wallet, "Deposited in your wallet", "Deposit")
                        // }
                        disabled={isDepositButtonDisabled}
                        onClick={handleDepositClick}
                      >
                        {" "}
                        Submit{" "}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              {userType === "expert" ? (
                <div className="tb-profile-settings-box tb-privacy-wrapper mt-5">
                  <div className="tb-tabtasktitle">
                    <h5>Withdraw Balance  <Link onClick={OpenPaymentModel} style={{textDecoration:'underline',fontSize:'15px'}}>{'('}Your Payment Details{')'} </Link> </h5>
                  </div>
                  <div className="tb-dhb-box-wrapper">
                    <div className="tb-profileform__holder">
                      <div className="form-group form-group_vertical">
                        <label className="tk-label tk-required">Amount $</label>
                        <input
                          type="number"
                          className="form-control "
                          placeholder="Withdraw Your Balance"
                          onChange={handleWithDrawChange}
                          value={withDrawbalance.amount}
                          name="amount"
                          min={0}
                        />
                        {withdrawError && (
                          <div className="text-danger">{withdrawError}</div>
                        )}
                      </div>
                      <div className="form-group form-group_vertical">
                        <label className="tk-label tk-required">
                         Withdrawal Description
                        </label>
                        <textarea
                          name="description"
                          id=""
                          cols="30"
                          rows="3"
                          className="form-control"
                          onChange={handleWithDrawChange}
                          value={withDrawbalance.description}
                        ></textarea>
                      </div>
                    </div>
                    <div className="tb-profileform__holder">
                      <div className="tb-dhbbtnarea tb-dhbbtnareav2">
                        <em></em>
                        <Button
                          className="tb-btn text-white"
                          onClick={handleWithdrawClick}
                          disabled={isWithdrawButtonDisabled}
                        >
                          {" "}
                          Submit{" "}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <Modal
      show={showModalPayment}
      onHide={handleClosePayment}
      animation={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>Your payment Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="tk-themeform">
          <fieldset>
            {/* <div className="form-group">
              <label className="tk-label tk-required">Title</label>
              <input
                type="text"
                name="title"
                className="form-control"
                placeholder="Enter title"
                autoComplete="off"
                // onChange={handleInputChangePortfolio}
                // value={portfolioData.title}
              />
            </div>
            <div className="form-group">
              <label className="tk-label tk-required">Portfolio URL</label>
              <input
                type="text"
                name="link"
                className="form-control"
                placeholder="Enter portfolio URL"
                autoComplete="off"
                // onChange={handleInputChangePortfolio}
                // value={portfolioData.link}
              />
            </div>

            <div className="form-group">
              <label className="tk-label">Portfolio description</label>
              <textarea
                className="form-control"
                // onChange={handleInputChangePortfolio}
                // value={portfolioData.description}
                name="description"
                placeholder="Enter portfolio description"
              ></textarea>
            </div> */}
<div className="row">
          <div className="col-12 row" style={{}}>
            <div className="col-md-12 col-12 mt-lg-3 " style={{}}>
              <Form.Group sx={{ height: "100px" }}>
                <Form.Label className="fieldlabels fs-6 fw-bold text-dark ">
                  Bank Username: *
                </Form.Label>
                <p>{bankDetails&&bankDetails.username}</p>
                {/* <Form.Control
                  as="input"
                  name="username"
                  placeholder="Bank Username"
                  value={paymentDetails.username}
                  onChange={handlePaymentsInputChange}
                />
                {errors.username && (
                  <p className="text-danger">
                    {convertToTitleCase(errors.username)}
                  </p>
                )} */}
              </Form.Group>
            </div>

            <div className="col-md-12 col-12 mt-lg-3">
              <Form.Group>
                <Form.Label className="fieldlabels  fs-6 fw-bold text-dark ">
                  Bank Name: *
                </Form.Label>
                <p>{bankDetails&&bankDetails.name}</p>

                {/* <Form.Control
                  as="input"
                  name="name"
                  placeholder="Bank Name"
                  value={paymentDetails.name}
                  onChange={handlePaymentsInputChange}
                />
                {errors.name && (
                  <p className="text-danger">
                    {convertToTitleCase(errors.name)}
                  </p>
                )} */}
              </Form.Group>
            </div>
          </div>
          <div className="  col-12 mt-lg-3 ">
            <Form.Group>
              <Form.Label className="fieldlabels fieldlabels fs-6 fw-bold text-dark ">
                ID Card Number: *
              </Form.Label>
              <p>{bankDetails&&bankDetails.card_number}</p>
              
              {/* <div className="d-flex" style={{ paddingRight: "1.4rem" }}>
                <select
                  value={SelectedCountryForIdCardNum}
                  style={{ background: "#eee", width: "12rem" }}
                  onChange={(e) => {
                    setSelectedCountryForIdCardNum(e.currentTarget.value);
                    setSelectedCountry(e.currentTarget.value);
                  }}
                >
                  <option value={"no-country"}>{"Select Country"}</option>

                  {Object.keys(validationWithCountriesForID_Card_number).map(
                    (country) => {
                      return <option value={country}>{country}</option>;
                    }
                  )}
                </select>
                <Form.Control
                  as="input"
                  type="number"
                  name="card_number"
                  value={paymentDetails.card_number}
                  onChange={handlePaymentsInputChange}
                  placeholder="ID Card Number"
                  style={{}}
                />
              </div> */}
              {errors.card_number && (
                <p className="text-danger">
                  {convertToTitleCase(errors.card_number)}
                </p>
              )}
            </Form.Group>
          </div>

          <div className=" col-12 mt-lg-3 ">
            <Form.Group>
              <Form.Label className="fieldlabels fieldlabels fs-6 fw-bold text-dark ">
                Bank Address: *
              </Form.Label>
              <p>{bankDetails&&bankDetails.address}</p>

              {/* <Form.Control
                as="textarea"
                name="address"
                placeholder="Bank Address"
                value={paymentDetails.address}
                onChange={handlePaymentsInputChange}
                // style={{ paddingRight: "1.4rem" }}
                style={{ width: "97.5%" }}
              />
              {errors.address && (
                <p className="text-danger">
                  {convertToTitleCase(errors.address)}
                </p>
              )} */}
            </Form.Group>
          </div>

          <div className="col-md-12 col-12  mt-lg-3 ">
            <Form.Group>
              <Form.Label className="fieldlabels fieldlabels fs-6 fw-bold text-dark ">
                Bank Account Number: *
              </Form.Label>
              <p>{bankDetails&&bankDetails.account_number}</p>

              {/* <div className="d-flex">
                <select
                  style={{ background: "#eee" }}
                  value={SelectedCountry}
                  onChange={(e) => {
                    setSelectedCountry(e.currentTarget.value);
                    setSelectedCountryForIdCardNum(e.currentTarget.value);
                  }}
                >
                  <option value={"no-country"}>{"Select Country"}</option>
                  {Object.keys(validationsWithCountries).map((country) => {
                    return <option value={country}>{country}</option>;
                  })}
                </select>
                <Form.Control
                  as="input"
                  name="account_number"
                  type="number"
                  placeholder="Bank Account Number"
                  value={paymentDetails.account_number}
                  onChange={handlePaymentsInputChange}
                  style={{ marginRight: "1.5rem" }}
                />
              </div>
              {errors.account_number && (
                <p className="text-danger">
                  {convertToTitleCase(errors.account_number)}
                </p>
              )} */}
            </Form.Group>
          </div>
        </div>
          </fieldset>
        </div>
      </Modal.Body>
    </Modal>
    </div>

  );
}

export default Wallet;
