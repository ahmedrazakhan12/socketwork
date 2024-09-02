import { Form, Modal } from "react-bootstrap";
import { useAppContext } from "../context/AppContext";

import { Button } from "@mui/joy";
import { Box } from "@mui/material";
import Chip from "@mui/material-next/Chip";
import { useState } from "react";
import InputFileUpload from "./components/FileUpload";
import Header from "./components/Header";
import DataTable from "./components/Table";

function Requests() {
  const {
    showMessageModal,
    handleMessageClose,
    handleMessageShow,
    handleSupportMessageSubmit,
    handleInputMessageChange,
    supportMessage,
    supportMessagesData,
    filteredTickets,
    searchQuery,
    handleSearch,
    ticketStatus,
  } = useAppContext();

  const [selectedFilter, setSelectedFilter] = useState("All");
  const filteredData = filteredTickets.filter((ticket) => {
    if (selectedFilter === "All") {
      return true;
    }
    if (selectedFilter === "Closed") {
      return ticket.status === "closed";
    }
    if (selectedFilter === "Waiting") {
      return ticket.status === "waiting";
    }
    if (selectedFilter === "Open") {
      return ticket.status === "open";
    }
  });
  const RequestColumns = [
    { field: "reason", headerName: "Subject", width: 350 },
    {
      field: "category",
      headerName: "Category",
      width: 350,
      renderCell: (params) => {
        const category = params.value; // Accessing the category object
        const categoryName = category?.title; // Accessing the title property of the category
        return <div>{categoryName}</div>;
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 250,
      renderCell: (params) => {
        const status = params.value;
        let chipColor = "default";

        // Set the chip color based on the status value
        if (status === "waiting") {
          chipColor = "primary";
        } else if (status === "open") {
          chipColor = "success";
        } else if (status === "closed") {
          chipColor = "tertiary";
        }
        return (
          <div
            onClick={(e) => {
              handleMessageShow(params.row.id, params.row.status);
            }}
          >
            <Chip
              label={status}
              color={chipColor}
              variant="elevated"
              size="medium"
              style={{
                fontFamily: "inherit",
                width: "100px",
                boxShadow: "0px 0px 0px 0px",
              }}
            />
          </div>
        );
      },
      // return (
      //   <Link to={`/request/${params.row.id}`}>
      //     <Chip
      //       label={status}
      //       color={chipColor}
      //       variant="elevated"
      //       size="medium"
      //       style={{
      //         fontFamily:'inherit',
      //         width :'100px',
      //         boxShadow : '0px 0px 0px 0px'

      //       }}
      //     />
      //   </Link>
      // )}
    },
  ];
  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <section className="tk-main-section tk-main-bg">
          <div className="container mt-1">
            <div className="row">
              <h2>My Requests</h2>
              <div className="col-9 mb-1">
                <input
                  type="text"
                  name="xyz"
                  id=""
                  placeholder="Search..."
                  className="form-control w-100 rounded-5"
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
              <div className="col-3 mb-1">
                <select
                  name=""
                  id=""
                  className="form-select w-100"
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                >
                  <option value="All">All</option>
                  <option value="Open">Open</option>
                  <option value="Closed">Closed</option>
                  <option value="Waiting">Waiting</option>
                </select>
              </div>
              <div className="col-12 d-flex justify-content-center">
                {filteredData && filteredData.length > 0 ? (
                  <DataTable columns={RequestColumns} rows={filteredData} />
                ) : (
                  <figure className="">
                    <img
                      src="https://taskup.wp-guppy.com/images/empty.png"
                      alt="Oh, snap! there is no content to show this time"
                    />
                    <h4>Oh, snap! there is no content of requests</h4>
                  </figure>
                  // 'No request available'
                )}
              </div>
            </div>

            <Modal show={showMessageModal} onHide={handleMessageClose} centered>
              <Modal.Header closeButton>
                <Modal.Title>Chat</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div class="container-chat">
                  {supportMessagesData.length > 0 ? (
                    supportMessagesData.map((message, i) => (
                      <div
                        class="message-blue support"
                        className={
                          message.type == "user"
                            ? "message-orange"
                            : "message-blue"
                        }
                      >
                        <p class="message-content ">{message.message}</p>
                        <div class="message-timestamp-left">
                          ({message.type == "user" ? "You" : "Support"}) 13:37
                        </div>
                      </div>
                    ))
                  ) : (
                    <figure>
                      <h4>Oh, snap! there is no chat</h4>
                    </figure>
                  )}
                </div>

                {/* <div class="message-blue support">
        <p class="message-content ">This is an awesome message!</p>
        <div class="message-timestamp-left">(Support) 13:37</div>
    </div>
    
    <div class="message-orange me">
        <p class="message-content">I  I  I  I  I  I  I  I   Thanks Thanks Thanks Thanks</p>
        <div class="message-timestamp-right">(You) 13:37</div>
    </div> */}

                {/* <div className="chat-container">
                  {supportMessagesData.length > 0
                    ? supportMessagesData.map((message, i) => (
                        <div className="chat-message col-12 right mt-2" key={i}>
                          <p
                            className={
                              message.type == "user"
                                ? "user-chat-side"
                                : "text-left"
                            }
                          >
                            {message.message}
                          </p>
                        </div>
                      ))
                    : "No Data"}

                </div> */}
                <Form className="tk-themeform">
                  <Form.Control
                    as="textarea"
                    placeholder="Enter your message"
                    className="form-control tk-themeinput"
                    name="message"
                    value={supportMessage.message}
                    onChange={handleInputMessageChange}
                  />
                  <Box className="row">
                    <Box className="col-md-8 col-12">
                      <Button
                        className="tk-btn-solid-lg text-white w-100"
                        onClick={handleSupportMessageSubmit}
                        disabled={
                          ticketStatus === "open" || ticketStatus === "waiting"
                            ? false
                            : true
                        }
                      >
                        <span>
                          {ticketStatus === "open"
                            ? "Send"
                            : ticketStatus === "waiting"
                            ? "Send"
                            : "Closed"}
                          <i className="text-white bi bi-chevron-right w-100"></i>
                        </span>
                      </Button>
                    </Box>
                    <Box className="col-md-4 col-12">
                      <InputFileUpload />
                    </Box>
                  </Box>
                </Form>
              </Modal.Body>
            </Modal>
          </div>
        </section>
      </div>
    </>
  );
}

export default Requests;
