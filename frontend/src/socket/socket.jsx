import io from "socket.io-client";

// const socket = socketIO.connect("http://localhost:4000", { autoConnect: false });

const socketIO = io("http://localhost:4000", { autoConnect: false });
// socketIO.open()
export default socketIO;
