import jwt from "jsonwebtoken";
import RoomController from "./controllers/RoomController";
import Room from "./models/Room";
import User from "./models/User";
import Category from "./models/Category";
import Game from "./Game";

const pg = str => console.log("\x1b[32m", str, "\x1b[0m");
const pr = str => console.log("\x1b[31m", str, "\x1b[0m");
const py = str => console.log("\x1b[33m", str, "\x1b[0m");

let sendRooms;
let sendCategories;

class Socket {
  constructor() {
    this.connectedUsers = {};
    this.games = new Map();
    this.rooms = {};
  }

  async run(server) {
    this.io = require("socket.io")(server);

    const self = this;

    this.io
      .use(async function(socket, next) {
        if (socket.handshake.query && socket.handshake.query.token) {
          jwt.verify(
            socket.handshake.query.token,
            "your_jwt_secret",
            async function(err, decoded) {
              if (err) {
                console.log("connecting to socket");
                const rooms = await RoomController.sendRooms();
                const categories = await Category.getCategories();
                self.sendMessage(socket, {
                  type: "ROOMS_RECEIVED",
                  data: { rooms, categories }
                });
                return next(new Error("Authentication error"));
              }
              socket.decoded = decoded;
              next();
            }
          );
        } else {
          next(new Error("Authentication error"));
        }
      })
      .on("connection", async function(socket) {
        // Connection now authenticated to receive further events
        const user = await User.findById(socket.decoded._id);
        self.sendMessage(socket, {
          type: "SET_POINTS",
          data: {
            points: user.points
          }
        });
        self.joinUserToRoomAccorddingToId(socket, socket.decoded._id);
        self.connectedUsers[socket.decoded._id] = socket.decoded;
        const room = await RoomController.findRoomByUserId(socket.decoded._id);
        socket.on("disconnect", function() {
          delete self.connectedUsers[socket.decoded._id];
        });
        console.log("room", room);
        if (room !== "undefined" && room) {
          // console.log(room);
          // console.log(room);
          self.joinRoom(socket, room._id);
          // console.log(room)
          socket.to(`ROOM:${room._id}`).broadcast.emit("message", {
            type: "USER_JOINED",
            data: room
          });
          self.sendMessage(socket, {
            type: "ROOM_JOINED",
            data: room
          });
          // self.sendMessage(socket, {
          //     type: 'GAME_STARTED',
          //
          // })
        }

        // self.newUserConnected(socket.decoded._id);
        self.joinUserToRoomAccorddingToId(socket, socket.decoded._id);
        socket.on("message", async data => {
          console.log("Sending rooms", data);
          self.socketReceivedData(socket, data, function(data) {
            self.sendMessage(socket, {
              data: data.message,
              type: "ERROR_RECEIVED"
            });
          });
        });
      });
  }

  async socketReceivedData(socket, data, cb) {
    switch (data.type) {
      case "DASHBOARD_JOIN":
        const rooms = await RoomController.sendRooms();
        const categories = await Category.getCategories();
        await new Promise(resolve => setTimeout(resolve, 2000));
        this.sendMessage(socket, {
          type: "ROOMS_RECEIVED",
          data: { rooms, categories }
        });
        break;
      case "NEW_ROOM_CREATED":
        try {
          const obj = await RoomController.createRoom(
            data.data,
            await User.getUserById(socket.decoded._id)
          );
          if (obj instanceof Error) {
            return cb(obj);
          }
          this.broadcastMessage(socket, { type: "ROOM_ADDED", data: obj });
          this.sendMessage(socket, { type: "ROOM_JOINED", data: obj });
          // socket.join(obj._id);
          this.joinRoom(socket, obj._id);
        } catch (e) {}
        break;
      case "GET_ROOM":
        const res = await RoomController.getRoomById(
          data.data,
          socket.decoded._id
        );
        if (res instanceof Error)
          return this.sendMessage(socket, { type: "GAME_FINISHED", data: {} });
        this.sendMessage(socket, { type: "ROOM_JOINED", data: await res });
        // socket.join(res._id);
        this.joinRoom(socket, res._id);

        break;
      case "JOIN_ROOM":
        console.log("JOIN_ROOM");
        let user = await User.getUserById(data.data.userId);
        const password = data.data.password || null;
        const response = await RoomController.joinRoom(
          data.data.roomId,
          user,
          password
        );
        if ((await response) instanceof Error) return cb(response);
        this.joinRoom(socket, data.data.roomId);
        this.sendMessage(socket, { type: "ROOM_JOINED", data: response });
        socket.broadcast.to(`ROOM:${data.data.roomId}`).emit("message", {
          type: "USER_JOINED",
          data: response
        });
        sendRooms = await RoomController.sendRooms();
        // sendCategories = await Category.getCategories();
        this.broadcastMessage(socket, {
          type: "ROOM_UPDATED",
          data: sendRooms
        });
        break;
      case "LEAVE_ROOM":
        const self = this;
        const room = await Room.leaveRoom({
          userId: data.data.userId,
          roomId: data.data.roomId
        });
        if (room) {
          this.io.sockets.to(`ROOM:${data.data.roomId}`).emit("message", {
            type: "USER_LEFT",
            data: room
          });
          let users = this.io.sockets.adapter.rooms[`USER:${data.data.userId}`];
          for (let soc in users.sockets) {
            if (self.io.sockets.connected[soc])
              self.io.sockets.connected[soc].leave(`ROOM:${data.data.roomId}`);
          }
          this.io.sockets.to(`USER:${data.data.userId}`).emit("message", {
            type: "GAME_FINISHED",
            data: ""
          });
        }
        sendRooms = await RoomController.sendRooms();
        sendCategories = await Category.getCategories();
        this.broadcastMessage(socket, {
          type: "ROOMS_RECEIVED",
          data: { rooms: sendRooms, categories: sendCategories }
        });
        break;
      case "WATCH_GAME":
        this.joinRoom(socket, data.data.roomId);
        this.sendMessage(socket, {
          type: "GAME_STARTED"
        });
        this.games.get(data.data.roomId).addWatcher(socket.decoded._id);
        break;
      case "END_WATCH":
        this.sendMessage(socket, {
          type: "GAME_FINISHED"
        });
        this.games.get(data.data.roomId).removeWatcher(socket.decoded._id);
        break;
      case "END_GAME":
        const roomss = await RoomController.sendRooms();
        const categoriess = await Category.getCategories();
        this.io.sockets.to(`ROOM:${data.data.roomId}`).emit("message", {
          type: "ROOMS_RECEIVED",
          data: { rooms: roomss, categories: categoriess }
        });
        const roomResult = await Room.endGame({ roomId: data.data.roomId });

        if (roomResult instanceof Error) cb(roomResult);

        this.io.sockets.to(`ROOM:${data.data.roomId}`).emit("message", {
          type: "GAME_FINISHED",
          data: ""
        });
        let sockets = this.io.sockets.adapter.rooms[`ROOM:${data.data.roomId}`];
        for (let socket in sockets.sockets) {
          this.io.sockets.sockets[socket].leave(`ROOM:${data.data.roomId}`);
        }
        // sockets.forEach(socket => this.io.sockets.sockets[socket].leave(`ROOM:${data.data.roomId}`));
        sendRooms = await RoomController.sendRooms();
        sendCategories = await Category.getCategories();
        this.broadcastMessage(socket, {
          type: "ROOMS_RECEIVED",
          data: { rooms: sendRooms, categories: sendCategories }
        });
        break;
      case "MESSAGE_SENT":
        this.io.sockets.to(`ROOM:${data.data.roomId}`).emit("message", {
          type: "NEW_MESSAGE",
          data: { message: data.data.message, user: socket.decoded }
        });
        break;
      case "GAME_STARTED":
        let roomResponse = await Room.getRoom(data.data.roomId);
        let sss = this;
        roomResponse = await roomResponse.toJSON();
        const roomPoints = roomResponse.points;
        const users = roomResponse.players.map(item => {
          return item.user;
        });
        if (roomResponse.status !== "running") {
          this.games.set(data.data.roomId, new Game(data.data.roomId));
          console.log(roomResponse);
          this.games
            .get(data.data.roomId)
            .build(
              roomResponse.difficulty,
              roomResponse.categories,
              users,
              roomPoints,
              roomResponse.maxPlayers,
              function(res) {
                sss.games.get(data.data.roomId).play(sss.io);
                sss.io.sockets.to(`ROOM:${data.data.roomId}`).emit("message", {
                  type: "GAME_STARTED",
                  data: {}
                });
              }
            );
        } else {
          this.broadcastMessage(socket, {
            type: "ROOM_JOINED",
            data: roomResponse
          });
        }
        this.io.sockets.to(`ROOM:${data.data.roomId}`).emit("message", {
          type: "UPDATE_POINTS",
          data: {
            points: -roomResponse.points
          }
        });
        break;
      case "ONLINE_USERS":
        let x = Object.assign({}, this.connectedUsers);
        delete x[socket.decoded._id];
        this.sendMessage(socket, {
          type: "ONLINE_USERS",
          data: x
        });
        break;
      case "PAYMENT":
        console.log("PAYMENT REVIVED");
        const updatedUser = await User.updatePoints(socket.decoded._id, 100);
        this.io.to(`USER:${socket.decoded._id}`).emit("message", {
          type: "UPDATE_POINTS",
          data: { points: 100 }
        });
        break;
      case "INVITE_USERS":
        const userss = data.data.users;
        const roomm = await Room.findById(data.data.roomId);
        pr(roomm);
        for (let i = 0; i < userss.length; i++) {
          this.io.sockets.to(`USER:${userss[i]}`).emit("message", {
            type: "INVITE_USER",
            data: {
              user: socket.decoded.name,
              userId: socket.decoded._id,
              roomId: roomm._id,
              roomName: roomm.name,
              private: roomm.private
            }
          });
        }
        break;
      // case 'GET_QUESTION':
      //     console.log('GET_QUESTION')
      //     const obj = await this.games.get(data.data.roomId).getQuestion();
      //     console.log('core mongoose', this.games.get(data.data.roomId).users);
      //     this.io.sockets.to(`ROOM:${data.data.roomId}`).emit('message', obj)
      //     this.rooms[data.data.roomId] = 25;
      //     let r = this;
      //     setTimeout(() => {
      //         console.log('SENT');
      //             r.io.sockets.to(`ROOM:${data.data.roomId}`).emit('message', {
      //                 type: 'GET_ANSWER',
      //                 data: {}
      //             })
      //     }, 25000);
      //     break;
      // case 'CORRECT_ANSWER':
      //     const answer = this.games.get(data.data.roomId).getCorrectAnswer();
      //     this.io.sockets.to(`ROOM:${data.data.roomId}`).emit('message', answer)
      //     break;

      case "SET_ANSWER":
        let result = data.data;
        console.log(result);
        result.userId = socket.decoded._id;
        this.games.get(data.data.roomId).setAnswer(result);
        const watcher = this.games.get(data.data.roomId).watchers;
        watcher.forEach(e => {
          this.sendToUser(e, {
            type: "USER_ANSWERED",
            data: {
              answers: data.data.answer,
              userId: data.data.userId
            }
          });
        });
        break;
    }
  }

  sendMessage(socket, message) {
    socket.emit("message", message);
  }

  broadcastMessage(socket, message) {
    socket.broadcast.emit("message", message);
  }

  sendToAllUsers(data) {
    this.io.sockets.emit("message", data);
  }

  joinRoom(socket, roomId) {
    socket.join(`ROOM:${roomId}`);
  }

  joinUserToRoomAccorddingToId(socket, userId) {
    socket.join(`USER:${userId}`);
  }

  sendToUser(id, data) {
    this.io.sockets.to(`USER:${id}`).emit("message", data);
  }
}

export default new Socket();
