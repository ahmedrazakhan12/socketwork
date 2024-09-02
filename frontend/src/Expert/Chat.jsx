import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import PhoneIcon from "@mui/icons-material/Phone";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import CircularProgress from "@mui/joy/CircularProgress";
import Modal from "@mui/joy/Modal";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import React, { useEffect, useRef, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useFrontEndContext } from "../context/FrontEndContext";
import socketIO from "../socket/socket";
import CallModal from "./CallModal";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";
import { useAppointments } from "../context/AppointmentsContext";
import { storeChat } from "../utils/helpers";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

// import ZegoCloud from 'zego-cloud ';
let AcceptedDate = null;
let CallType = "audio";
// import { ZIM } from "zego-zim-web"

function Chat({
  openChat,
  setOpenChat,
  isLoader,
  setIsLoader,
  id,
  name,
  isScheduledAppointment,
}) {
  const [message, setMessage] = useState("");
  const lastMessageRef = useRef(null);
  const [record, setRecord] = useState(false);
  const [audioData, setAudioData] = useState(null);
  const audioRef = useRef(null);
  const [IsOpenModalForCall, setIsOpenModalForCall] = useState();
  const { authUser, allMessage, openCall, setOpenCall } = useAppContext();

  const [MyDate, setMyDate] = useState({
    callAcceptedDate: null,
    callEndedDate: null,
  });

  useEffect(() => {
    if (openChat) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [openChat]);

  
  const [CallAcceptedDate, setCallAcceptedDate] = useState(null);
  const { UserId } = useParams();
  const [CallType, setCallType] = useState("audio");
  const { zp, setZp, CallRunning, setCallRunning, ReceiverId, setReceiverId } =
    useAppointments();
  const [isOpen, setIsOpen] = React.useState(false);
  const handleOpenAppointmentWarn = () => setIsOpen(true);
  const handleCloseAppointmentWarn = () => setIsOpen(false);
  const [CallStarted, setCallStarted] = useState(false);
  const [CallZPTYPE, setCallZPType] = useState(null);
  const initialDate = new Date();
  // const additionalTime = 5 * 24 * 60 * 60 * 1000
  const additionalTime = 60 * 50 * 1000;
  const finalDate = new Date(initialDate.getTime() + additionalTime); // 5 days from now
  const containerRef = useRef(null);

  // const playSound = () => {
  //   audioRef.current.play();
  // };

  // const startCallRecording = () => {
  //   ZegoCloud.startRecording(); // Replace with actual recording start method
  // };
  // const stopCallRecording = async () => {
  //   const recording = await ZegoCloud.stopRecording(); // Replace with recording stop method
  // }
  // scroll to bottom

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = ''; // This line is necessary for Chrome to show the warning dialog
    };

    // Add the event listener
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
  
  const scrollToBottom = () => {
    if (containerRef.current)
      containerRef.current?.scrollTo(0, containerRef.current.scrollHeight);
  };
  const startRecording = () => {
    setRecord(true);
  };
  console.log("id", id);
  const stopRecording = () => {
    setRecord(false);
  };

  const onData = (recordedBlob) => {
    console.log("chunk of real-time data is: ", recordedBlob);
  };

  const onStop = (recordedBlob) => {
    console.log("recordedBlob is: ", recordedBlob);

    const reader = new FileReader();
    reader.onload = () => {
      const base64Data = reader.result.split(",")[1];
      setAudioData(base64Data);

      socketIO.emit("message", {
        fromId: authUser.user.id,
        toId: id,
        text: base64Data,
      });
    };

    reader.readAsDataURL(recordedBlob.blob);
  };

  const { timer } = useFrontEndContext();
  // useEffect(() => {
  //   const handleBeforeUnload = (event) => {
  //     event.preventDefault();
  //     // toast.error("Leaving The Page Resultant Your Appointment Will Be Cancelled!");
  //     event.returnValue = ''; // Some browsers may need this line
  //   };

  //   window.addEventListener('beforeunload', handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
  //   };
  // }, []);

  useEffect(() => {
    const linkElement = document.createElement("link");
    linkElement.rel = "stylesheet";
    linkElement.href = `../../assets/css/template.bundle.css`;
    linkElement.media = "all";

    linkElement.onload = () => {
      setIsLoader(false);
    };
    document.head.appendChild(linkElement);
    return () => {
      document.head.removeChild(linkElement);
      setIsLoader(false);
    };
  }, []);

  // for chat
  const handleUplaodFile = (e) => {};
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message.trim()) {
      // playSound();
      socketIO.emit("message", {
        text: message,
        fromId: authUser.user.id,
        toId: id,
      });

      await storeChat(authUser?.user?.id + "," + id, message);
    }
    setMessage("");
  };

  // for chat
  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    scrollToBottom();
    console.log("error", allMessage);
  }, [allMessage]);

  function randomID(len) {
    let result = "";
    var chars =
        "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP",
      maxPos = chars.length,
      i;
    len = len || 5;
    for (i = 0; i < len; i++) {
      result += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return result;
  }

  // useEffect(() => {
  //   async function init() {
  //     const userName = authUser.user.name + '_' + fromID;

  //     const KitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
  //       547746184,
  //       'c3aa30d718bdefedb1bdf4cdf9debc64',
  //       null,
  //       fromID,
  //       userName
  //     );
  //     const newZp = ZegoUIKitPrebuilt.create(KitToken);
  //     newZp.addPlugins({ ZIM });

  //     newZp.setCallInvitationConfig({
  //       onIncomingCallReceived: (callID, caller, callType, callees) => {
  //         console.log('Incoming call received:', callID, caller, callType, callees);
  //         AcceptedDate = new Date();
  //         console.log('Incoming call received: accepted date: ', AcceptedDate);
  //       },

  //       onIncomingCallCanceled: (callID, caller, callType, callees) => {
  //         console.log('Incoming call canceled:', callID, caller, callType, callees);
  //       },

  //       onOutgoingCallAccepted: (callID, callee) => {

  //         const acceptedDate = new Date();
  //         setCallAcceptedDate(acceptedDate);
  //         AcceptedDate = acceptedDate;
  //         // required store the date of the call
  //         console.log('accepted Outgoing call accepted: date: ', AcceptedDate);
  //       },

  //       onCallInvitationEnded: async (callID, fromUser, toUser) => {

  //         const endedDate = new Date();
  //         const duration = endedDate - AcceptedDate;
  //         const expertId = UserId;

  //         console.log(
  //           'Call Ended ended:',
  //           'ended date: ', endedDate,
  //           'duration: ', duration,
  //           'expertedId: ', expertId,
  //           'accepted-date: ', formatDateForLaravel(AcceptedDate));

  //         // must on this
  //         const res = await storeCallLogs(CallType, AcceptedDate, endedDate, duration)

  //         const scheduleRes = await storeSchedule({
  //           start_time: extractOnlyTimeFromDate(AcceptedDate),
  //           end_time: extractOnlyTimeFromDate(endedDate),
  //           // extracting only the date
  //           date: (new Date()).toISOString().split('T')[0]
  //         });
  //         const scheduleId = scheduleRes?.createdSchedule?.id

  //         const createdAppointment = await storeAppointment({
  //           "data": [
  //             {
  //               "expert_id": 11,
  //               "schedule_id": scheduleId,
  //               "amount": 50.00,
  //               "date": "2024-03-27",
  //               "time": "10:00"
  //             },
  //           ]
  //         })

  //         console.log(scheduleRes?.createdAppointment, 'createdAppointment', createdAppointment)
  //       },

  //       onOutgoingCallRejected: (callID, callee) => {
  //         console.log('Outgoing call rejected:', callID, callee);
  //       },

  //       onOutgoingCallDeclined: (callID, callee) => {
  //         console.log('Outgoing call declined:', callID, callee);
  //       },

  //       onIncomingCallTimeout: (callID, caller) => {
  //         console.log('Incoming call timeout:', callID, caller);
  //       },

  //       onOutgoingCallTimeout: (callID, callees) => {
  //         console.log('Outgoing call timeout:', callID, callees);
  //       }
  //     })
  //     // Listen for room state updates

  //     setZp(newZp);
  //   }
  //   init();
  // }, []);
  // Start recording when call starts
  // useEffect(() => {
  //   startCallRecording();
  //   return () => stopCallRecording(); // Stop recording on cleanup
  // }, []);
  function handleSend(callType) {
    //
    if (!zp) {
      alert("Zego instance is not initialized yet!");
      return;
    }

    setCallZPType(callType);

    setIsOpenModalForCall(true);

    // receiver-user-id, mostly expert
  }
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (time) => {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    const formatNumber = (num) => num.toString().padStart(2, "0");

    return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(
      seconds
    )}`;
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const formatNumber = (num) => num.toString().padStart(2, "0");

    return `${formatNumber(day)}/${formatNumber(month)}/${year}`;
  };

  return (
    <>
      <React.Fragment>
        <Modal
          open={IsOpenModalForCall}
          onClose={() => setIsOpenModalForCall(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Appointment Is Going To Start, Confirm?
            </Typography>
            <Typography
              id="modal-modal-description"
              style={{ color: "gray", fontSize: "0.8rem" }}
              sx={{ mt: "0.4rem" }}
            >
              On Ending The Appointment/Interaction, You Won't Be Able To
              Interact Again Without Paying{" "}
            </Typography>
            <Button
              color="secondary"
              variant="contained"
              style={{ marginTop: 24 }}
              onClick={() => {
                // handleStartCall();
                setIsOpenModalForCall(false);

                const userID = String(id);

                zp.sendCallInvitation({
                  callees: [{ userID: userID, userName: "Processing..." }],
                  callType: CallZPTYPE,
                  timeout: 60,
                })
                  .then((res) => {
                    console.log("Call invitation sent:", zp);
                    setCallStarted(true);
                    console.warn(res);
                    if (res.errorInvitees.length) {
                      alert("The user does not exist or is offline.");
                    }
                  })
                  .catch((err) => {
                    console.error(err);
                  });
              }}
            >
              Yes Start Now
            </Button>
          </Box>
        </Modal>
        {/* <audio ref={audioRefMe} src={'/notif.mp3'}  ></audio> */}
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          open={openChat}
          // onClose={() => setOpenChat(false)}
          sx={{
            // display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1300, // Adjust the value if needed
            display: CallRunning ? "none" : "flex",
          }}
        >
          <Sheet
            variant="outlined"
            sx={{
              maxWidth: 500,
              borderRadius: "md",
              p: 3,
              boxShadow: "lg",
              width: "100%",
            }}
          >
            {isLoader ? (
              <CircularProgress
                color="primary"
                size="lg"
                value={25}
                variant="soft"
              />
            ) : (
              <>
                <Typography
                  component="h2"
                  id="modal-title"
                  level="h4"
                  textColor="inherit"
                  fontWeight="lg"
                  mb={1}
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>
                    <span style={{ marginRight: "0.4rem" }}>
                      {isScheduledAppointment
                        ? "You Are In Appointment"
                        : "Chat"}
                    </span>
                    <span style={{ fontSize: "0.9rem", color: "gray" }}>
                      Duration: (1h)
                    </span>
                  </span>

                  <div>
                    <VideoCallIcon
                      onClick={() => {
                        setCallType("video");
                        setReceiverId(id);
                        // setIsOpenModalForCall(true);

                        // return;
                        handleSend(ZegoUIKitPrebuilt.InvitationTypeVideoCall);
                      }}
                      sx={{ color: "right_side_color", cursor: "pointer" }}
                    />
                    <PhoneIcon
                      onClick={() => {
                        setCallType("audio");
                        setReceiverId(id);

                        // setIsOpenModalForCall(true);

                        handleSend(ZegoUIKitPrebuilt.InvitationTypeVoiceCall);
                      }}
                      // onClick={() => onCreateOffer("audio")}
                      sx={{ color: "grey_color", cursor: "pointer" }}
                    />
                  </div>
                </Typography>
                <Typography
                  id="modal-desc"
                  component="div"
                  textColor="text.tertiary"
                >
                  <div>
                    <div
                      className="layout overflow-hidden"
                      style={{ height: "85vh" }}
                    >
                      {/* <Countdown initialDate={initialDate} finalDate={finalDate} /> */}

                      {/* <div>{formatDate(currentTime)}</div> &nbsp;
                  <div>{formatTime(currentTime)}</div>        */}
                      <main className="main is-visible" data-dropzone-area="">
                        <div className="container " style={{ height: "85vh" }}>
                          <div className="d-flex flex-column h-100 position-relative">
                            <div className="chat-header border-bottom py-4 py-lg-7">
                              <div className="row align-items-center">
                                <p
                                  style={{ color: "gray", textAlign: "center" }}
                                >
                                  Remember, Try Not To Leave/Refresh When
                                  Appointment, Doing This Resultant Waste Your
                                  Appointment
                                </p>
                                <div className="col-8 col-xl-12">
                                  <div className="row align-items-center text-center text-xl-start">
                                    <div className="col-12 col-xl-6">
                                      <div className="row align-items-center gx-5"></div>
                                    </div>

                                    <div className="col-xl-6 d-none d-xl-block">
                                      <div className="row align-items-center justify-content-end gx-6">
                                        <div className="col-auto">
                                          <a
                                            href="#"
                                            className="icon icon-lg text-muted"
                                            data-bs-toggle="offcanvas"
                                            data-bs-target="#offcanvas-more"
                                            aria-controls="offcanvas-more"
                                          >
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="24"
                                              height="24"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                              stroke="currentColor"
                                              strokeWidth="2"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              className="feather feather-more-horizontal"
                                            >
                                              <circle
                                                cx="12"
                                                cy="12"
                                                r="1"
                                              ></circle>
                                              <circle
                                                cx="19"
                                                cy="12"
                                                r="1"
                                              ></circle>
                                              <circle
                                                cx="5"
                                                cy="12"
                                                r="1"
                                              ></circle>
                                            </svg>
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="col-2 d-xl-none text-end">
                                  <a
                                    href="#"
                                    className="icon icon-lg text-muted"
                                    data-bs-toggle="offcanvas"
                                    data-bs-target="#offcanvas-more"
                                    aria-controls="offcanvas-more"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="feather feather-more-vertical"
                                    >
                                      <circle cx="12" cy="12" r="1"></circle>
                                      <circle cx="12" cy="5" r="1"></circle>
                                      <circle cx="12" cy="19" r="1"></circle>
                                    </svg>
                                  </a>
                                </div>
                              </div>
                            </div>

                            <div
                              style={{ overflow: "auto" }}
                              className="chat-body hide-scrollbar flex-1 h-100"
                              ref={containerRef}
                            >
                              <div className="chat-body-inner" id="hamza">
                                <div className="py-6 py-lg-12"></div>
                                {allMessage?.map((message, key) => {
                                  const isBase64Data = isBase64(message.text);
                                  return (
                                    <div
                                      className={`message ${
                                        message.fromId == id
                                          ? "message"
                                          : "message-out"
                                      }`}
                                      key={key}
                                    >
                                      <div className="message-inner">
                                        <div className="message-body">
                                          <div className="message-content">
                                            <div className="message-text">
                                              {isBase64Data ? (
                                                <audio controls>
                                                  <source
                                                    src={`data:audio/wav;base64,${message.text}`}
                                                    type="audio/wav"
                                                    style={{}}
                                                  />
                                                  Your browser does not support
                                                  the audio element.
                                                </audio>
                                              ) : (
                                                <p>{message.text}</p>
                                              )}
                                            </div>

                                            <div className="message-action">
                                              <div className="dropdown">
                                                <a
                                                  className="icon text-muted"
                                                  href="#"
                                                  role="button"
                                                  data-bs-toggle="dropdown"
                                                  aria-expanded="false"
                                                >
                                                  <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="feather feather-more-vertical"
                                                  >
                                                    <circle
                                                      cx="12"
                                                      cy="12"
                                                      r="1"
                                                    ></circle>
                                                    <circle
                                                      cx="12"
                                                      cy="5"
                                                      r="1"
                                                    ></circle>
                                                    <circle
                                                      cx="12"
                                                      cy="19"
                                                      r="1"
                                                    ></circle>
                                                  </svg>
                                                </a>
                                              </div>
                                            </div>
                                          </div>
                                        </div>

                                        <div className="message-footer">
                                          <span className="extra-small text-muted">
                                            {message.fromId != id
                                              ? "(YOU)"
                                              : name}{" "}
                                            08:45 PM
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                            <div className="chat-footer ">
                              <div
                                className="dz-preview bg-dark"
                                id="dz-preview-row"
                                data-horizontal-scroll=""
                              ></div>
                              {/* <ReactMic
                                record={record}
                                className="sound-wave"
                                onStop={onStop}
                                onData={onData}
                                strokeColor="transparent"
                                backgroundColor="transparent"
                                style={{
                                  width: 0,
                                  height: 0,
                                }}
                              /> */}
                              <form
                                className="chat-form rounded-pill bg-dark"
                                data-emoji-form=""
                              >
                                <div className="row align-items-center gx-0">
                                  <div className="col">
                                    <div className="row">
                                      <div className="col-2 mt-4">
                                        {record ? (
                                          <MicOffIcon onClick={stopRecording} />
                                        ) : (
                                          <MicIcon onClick={startRecording} />
                                        )}
                                      </div>
                                      <div className="col-10">
                                        <div className="input-group">
                                          <textarea
                                            className="form-control px-0"
                                            placeholder="Type your message..."
                                            rows="1"
                                            data-emoji-input=""
                                            data-autosize="true"
                                            style={{ height: "inherit" }}
                                            value={message}
                                            onChange={(e) =>
                                              setMessage(e.target.value)
                                            }
                                          ></textarea>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="col-auto">
                                    <button
                                      className="btn btn-icon btn-primary rounded-circle ms-5"
                                      onClick={handleSendMessage}
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="feather feather-send"
                                      >
                                        <line
                                          x1="22"
                                          y1="2"
                                          x2="11"
                                          y2="13"
                                        ></line>
                                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                      </svg>
                                    </button>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </main>
                    </div>
                  </div>
                </Typography>
              </>
            )}
          </Sheet>
        </Modal>
      </React.Fragment>
      <CallModal openCall={openCall} setOpenCall={setOpenCall} />
    </>
  );
}

export default Chat;

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
}

function isBase64(str) {
  try {
    return btoa(atob(str)) == str;
  } catch (err) {
    return false;
  }
}

function Countdown({ initialDate, finalDate }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(finalDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(finalDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [finalDate]);

  function calculateTimeLeft(finalDate) {
    const difference = +new Date(finalDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return timeLeft;
  }

  return (
    <div>
      <div>
        {timeLeft.days ? timeLeft.days + " d" : null}{" "}
        {timeLeft.hours ? timeLeft.hours + " h" : null} {timeLeft.minutes}m{" "}
        {timeLeft.seconds}s
      </div>
    </div>
  );
}