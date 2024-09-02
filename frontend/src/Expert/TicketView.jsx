import { Button } from "@mui/joy";
import Chip from "@mui/material-next/Chip";
import { useEffect } from "react";
import { Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { baseUrlImage } from "../Api/BaseApi";
import { useAppContext } from "../context/AppContext";
import Header from "./components/Header";
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
  return formattedDate;
};
function TicketView() {
  const { 
    showMessageModal, 
    authUser ,
    handleInputMessageChange,
    supportMessage,
    handleSupportMessageSubmit,
    ticketStatus,
    fetchSupportTicket,
    supportMessagesData
} = useAppContext();
const {id} = useParams();
const status = supportMessagesData[0]?.status;
let chipColor = 'default';

// Set the chip color based on the status value
if (status === 'waiting') {
  chipColor = 'primary';
} else if (status === 'open') {
  chipColor = 'success';
} else if (status === 'closed') {
  chipColor = 'tertiary';
}   
  useEffect(() => {
    fetchSupportTicket(id);
}, [id])
console.log(supportMessagesData,"/supportMessagesData")
  return (
    <>    
      <div className="min-h-screen bg-gray-100">
        <Header />
        <section className="tk-main-section tk-main-bg">
          <div className="container col-10   ">
            <div className="row">
              <h4 style={{textTransform:'uppercase'}}>
                {supportMessagesData.length > 0 &&
                  supportMessagesData[0].reason + " "}
                <Chip
                  label={status}
                  color={chipColor}
                  variant="elevated"
                  size="medium"
                  style={{
                    fontFamily: "inherit",
                    width: "100px",
                    boxShadow: "0px 0px 0px 0px",
                    textTransform:'capitalize'
                  }}
                  
                />
              </h4>
              <div className="col-lg-7 col-12">
              {supportMessagesData.length > 0 &&
                  supportMessagesData[0].support_messages?.map((message) => (
              <div className="tb-userlogin sub-menu-holder p-2 border-bottom border-1 mt-3 ">
                <a className="tb-hasbalance">
                  <img
                    src={ 
                        message.type === 'user' ?  baseUrlImage + supportMessagesData[0]?.user?.image : 'https://taskup.wp-guppy.com/images/default-user-60x60.png'
                    }
                    alt="images/default-user-60x60.png"
                  />
                  <div className="ms-2 tk-wallet">
                    <span>
                      <strong>{message.type === 'user' ?  supportMessagesData[0]?.user?.name : 'Support'}</strong>
                    </span>
                  </div>
                </a>
                <p className="mt-3">{message.message}</p>
              </div>
                  ))}
            <div className="comment-area mt-3">
         <div className="row"><div className="col-10">
         <Form.Control
                    as="textarea"
                    placeholder="Enter your message"
                    className="form-control tk-themeinput"
                    name="message"
                    value={supportMessage.message}
                    onChange={handleInputMessageChange}
                  />
                  </div>
                  <div className="col-2 "
                   style={{position:'relative'}}
                  >
                  <Button
                    className="tk-btn-solid-lg text-white w-100 mt-5"
                    style={{position:'absolute',bottom:'0px'}}
                    onClick={async () =>
                      await handleSupportMessageSubmit(id)
                    }
                    disabled={supportMessagesData[0]?.status === 'open' || supportMessagesData[0]?.status === 'waiting' ? false : true}
                  >
                    <span>
                      {supportMessagesData[0]?.status === "open"
                        ? "Send"
                        : supportMessagesData[0]?.status === "waiting"
                        ? "Send"
                        : "Closed"}
                    </span>
                  </Button>
                  </div>
                  
                  </div>
                
                  </div>
                  </div>
              <div className="col-lg-3 col-12">
                  <div className="right-box  p-4" style={{backgroundColor:'rgb(227 255 244)'}}>
                  <p className="right-box-list">
                 <strong>id: </strong>#1055486{id}
                </p>
                <p className="right-box-list">
                <strong>Requester: </strong>{supportMessagesData[0]?.user?.name}
                </p>
                <p className="right-box-list">
                <strong>Created: </strong>{formatDate(supportMessagesData[0]?.created_at)}
                </p>
                  </div>
              </div>

         
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default TicketView;
