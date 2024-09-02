import axios from "axios";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
// import FlatButton from 'material-ui/FlatButton';
// import { CommunicationCall, NavigationClose } from 'material-ui/svg-icons';
import { Peer } from "peerjs";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { baseurl, httpForToastRequest, httpRequest } from "../Api/BaseApi";
import socketIO from "../socket/socket";
import { checkIfUserExpert } from "../utils/helpers";

let type;
// import CommunicationCall from 'material-ui/svg-icons/communication/call'
const AppContext = createContext();
export const AppProvider = ({ children }) => {
  const [userLoggedIne, setUserLoggedIn] = useState(false);
// const [loading, setLoading] = useState(true);

const token = localStorage.getItem("token");
// console.log('tokencheck',localStorage.getItem("token"));

// console.log('chk',token)
useEffect(() => {
  if (token) {
    setUserLoggedIn(true);
  } else {
    setUserLoggedIn(false);
  }
  setTimeout(() => {
    setLoading(false);
  }, 1000);
}, [token]);
  // const{
  //     ViewProfile
  // }=useFrontEndContext();
  const [isLoading, setIsLoading] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [progresss, setProgress] = useState(0);
  const [data, setData] = useState([]);
  const [authUser, setAuthUser] = useState([]);
  const [AUTHUSER, setAuthUSER] = useState([]);
  const [authUserRoles, setAuthUserRoles] = useState([]);
  const [authUserPermissions, setAuthUserPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPreLoading, setIsPreLoading] = useState(false);
  const [roleData, setRoleData] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [skillRequests, setSkillRequests] = useState([]);
  const [selectedSupportCategory, setSelectedSupportCategory] = useState(null);
  const [categoryError, setCategoryError] = useState("");
  const [resetUserDataEmail, setResetUserDataEmail] = useState("");
  const [resetCondition, setResetCondition] = useState("");

  const [faqData, setFaqData] = useState([]);
  const [withDrawData, setWithDrawData] = useState([]);
  const [countriesData, setCountriesData] = useState([]);
  const [supportData, setSupportData] = useState([]);
  const [supportCategories, setSupportCategories] = useState([]);
  const [supportAnswers, setSupportAnswers] = useState([]);
  const [AllsupportAnswers, setSupportAllAnswers] = useState([]);
  const [supportMessagesData, setSupportMessagesdata] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [ticketId, setTicketId] = useState(null);
  const [ticketStatus, setTicketStatus] = useState("");
  const openDropdown = Boolean(anchorEl);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [termsCondi, setTermsCondi] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [onlineExpertUser, setOnlineExpertUser] = useState(null);
  const [allMessage, setAllMessage] = useState([]);
  const [allReviews, setAllReviews] = useState([]);
  const [singleReview, setSingleReview] = useState([]);
  const [authUserSubscriptions, setAuthUserSubscriptions] = useState([]);
  const [authUserSubscriptionPackages, setAuthUserSubscriptionPackages] =
    useState([]);
  const [authUserActiveSubscription, setAuthUserActiveSubscription] = useState(
    []
  );
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [portfoliosData, setPortfoliosData] = useState([]);
  const [qualificationsData, setQqualificationsData] = useState([]);
  const [phone, setPhone] = useState("");
  const [phoneContact, setPhoneContact] = useState("");
  const [editAuthData, setEditAuthData] = useState({
    name: "",
    email: "",
    bio: null,
    contact: "",
    description: null,
    image: null,
    cover_image: null,
    country: null,
    state: null,
    city: null,
    skills: null,
    wallet: null,
  });
  // socialMediaData
  const [socialMediaData, setSocialMediaData] = useState({
    facebook: "",
    linkedin: "",
    twitter: "",
    dribbble: "",
    google: "",
    reddit: "",
    instagram: "",
    pinterest: "",
    apple: "",
  });
  const [changePasswordData, setChangePasswordData] = useState({
    current_password: "",
    password: "",
    password_confirmation: "",
  });
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    contact: "",
    image: null,
  });
  const [bankDetails, setBankDetails] = useState([]);
  const [ticketData, setTicketData] = useState({
    category_id: null,
    reason: "",
    message: "",
  });
  const [reviewData, setReviewData] = useState({
    rating: null,
    review: "",
  });
  const [openReview, setOpenReview] = React.useState(false);
  const [showModalPayment, setShowModalPayment] = useState(false);

  const [hourlyRate, setHourlyRate] = useState({
    hourly_rate: "",
  });
  const [walletBalance, setWalletBalance] = useState({
    wallet: "",
  });

  const [withDrawbalance, setWithDrawBalance] = useState({
    amount: null,
    description: "",
  });
  const [supportMessage, setSupportMessage] = useState({
    ticket_id: null,
    message: "",
    type: "user",
  });
  // identity verification
  const [identityVerificationData, setIdentityVerificationData] = useState({
    skill_name: "null",
    contact: AUTHUSER?.contact || "0",
    address: AUTHUSER?.address || "",
    media: null,
  });
  // portfolio
  const [portfolioData, setPortfolioData] = useState({
    title: "",
    description: "",
    link: "",
    image: null,
  });
  // qualification
  const [qualificationData, setQualificationData] = useState({
    title: "",
    description: "",
    insitute: "",
    start_date: null,
    end_date: null,
  });
  // billing information
  const [billingData, setbillingData] = useState({
    name: "",
    lastname: "",
    company_title: "",
    country: "",
    state: "",
    city: "",
    address: AUTHUSER?.address || "",
    code: "",
    contact: AUTHUSER?.contact || "",
    email: AUTHUSER?.name || "",
  });
  // sscheedule
  const [scheduleData, setScheduleData] = useState([]);
  const navigate = useNavigate();
  const [user_type, setUserType] = useState("user");
  const peerRef = useRef(null);
  const [peerLocalId, setPeerLocalId] = useState(null);
  const [isCallNotification, setIsCallNotification] = useState(false);
  const [openChat, setOpenChat] = useState(false);
  const [openCall, setOpenCall] = useState(false);
  const [offerPayload, setOfferPaylod] = useState(null);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const localStream = useRef(null);
  const remoteRemoteStream = useRef(null);
  const [connected, setConnected] = useState(false);
  const [remoteName, setRemoteName] = useState("");
  const [remoteId, setRemoteId] = useState("");
  const [localId, setLocalId] = useState("");
  const [userDataAuth, setUserDataAuth] = useState([]);
  const [userReferrar, setUserReferrar] = useState([]);

  const [callStatus, setCallStatus] = useState("");
  const [duration, setDuration] = useState("");
  const [isDuration, setIsDuration] = useState(false);
  const [UserDataForInstantAppointment, setUserDataForInstantAppointment] =
    useState(null);

  const [currentCall, setCurrentCall] = useState(null);
  const [remoteCall, setRemoteCall] = useState(null);

  useEffect(() => {
    initApp();
    getUserData();
    initPerrJs();
    initSocket();
  }, []);

  function calculateTimeDuration(secs) {
    var hr = Math.floor(secs / 3600);
    var min = Math.floor((secs - hr * 3600) / 60);
    var sec = Math.floor(secs - hr * 3600 - min * 60);

    if (min < 10) {
      min = "0" + min;
    }

    if (sec < 10) {
      sec = "0" + sec;
    }

    if (hr <= 0) {
      return min + ":" + sec;
    }

    return hr + ":" + min + ":" + sec;
  }
  const handleClosePayment = () => setShowModalPayment(false);
  const OpenPaymentModel = (portfolioId) => {
    setShowModalPayment(true);
  };
  const initPerrJs = async () => {
    const peer = new Peer();
    peer.on("open", function (id) {
      peerRef.current = peer;
      setPeerLocalId(id);
      console.log("My peer ID is: " + id);
    });
    peer.on("call", async (call) => {
      // console.log(offerPayload,"deddedededede");
      const stream = await getUserMedia(type);
      if (stream) {
        localStream.current = stream;
        try {
          localVideoRef.current.srcObject = stream;
        } catch (error) {
          localVideoRef.current.src = createObjectURL(stream);
        }
        call.answer(stream);
        call.on("stream", (remoteStream) => {
          // console.log("Show Stream ", remoteStream);
          remoteRemoteStream.current = remoteStream;
          // const video = document.createElement("video");
          try {
            remoteVideoRef.current.srcObject = remoteStream;
          } catch (error) {
            remoteVideoRef.current.src = createObjectURL(remoteStream);
          }
          setConnected(true);
          setIsDuration(true);
        });
        var d = new Date().getTime();
        // (function looper() {
        //     if (!isDuration) {
        //         createCallLogs(offerPayload, "CallEnds", duration, null, null);
        //         return;
        //     }
        //     alert("d00");
        // })();

        const cTime = setTimeout(() => {
          setDuration(calculateTimeDuration((new Date().getTime() - d) / 1000));
          console.log(duration);
        }, 1000);
        document
          .getElementById("endCall")
          .addEventListener("click", async () => {
            clearInterval(cTime);
            call.close();
            setIsDuration(false);
            setOpenCall(false);
            localStream.current?.stop();
            localStream.current = null;
            await createCallLogs(
              offerPayload,
              "CallEnds",
              duration,
              null,
              null
            );
            window.location.reload();
          });
        call.on("close", () => {
          call.close();
          setOpenCall(false);
          window.location.reload();
          // remoteRemoteStream.current?.stop();
          // remoteVideoRef.current.srcObject.getVideoTracks().forEach((track) => {
          //     track.stop()
          //     remoteVideoRef.current.srcObject.removeTrack(track)
          // })
          // remoteVideoRef.current.srcObject = null
          // localStream.current?.stop();
          // localStream.current = null;
          // remoteRemoteStream.current = null;
        });
      }
    });
  };

  function createObjectURL(object) {
    return window.URL
      ? window.URL.createObjectURL(object)
      : window.webkitURL.createObjectURL(object);
  }

  const getUserMedia = async (type) => {
    try {
      var stream = await navigator.mediaDevices.getUserMedia(
        type == "video"
          ? {
            video: true,
            audio: true,
          }
          : { video: false, audio: true }
      );
      return stream;
    } catch (error) {
      alert("Please Reload Your Web Page");
      throw error;
    }
  };

  const createCallLogs = async (data, type1, duration, date, endData) => {
    const FormData = require("form-data");
    let fromdata = new FormData();
    fromdata.append("user_id", `${data.fromId},${data.toId}`);
    fromdata.append("call_type", `${data.type}`);
    fromdata.append("status", `${type1}`);
    fromdata.append("duration", duration);
    if (date != null) {
      fromdata.append("started_at", date);
    }
    if (endData != null) {
      fromdata.append("ended_at", endData);
    }
    const token = localStorage.getItem("token");
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${baseurl}/store-call-logs`,
      headers: {
        Authorization: "Bearer " + token,
        // ...fromdata.getHeaders()
      },
      data: fromdata,
    };

    await axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const initSocket = () => {
    socketIO.on("userLogged", (data) => {
      console.log(data);
    });

    socketIO.on("alreadyLogin", (data) => {
      console.log(data);
    });

    socketIO.on("users", (data) => {
      setOnlineExpertUser(data);
    });

    // appointment-socket
    socketIO.on("accepted_appointment", (data) => {
      if (data?.expertId) {
        window.location.href = "/";
      }
      //   setOnlineExpertUser(data);
    });

    socketIO.on("messageResponse", async (data) => {
      console.log(data, AUTHUSER, " socket");

      // for open-the-chat on the expert-side onclicking the instant-appointment btn by user whenever
      if (data?.text?.type == "instant-appointment") {
        const isExpert = await checkIfUserExpert();

        // setOpenChat(true);
        if (isExpert) {
          setUserDataForInstantAppointment({
            userId: data?.text?.userId,
            name: data?.text?.name,
          });
        }
        setOpenChat(true);

        console.log(data, " instant-apt");
        // console.log ()
        return;
      }

      if (data?.text?.type == "appointment") {
        const isExpert = await checkIfUserExpert();
        if (!isExpert) {
          toast.success("Your Appointment is Accepted By " + data?.text?.name);
          setTimeout(() => {
            window.location.href = "/view-profile/" + data?.text?.expertId;
          }, 3000);
        } else {
          setTimeout(() => {
            window.location.href = "/dashboard";
          }, 3000);
        }
      } else {
        setAllMessage((e) => [...e, data]);
      }
    });

    socketIO.on("createOfferFromServer", (data) => {
      setOfferPaylod(data);
      type = data.type;
      setRemoteName(data.name);
      setRemoteId(data.fromId);
      setLocalId(data.toId);
      // document.getElementById("userNameCall").innerText=data.name;
      setIsCallNotification(true);
    });

    socketIO.on("acceptedFromServer", (data) => {
      type = data.type;
      // onCall(data.peerId, data.type);
    });

    socketIO.on("userIsOnline", async (data) => {
      // setCallStatus("Ringing...");
      // document.getElementById("declineCall").addEventListener("click", function (d) {
      //     socketIO.emit("callCancel", { ...data });
      // });
      // var date = new Date();
      // await createCallLogs(data, "Ringing...", "00:00", null, null)
    });
    // socketIO.on("userIsOffline", async (data) => {
    //     console.log("data", data);
    //     // setCallStatus("Calling...");
    //     // document.getElementById("declineCall").addEventListener("click", (e) => {
    //     //     socketIO.emit("callCancel", { ...data });
    //     // });
    //     // var date = new Date();
    //     // await createCallLogs(data, "Calling...", "00:00", `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`, null);
    // });

    // socketIO.on("callCancelFromServer", async (data) => {
    //     setOpenCall(false);
    //     var date = new Date();
    //     await createCallLogs(data, "CaneclCall", "00:00", null, `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`)

    // });

    // socketIO.on("callCancelFromUser", (data) => {
    //     setIsCallNotification(false);
    // });

    // socketIO.on("rejectCallFromUser", (data) => {
    //     setCallStatus("Rejected...");
    //     const timer = setInterval(() => {
    //         setOpenCall(false);
    //         clearInterval(timer);
    //     }, 2000)
    // });
    // socketIO.on("rejectCallFromServer", async (data) => {
    //     setIsCallNotification(false);
    //     var date = new Date();
    //     await createCallLogs(data, "RejectCall", "00:00", null, `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`)

    // });
  };

  // const onRejectCall = () => {
  //     socketIO.emit("rejactCall", { fromId: remoteId, toId: localId, isReject: true });
  // }
  // const onCall = async (remotePeerId, type) => {
  //     if (remotePeerId == null) {
  //         alert("Please Enter Remote id");
  //     } else {
  //         const stream = await getUserMedia(type);
  //         console.log(remotePeerId);
  //         if (stream && peerRef.current) {
  //             localStream.current = stream;

  //             try {
  //                 localVideoRef.current.srcObject = stream;
  //             } catch (error) {
  //                 localVideoRef.current.src = createObjectURL(stream);
  //             }
  //             const call = peerRef.current?.call(remotePeerId, stream);
  //             call.on("stream", (remoteStream) => {
  //                 remoteRemoteStream.current = remoteRemoteStream;
  //                 try {
  //                     remoteVideoRef.current.srcObject = remoteStream;
  //                 } catch (error) {
  //                     remoteVideoRef.current.src = createObjectURL(remoteStream);
  //                 }
  //                 setConnected(true);

  //                 // if (connected) {

  //                 // }
  //             });
  //             document.getElementById("endCall").addEventListener("click", () => {
  //                 call.close();
  //                 setOpenCall(false);
  //                 window.location.reload()

  //                 // localStream.current?.stop();
  //                 // localVideoRef.current.srcObject.getVideoTracks().forEach((track) => {
  //                 //     track.stop()
  //                 //     localVideoRef.current.srcObject.removeTrack(track)
  //                 // })
  //                 // localVideoRef.current.srcObject = null
  //                 // localStream.current = null;
  //             })
  //             // setCurrentCall(call);
  //             call.on("close", () => {
  //                 setOpenCall(false);
  //                 window.location.reload()

  //                 // remoteRemoteStream.current?.stop();
  //                 // remoteVideoRef.current.srcObject.getVideoTracks().forEach((track) => {
  //                 //     track.stop()
  //                 //     remoteVideoRef.current.srcObject.removeTrack(track)
  //                 // })
  //                 // remoteVideoRef.current.srcObject = null
  //                 // localStream.current?.stop();
  //                 // localStream.current = null;
  //                 // remoteRemoteStream.current = null;
  //             });
  //         }
  //     }
  // };

  // const onAnswer = async () => {
  //     if (offerPayload != null) {

  //         setOpenChat(true);
  //         setOpenCall(true);
  //         console.log(offerPayload);
  //         socketIO.emit("accepted", { ...offerPayload, peerId: peerRef.current?.id });
  //         setIsCallNotification(false);
  //     } else {
  //         alert("Please Check your Internet");
  //     }
  // }

  const initApp = () => {
    fetchAuthUser();
    getUserData();
    fetchAuthUserVerification();
    fetchAuthUserSubscriptions();
    fetchSocketAuthUser();
    fetchAllSupportAnswers();
    fetchSupportCategories();
    fetchPortfoliosData();
  };

  useEffect(() => {
    fetchSupportMessages(ticketId);
    // fetchSupportTicket(ticketId);
  }, [ticketId]);

  const fetchSocketAuthUser = async () => {
    await httpRequest({
      path: "logged-in-user",
      method: "Get",
      onSuccess: (res) => {
        if (res) {
          if (res.data.user) {
            socketIO.connect();
            socketIO.emit("userLogin", {
              id: res.data.user.id,
              name: res.data.user.name,
            });
          }
        }
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  //quizes
  const QuizCanEditPermission = authUserPermissions.some(
    (permission) => permission.name === "quiz_can_edit"
  );
  const QuizCanDeletePermission = authUserPermissions.some(
    (permission) => permission.name === "quiz_can_delete"
  );
  const QuizCanViewPermission = authUserPermissions.some(
    (permission) => permission.name === "quiz_can_view"
  );
  const QuizCanAddPermission = authUserPermissions.some(
    (permission) => permission.name === "quiz_can_add"
  );
  const fetchAuthUserVerification = async () => {
    await httpRequest({
      path: "logged-in-verification",
      method: "Get",
      onSuccess: (res) => {
        console.log(res.data, "/user_identity_information");
        setSkillRequests(res.data.user_identity_information);
      },
      onError: (error) => {
        setLoading(false);
        console.log(error);
      },
    });
  };
  const fetchAuthUser = async () => {
    await httpRequest({
      path: "logged-in-user",
      method: "Get",
      onSuccess: (res) => {
        if (res.data) {
          localStorage.setItem("fromID", res.data.user.id);
        }
        // setSkillRequests(res.data.user.user_identity_information)
        setAuthUser(res.data);
        setAuthUSER(res.data.user);
        setBankDetails(res.data.user.payment_information);
        
        setSupportData(res.data.tickets);
        setCountriesData(res.data.countries);
        setWithDrawData(res.data.withdraws);
        var {
          name,
          email,
          bio,
          contact,
          description,
          image,
          cover_image,
          country,
          state,
          city,
          skills,
          wallet,
          hourly_rate,
        } = res.data.user;
        var { start_date_time, end_date_time } = res.data.user_schedule;
        var {
          facebook,
          linkedin,
          dribbble,
          twitter,
          google,
          reddit,
          pinterest,
          apple,
          instagram,
        } = res.data.user;
        setAllReviews(res.data.user_reviews);
        setSingleReview(res.data.expert_rating["average_rating"]);
        setScheduleData(res.data.user_schedule);
        setSocialMediaData({
          ...socialMediaData,
          facebook,
          linkedin,
          dribbble,
          twitter,
          google,
          reddit,
          pinterest,
          apple,
          instagram,
        });
        setPhoneContact(res.data?.user?.contact);
        setEditAuthData({
          ...editAuthData,
          name,
          email,
          bio,
          contact,
          description,
          image,
          cover_image,
          country,
          state,
          city,
          skills,
          wallet,
          hourly_rate,
        });
        setHourlyRate({ ...hourlyRate, hourly_rate });
        var { address, media } =
          res.data.user_identity_information[0];
        setIdentityVerificationData({
          ...identityVerificationData,
          // skill_name,
          address,
          media,
        });
        var {
          name,
          lastname,
          company_title,
          country,
          state,
          city,
          address,
          code,
          contact,
          email,
        } = res.data.user_billing_information;
        setbillingData({
          ...billingData,
          name,
          lastname,
          company_title,
          country,
          state,
          city,
          address,
          code,
          contact,
          email,
        });

        setLoading(false);
      },
      onError: (error) => {
        setLoading(false);
        console.log(error);
      },
    });
  };

  // search

  const fetchAuthUserSubscriptions = async () => {
    await httpRequest({
      path: "logged-in-user-subscriptions",
      method: "Get",
      onSuccess: (res) => {
        // console.log(res.data.userPromotePackageDuration,'dedeee');
        console.log(res.data.user_subscriptions, "dedeee");
        setAuthUserSubscriptions(res.data);
        setAuthUserSubscriptionPackages(res.data.user_subscriptions);
        setAuthUserActiveSubscription(res.data.active_subscription);
        setLoading(false);
      },
      onError: (error) => {
        setLoading(false);
        console.log(error);
      },
    });
  };

  useEffect(() => {
    // Filter the tickets based on the searchQuery
    const filteredData = supportData.filter((ticket) =>
      ticket.reason.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredTickets(filteredData);
  }, [supportData, searchQuery]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  // search end

  const fetchSupportCategories = async () => {
    await httpRequest({
      path: "support-categories",
      method: "Get",
      onSuccess: (res) => {
        setSupportCategories(res.data.categories);
        setLoading(false);
      },
      onError: (error) => {
        setLoading(false);
        console.log(error);
      },
    });
  };

  const fetchSupportAnswers = async (id) => {
    await httpRequest({
      path: `support-answers/${id}`,
      method: "Get",
      onSuccess: (res) => {
        setSupportAnswers(res.questionAnswers);
        setLoading(false);
      },
      onError: (error) => {
        setLoading(false);
        console.log(error);
      },
    });
  };
  const fetchAllSupportAnswers = async () => {
    await httpRequest({
      path: `support-answers`,
      method: "Get",
      onSuccess: (res) => {
        setSupportAllAnswers(res.questionAnswers);
        setLoading(false);
      },
      onError: (error) => {
        setLoading(false);
        console.log(error);
      },
    });
  };

  const fetchSupportMessages = async (ticketId) => {
    await httpRequest({
      path: `support-messages/${ticketId}`,
      method: "Get",
      onSuccess: (res) => {
        // setSupportMessagesdata(res.usersSupportMessages);

        setLoading(false);
      },
      onError: (error) => {
        setLoading(false);
        console.log(error);
      },
    });
  };

  const fetchSupportTicket = async (ticketId) => {
    await httpRequest({
      path: `support-ticket/${ticketId}`,
      method: "Get",
      onSuccess: (res) => {
        setSupportMessagesdata(res.usersSupportMessages);
        console.log("usersSupportMessages", res.usersSupportMessages);
        setLoading(false);
      },
      onError: (error) => {
        setLoading(false);
        console.log(error);
      },
    });
  };
  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const handleHourlyChange = (e) => {
    setHourlyRate({ ...hourlyRate, [e.target.name]: e.target.value });
  };
  const handleWalletChange = (e) => {
    const newValue = e.target.value;
    const maxAmount = 10000; // Set your maximum amount here
    const numericRegex = /^[0-9]*\.?[0-9]*$/; // Regular expression to match numeric input

    if (!numericRegex.test(newValue)) {
      alert("Please enter only numbers.");
    } else if (e.target.name === "wallet" && newValue < 0) {
      alert("You cannot insert a negative value.");
      //   setWalletBalance({ ...walletBalance, [e.target.name]: 0 });
    } else if (newValue > maxAmount) {
      alert("Maximum amount exceeded.");
    } else {
      setWalletBalance({ ...walletBalance, [e.target.name]: newValue });
    }
    console.log("wallet", walletBalance);
  };

  const handleWithDrawChange = (e) => {
    const newValue = e.target.value;
    if (e.target.name === "withdraw" && newValue < 0) {
      alert("you can not insert negative value");
    } else {
      // Update the state with the new value
      setWithDrawBalance({ ...withDrawbalance, [e.target.name]: newValue });
    }
  };
  const handlePasswordChange = (e) => {
    setChangePasswordData({
      ...changePasswordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const handleImageChange = (e) => {
    setUserData({ ...userData, image: e.target.files[0] });
  };
  const [value, setValue] = useState();
  const [isChecked, setIsChecked] = useState(false);

  function onChange(value) {
    setValidationErrors({});
    setValue(value);
    console.log("Captcha value:", value);
  }
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    setValidationErrors({});
    // setError('');
  };
  const validateForm = () => {
    const errors = {};
    if (!value) {
      errors.value = "Confirm you are not a robot.";
    }
    if (!isChecked) {
      errors.isChecked = "Accept Terms and conditions";
    }
    if (!userData.name) {
      errors.name = "Name is required.";
    }
    if (!userData.email) {
      errors.email = "Email is required.";
    }
    if (!phone) {
      errors.phone = "Phone Number is required.";
    }
    if (!userData.password) {
      errors.password = "Password is required.";
    }
    if (!userData.password_confirmation) {
      errors.password_confirmation = "Password_confirmation is required.";
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const validateFormReset = () => {
    const errors = {};
    if (!resetUserDataEmail) {
      errors.email = "Email is required.";
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const getUserData = async () => {
    setProgress(30);
    await httpRequest({
      path: 'auth-user',
      method: "GET",
      onSuccess: (res) => {
        if (res.status) {
          console.log("setUserDataAuth", res)
          setUserDataAuth(res.user);
          setUserReferrar(res.referrer);
        }
      },
      onError: (error) => {
        console.log(error);
        setIsLoading(false);
      },
    });
  };
  const handleSubmit = async () => {
    const checkbox = document.getElementById("user_terms_agree");
    if (!checkbox.checked) {
      setTermsCondi(true);
      return;
    } else {
      setTermsCondi(false);
    }
    setIsLoading(true);
    if (!validateForm()) {
      setIsLoading(false);
      return;
    }
    const formData = new FormData();
    formData.append("name", userData.name);
    formData.append("user_type", user_type);
    formData.append("email", userData.email);
    formData.append("contact", phone);
    formData.append("password", userData.password);
    formData.append("password_confirmation", userData.password_confirmation);
    formData.append("refferal_code", referralCode || 0);

    await toast.promise(
      httpForToastRequest({
        path: "register",
        method: "POST",
        data: formData,
      }),
      {
        loading: "Loading...",
        success: (res) => {
          console.log(res.message);
          if (res.status == 200) {
            getUserData();
            initApp();
            const token = res.token;
            setUserData({
              name: "",
              email: "",
              password: "",
              password_confirmation: "",
              contact: "",
              image: null,
            });
            localStorage.setItem("token", token);
            user_type === "user"
              ? navigate("/dashboard")
              : navigate("/expert-steps");
            return <b>{JSON.stringify(res["message"])}</b>;
          }
          setIsLoading(false);
        },
        error: (err) => {
          console.log("err", err);
          setIsLoading(false);
          if (err instanceof AxiosError) {
            if (err.response.data.message.email) {
              return <b>{"Email Already exist"}</b>;
            }
            if (err.response.data.message.password) {
              return <b>{err.response.data.message["password"][0]}</b>;
            } else if (err.response.status == 500) {
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


  //logout
  const handleLogoutSubmit = async () => {
    // setIsLoading(true);

    await toast.promise(
      httpForToastRequest({
        path: "logout",
        method: "POST",
      }),
      {
        loading: "Loading...",
        success: (res) => {
          console.log(res.message);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          if (res.status === 200) {
            setIsLoading(false);
            window.location.href ='/'
            // navigate("/");
            return <b>{JSON.stringify(res["message"])}</b>;
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
  //hourlyRate
  const handleHourlyRateSubmit = async () => {
    // setIsLoading(true);
    const formData = new FormData();
    formData.append("hourly_rate", hourlyRate.hourly_rate);
    await toast.promise(
      httpForToastRequest({
        path: "update-hourly-rate",
        method: "POST",
        data: formData,
      }),
      {
        loading: "Loading...",
        success: (res) => {
          console.log(res.message);
          if (res.status == 200) {
            return <b>{JSON.stringify(res["message"])}</b>;
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
  // const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState("");

  //walletBalance
  const handleWalletSubmit = async (amount) => {
    // setIsLoading(true);
    const formData = new FormData();
    formData.append("wallet", amount);
    await toast.promise(
      httpForToastRequest({
        path: "update-wallet-rate",
        method: "POST",
        data: formData,
      }),
      {
        loading: "Loading...",
        success: (res) => {
          console.log(res.message);
          if (res.status == 200) {
            initApp();
            setWalletBalance({
              wallet: "",
            });

            return <b>{JSON.stringify(res["message"])}</b>;
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

  //withdrawBalance
  const handleWithDrawSubmit = async () => {
    // setIsLoading(true);
    const formData = new FormData();
    formData.append("amount", withDrawbalance.amount);
    formData.append("description", withDrawbalance.description);
    await toast.promise(
      httpForToastRequest({
        path: "update-with-draw",
        method: "POST",
        data: formData,
      }),
      {
        loading: "Loading...",
        success: (res) => {
          console.log(res.message);
          if (res.status == 200) {
            initApp();
            setWithDrawBalance({
              amount: "",
              description: "",
            });
            return <b>{JSON.stringify(res["message"])}</b>;
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
  // for password change
  const handlePasswordChangeSubmit = async () => {
    console.log("testing");
    setIsLoading(true);

    const formData = new FormData();
    formData.append("current_password", changePasswordData.current_password);
    formData.append("password", changePasswordData.password);
    formData.append(
      "password_confirmation",
      changePasswordData.password_confirmation
    );

    await toast.promise(
      httpForToastRequest({
        path: "update-password",
        method: "POST",
        data: formData,
      }),
      {
        loading: "Loading...",
        success: (res) => {
          console.log(res.message);
          if (res.status == 200) {
            return <b>{JSON.stringify(res["message"])}</b>;
          }
          setIsLoading(false);
        },
        error: (err) => {
          setIsLoading(false);
          if (err instanceof AxiosError) {
            if (err.response.data.message.password) {
              return <b>{err.response.data.message["password"][0]}</b>;
            } else if (err.response.status == 500) {
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

  //for update
  const fetchUserData = async (UserId) => {
    try {
      await httpRequest({
        path: `edit-profile/${UserId}`,
        method: "GET",
        onSuccess: async (res) => {
          const { name, user_type, email, contact, image } = res.user;
          setUserData({ ...userData, name, user_type, email, contact, image });
          setIsPreLoading(false);
        },
        onError: (error) => {
          console.error(error);
          setIsPreLoading(false);
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChangeU = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmitU = async (path) => {
    setIsLoading(true);
    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("name", userData.name);
    formData.append("user_type", userData.user_type);
    formData.append("email", userData.email);
    formData.append("contact", userData.contact);
    if (userData.image !== null) {
      formData.append("image", userData.image);
    }
    setProgress(30);
    await httpRequest({
      path: path,
      method: "POST",
      data: formData,
      onSuccess: (res) => {
        console.log("res,", res);
        setProgress(100);

        setIsLoading(false);
      },
      onError: (error) => {
        console.log(error);
        setIsLoading(false);
      },
    });
  };

  const handleClickOpen = () => {
    setOpenReview(true);
  };

  const handleCloseReview = () => {
    setOpenReview(false);
  };

  //udpate status
  const handleUpdateAppointment = async (id, status) => {
    await toast.promise(
      httpForToastRequest({
        path: `update-appointment/${id}`,
        method: "POST",
        data: { data: status },
      }),
      {
        loading: "Loading...",
        success: (res) => {
          console.log(res.message);
          if (res.status == 200) {
            initApp();
            return <b>{JSON.stringify(res["message"])}</b>;
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

  const validateSigninForm = () => {
    const errors = {};
    if (!value) {
      errors.value = "Confirm you are not a robot.";
    }

    if (!userData.email) {
      errors.email = "Email is required.";
    }

    if (!userData.password) {
      errors.password = "Password is required.";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleLoginSubmit = async () => {
    setIsLoading(true);
    if (!validateSigninForm()) {
      setIsLoading(false);
      return;
    }
    // setIsLoading(true);
    const formData = new FormData();
    formData.append("email", userData.email);
    console.log(formData);
    formData.append("password", userData.password);
    await toast.promise(
      httpForToastRequest({
        path: "login",
        method: "POST",
        data: formData,
      }),
      {
        loading: "Loading...",
        success: (res) => {
          console.log(res.message);
          if (res.status == 200) {
            const token = res.token;
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(res.user));
            setUserData({
              name: "",
              email: "",
              password: "",
              password_confirmation: "",
              contact: "",
              image: null,
            });
            getUserData();
            initApp();
            navigate("/dashboard");
            return <b>{JSON.stringify(res["message"])}</b>;
          }
          setIsLoading(false);
        },
        error: (err) => {
          console.log("err", err);
          setIsLoading(false);
          if (err instanceof AxiosError) {
            if (err.response.data.message["email"]) {
              return <b>{err.response.data.message["email"]}</b>;
            }
            if (err.response.data.message.password) {
              return <b>{err.response.data.message["password"][0]}</b>;
            }
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

  const fetchPortfoliosData = async () => {
    await httpRequest({
      path: "user-portfolios",
      method: "Get",
      onSuccess: (res) => {
        // setPosts(res.posts);
        setPortfoliosData(res.data.user_portfolio);
        setQqualificationsData(res.data.user_qualifications);
        console.log("porfolios", res.data.user_qualifications);
        setLoading(false);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };
  const handleResetSubmit = async () => {
    // setIsLoading(true);
    setIsDisabled(true);

    if (!validateFormReset()) {
      setIsLoading(false);
      setIsDisabled(false);
      return;
    }
    const formData = new FormData();
    formData.append("email", resetUserDataEmail);
    await toast.promise(
      httpForToastRequest({
        path: "forget-password",
        method: "POST",
        data: formData,
      }),
      {
        loading: "Loading...",
        success: (res) => {
          console.log(res, " forgot-pas");
          if (res.status === 200) {
            setResetCondition(true);
            setIsDisabled(false);

            return (
              <b>
                {JSON.stringify(res["message"])
                  ? "Successfully Sent Email"
                  : ""}
              </b>
            );
          }
          setIsLoading(false);
          setIsDisabled(false);
        },
        error: (err) => {
          console.log("err", err);
          setIsDisabled(false);
          setIsLoading(false);
          if (err instanceof AxiosError) {
            if (err.response.data.message["email"]) {
              return <b>{err.response.data.message["email"]}</b>;
            }
            if (err.response.data.message.password) {
              return <b>{err.response.data.message["password"][0]}</b>;
            }
            if (err.response.status == 500) {
              return <b>{"Server Error Please Wait while a moment"}</b>;
            }
            if (err.response.status == 400) {
              return <b>{"Error Occured While Sending Email"}</b>;
            }
          }
        },
      }
    );
  };

  const handleMessageClose = () => {
    setShowMessageModal(false);
  };

  const handleMessageShow = (id, status) => {
    navigate(`/request/${id}`);
    setTicketId(id);
    setTicketStatus(status);
    // setShowMessageModal(true);
  };

  const handleTicketClose = () => {
    setShowTicketModal(false);
  };

  const handleTicketShow = () => {
    setShowTicketModal(true);
  };
  const handleSupportCategoryChange = (event) => {
    const selectedCategoryId = event.target.value;
    setSelectedSupportCategory(selectedCategoryId);

    setCategoryError(false);
  };

  const handleInputTicketChange = (e) => {
    setTicketData({ ...ticketData, [e.target.name]: e.target.value });
  };
  const handleInputReviewChange = (e) => {
    setReviewData({ ...reviewData, [e.target.name]: e.target.value });
  };
  const handleInputMessageChange = (e) => {
    setSupportMessage({ ...supportMessage, [e.target.name]: e.target.value });
  };
  const checkboxRef = useRef();
  const [checkboxError, setCheckboxError] = useState(false);
  const handleSupportSubmit = async () => {
    // setIsLoading(true);
    if (!checkboxRef.current.checked && selectedSupportCategory === "") {
      setCheckboxError(true);
      setCategoryError(true);
      return;
    }
    const formData = new FormData();
    formData.append("category_id", selectedSupportCategory);
    formData.append("reason", ticketData.reason);
    formData.append("message", ticketData.message);
    await toast.promise(
      httpForToastRequest({
        path: "store-ticket",
        method: "POST",
        data: formData,
      }),
      {
        loading: "Loading...",
        success: (res) => {
          console.log(res.message);
          if (res.status == 200) {
            initApp();
            setShowTicketModal(false);
            setTicketData({
              category_id: null,
              reason: "",
              message: "",
            });
            return <b>{JSON.stringify(res["message"])}</b>;
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
  const handleReviewSubmit = async (expertId) => {
    // setIsLoading(true);
    // ViewProfile(expertId)
    const formData = new FormData();
    formData.append("expert_id", expertId);
    formData.append("review", reviewData.review);
    formData.append("rating", reviewData.rating);
    await toast.promise(
      httpForToastRequest({
        path: "store-review",
        method: "POST",
        data: formData,
      }),
      {
        loading: "Loading...",
        success: (res) => {
          console.log(res.message);
          if (res.status == 200) {
            // initApp();
            fetchAuthUser();
            // setShowTicketModal(false);
            setOpenReview(false);
            setReviewData({
              rating: null,
              review: "",
            });
            return <b>{JSON.stringify(res["message"])}</b>;
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

  const handleSupportMessageSubmit = async (id) => {
    // setIsLoading(true);
    const formData = new FormData();
    formData.append("ticket_id", id);
    formData.append("message", supportMessage.message);
    formData.append("type", 'user');
    await toast.promise(
      httpForToastRequest({
        path: "store-message",
        method: "POST",
        data: formData,
      }),
      {
        loading: "Loading...",
        success: (res) => {
          console.log(res.message);
          if (res.status == 200) {
            initApp();
            setSupportMessage({
              message: "",
            });
            fetchSupportMessages(ticketId);
            fetchSupportTicket(id);
            // setShowMessageModal(false);
            return <b>{JSON.stringify(res["message"])}</b>;
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
  //languages
  const [languages, setLanguages] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  //skills
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  // Initialize options from authUser.skills
  useEffect(() => {
    if (authUser.languages) {
      const languagesOptions = authUser.languages.map((language) => ({
        value: language.id,
        label: language.name,
      }));
      setLanguages(languagesOptions);
    }
  }, [authUser.languages]);
  useEffect(() => {
    if (authUser.skills) {
      const skillOptions = authUser.skills.map((skill) => ({
        value: skill.id,
        label: skill.name,
      }));
      setOptions(skillOptions);
    }
  }, [authUser.skills]);

  useEffect(() => {
    if (authUser.user_skills) {
      const selectedSkillOptions = authUser.user_skills.map((skill) => ({
        value: skill.id,
        label: skill.name,
      }));
      setSelectedOptions(selectedSkillOptions);
    }
    console.log(authUser.user_skills);
  }, [authUser.user_skills]);

  useEffect(() => {
    if (authUser.user_languages) {
      const selectedLanguageOptions = authUser.user_languages.map(
        (language) => ({
          value: language.id,
          label: language.name,
        })
      );
      setSelectedLanguages(selectedLanguageOptions);
    }
  }, [authUser.user_skills]);

  const handleLanguageChange = (selectedLanguages) => {
    setSelectedLanguages(selectedLanguages);
  };
  const handleSkillChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };

  // social media
  const handleInputChangeS = (e) => {
    setSocialMediaData({ ...socialMediaData, [e.target.name]: e.target.value });
  };

  const handleSocialSubmit = async () => {
    // setIsLoading(true);
    const formData = new FormData();
    formData.append("facebook", socialMediaData.facebook);
    formData.append("linkedin", socialMediaData.linkedin);
    formData.append("twitter", socialMediaData.twitter);
    formData.append("dribbble", socialMediaData.dribbble);
    formData.append("google", socialMediaData.google);
    formData.append("reddit", socialMediaData.reddit);
    formData.append("instagram", socialMediaData.instagram);
    formData.append("pinterest", socialMediaData.pinterest);
    formData.append("apple", socialMediaData.apple);
    formData.append("youtube", socialMediaData.youtube);
    await toast.promise(
      httpForToastRequest({
        path: "update-social",
        method: "POST",
        data: formData,
      }),
      {
        loading: "Loading...",
        success: (res) => {
          console.log(res.message);
          if (res.status == 200) {
            return <b>{JSON.stringify(res["message"])}</b>;
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

  const mappedDataArray = scheduleData?.map((data, index) => ({
    event_id: data?.id || index,
    start: new Date(`${data.date}T${data.start_time}`),
    end: new Date(`${data.date}T${data.end_time}`),
  }));

  // drop down assets
  const handleDropdownClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleDropdownClose = () => {
    setAnchorEl(null);
  };

  const [openChatModal, setOpenChatModal] = useState(false);

  return (
    <AppContext.Provider
      value={{
        handleCheckboxChange,
        isChecked,
        data,
        loading,
        isPreLoading,
        setData,
        setLoading,
        setIsPreLoading,
        // fetchData,
        // handleDeleteClick,
        // setSelectedDate,
        //add
        validationErrors,
        userData,
        handleSubmit,
        handleInputChange,
        handleImageChange,
        //edit
        handleInputChangeU,
        handleSubmitU,
        fetchUserData,
        setUserData,
        setValidationErrors,
        authUserRoles,
        authUserPermissions,
        roleData,
        QuizCanEditPermission,
        QuizCanDeletePermission,
        QuizCanViewPermission,
        QuizCanAddPermission,
        user_type,
        handleUserTypeChange,
        handleLoginSubmit,
        authUser,
        options,
        handleSkillChange,
        selectedOptions,
        editAuthData,
        setEditAuthData,
        setSelectedOptions,
        identityVerificationData,
        setIdentityVerificationData,
        billingData,
        setbillingData,
        countriesData,
        selectedCountry, // identity verification
        setSelectedCountry,
        selectedState,
        setSelectedState,
        selectedCity,
        setSelectedCity,
        isLoading,
        progresss,
        handlePasswordChangeSubmit,
        changePasswordData,
        setChangePasswordData,
        handlePasswordChange,
        // portfolio
        portfolioData,
        setPortfolioData,
        //qualification
        qualificationData,
        setQualificationData,
        // social media
        socialMediaData,
        handleInputChangeS,
        handleSocialSubmit,
        languages,
        selectedLanguages,
        handleLanguageChange,
        scheduleData,
        mappedDataArray,
        setScheduleData,
        handleLogoutSubmit,
        fetchAuthUser,
        // assets
        anchorEl,
        setAnchorEl,
        openDropdown,
        handleDropdownClick,
        handleDropdownClose,
        handleUpdateAppointment,
        onlineExpertUser,
        allMessage,
        isCallNotification,
        setIsCallNotification,
        setOpenChat,
        openChat,
        openCall,
        setOpenCall,
        // onAnswer,
        localVideoRef,
        remoteVideoRef,
        connected,
        remoteName,
        handleSupportSubmit,
        showTicketModal,
        handleTicketClose,
        handleTicketShow,
        handleInputTicketChange,
        ticketData,
        handleSupportCategoryChange,
        selectedSupportCategory,
        setSelectedSupportCategory,
        supportData,
        AUTHUSER,
        showMessageModal,
        setShowMessageModal,
        handleMessageClose,
        handleMessageShow,
        supportCategories,
        supportAnswers,
        AllsupportAnswers,
        fetchSupportAnswers,
        handleSupportMessageSubmit,
        handleInputMessageChange,
        supportMessage,
        supportMessagesData,
        // search
        filteredTickets,
        setSearchQuery,
        searchQuery,
        handleSearch,
        ticketStatus,
        handleHourlyChange,
        hourlyRate,
        handleHourlyRateSubmit,
        handleWalletChange,
        handleWalletSubmit,
        walletBalance,
        openReview,
        handleCloseReview,
        handleClickOpen,
        handleReviewSubmit,
        handleInputReviewChange,
        setReviewData,
        reviewData,
        allReviews,
        singleReview,
        setAllReviews,
        setSingleReview,
        //withdraw
        handleWithDrawChange,
        withDrawbalance,
        handleWithDrawSubmit,
        withDrawData,
        checkboxRef,
        checkboxError,
        setSupportAnswers,
        categoryError,
        callStatus,
        setCallStatus,
        // onRejectCall,
        duration,
        setUserDataForInstantAppointment,
        UserDataForInstantAppointment,
        authUserSubscriptions,
        authUserSubscriptionPackages,
        authUserActiveSubscription,
        fetchAuthUserSubscriptions,
        resetUserDataEmail,
        setResetUserDataEmail,
        resetCondition,
        handleResetSubmit,
        portfoliosData,
        qualificationsData,
        fetchPortfoliosData,
        phone,
        setPhone,
        isDisabled,
        fetchSupportTicket,
        onChange,
        referralCode,
        setReferralCode,
        initApp,
        termsCondi,
        phoneContact,
        setPhoneContact,
        skillRequests,
        fetchAuthUserVerification,
        userDataAuth,
        userReferrar,
        getUserData,
        handleClosePayment,
        OpenPaymentModel,
        showModalPayment,
        userLoggedIne,
        bankDetails,
        openChatModal, setOpenChatModal
      }}
    >
      {/* <Chat /> */}
      {children}
    </AppContext.Provider>
  );
};
export const useAppContext = () => useContext(AppContext);
