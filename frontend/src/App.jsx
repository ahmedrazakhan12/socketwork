import { VideoCall } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import "./App.css";
import CallLogs from "./Expert/CallLogs";
import Chat from "./Expert/Chat";
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';

import { Toaster } from "react-hot-toast";
import "./App.css";
import AccountSettings from "./Expert/AccountSettings";
import Appointments from "./Expert/Appointments";
import AutomatedAnswers from "./Expert/AutomatedAnswers";
import BillingInfortmation from "./Expert/BillingInformation";
import BioProfile from "./Expert/BioProfile";
import Dashboard from "./Expert/Dashboard";
import Example from "./Expert/DummyVoice";
import ExpertLiveStreams from "./Expert/ExpertLivestreams";
import IdentityVerification from "./Expert/IdentityVerification";
import PortfolioSettings from "./Expert/PortfolioSettings";
import Profile from "./Expert/Profile";
import QualificationSettings from "./Expert/Qualification";
import RefferalSettings from "./Expert/RefferalSettings";
import RefferalTeam from "./Expert/RefferalTeam";
import Requests from "./Expert/Requests";
import Schedule from "./Expert/Schedule";
import Settings from "./Expert/Settings";
import SocialMedia from "./Expert/SocialMedia";
import Subscriptions from "./Expert/Subscriptions";
import Support from "./Expert/Support";
import TicketView from "./Expert/TicketView";
import Transactions from "./Expert/Transactions";
import UploadMediaPosts from "./Expert/UploadMediaPosts";
import Wallet from "./Expert/Wallet";
import Withdraws from "./Expert/Withdraws";
import BasicModalDialog from "./components/Hiu";
import Test from "./components/Test";
import { useAppointments } from "./context/AppointmentsContext";
import Room from "./livestream/Room";
import Forbidden from "./myComponents/Forbidden";
import MyBlogs from "./myComponents/MyBlogs";
import BlogDetails from "./myComponents/MyBlogsDetails";
import PaymentFailed from "./myComponents/PaymentFailed";
import PaymentSuccess from "./myComponents/PaymentSuccess";
import AppointmentComplete from "./myComponents/appointment/AppointmentComplete";
import ChatFixedIconImage from "./assets/images/chat-icon.png";


import {
  AboutUs,
  Categories,
  ExpertProfile,
  Experts,
  Faqs,
  ForgotPassword,
  Registerations,
  SignIn,
  TermsAndConditions,
} from "./screens";
import ExpertSteps from "./screens/ExpertSteps";
import Information from "./screens/Info";
import Main from "./screens/Main";
import Pricing from "./screens/Pricing";
import Privacy from "./screens/Privacy";
import VoiceVideo from "./screens/VoiceVideo";

import LiveStreams from "./screens/LiveStreams";

import NotFound from "./screens/NotFound";
import ReferralProgram from "./screens/ReferralProgram";
import UserSteps from "./screens/UserSteps";

import DeleteAccount from "./Expert/DeleteAccount";
import ExpertLiveStreamsLive from "./Expert/Live";
import ProfileSubscriptions from "./Expert/ProfileSubscriptions";
import W4Form from "./Expert/W4Form";
import ProtectNotSignedIn from "./Expert/components/ProtectNotSignedIn";
import ProtectedRoute from "./Expert/components/ProtectedRoute"; // Import the new component
import { useAppContext } from "./context/AppContext";
// import TelegramIcon from '@mui/icons-material/Telegram';
import MarkChatUnreadIcon from '@mui/icons-material/MarkChatUnread';
const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup on component unmount
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div style={{ position: "fixed", zIndex: 3000, bottom: 0 }} id="myTimer">
      <>{formatTime(timeLeft)}</>
    </div>
  );
};

const ChatIcon = () => {
  // const { openChat } = useAppContext();
  const { openChatModal, setOpenChatModal } = useAppContext();
  const handleTesting = () => {
    setOpenChatModal(!openChatModal);
  }
  return (
    <div
      style={{ position: "fixed", zIndex: 3000, bottom: 0 }}
      id="myChat"
      onClick={handleTesting}
    >
          <img className="chatIcon" src={ChatFixedIconImage} alt="" />
      {/* <MarkChatUnreadIcon style={{fontSize:'25px' , marginLeft:'0px'}} /> */}
    </div>
  );
}

const ForwardTimer = ({ oldTime }) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const { openChat } = useAppContext();

  useEffect(() => {
    const startTime = new Date(oldTime);
    const now = new Date();
    const initialDifference = Math.floor((now - startTime) / 1000); // initial difference in seconds
    setElapsedTime(initialDifference);

    const updateElapsedTime = () => {
      setElapsedTime((prevTime) => prevTime + 1);
    };

    // Set an interval to update every second
    const intervalId = setInterval(updateElapsedTime, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [oldTime]);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h ? h + "m" : ""} ${m}m ${s}s`;
  };

  return (
    openChat && (
      <div style={{ position: "fixed", zIndex: 50, bottom: 0 }} id="myTimer">
        <>{formatTime(elapsedTime)}</>
      </div>
    )
  );
};

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const { authUser, handleUpdateAppointment } = useAppContext();

  console.log("AhmedAuthUser" ,authUser );
  

  const token = localStorage.getItem("token");
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
  const { openChat , setOpenChat } = useAppContext();
  const {  CallRunning } = useAppointments();

  const [Cookies, setCookie, removeCookie] = useCookies(["googtrans"]);
  const [IsTranslationCookieExists, setIsTranslationCookieExists] = useState();

  const googleTranslateElementInit = () => {
    const handleLanguageChange = (event) => {
      console.log("language change event:", event);
    };

    new window.google.translate.TranslateElement(
      {
        gaTrack: true,
        onPageLanguageChanged: () => {
          console.log("language changed ");
        },
        autoDisplay: false,
      },
      "google_translate_element"
    );
  };

  // Function to check if any appointment matches the current date and time
  function checkAppointments(appointments) {
    const now = new Date();
    const currentDate = now.toISOString().split('T')[0]; // Get current date in "YYYY-MM-DD" format
    const currentTime = now.toTimeString().split(' ')[0].slice(0, 5); // Get current time in "HH:MM" format

    console.log("Current Date:", currentDate);
    console.log("Current Time:", currentTime);

    appointments.forEach(appointment => {
        const appointmentDate = appointment.date;
        const appointmentStartTime = appointment.time;
        const appointmentEndTime = appointment.end_time;

        console.log("Checking appointment:", appointment.id);
        console.log("Appointment Date:", appointmentDate);
        console.log("Appointment Start Time:", appointmentStartTime);
        console.log("Appointment End Time:", appointmentEndTime);

        if (appointmentDate === currentDate &&
            appointmentStartTime <= currentTime &&
            appointmentEndTime >= currentTime) {
            console.log("Appointment ID " + appointment.id + " is happening now!");
            // alert(`Appointment ID ${appointment.id} is happening now!`);
            setOpenChat(true);
        } else {
            console.log("No appointment found or time doesn't match.");
        }
    });
}



// checkAppointments(authUser && authUser.user.user_appointments);
if (authUser && authUser.user && authUser.user.user_appointments) {
  checkAppointments(authUser && authUser.user.user_appointments);
  console.log("authUser.user.user_appointments", authUser.user.user_appointments);
} else {
  console.log("authUser or its properties are undefined or null");
}

// console.log("authUser.user.user_appointments",authUser.user.user_appointments);


  useEffect(() => {
    setCookie("googtrans", "/en/en/", { path: "/" });
    var addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;

    const translationCookie = Cookies["googtrans"];
    console.log(Cookies.googtrans, " cookies");
    if (translationCookie) {
      setIsTranslationCookieExists(true);
    } else {
      setIsTranslationCookieExists(false);
    }

    const elem = document.getElementsByClassName(
      "VIpgJd-ZVi9od-l4eHX-hSRGPd"
    )[0];
    if (elem) {
      elem.innerHTML = "Zyacomi";
    }

    return () => { };
  }, []);


  return (
    <>
      {/* <ScrollToTop /> */}
      <div
        style={{
          fontSize: "0.8rem",
          padding: "0 3rem",
          color: "gray",
          height: "2.5rem",
          ...(Cookies["googtrans"] && { position: "relative", top: "-2rem" }),
        }}
        className="d-flex justify-content-between align-items-center"
      >
        <span>
          Copyright © 2024 Zyacom International LLC. All Rights Reserved.
        </span>
        <div id="google_translate_element"></div>
      </div>

      <div></div>
      <div
        className="App"
        style={{
          height: "100vh",
          ...(Cookies["googtrans"] && { position: "relative", top: "-1.9rem" }),
        }}
      >
        {openChat || CallRunning ? (
  <>
    <CountdownTimer />
    <ChatIcon />
  </>
) : null}

        {/* {AppointmentGoingOn && <Button variant="contained" color="secondary" style={{position: "fixed", zIndex:14, bottom: "0", right: '0rem', padding: "0.64rem 5rem"}}>Open Chat</Button>} */}
        {/* <Notifications /> */}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Main />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/terms&conditions" element={<TermsAndConditions />} />
          <Route path="/experts" element={<Experts />} />
          <Route path="/options" element={<Pricing />} />
          <Route path="/live-streamings" element={<LiveStreams />} />
          <Route path="/referral-program" element={<ReferralProgram />} />
          <Route path="/blogs" element={<MyBlogs />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
          <Route path="/sign-in" element={<ProtectedRoute><SignIn /></ProtectedRoute>} />
          <Route path="/sign-up" element={<ProtectedRoute><Registerations /></ProtectedRoute>} />
          <Route path="/privacy-policy" element={<Privacy />} />
          <Route path="/faq" element={<Faqs />} />
          <Route path="*" element={<NotFound />} />

          {/* Protected Routes */}
          <Route path="/profile" element={<ProtectNotSignedIn><Profile /></ProtectNotSignedIn>} />
          <Route path="/test" element={<ProtectNotSignedIn><Test /></ProtectNotSignedIn>} />
          <Route path="/info" element={<ProtectNotSignedIn><Information /></ProtectNotSignedIn>} />
          <Route path="/success" element={<ProtectNotSignedIn><PaymentSuccess /></ProtectNotSignedIn>} />
          <Route path="/failed" element={<ProtectNotSignedIn><PaymentFailed /></ProtectNotSignedIn>} />
          <Route path="/forbidden" element={<ProtectNotSignedIn><Forbidden /></ProtectNotSignedIn>} />
          <Route path="/forgot-password" element={<ProtectNotSignedIn><ForgotPassword /></ProtectNotSignedIn>} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/view-profile/:UserId" element={<ExpertProfile />} />
          <Route path="/user-steps" element={<ProtectNotSignedIn><UserSteps /></ProtectNotSignedIn>} />
          <Route path="/expert-steps" element={<ProtectNotSignedIn><ExpertSteps /></ProtectNotSignedIn>} />
          <Route path="/dashboard" element={<ProtectNotSignedIn><Dashboard /></ProtectNotSignedIn>} />
          <Route path="/appointments" element={<ProtectNotSignedIn><Appointments /></ProtectNotSignedIn>} />
          <Route path="/transactions" element={<ProtectNotSignedIn><Transactions /></ProtectNotSignedIn>} />
          <Route path="/settings" element={<ProtectNotSignedIn><Settings /></ProtectNotSignedIn>} />
          <Route path="/socialMedia" element={<ProtectNotSignedIn><SocialMedia /></ProtectNotSignedIn>} />
          <Route path="/withdraws" element={<ProtectNotSignedIn><Withdraws /></ProtectNotSignedIn>} />
          <Route path="/calllogs" element={<ProtectNotSignedIn><CallLogs /></ProtectNotSignedIn>} />
          <Route path="/support" element={<ProtectNotSignedIn><Support /></ProtectNotSignedIn>} />
          <Route path="/w4-form" element={<ProtectNotSignedIn><W4Form /></ProtectNotSignedIn>} />
          <Route path="/identity-verification" element={<ProtectNotSignedIn><IdentityVerification /></ProtectNotSignedIn>} />
          <Route path="/billing-information" element={<ProtectNotSignedIn><BillingInfortmation /></ProtectNotSignedIn>} />
          <Route path="/account-settings" element={<ProtectNotSignedIn><AccountSettings /></ProtectNotSignedIn>} />
          <Route path="/portfolio-settings" element={<ProtectNotSignedIn><PortfolioSettings /></ProtectNotSignedIn>} />
          <Route path="/qualification-settings" element={<ProtectNotSignedIn><QualificationSettings /></ProtectNotSignedIn>} />
          <Route path="/hui" element={<ProtectNotSignedIn><BasicModalDialog /></ProtectNotSignedIn>} />
          <Route path="/schedule" element={<ProtectNotSignedIn><Schedule /></ProtectNotSignedIn>} />
          <Route path="/chat" element={<ProtectNotSignedIn><Chat /></ProtectNotSignedIn>} />
          <Route path="/vid" element={<ProtectNotSignedIn><VideoCall /></ProtectNotSignedIn>} />
          <Route path="/support-answers/:id" element={<ProtectNotSignedIn><AutomatedAnswers /></ProtectNotSignedIn>} />
          <Route path="/requests" element={<ProtectNotSignedIn><Requests /></ProtectNotSignedIn>} />
          <Route path="/request/:id" element={<ProtectNotSignedIn><TicketView /></ProtectNotSignedIn>} />
          <Route path="/expert-livestreams" element={<ProtectNotSignedIn><ExpertLiveStreams /></ProtectNotSignedIn>} />
          <Route path="/livessss/:roomID/:role" element={<ProtectNotSignedIn><ExpertLiveStreamsLive /></ProtectNotSignedIn>} />
          <Route path="/update-refferal" element={<ProtectNotSignedIn><RefferalSettings /></ProtectNotSignedIn>} />
          <Route path="/refferal-team" element={<ProtectNotSignedIn><RefferalTeam /></ProtectNotSignedIn>} />
          <Route path="/voice" element={<ProtectNotSignedIn><Example /></ProtectNotSignedIn>} />
          <Route path="/add-wallet" element={<ProtectNotSignedIn><Wallet /></ProtectNotSignedIn>} />
          <Route path="/profile/:profile_url" element={<ProtectNotSignedIn><BioProfile /></ProtectNotSignedIn>} />
          <Route path="/subscription" element={<ProtectNotSignedIn><Subscriptions /></ProtectNotSignedIn>} />
          <Route path="/profile-subscriptions" element={<ProtectNotSignedIn><ProfileSubscriptions /></ProtectNotSignedIn>} />
          <Route path="/user/account/delete" element={<ProtectNotSignedIn><DeleteAccount /></ProtectNotSignedIn>} />
          <Route path="/media-posts" element={<ProtectNotSignedIn><UploadMediaPosts /></ProtectNotSignedIn>} />
          <Route path="/voice-call/:id" element={<ProtectNotSignedIn><VoiceVideo /></ProtectNotSignedIn>} />
          <Route path="/room/:roomId/:userType" element={<ProtectNotSignedIn><Room /></ProtectNotSignedIn>} />
          <Route path="/appointment-complete" element={<ProtectNotSignedIn><AppointmentComplete /></ProtectNotSignedIn>} />
          <Route path="/profile" element={<ProtectNotSignedIn><Profile /></ProtectNotSignedIn>} />


        </Routes>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </>
  );
}

export default App;
