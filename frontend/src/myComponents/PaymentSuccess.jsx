import axios from "axios";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { baseurl } from "../Api/BaseApi";
import { useAppContext } from "../context/AppContext";
import { host } from "../utils/constants";
import {
  decodeQueryString,
  extractQueryParams,
  getTransactionDetails,
  isValidQueryParams,
  mapToObject,
} from "../utils/helpers";
let route = "/";
const PaymentSuccess = () => {
  const location = useLocation();
  const nav = useNavigate();
  const searchParams = mapToObject(new URLSearchParams(location.search));

  const queryStr = decodeQueryString(searchParams?.transaction_token || "");
  const decodedUrl = host + "/success" + queryStr; // change for production

  const extractedParamsAsObject = extractQueryParams(decodedUrl); // pass through the fn to convert the encodedUrl to Object
  const { amount, transaction } = extractedParamsAsObject;

  const { handleWalletSubmit } = useAppContext();
  const [Route, setRoute] = React.useState("/");

  useEffect(() => {
    // validating token
    if (
      !isValidQueryParams(queryStr) ||
      "amount" in extractedParamsAsObject === false ||
      "transaction" in extractedParamsAsObject === false ||
      "transaction_token" in searchParams === false
    ) {
      // toast.error('Invalid Temporred transaction token');
      return nav("/forbidden");
    }

    console.log(
      queryStr,
      decodedUrl,
      extractedParamsAsObject,
      amount,
      transaction,
      " decode"
    );
    async function fn() {
      route = "/";
      // setRoute('/add-wallet')
      const res = await getTransactionDetails(transaction);
      console.log("Hamza ", res);

      let postData = {};
      // toast.success('Transaction completed Successefully!')
      if (res?.transaction) {
        if ("Subscription" in extractedParamsAsObject) {
          console.log(extractedParamsAsObject, " extractedParamsAsObject");

          const { package_id, duration, confirmation, amount, ad_slot } =
            extractedParamsAsObject;

          route = "/#sub";
          postData = {
            package_id,
            amount,
            duration,
            confirmation  ,
            transaction_type: 'subscription',
            // transaction_type: 'subscription',
            ad_slot,
            transaction_id: res?.transaction?.id,
          };

          console.log(postData, " postData");
        }

        if ("Deposit" in extractedParamsAsObject) {
          let test = 'data he' + extractedParamsAsObject.amount;
          console.log(test, " test");

          route = "/add-wallet";

          postData = {
            amount: extractedParamsAsObject.amount,
            transaction_id: res?.transaction?.id,
          };
        }
        try {
          const { data } = await axios.post(
            baseurl + "/transaction-complete",
            postData,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          toast.success(
            `Transaction Completed! ${
              "Deposit" in extractedParamsAsObject
                ? "Deposited Balance Successfully "
                : "Subscribed Successfully"
            }`
          );
        } catch (error) {
          toast.error("Already Made Transaction, Please Contact Support!");
        }

        //   const status = res?.transaction?.status;
        //   console.log(res?.transaction, " status ", status, "transaction he ye");
        //   if (status === "completed") {
        //     console.log("Transaction is completed", res?.transaction);
        //     // Process completed transaction
        //     toast.error("You Already made transaction!");

        //   }else if (true) {
        //     console.log("transaciton id he", status);
        //     // make condition, if the purpose-type is wallet, then update the wallet
        //     if ("Deposit" in extractedParamsAsObject) {
        //       handleWalletSubmit(amount);
        //       setRoute("/add-wallet");
        //       route = "/add-wallet";
        //     }

        //     if ("Subscription" in extractedParamsAsObject) {
        //       const { package_id, duration, confirmation, amount, ad_slot } = extractedParamsAsObject;
        //       console.log(extractedParamsAsObject, ' hamza')
        //       const res = await createSubscription(
        //         package_id,
        //         amount,
        //         duration,
        //         true,
        //         ad_slot

        //       );

        //       // toast.success("You Have Subscribed successfully!");
        //       // update the subscription in db
        //       toast.success("You Have Subscribed successfully!");
        //       console.log("Subscription", extractedParamsAsObject);
        //       setRoute("/subscription");
        //       route = "/subscription";
        //     }

        //     // transaction -> transaction-id
        //     await updateTransactionStatus(transaction, 'completed');
        //     console.log("Transaction is not completed");
        //     // Process pending or other status
        //   }
        //   console.log(" nott");
        // } else {
        //   console.log("Transaction not found");
        //   // Handle case when transaction is not found
      }
    }

    fn();
    // console.log(searchParams?.transaction, " search");
  }, []);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={containerStyle}>
        <div style={iconStyle}>&#10004;</div>
        <h1 style={titleStyle}>Payment Successful</h1>
        <p style={textStyle}>
          Thank you for your purchase on our platform. Your payment has been
          successfully processed.
        </p>
        <p style={textStyle}>
          An email with the details of your transaction has been sent to your
          registered email address. You can now enjoy the benefits of your
          purchase.
        </p>
        <Link to={route} style={buttonStyle}>
          Continue Exploring
        </Link>
        <div style={noteStyle}>
          <p>
            <strong>Note:</strong> If you have any questions or concerns
            regarding your purchase, feel free to contact our support team.
          </p>
        </div>
        <div style={contactInfoStyle}>
          <h5>Contact Information</h5>
          <p>
            <strong>Email:</strong> zyacom@info.com
          </p>
          {/* <p><strong>Phone:</strong> +1 (123) 456-7890</p> */}
        </div>
      </div>
    </div>
  );
};

const containerStyle = {
  textAlign: "center",
  padding: "40px",
  borderRadius: "8px",
  backgroundColor: "#fff",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  color: "#4d3a8e",
  maxWidth: "600px",
  width: "100%",
};

const iconStyle = {
  fontSize: "64px",
  color: "#9b5de5",
  marginBottom: "20px",
};

const titleStyle = {
  color: "#4d3a8e",
  fontSize: "32px",
  marginBottom: "20px",
};

const textStyle = {
  color: "#666",
  marginTop: "20px",
  fontSize: "18px",
  lineHeight: "1.5",
};

const buttonStyle = {
  display: "inline-block",
  padding: "10px 20px",
  backgroundColor: "#9b5de5",
  color: "#fff",
  textDecoration: "none",
  borderRadius: "4px",
  marginTop: "20px",
  transition: "background-color 0.3s",
};

const noteStyle = {
  color: "#888",
  fontSize: "14px",
  marginTop: "30px",
  textAlign: "left",
};

const contactInfoStyle = {
  marginTop: "30px",
  textAlign: "left",
};

export default PaymentSuccess;
