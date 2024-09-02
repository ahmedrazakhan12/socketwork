import { Box } from "@mui/joy";
import React from "react";
import { useAppContext } from "../../context/AppContext";
function VideoCall() {
  const { localVideoRef, remoteVideoRef, connected, callStatus } =
    useAppContext();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "24rem",
          height: "46rem",
          background: "#111",
          position: "relative",
          borderRadius: "15px",
        }}
      >
        <Box
          sx={{ width: "100%", height: "3rem", backgroundColor: "transparent" }}
        >
          <Box
            sx={{
              margin: "10px",
              padding: "1px 15px",
              // background: "#ffffff59",
              width: "fit-content",
              height: "fit-content",
              borderRadius: "47px",
              color: "#fff",
              fontSize: "12px",
              fontWeight: "600",
            }}
          >
            {callStatus}
          </Box>
          <Box
            sx={{
              backgroundColor: "transparent",
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          >
            {!connected && <p>Waiting for Join</p>}
            <video
              style={{
                width: "100%",
                height: "100%",
                objectFit: "fill",
                borderRadius: "15px",
              }}
              ref={remoteVideoRef}
              autoPlay
            />
            {/* <div id="remoteVideoBox"></div> */}
          </Box>

          <Box
            sx={{
              backgroundColor: "transparent",
              width: "100px",
              height: "130px",
              position: "absolute",
              top: 10,
              right: 10,
              zIndex: "9999",
              borderRadius: 10,
            }}
          >
            <video
              style={{
                width: "100%",
                height: "100%",
                objectFit: "fill",
                borderRadius: "15px",
              }}
              ref={localVideoRef}
              autoPlay
            />

            {/* <div id="localVideoBox"></div> */}
          </Box>
          <Box
            sx={{
              backgroundColor: "transparent",
              width: "100%",
              height: "60px",
              position: "absolute",
              bottom: 0,
              left: 0,
              zIndex: "9999",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {connected && (
              <button
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  color: "#fff",
                  background: "#646464",
                  marginInline: "10px",
                }}
              >
                <i class="bi bi-mic-fill"></i>
                {/* <i class="bi bi-mic-mute-fill"></i> */}
              </button>
            )}

            <button
              id="endCall"
              // onClick={()=>{
              //   if(connected){
              //     endCall()
              //   }
              // }s}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                color: "#fff",
                background: "red",
                marginInline: "10px",
                visibility: connected ? "visible" : "hidden",
              }}
            >
              <i class="bi bi-telephone-fill"></i>
            </button>
            {/* {connected ? (
              <button
                id="endCall"
                // onClick={()=>{
                //   if(connected){
                //     endCall()
                //   }
                // }s}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  color: "#fff",
                  background: "red",
                  marginInline: "10px",
                }}
              >
                <i class="bi bi-telephone-fill"></i>
              </button>
            ) : ( */}
            <button
              id="declineCall"
              // onClick={()=>{
              //   if(connected){
              //     endCall()
              //   }
              // }s}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                color: "#fff",
                background: "red",
                marginInline: "10px",
                visibility: !connected ? "visible" : "hidden",
              }}
            >
              <i class="bi bi-telephone-fill"></i>
            </button>
            {/* )} */}
            {connected && (
              <button
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  color: "#fff",
                  background: "#646464",
                  marginInline: "10px",
                }}
              >
                <i class="bi bi-camera-video-fill"></i>
                {/* <i class="bi bi-camera-video-off-fill"></i> */}
              </button>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default VideoCall;
