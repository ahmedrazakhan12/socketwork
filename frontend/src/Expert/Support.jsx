import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import React, { useEffect, useMemo, useState } from "react";
import { Form, FormControl, FormGroup, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import Header from "./components/Header";

function Support() {
  const {
    handleSupportSubmit,
    showTicketModal,
    handleTicketClose,
    handleTicketShow,
    handleInputTicketChange,
    ticketData,
    handleSupportCategoryChange,
    selectedSupportCategory,
    showMessageModal,
    handleMessageClose,
    supportCategories,
    checkboxRef,
    checkboxError,
  } = useAppContext();
  const [Q, setQ] = useState('');

  useEffect(() => {
    console.log(supportCategories, 'sss');
  }, [supportCategories]);

  const filteredCategories = useMemo(
    () => supportCategories.filter(category => category.title.toLowerCase().includes(Q.toLowerCase())),
    [Q, supportCategories]
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="support-banner">
        <div className="wrapper2">
          <h2 className="text-center text-white mb-3 mt-1">
            How can we help you?
          </h2>
          <div className="searchBar">
            <input
              onChange={(e) => setQ(e.target.value)}
              id="searchQueryInput"
              type="text"
              name="searchQueryInput"
              placeholder="Search"
              value={Q}
            />
            <button
              id="searchQuerySubmit"
              type="submit"
              name="searchQuerySubmit"
            >
              <svg
                style={{ width: "24px", height: "24px" }}
                viewBox="0 0 24 24"
              >
                <path
                  fill="#666666"
                  d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
                />
              </svg>
            </button>
          </div>
          <p className="text-center support-font text-white mt-2">
            Search any keyword{" "}
            <span className="badge badge-pill support-badge m-2">Beauty</span>
            <span className="badge badge-pill support-badge m-2">Fashion</span>
            <span className="badge badge-pill support-badge m-2">Government</span>
          </p>
        </div>
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10 col-12">
            <h2 className="text-left text-dark mb-3 mt-5">Categories</h2>
          </div>
          <div className="col-md-2 col-12 mt-5">
            <Link to={`/requests`}>
              <Button className="tk-btn-solid-lg tk-btn-yellow text-white">
                My Requests
              </Button>
            </Link>
          </div>
    


{filteredCategories.length === 0 &&        <h3 style={{fontSize: '1.4rem', textAlign: 'center'}}>No Support Categories Were Found</h3>}
 
 
           {filteredCategories.length > 0
            ? filteredCategories.map((category) => (
                <div
                  key={category.id}
                  className="col-3 col-lg-3 col-12 mt-3"
                  style={{ textTransform: "capitalize" }}
                >
                  <Card
                    variant="outlined"
                    sx={{
                      width: "100%",
                      height: 250,
                      overflow: "auto",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    ></Box>
                    <CardContent>
                      <Typography
                        level="title-lg"
                        style={{
                          textAlign: "center",
                          marginTop: "70px",
                          fontSize: "20px",
                        }}
                      >
                        {category.title}
                      </Typography>
                    </CardContent>
                    <CardActions buttonFlex="0 1 280px" className={'support-btn'}>
                      <Link to={`/support-answers/${category.id}`}>
                        <Button variant="soft" color="neutral">
                          View
                        </Button>
                      </Link>
                    </CardActions>
                  </Card>
                </div>
              ))
            : ''}
        </div>
      </div>
      <div className="container-fluid send-question-block__2 mt-5">
        <div className="row justify-content-center">
          <div className="col-4"></div>
          <div className="col-4"></div>
          <div
            className="tk-question-section"
            style={{ padding: "60px", marginBottom: "0px" }}
          >
            <div className="tk-faq-search_title">
              <h5>Didn't find your question here?</h5>
              <h2>Send us your question now</h2>
              <div className="tk-question_desc">
                <p>
                  If you couldn't find the answer you're looking for, don't
                  worry! Just send us your question, and our team will get back
                  to you with the information you need as soon as possible.
                </p>
              </div>
            </div>
            <a
              href="#"
              onClick={handleTicketShow}
              className="tk-btn-solid-lg tk-btn-yellow"
            >
              Submit your question <i className="bi bi-pencil-square"></i>
            </a>
          </div>
        </div>
        <Modal show={showTicketModal} onHide={handleTicketClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Submit your question</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className="tk-themeform">
              <FormGroup>
                <Form.Label className="tk-required">Select Category</Form.Label>
                <Form.Control
                  as="select"
                  className="tk-themeinput"
                  onChange={handleSupportCategoryChange}
                  value={selectedSupportCategory}
                  name="category_id"
                >
                  <option selected>Select a Category</option>
                  {supportCategories.map((category, i) => (
                    <option key={i} value={category.id}>
                      {category.title}
                    </option>
                  ))}
                </Form.Control>
              </FormGroup>
              <FormGroup>
                <Form.Label className="tk-required">Subject</Form.Label>
                <FormControl
                  type="text"
                  placeholder="Add subject to your question"
                  className={`form-control tk-themeinput ${
                    ticketData.reason.length === 0 ? "is-invalid" : "is-valid"
                  }`}
                  onChange={handleInputTicketChange}
                  value={ticketData.reason}
                  name="reason"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Form.Label className="tk-required">Message</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter message"
                  className={`form-control tk-themeinput ${
                    ticketData.message.length === 0 ? "is-invalid" : "is-valid"
                  }`}
                  onChange={handleInputTicketChange}
                  value={ticketData.message}
                  name="message"
                />
              </FormGroup>
              <FormGroup className="tk-popup-terms">
                <div className="tk-form-checkbox">
                  <Form.Check
                    type="checkbox"
                    label={
                      <span>
                        I have read and agree to all{" "}
                        <a href="#">Terms &amp; conditions</a>
                      </span>
                    }
                    id="tk-check"
                    className={checkboxError === true ? "tk-required" : ""}
                    ref={checkboxRef}
                  />
                </div>
                <Button
                  className="tk-btn-solid-lg text-white"
                  onClick={handleSupportSubmit}
                  disabled={
                    selectedSupportCategory === "" ||
                    ticketData.reason.length === 0 ||
                    ticketData.message.length === 0
                  }
                >
                  <span>Submit now </span>
                </Button>
              </FormGroup>
            </Form>
          </Modal.Body>
        </Modal>
        <Modal show={showMessageModal} onHide={handleMessageClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Chat</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="chat-container">
              <div className="chat-message col-12 left bg-light">
                <p className="text-dark">Support: Hello, how can I help you?</p>
              </div>
              <div className="chat-message col-12 right">
                <p className="text-right">You: Hi, I have a question.</p>
              </div>
              <div className="chat-message col-12 left bg-light">
                <p className="text-dark">Support: Hello, how can I help you?</p>
              </div>
              <div className="chat-message col-12 right">
                <p className="text-right">You: Hi, I have a question.</p>
              </div>
              {/* Add more chat messages here as needed */}
            </div>
            <Form className="tk-themeform">
              <Form.Control
                as="textarea"
                placeholder="Enter your message"
                className="form-control tk-themeinput"
                name="message"
                // value={message}
                // onChange={handleInputChange}
              />
              <Button className="tk-btn-solid-lg text-white">
                <span>Send</span>
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default Support;