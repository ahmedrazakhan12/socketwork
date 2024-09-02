import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ZIM } from "zego-zim-web";
import Chat from "../Expert/Chat";
import { ringtone } from "../utils/constants";
import {
  checkIfUserExpert,
  fetchAppointmentsForUser,
  formatDateForLaravel,
  getLoggedinUserData,
  isEqualWithThreshold,
  storeCallLogs,
} from "../utils/helpers";
import { useAppContext } from "./AppContext";
import { useFrontEndContext } from "./FrontEndContext";

let ChatOpenedAt = null;
// let timeEndCall = 60 * 59 * 1000;
let timeEndCall = 60 * 57 * 1000;
// let timeEndCall = 60000;

const AppointmentsContext = createContext();

const useAppointments = () => {
  return useContext(AppointmentsContext);
};

export { useAppointments };
function TimeTracker({ appointments }) {
  const {
    ViewProfile,
    singleUser,
    scheduleData,
    ViewExpertSchedule,
    allReviews,
    singleReview,
    slotData,
    MODALOPENED, setMODALOPENED
  } = useFrontEndContext();
  const [isLoader, setIsLoader] = useState(false);
  const [OppositeUser, setOppositeUser] = useState(null);
  // const [AppointmentGoingOn, setAppointmentGoingOn] = useState(null)
  const { AppointmentGoingOn, setAppointmentGoingOn, IsModalOpen } = useAppointments();
  const {
    editAuthData,
    authUser,
    setOpenChat,
    openChat,
    onAnswer,
    remoteName,
    onRejectCall,
    setUserDataForInstantAppointment,
    UserDataForInstantAppointment,
  } = useAppContext();

  const Mins15 = 900000;
  function onExactTimeReached(targetAppointment) {
    console.log(openChat, " chat");

    setAppointmentGoingOn(targetAppointment);
 
    setOppositeUser(
      
      authUser?.user?.user_type === "user"
        ? targetAppointment?.expert_id
        : targetAppointment?.user_id
    );

    console.log("send email, karo", targetAppointment, " OppositeUser");
    if (openChat) return;

    // setAlert({
    //   message: "You Got An Upcomming Appointment Under 15 mins, Get Ready",
    // });
    // addNotification({
    //     title: 'From Zyacom',
    //     subtitle: 'Hurry Up!',
    //     message: 'Get Ready, Your Appointment is Now!',
    //     theme: 'darkblue',
    //     native: true // when using native, your OS will handle theming.
    // });
    ChatOpenedAt = +new Date();
    setOpenChat(true);
  }
  function onBefore15MinsReached() {
    console.log("send email, karo");
    // addNotification({
    //   title: "From Zyacom",
    //   subtitle: "Hurry Up!",
    //   message: "You Got An Upcomming Appointment Under 15 mins, Get Ready",
    //   theme: "darkblue",
    //   native: true, // when using native, your OS will handle theming.
    // });
  }

  useEffect(() => {
    const timer = setInterval(() => {
      // current-date
      const currentDate = new Date();

      // checking if the differnce between the future-dates and the current-date
      appointments.forEach(async (apt) => {
        // console.log(futureDate, currentDate) adding milli-secs
        if (
          isEqualWithThreshold(
            currentDate.getTime() + 900000,
            new Date(apt.future_date)?.getTime(),
            2000
          )
        ) {
          onBefore15MinsReached(apt);
        }



        // the appointment is going on, meaning under-hour
        // if (checkDateDifference(currentDate, new Date(apt.future_date))) {
        //     // onBefore15MinsReached(apt)
        //     console.log('nooo', apt)
        //     onExactTimeReached(apt)
        // }else if(apt?.id == getMostRecentDate(appointments)?.id ) {

        //     // the appointment is over
        //     setAppointmentGoingOn(null)
        //     setOpenChat(false)

        //     // must be on this
        //     // if(authUser?.user?.user_type === 'user')
        //     //         window.location.href = '/view-profile/'+ apt?.expert_id + '?profile=23'

        //     // const isExpert = await checkIfUserExpert();
        //     // console.log(_userID, ' user_ID')
        //     // if(!isExpert){
        //     //     if(window.location.href.includes('view')){
        //     //     }else{
        //     //         window.location.href = 'view-profile/'+ _userID + '?profile=23'
        //     //     }
        //     // }
        //     console.log('finished', apt)
        // }

        if (
          isEqualWithThreshold(
            currentDate.getTime(),
            new Date(apt.future_date)?.getTime(),
            2000
          )
        ) {
          onExactTimeReached(apt);
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [appointments, onBefore15MinsReached, onExactTimeReached]);


function getUserId(

) {

  // weired behavr
  if(MODALOPENED){

    // for instant
    return (UserDataForInstantAppointment?.userId || OppositeUser || singleUser?.id)
  }
  else {
    return (OppositeUser || singleUser?.id) 
  }
  
}
const { openChatModal, setOpenChatModal } = useAppContext();
// console.log("openChatModal");


  return (
    openChatModal === true  && (
      <Chat
        openChat={openChat}
        isLoader={isLoader}
        setIsLoader={setIsLoader}
        setOpenChat={setOpenChat}
        isScheduledAppointment={!!OppositeUser}
        // expert-data
        id={
         getUserId()
          //  UserDataForInstantAppointment?.userId ||
          // OppositeUser ||
          // singleUser?.id
        }
        // for-instant-chat open on expert-side, change the singleUser?.id state of the expert
        name={
          UserDataForInstantAppointment?.name ||
          OppositeUser ||
          singleUser?.name
        }
        // socket={socket}
      />
    )
  );
}

let AcceptedDate = null;
let MyCallType = null;
let _userID = null;
export function AppointmentsProvider({ children }) {
  const [AppointmentGoingOn, setAppointmentGoingOn] = useState(null);
  const [ReceiverId, setReceiverId] = useState(null);
  const { authUser, setOpenChat } = useAppContext();
  const [AppointmentsDates, setAppointmentsDates] = useState([]);
  const [Appointments, setAppointments] = useState([]);
  const [InstantAppointment, setInstantAppointment] = useState(null);

  // // ZP
  const [IsModalOpen, setIsModalOpen] = useState(false)

  const [CallAcceptedDate, setCallAcceptedDate] = useState(null);
  const [zp, setZp] = useState(null);
  const nav = useNavigate();
  // const [MyCallType, setMyCallType] = useState(null);
  const fromID = localStorage.getItem("fromID") || randomID(5);
  localStorage.setItem("fromID", fromID);
  const [CallRunning, setCallRunning] = useState();
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

  useEffect(() => {
    async function init() {
      const userName = authUser.user&&authUser.user.name + "_";

      console.log(authUser, " authUser");
      const KitToken =
        authUser?.user &&
        ZegoUIKitPrebuilt.generateKitTokenForTest(
          547746184,
          "c3aa30d718bdefedb1bdf4cdf9debc64",
          null,
          fromID,
          userName
        );
      console.log(fromID, " fromID");
      const newZp = ZegoUIKitPrebuilt.create(KitToken);
      newZp&&newZp.addPlugins({ ZIM });
      newZp&&newZp.setCallInvitationConfig({
        ringtoneConfig: {
          incomingCallUrl: ringtone, // The ringtone when receiving an incoming call invitation.
          outgoingCallUrl: ringtone, // The ringtone when sending a call invitation.
        },

        onIncomingCallReceived: (callID, caller, callType, callees) => {
          // const userID = callee
          setCallRunning(true);
          _userID = caller?.userID;
          console.log(
            "Incoming call received:",
            callID,
            caller,
            callType,
            callees
          );
          AcceptedDate = new Date();

          MyCallType = callType;
          console.log("Incoming call received: accepted date: ", AcceptedDate);
          // setOpenChat(false)
          setTimeout(async () => {
            const endedDate = new Date();
            const duration = endedDate - AcceptedDate;

            console.log(
              "hamza onCallReceived",
              callID,
              caller,
              callType,
              callees
            );

            const isExpert = await checkIfUserExpert();
            // const response  = await updateToCompleteApt(Appointments[0]?.id)

            console.log(_userID, " user_ID");
            if (!isExpert) {
              if (InstantAppointment) {
                window.location.href =
                  "/view-profile/" +
                  InstantAppointment?.expert_id +
                  "?profile=" +
                  InstantAppointment?.id;
                return;
              }
              if (window.location.href.includes("view")) {
                window.location.href =
                  "/view-profile/" +
                  _userID +
                  "?profile=" +
                  (Appointments[0]?.id || 23);
              } else {
                window.location.href =
                  "/view-profile/" +
                  _userID +
                  "?profile=" +
                  (Appointments[0]?.id || 23);
              }
            } else {
              window.location.href = "/";
            }
          }, timeEndCall - (+new Date() - (ChatOpenedAt || +new Date())));
        },
        onIncomingCallCanceled: (callID, caller, callType, callees) => {
          console.log(
            "Incoming call canceled:",
            callID,
            caller,
            callType,
            callees
          );

          alert("Appointment Is Canceled From The other side");
        },
        onOutgoingCallAccepted: (callID, callee, callType, callees) => {
          // setMyCallType(callType);
          _userID = callee?.userID;
          setCallRunning(true);
          MyCallType = callType;
          // setOpenChat(false)
          AcceptedDate = new Date();

          // setCallAcceptedDate(acceptedDate);
          // required store the date of the call
          setTimeout(async () => {
            const endedDate = new Date();
            const duration = endedDate - AcceptedDate;
            console.log('cll ', callID, callID, callee, callType, callees)

            const res = await storeCallLogs(
              Number(ReceiverId || callee?.userID),
              MyCallType == 0 ? "Audio/Video" : "Audio/Video",
              AcceptedDate,
              endedDate,
              duration
            );
            console.log(
              callID,
              callee,
              callType,
              callees,
              "hamza hamza onOutGoingCallAccepted"
            );

          
            const isExpert = await checkIfUserExpert();
            console.log(_userID, "user_ID");
            if (!isExpert) {
              if (InstantAppointment) {
                window.location.href =
                  "/view-profile/" +
                  InstantAppointment?.expert_id +
                  "?profile=" +
                  InstantAppointment?.id;
                return;
              }
              if (window.location.href.includes("view")) {
                window.location.href =
                  "/view-profile/" +
                  _userID +
                  "?profile=" +
                  (Appointments[0]?.id || 23);
              } else {
                window.location.href =
                  "/view-profile/" +
                  _userID +
                  "?profile=" +
                  (Appointments[0]?.id || 23);
              }
            } else {
              window.location.href = "/";
            }
          }, timeEndCall - (+new Date() - (ChatOpenedAt || +new Date())));

          console.log(
            "accepted Outgoing call accepted: date: ",
            callID,
            callee,
            callType,
            callees,
            AcceptedDate
          );
        },
        onCallInvitationEnded: async (callID, fromUser, toUser) => {
          const endedDate = new Date();
          const duration = endedDate - AcceptedDate;
          // const expertId = UserId;
          setCallRunning(false);

          console.log(
            "Call Ended ended:",
            "ended date: ",
            endedDate,
            "duration: ",
            toUser,
            "expertedId: ",
            _userID,
            "accepted-date: ",
            formatDateForLaravel(AcceptedDate)
          );

          console.log('cll ', callID, fromUser, toUser, ReceiverId, toUser)
          const res = await storeCallLogs(
            ReceiverId || Number(toUser),
            MyCallType == 0 ? "Voice Call" : "Video Call" ,
            AcceptedDate,
            endedDate,
            duration
          );



          const isExpert = await checkIfUserExpert();
          // const response  = await updateToCompleteApt(Appointments[0]?.id)
          console.log(_userID, " user_ID");
          if (!isExpert) {
            console.log(InstantAppointment, " instant");
            if (InstantAppointment) {
              // window.location.href = '/view-profile/' + InstantAppointment?.expert_id + '?profile=' + InstantAppointment?.id;
              return;
            }
            if (window.location.href.includes("view-profile")) {
              window.location.href =
                "/view-profile/" +
                _userID +
                "?profile=" +
                (Appointments[0]?.id || 23);
            } else {
              window.location.href =
                "/view-profile/" +
                _userID +
                "?profile=" +
                (Appointments[0]?.id || 23);
            }
          } else {
            window.location.href = "/";
          }

          // const scheduleRes = await storeSchedule({
          //     start_time: extractOnlyTimeFromDate(AcceptedDate),
          //     end_time: extractOnlyTimeFromDate(endedDate),
          //     // extracting only the date
          //     date: (new Date()).toISOString().split('T')[0]
          // });
          // const scheduleId = scheduleRes?.createdSchedule?.id

          // const createdAppointment = await storeAppointment({
          //     "data": [
          //         {
          //             "expert_id": 11,
          //             "schedule_id": scheduleId,
          //             "amount": 50.00,
          //             "date": "2024-03-27",
          //             "time": "10:00"
          //         },
          //     ]
          // })

          // console.log(scheduleRes?.createdAppointment, 'createdAppointment', createdAppointment)
        },

        onOutgoingCallRejected: (callID, callee) => {
          console.log("Outgoing call rejected:", callID, callee);
          alert("Appointment Is Canceled From The other side");
        },

        onOutgoingCallDeclined: (callID, callee) => {
          console.log("Outgoing call declined:", callID, callee);
          alert("Appointment Is Canceled From The other side");
        },

        onIncomingCallTimeout: (callID, caller) => {
          console.log("Incoming call timeout:", callID, caller);
        },

        onOutgoingCallTimeout: (callID, callees) => {
          console.log("Outgoing call timeout:", callID, callees);
        },
      });
      setZp(newZp);
    }

    if (localStorage.getItem("token")) {
      init();
    }
  }, [authUser?.user?.name, fromID]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getLoggedinUserData().then((_) => {
        // const user = _?.data?.user
        console.log(
          _?.data?.user?.user_appointments
            .filter((_) => _.future_date !== null)
            .map((_) => new Date(_.future_date)),
          " appointments"
        );

        setAppointmentsDates(
          _?.data?.user?.user_appointments
            .filter((_) => _.future_date !== null)
            .map((_) => new Date(_.future_date)) || []
        );
      });

      fetchAppointmentsForUser().then((_) => {
        console.log(_?.appointments, " apts");
        setAppointments(_?.appointments);
      });
    }
  }, []);

  // console.log(apts, ' appointments')

  // un comment this for actual working
  const appointments = Appointments ? [...Appointments] : [];
  // const appointments = [...test_appointments, ...Appointments]

  // - const appointments = Appointments

  // set the latest appointment in local-storage

  // comment-this, for actual working with realtime data, The proper dates of the appointments for the expert
  // const futureDates = [new Date(2024, 4, 4, 14, 10, 0, 0),
  // new Date(2024, 3, 4, 13, 57, 0, 0), new Date(2024, 3, 3, 5, 32, 0, 0), new Date(2024, 3, 3, 5, 29, 0, 0)]

  return (
    <AppointmentsContext.Provider
      value={{
        AppointmentsDates,
        setAppointmentsDates,
        setAppointmentGoingOn,
        AppointmentGoingOn,
        zp,
        setZp,
        InstantAppointment,
        setInstantAppointment,
        CallRunning,
        setCallRunning,
        ReceiverId,
        setReceiverId,
        IsModalOpen,
        setIsModalOpen
      }}
    >
      <TimeTracker appointments={appointments} />
      {children}
    </AppointmentsContext.Provider>
  );
}