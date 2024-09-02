import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ZIM } from 'zego-zim-web';

function App() {
  let zp;
  let fromID = localStorage.getItem("fromID"); // Get from id from local storage
  const{id}=useParams();

  // Function to generate a random ID
  function randomID(len) {
    let result = '';
    if (result) return result;
    var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
      maxPos = chars.length,
      i;
    len = len || 5;
    for (i = 0; i < len; i++) {
      result += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return result;
  }

  // Function to generate a random ID if not available in local storage
  if (!fromID) {
    fromID = randomID(5);
    localStorage.setItem("fromID", fromID);
  }
  // Function to get token from server
   // Function to get token from server
   async function generateToken(tokenServerUrl, userID) {
    // Obtain the token interface provided by the App Server
    const res = await fetch(
      `${tokenServerUrl}/access_token?userID=${userID}&expired_ts=7200`,
      {
        method: 'GET',
      }
    );
    return res.json();
  }

  // Initialize function
  async function init() {
    const userName = 'user_' + fromID;
    document.querySelector('.name').innerHTML = userName;
    document.querySelector('.id').innerHTML = fromID;
    const { token } = await generateToken(
      'https://nextjs-token-callinvitation.vercel.app/api',
      fromID
    );
    // Change this line to generateKitTokenForTest
    const KitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      547746184, // Replace with your appid
      'c3aa30d718bdefedb1bdf4cdf9debc64', // Replace with your server secret
      null,
      fromID,
      userName
    );
    zp = ZegoUIKitPrebuilt.create(KitToken);
    // add plugin
    zp.addPlugins({ ZIM });
  }

  // useEffect to mimic componentDidMount
  useEffect(() => {
    init();
  }, []);

  // Function to handle call sending
  function handleSend(callType) {
    // const urlParams = new URLSearchParams(window.location.search);
    // const id = urlParams.get('toId'); // Get to id from URL parameters
    if (!id) {
      alert('To ID not found in URL!!');
      return;
    }
    // send call invitation
    zp.sendCallInvitation({
      callees: [{ userID: id, userName: 'user_' + id }], // Pass to id
      callType: callType,
      timeout: 60,
    })
      .then((res) => {
        console.warn(res);
        if (res.errorInvitees.length) {
          alert('The user does not exist or is offline.');
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className="App">
      <div className="name"></div>
      <div className="id"></div>
      <button className="videoCall" onClick={() => handleSend(ZegoUIKitPrebuilt.InvitationTypeVideoCall)}>Video Call</button>
      <button className="voiceCall" onClick={() => handleSend(ZegoUIKitPrebuilt.InvitationTypeVoiceCall)}>Voice Call</button>
    </div>
  );
}

export default App;