// import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Footer from "../components/Footer";
// import { useAppContext } from "../context/AppContext";
// import { calculateTotalHours, fetchExpertLiveStreams } from "../utils/helpers";
// import Header from "./components/Header";

// function ExpertLiveStreams() {
//   const { userDataAuth } = useAppContext();
//   const [livestreams, setLivestreams] = useState([]);
//   const [closestLivestream, setClosestLivestream] = useState(null);
//   const [isGoLiveEnabled, setIsGoLiveEnabled] = useState(false);
//   const [countdown, setCountdown] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await fetchExpertLiveStreams();
//         setLivestreams(data);
//         findClosestLivestream(data);
//       } catch (error) {
//         console.error("Error fetching livestreams:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const processTitle = (title) => {
//     return title.split(' ')[0]; // Return the first word
//   };

//   const findClosestLivestream = (livestreams) => {
//     const now = new Date();
//     let closest = null;

//     livestreams.forEach((stream) => {
//       const streamStart = new Date(`${stream.date}T${stream.start_time}+05:00`);
//       const streamEnd = new Date(`${stream.date}T${stream.end_time}+05:00`);

//       if (
//         (streamStart > now && (!closest || streamStart < new Date(`${closest.date}T${closest.start_time}+05:00`))) ||
//         (now >= streamStart && now <= streamEnd)
//       ) {
//         closest = stream;
//       }
//     });

//     setClosestLivestream(closest);

//     if (closest) {
//       const streamStart = new Date(`${closest.date}T${closest.start_time}+05:00`);
//       const streamEnd = new Date(`${closest.date}T${closest.end_time}+05:00`);

//       const countdownInterval = setInterval(() => {
//         const now = new Date();
//         if (now < streamStart) {
//           const timeUntilStart = streamStart - now;
//           setCountdown(`Livestream starts in ${formatCountdown(timeUntilStart)}`);
//         } else if (now >= streamStart && now <= streamEnd) {
//           setIsGoLiveEnabled(true);
//           const timeUntilEnd = streamEnd - now;
//           setCountdown(`Livestream is live! Ends in ${formatCountdown(timeUntilEnd)}`);
//         } else {
//           clearInterval(countdownInterval);
//           setCountdown(`Livestream has ended.`);
//           alert('Your livestream has ended.');
//         }
//       }, 1000);
//     }
//   };

//   const formatCountdown = (milliseconds) => {
//     const totalSeconds = Math.floor(milliseconds / 1000);
//     const hours = Math.floor(totalSeconds / 3600);
//     const minutes = Math.floor((totalSeconds % 3600) / 60);
//     const seconds = totalSeconds % 60;
//     return `${hours}h ${minutes}m ${seconds}s`;
//   };

//   const appID = 1322930625;
//   const serverSecret = "d8e671a6f5d5a43e526d7783f3e12d78";

//   const handleGoLive = () => {
//     if (closestLivestream) {
//       const { room_id } = closestLivestream;
//       if (!room_id || !serverSecret || !appID || !userDataAuth) {
//         console.log("Required parameters are missing.");
//         return;
//       }

//       const role = userDataAuth.user_type === "expert" 
//                     ? ZegoUIKitPrebuilt.Host 
//                     : ZegoUIKitPrebuilt.Audience;

//       const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
//         appID, 
//         serverSecret, 
//         room_id,
//         userDataAuth?.id.toString(), 
//         userDataAuth?.name 
//       );

//       ZegoUIKitPrebuilt.create(kitToken).joinRoom({
//         container: document.querySelector("#root"),
//         scenario: {
//           mode: ZegoUIKitPrebuilt.LiveStreaming,
//           config: {
//             role,
//           },
//         },
//         sharedLinks: [{
//           name: 'Join as audience',
//           url:
//              window.location.protocol + '//' + 
//              window.location.host + window.location.pathname +
//               '?roomID=' +
//               room_id +
//               '&role=Audience',
//         }]
//       });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Header />
//       <section className="tk-scetiondb">
//         <div className="container">
//           <h2
//             style={{
//               fontSize: "32px",
//               fontWeight: "bold",
//               textTransform: "capitalize",
//             }}
//           >
//             Welcome {userDataAuth?.name}!
//           </h2>
//           <div className="row mt-1">
//             <div className="col-xl-12 col-lg-12 col-md-12">
//               {closestLivestream && (
//                 <div className="alert alert-warning" role="alert">
//                   <h4 className="alert-heading">Upcoming Livestream!</h4>
//                   <p>Your livestream "{closestLivestream.title}" is starting soon at {closestLivestream.start_time}.</p>
//                   <p>{countdown}</p>
//                   <button
//                     className="btn btn-danger"
//                     disabled={!isGoLiveEnabled}
//                     onClick={handleGoLive}
//                   >
//                     Go Live
//                   </button>
//                   {userDataAuth.user_type === "expert" && (
//                     <div>
//                       <h5>Share this link with your audience:</h5>
//                       <a href={window.location.protocol + '//' + 
//                                  window.location.host + window.location.pathname +
//                                  '?roomID=' + closestLivestream.room_id +
//                                  '&role=Audience'}>
//                         Join as audience
//                       </a>
//                     </div>
//                   )}
//                 </div>
//               )}
//               <div className="tk-seller-counter">
//                 <ul className="tk-seller-counter-list" id="tk-counter-two">
//                   {livestreams.map((stream) => (
//                     <li key={stream.id} style={{ maxWidth: '25%' }}>
//                       <div className="tk-counter-contant">
//                         <div className="tk-counter-icon-button">
//                           <div className="tk-icon-red">
//                             <i
//                               className="bi bi-camera-video-fill"
//                               style={{ color: "#EF4444" }}
//                             ></i>
//                           </div>
//                           <div className="tk-counter-button">
//                             <Link
//                               className="tk-counter-button-active"
//                               to="/appointments"
//                             >
//                               View
//                             </Link>
//                           </div>
//                         </div>
//                         <h3 className="tk-counter-value">
//                           <span className="counter-value" data-count="0">
//                             {processTitle(stream.title) + "..."}
//                           </span>
//                         </h3>
//                         <strong>{"Session: " + calculateTotalHours(stream.start_time, stream.end_time)} hours</strong>
//                         <div className="tk-icon-watermark2">
//                           <i className="bi bi-camera-video"></i>
//                         </div>
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//       <Footer />
//     </div>
//   );
// }

// export default ExpertLiveStreams;

import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import { useAppContext } from "../context/AppContext";
import { calculateTotalHours, fetchExpertLiveStreams } from "../utils/helpers";
import Header from "./components/Header";

function ExpertLiveStreams() {
  const { userDataAuth } = useAppContext();
  const [livestreams, setLivestreams] = useState([]);
  const [closestLivestream, setClosestLivestream] = useState(null);
  const [isGoLiveEnabled, setIsGoLiveEnabled] = useState(false);
  const [countdown, setCountdown] = useState("");
  const appID = 1322930625;
  const serverSecret = "d8e671a6f5d5a43e526d7783f3e12d78";
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchExpertLiveStreams();
        setLivestreams(data);
        findClosestLivestream(data);
      } catch (error) {
        console.error("Error fetching livestreams:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const roomID = params.get('roomID');
    const role = params.get('role');

    if (userDataAuth?.user_type === "user" && role === "Audience" && roomID) {
      joinRoomAsAudience(roomID);
    }
  }, [location.search, userDataAuth]);

  const joinRoomAsAudience = (roomID) => {


    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID, 
      serverSecret, 
      roomID,
      userDataAuth?.id.toString(), 
      userDataAuth?.name 
    );

    ZegoUIKitPrebuilt.create(kitToken).joinRoom({
      container: document.querySelector("#root"),
      scenario: {
        mode: ZegoUIKitPrebuilt.LiveStreaming,
        config: {
          role: ZegoUIKitPrebuilt.Audience,
        },
      },
    });
  };

  const processTitle = (title) => {
    return title.split(' ')[0]; 
  };

  const findClosestLivestream = (livestreams) => {
    const now = new Date();
    let closest = null;

    livestreams.forEach((stream) => {
      const streamStart = new Date(`${stream.date}T${stream.start_time}+05:00`);
      const streamEnd = new Date(`${stream.date}T${stream.end_time}+05:00`);

      if (
        (streamStart > now && (!closest || streamStart < new Date(`${closest.date}T${closest.start_time}+05:00`))) ||
        (now >= streamStart && now <= streamEnd)
      ) {
        closest = stream;
      }
    });

    setClosestLivestream(closest);

    if (closest) {
      const streamStart = new Date(`${closest.date}T${closest.start_time}+05:00`);
      const streamEnd = new Date(`${closest.date}T${closest.end_time}+05:00`);

      const countdownInterval = setInterval(() => {
        const now = new Date();
        if (now < streamStart) {
          const timeUntilStart = streamStart - now;
          setCountdown(`Livestream starts in ${formatCountdown(timeUntilStart)}`);
        } else if (now >= streamStart && now <= streamEnd) {
          setIsGoLiveEnabled(true);
          const timeUntilEnd = streamEnd - now;
          setCountdown(`Livestream is live! Ends in ${formatCountdown(timeUntilEnd)}`);
        } else {
          clearInterval(countdownInterval);
          setCountdown(`Livestream has ended.`);
          alert('Your livestream has ended.');
        }
      }, 1000);
    }
  };

  const formatCountdown = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  // const handleGoLive = () => {
  //   if (closestLivestream) {
  //     const { room_id } = closestLivestream;
  //     if (!room_id || !serverSecret || !appID || !userDataAuth) {
  //       console.log("Required parameters are missing.");
  //       return;
  //     }

  //     const role = userDataAuth.user_type === "expert" 
  //                   ? ZegoUIKitPrebuilt.Host 
  //                   : ZegoUIKitPrebuilt.Audience;

  //     const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
  //       547746184, 
  //       'c3aa30d718bdefedb1bdf4cdf9debc64', 
  //       "1",
  //       userDataAuth?.id.toString(), 
  //       userDataAuth?.name 
  //     );

  //     ZegoUIKitPrebuilt.create(kitToken).joinRoom({
  //       container: document.querySelector("#root"),
  //       scenario: {
  //         mode: ZegoUIKitPrebuilt.LiveStreaming,
  //         config: {
  //           role,
  //         },
  //       },
  //       sharedLinks: [{
  //         name: 'Join as audience',
  //         url:
  //            window.location.protocol + '//' + 
  //            window.location.host + window.location.pathname +
  //             '?roomID=' +
  //             room_id +
  //             '&role=Audience',
  //       }]
  //     });
  //   }
  // };
  const handleGoLive = () => {
    if (closestLivestream) {
      const { room_id } = closestLivestream;
  
      if (!room_id || !serverSecret || !appID || !userDataAuth) {
        console.log("Required parameters are missing.");
        return;
      }
  
      const role = userDataAuth.user_type === "expert" 
                    ? ZegoUIKitPrebuilt.Host 
                    : ZegoUIKitPrebuilt.Audience;
  
      window.location.href = `/livessss/${room_id}/${role === ZegoUIKitPrebuilt.Host ? "Host" : "Audience"}`;
    }
  }
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <section className="tk-scetiondb">
        <div className="container">
          <h2
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              textTransform: "capitalize",
            }}
          >
            Welcome {userDataAuth?.name}!
          </h2>
          <div className="row mt-1">
            <div className="col-xl-12 col-lg-12 col-md-12">
              {closestLivestream && (
                <div className="alert alert-warning" role="alert">
                  <h4 className="alert-heading">Upcoming Livestream!</h4>
                  <p>Your livestream "{closestLivestream.title}" is starting soon at {closestLivestream.start_time}.</p>
                  <p>{countdown}</p>
                  <button
                    className="btn btn-danger"
                    disabled={!isGoLiveEnabled}
                    onClick={handleGoLive}
                  >
                    Go Live
                  </button>
                  {userDataAuth.user_type === "expert" && (
                    <div>
                      <h5>Share this link with your audience:</h5>
                      <a href={window.location.protocol + '//' + 
                                 window.location.host + window.location.pathname +
                                 '?roomID=' + closestLivestream.room_id +
                                 '&role=Audience'}>
                        Join as audience
                      </a>
                    </div>
                  )}
                </div>
              )}
              <div className="tk-seller-counter">
                <ul className="tk-seller-counter-list" id="tk-counter-two">
                  {livestreams.map((stream) => (
                    <li key={stream.id} style={{ maxWidth: '25%' }}>
                      <div className="tk-counter-contant">
                        <div className="tk-counter-icon-button">
                          <div className="tk-icon-red">
                            <i
                              className="bi bi-camera-video-fill"
                              style={{ color: "#EF4444" }}
                            ></i>
                          </div>
                          <div className="tk-counter-button">
                            <Link
                              className="tk-counter-button-active"
                              to="/appointments"
                            >
                              View
                            </Link>
                          </div>
                        </div>
                        <h3 className="tk-counter-value">
                          <span className="counter-value" data-count="0">
                            {processTitle(stream.title) + "..."}
                          </span>
                        </h3>
                        <strong>{"Session: " + calculateTotalHours(stream.start_time, stream.end_time)} hours</strong>
                        <div className="tk-icon-watermark2">
                          <i className="bi bi-camera-video"></i>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default ExpertLiveStreams;

