import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import Footer from '../components/Footer';
import { useAppContext } from '../context/AppContext';
import Header from './components/Header';

function ExpertLiveStreamsLive() {
  const { userDataAuth } = useAppContext();
  const location = useLocation();
  const appID = 1322930625;  // Replace with your actual appID
  const serverSecret = "d8e671a6f5d5a43e526d7783f3e12d78";  // Replace with your actual serverSecret
  const { roomID: paramRoomID, role } = useParams();

  useEffect(() => {
    const storedRoomID = sessionStorage.getItem('roomID');
    const roomID = paramRoomID || storedRoomID;
    
    if (!roomID || !role || !userDataAuth.id) {
      console.log('Missing roomID, role, or userDataAuth');
      return;
    }

    const roleType = role === "Audience" ? ZegoUIKitPrebuilt.Audience : ZegoUIKitPrebuilt.Host;

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID, 
      serverSecret, 
      roomID, 
      userDataAuth?.id.toString(), 
      userDataAuth.name || "Unknown User"
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);

    // Check if the user needs to automatically resume the stream
    if (storedRoomID) {
      zp.joinRoom({
        container: document.querySelector("#livestream-container"),
        scenario: {
          mode: ZegoUIKitPrebuilt.LiveStreaming,
          config: {
            role: roleType,
          },
        },
        showPreJoinView: false,  // Disable pre-join check view
        onJoinRoom: () => {
          console.log('Rejoined the room successfully.');
        },
      });
    } else {
      // Join the room and store roomID
      zp.joinRoom({
        container: document.querySelector("#livestream-container"),
        scenario: {
          mode: ZegoUIKitPrebuilt.LiveStreaming,
          config: {
            role: roleType,
          },
        },
        onJoinRoom: () => {
          const newRoomID = zp.getRoomID();
          sessionStorage.setItem('roomID', newRoomID);
          console.log('roomID stored in sessionStorage:', newRoomID);
        },
      });
    }

  }, [location.search, userDataAuth]);

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
            <div id="livestream-container" style={{ width: '100%', height: '100vh' }}></div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default ExpertLiveStreamsLive;
