const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http").Server(app);
const { PeerServer } = require("peer");
const PORT = 4000;
const socketIO = require("socket.io")(http, {
  cors: {
    origin: ["http://localhost:5173", "https://zyacom.online"],
  },
});

const customGenerationFunction = () =>
  (Math.random().toString(36) + "0000000000000000000").substr(2, 16);

app.use(cors());
let users = {};
const peerServer = PeerServer({
  port: 9000,
  path: "/zyacom-server",
  generateClientId: customGenerationFunction,
});

socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on("userLogin", (data) => {
    if (users[data.id] == undefined) {
      const userData = {
        id: data.id,
        name: data.name,
        socketId: socket.id,
      };
      // adding to the custom-variable.
      users[data.id] = userData;
      socket.emit("userLogged", true);
      socketIO.emit("users", users);
    } else {
      socketIO.emit("users", users);
      socket.emit("alreadyLogin", false);
    }
  });

  // socket.on("newUser", data => {
  //   // users.push(data);
  //   console.log('newUser', users);
  //   socketIO.emit("newUserResponse", users);
  // });

  socket.on("instantApt", (data) => {
    // must pass toId-data-base-id of the instant-apt expert. data = {toId: 'data-base-id'}
    console.log("openChat", data);
    socket.to(users[data.toId].socketId).emit("instantAptOpenChat", data);
    // now, listen the event "instantAptOpenChat" in the client side. whenever the event occurs open-the-chat
  });

  socket.on("message", (data) => {
    console.log("message", data);

    // data.toId -> database id
    if (users[data.toId] == undefined) {
      socket.emit("");
    } else {
      socket
        .to(users[data.toId].socketId)
        .emit("messageResponse", {
          fromId: data.fromId,
          text: data.text,
          toId: data.toId,
        });
    }
    socket.emit("messageResponse", {
      fromId: data.fromId,
      text: data.text,
      toId: data.toId,
    });
  });
  socket.on("openchat", (data) => {
    console.log("openChatResponse", data);

    // Get the current time
    const now = new Date();

    // Parse the time from the data (assuming time is in 'HH:mm' format)
    const [hours, minutes] = data.time.split(':').map(Number);
    
    // Create a Date object for the specified time today
    const targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0);

    // If the target time is in the past, schedule it for tomorrow
    if (targetTime < now) {
        targetTime.setDate(targetTime.getDate() + 1);
    }

    // Calculate the delay in milliseconds
    const delay = targetTime.getTime() - now.getTime();

    // Function to emit the event
    const emitEvent = () => {
        if (users[data.toId] == undefined) {
            socket.emit(""); // Emit something here if needed
        } else {
            socket.to(users[data.toId].socketId).emit("openChatResponse", {
                fromId: data.fromId,
                text: data.text,
                toId: data.toId,
            });
        }
        socket.emit("openChatResponse", {
            fromId: data.fromId,
            text: data.text,
            toId: data.toId,
        });
    };

    // Schedule the event emission
    setTimeout(emitEvent, delay);
});

  socket.on("typing", (data) => socket.broadcast.emit("typingResponse", data));

  // socket.on("audioMessage", (data) => {
  //   // You should emit the "audioMessage" event and send the base64 audio data to the client
  //   socket.to(users[data.toId].socketId).emit("audioMessage", {
  //     base64Audio: data.base64Audio,
  //   });
  //   console.log('data',data)
  // });

  socket.on("audioMessage", ({ fromId, toId, data }) => {
    console.log("data", data);
    if (users[toId] == undefined) {
    } else {
      socket
        .to(users[toId].socketId)
        .emit("audioMessage", { fromId: fromId, toId: toId, data: data });
    }
  });

  socket.on("createOffer", ({ fromId, toId, name, type }) => {
    console.log(toId, name);
    if (users[toId]) {
      socket.emit("userIsOnline", {
        fromId: fromId,
        name,
        toId: toId,
        type,
        isOnline: true,
      });
      socket
        .to(users[toId].socketId)
        .emit("createOfferFromServer", {
          fromId: fromId,
          name,
          toId: toId,
          type,
          isOnline: true,
        });
    } else {
      socket.emit("userIsOffline", {
        fromId: fromId,
        name,
        toId: toId,
        type,
        isOnline: false,
      });
    }
  });

  socket.on("accepted", ({ fromId, name, toId, type, peerId }) => {
    // console.log(peerId)
    if (users[fromId] == undefined) {
    } else {
      socket
        .to(users[fromId].socketId)
        .emit("acceptedFromServer", {
          fromId: fromId,
          name,
          toId: toId,
          type,
          peerId,
        });
    }
  });

  socket.on("makeCall", ({ userId, toId, peerId }) => {
    socket.to(toId).emit("makeCallFromSever", { userId, peerId });
  });

  socket.on("callCancel", ({ fromId, name, toId, type, isOnline }) => {
    console.log(fromId, name, toId, type, isOnline);
    if (users[toId] == undefined) {
      socket.emit("callCancelFromServer", {
        fromId,
        name,
        toId,
        type,
        isOnline,
      });
    } else {
      socket.emit("callCancelFromServer", {
        fromId,
        name,
        toId,
        type,
        isOnline,
      });
      socket
        .to(users[toId].socketId)
        .emit("callCancelFromUser", { fromId, name, toId, type, isOnline });
    }
  });

  socket.on("rejactCall", ({ fromId, toId, isReject }) => {
    if (users[fromId] == undefined) {
      socket.emit("rejectCallFromServer", { fromId, toId, isReject });
    } else {
      socket.emit("rejectCallFromServer", { fromId, toId, isReject });
      socket
        .to(users[fromId].socketId)
        .emit("rejectCallFromUser", { fromId, toId, isReject });
    }
  });

  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
    Object.keys(users).map((v) => {
      if (users[v].socketId == socket.id) {
        delete users[v];
      }
    });
    socketIO.emit("users", users);
    // users = users.filter(user => user.socketID !== socket.id)
    // socketIO.emit("newUserResponse", users)
    socket.disconnect();
  });
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello" });
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
