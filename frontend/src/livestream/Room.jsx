import { Button } from "@mui/material";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ZegoSuperBoardManager } from "zego-superboard-web";
import Header from "../Expert/components/Header";
import Footer from "../components/Footer";
import GlobalDialog from "../components/GlobalDialogue";
import { InsufficientFundsDialog } from "../components/InsufficientFundsDialog";
import { useAppContext } from "../context/AppContext";
import { useFrontEndContext } from "../context/FrontEndContext";
import {
  UpdateLivestreamStatus,
  getLiveStreamDetails,
  payLiveStream,
} from "../utils/helpers";

function Room() {
  const { AUTHUSER, fetchAuthUser } = useAppContext();
  const { fetchLiveStreams } = useFrontEndContext();
  const { roomId, userType } = useParams();
  const [isPaid, setIspaid] = useState(false);

  const [liveStreamDetails, setLiveStreamDetails] = useState(null);
  const [insufficientFundsDialogOpen, setInsufficientFundsDialogOpen] =
    useState(false);
  const openInsufficientFundsModal = () => {
    setInsufficientFundsDialogOpen(true);
  };
  const closeInsufficientFundsModal = () => {
    setInsufficientFundsDialogOpen(false);
  };
  const elementRef = useRef(null);
  const userName = AUTHUSER.name;
  const location = useLocation();
  const walletRate = parseFloat(AUTHUSER.wallet);
  const locoIsPaid = localStorage.getItem("isPaid");

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  if (!token) {
    navigate("/sign-in?message=Please log in first to join the live stream");
  }
  function randomID(len) {
    let result = "";
    if (result) return result;
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
    const myMeeting = async (element) => {
      const appID = 547746184;
      let role =
        userType === "expert"
          ? ZegoUIKitPrebuilt.Host
          : ZegoUIKitPrebuilt.Audience;
      const serverSecret = "c3aa30d718bdefedb1bdf4cdf9debc64";

      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomId,
        randomID(5),
        userName
      );

      const zp = ZegoUIKitPrebuilt.create(kitToken);

      const checkRoomState = () => {
        zp.getRoomState((state) => {
          if (
            state === ZegoUIKitPrebuilt.RoomState.Started &&
            role === ZegoUIKitPrebuilt.Audience
          ) {
            zp.joinRoom({
              container: element,
              whiteboardConfig: {
                showAddImageButton: true,
              },

              scenario: {
                mode: ZegoUIKitPrebuilt.LiveStreaming,
                config: {
                  role,
                },
              },
              sharedLinks: [
                {
                  name: "Copy Link",
                  url: `https://zyacom.com/room/${roomId}/`,
                },
              ],
            });
          } else {
            setTimeout(checkRoomState, 2000);
          }
        });
      };
      zp.addPlugins({ ZegoSuperBoardManager });

      console.log("Role: ", role);
      zp.joinRoom({
        onLiveStart: async () => {
          if (AUTHUSER?.user_type === "expert") {
            await UpdateLivestreamStatus(true);
            fetchLiveStreams();
          }
        },

        onLiveEnd: async () => {
          console.log("ended")
          if (AUTHUSER?.user_type === "expert") {
            await UpdateLivestreamStatus(false);
            fetchLiveStreams();
          }
        },
        container: element,
        whiteboardConfig: {
          showAddImageButton: true,
        },
        scenario: {
          mode: ZegoUIKitPrebuilt.LiveStreaming,
          config: {
            role,
          },
        },
        sharedLinks: [
          {
            name: "Copy Link",
            url: `${window.location.origin}/room/${roomId}/user`,
          },
        ],
      });

      checkRoomState();
    };

    if (elementRef.current) {
      myMeeting(elementRef.current);
    }
  }, [roomId, userType, userName, isPaid]);
  const globalDialogRef = useRef();
  const handleOpenDialog = () => {
    globalDialogRef.current.openDialog();
  };

  useEffect(() => {
    console.log("user_type", userType);
    if (userType === "expert") {
      setIspaid(true);
      localStorage.setItem("isPaid", true);
      return;
    }
    getLiveStreamDetails(roomId).then((data) => {
      //  setIspaid(data);
      setLiveStreamDetails(data);
      if (!locoIsPaid) {
        handleOpenDialog();
      }
    });
  }, [userType, roomId, locoIsPaid]);
  const handleSubmitLivestream = async () => {
    localStorage.setItem("isPaid", true);
    if (liveStreamDetails.price > walletRate) {
      openInsufficientFundsModal();
      return;
    }
    const response = await payLiveStream(
      liveStreamDetails.user_id,
      liveStreamDetails.price
    );
    if (response === true) {
      fetchAuthUser();
      setIspaid(true);
      window.location.reload();
    } else {
      setIspaid(false);
    }
    // get pric
    // zyacom commission from pric
    // add the price remainig inthe expert wallet
    // setispaid true
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <InsufficientFundsDialog
        open={insufficientFundsDialogOpen}
        onClose={closeInsufficientFundsModal}
      />
      <Header />
      {localStorage.getItem("isPaid") ? (
        <>
          <section className="tk-scetiondb">
            {
              // userName ? () : (
              //   <h3>starting live stream...</h3>
              // )
              <div ref={elementRef} id={`zegoDiv`} />
            }
          </section>
        </>
      ) : (
        <>
          <section className="tk-scetiondb" style={{ height: "50vh" }}>
            <h3 className="text-center">first you have to pay</h3>
          </section>
        </>
      )}
      <GlobalDialog
        ref={globalDialogRef}
        title="Join LiveStreaming"
        actions={false}
        size={"sm"}
      >
        Are you sure you want to pay for livestream ? <br />
        Your card will be charged ${liveStreamDetails?.price}.
        <div className="row">
          <div className="col-9"></div>
          <div className="col-3">
            <Button
              variant="outlined"
              color="warning"
              onClick={() => handleSubmitLivestream()}
            >
              Yes
            </Button>
          </div>
        </div>
      </GlobalDialog>
      <Footer />
    </div>
  );
}

export default Room;
