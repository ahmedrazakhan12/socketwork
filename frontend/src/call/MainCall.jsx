import { Peer } from "peerjs";
import React, { useEffect, useRef, useState } from "react";

function MainCall() {
  const peerRef = useRef(null);
  const [peerLocalId, setPeerLocalId] = useState(null);
  const [remotePeerId, setRemotePeerId] = useState(null);
  useEffect(() => {
    initPerrJs();
  }, []);

  const initPerrJs = async () => {
    const peer = new Peer();
    peer.on("open", function (id) {
      peerRef.current = peer;
      setPeerLocalId(id);
      console.log("My peer ID is: " + id);
    });
    peer.on("call", async (call) => {
      const stream = await getUserMedia();
      if (stream) {
        call.answer(stream);
        call.on("stream", (remoteStream) => {
          console.log("Show Stream ", remoteStream);
          const video = document.createElement("video");
          try {
            video.srcObject = remoteStream;
          } catch (error) {
            video.src = createObjectURL(remoteStream);
          }
          video.play();
          video.width = 200;
          video.height = 200;
          document.getElementById("videos").append(video);
        });
      }
    });
  };
  function createObjectURL(object) {
    return window.URL
      ? window.URL.createObjectURL(object)
      : window.webkitURL.createObjectURL(object);
  }

  const onCall = async () => {
    if (remotePeerId == null) {
      alert("Please Enter Remote id");
    } else {
      const stream = await getUserMedia();
      console.log(remotePeerId);
      if (stream && peerRef.current) {
        const call = peerRef.current?.call(remotePeerId, stream);
        call.on("stream", (remoteStream) => {
          console.log("Show Stream ", remoteStream);
          const video = document.createElement("video");
          try {
            video.srcObject = remoteStream;
          } catch (error) {
            video.src = createObjectURL(remoteStream);
          }

          video.play();
          video.width = 200;
          video.height = 200;
          document.getElementById("videos").append(video);
          // Show stream in some <video> element.
        });
      }
    }
  };

  const getUserMedia = async () => {
    try {
      var stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      return stream;
    } catch (error) {
      alert("Please Reload Your Web Page");
      throw error;
    }
  };
  return (
    <div>
      <div>
        <p>{peerLocalId == null ? "Please Wait..." : peerLocalId}</p>
      </div>
      <div>
        <input
          type="text"
          onChange={(e) => setRemotePeerId(e.target.value)}
          value={remotePeerId}
        />
        <button onClick={onCall}>Call</button>
      </div>
      <div className="videos" id="videos"></div>
    </div>
  );
}

export default MainCall;
