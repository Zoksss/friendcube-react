const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const path = require("path");

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
});




app.use(express.static(path.join(__dirname, "/build")));

app.get("*", (req, res) => res.sendFile(path.join(__dirname, "/build/index.html")));

class Room {
    constructor(socket, leader, puzzle) {
        this.leader = leader;
        this.puzzle = puzzle;
        this.isLocked = false;
        this.round = 1;
        this.sockets = [{ socketId: leader, isFinished: true, socketNickname: socket.nickname, isFinished: true, pb: 9999999999, playerAo5: -1, playerAo5: -1, playerAvg: -1, isPb: false, isAvg: false }];
        this.timesArray = [{ round: 1, playerName: "", playerTime: -1 }];
    }
    addSocket(socket) {
        this.sockets.push({ socketId: socket.id, socketNickname: socket.nickname, isFinished: true, pb: 9999999999, playerAo5: -1, playerAo5: -1, playerAvg: -1, isPb: false, isAvg: false });    //// add best time, ao5, ao12 and avg of all
    }
    removeSocket(socket, roomCode) {
        console.log("fireed")
        let socketObj = this.sockets.find(o => o.socketId === socket.id);
        this.sockets.splice(this.sockets.indexOf(socketObj), 1);
        if (!this.isLocked && socketObj.socketId.toString() === this.leader) {
            io.in(roomCode).emit("leaderLeft");
            console.log("fired")
        }
        socketObj = null;
    }
}


let online = 0;
let rooms = {};


io.on("connection", (socket) => {
    console.log("Made socket connection with id: " + socket.id);
    online++;
    io.sockets.emit('onlineClientChange', online);
    socket.on("join", (nickname, roomCode, puzzle) => {
        console.log("rumoko: " + roomCode)
        if (validateInput(nickname, roomCode, puzzle)) {
            if (doesUsernameAlrdeyExists(nickname, roomCode)) {
                socket.emit("serverError", "Nickname alredy used in this room.");
                return;
            }
            if (rooms[roomCode] != undefined) {
                if (!rooms[roomCode].isLocked) {
                    socket.nickname = nickname;
                    rooms[roomCode].addSocket(socket);
                    socket.join(roomCode);
                    socket.emit("joinToTimer");
                    io.in(roomCode).emit("joinedLeavedNotification", { nickname: nickname, joined: true });
                    socket.emit("leaderStartButton");
                    updateWaitingScreenStatus(roomCode);

                }
                else socket.emit("serverError", "Room Closed");
            }
            else {
                socket.nickname = nickname;
                rooms[roomCode] = new Room(socket, socket.id, puzzle);
                socket.join(roomCode);
                socket.emit("joinToTimerLeader", roomCode);
                io.in(roomCode).emit("joinedLeavedNotification", { nickname: nickname, joined: true });
                updateWaitingScreenStatus(roomCode);
            }
            console.log(rooms);
        } else socket.emit("serverError", "Input not valid");
    });

    socket.on("leaderStartGamee", (roomCode) => {
        // start game
        if (!rooms[roomCode]) return;
        if (!rooms[roomCode].sockets.filter(o => o.leader === socket.id));

        rooms[roomCode].isLocked = true;
        for (let i = 0; i < rooms[roomCode].sockets.length; i++)
            rooms[roomCode].sockets[i].isFinished = false;

        io.in(roomCode).emit("setScramble", generateScramble(rooms[roomCode].puzzle));
        io.in(roomCode).emit("startGame", rooms[roomCode].puzzle);
        let x = [];
        rooms[roomCode].sockets.forEach(socket => {
            let socketNickname = io.sockets.sockets.get(socket.socketId).nickname;
            x.push(socketNickname);
        });

        io.in(roomCode).emit("updatePlayerNicknnameArray", x);
    });

    socket.on("finalTime", (data) => {
        if (!rooms[data.roomCode]) return;
        let socketObjectInRoom = rooms[data.roomCode].sockets.find(o => o.socketId === socket.id);
        if (!socketObjectInRoom) return;

        let time = data.playerTime;
        if (data.finishedStatus === "plus2") time += 2000;

        rooms[data.roomCode].timesArray = [
            ...rooms[data.roomCode].timesArray.slice(0, 1),
            {
                round: rooms[data.roomCode].round,
                ao5: data.ao5,
                ao12: data.ao12,
                playerName: socket.nickname,
                playerTime: time,
                finishedStatus: data.finishedStatus
            },
            ...rooms[data.roomCode].timesArray.slice(1)
        ];

        socketObjectInRoom.playerAo5 = data.ao5;
        socketObjectInRoom.playerAo12 = data.ao12;
        console.log(socketObjectInRoom.playerAvg)
        socketObjectInRoom.playerAvg = Number(socketObjectInRoom.playerAvg) + data.playerTime;
        socketObjectInRoom.pb = (socketObjectInRoom.pb <= data.playerTime) ? socketObjectInRoom.pb : data.playerTime;

        console.log(socketObjectInRoom);
        io.in(data.roomCode).emit("timeGetFromSocket", rooms[data.roomCode].timesArray);
        socketObjectInRoom.isFinished = true;

        if (!isEveryoneFinished(data.roomCode)) return;
        rooms[data.roomCode].round++;
        io.in(data.roomCode).emit("ready", rooms[data.roomCode].round);
        for (let i = 0; i < rooms[data.roomCode].sockets.length; i++)
            rooms[data.roomCode].sockets[i].isFinished = false;

        rooms[data.roomCode].timesArray.unshift({ round: rooms[data.roomCode].round, playerName: "", playerTime: -1 });
        io.in(data.roomCode).emit("setScramble", generateScramble(rooms[data.roomCode].puzzle));

    });

    socket.on("roomclosed-data", (roomCode) => {
        socket.emit("roomclosed-data-send", rooms[roomCode]);
        socketDisconnect(socket);
    });

    socket.on("leaveRoom", () => {
        socketDisconnect(socket);
    })
    socket.on('disconnecting', () => {
        socketDisconnect(socket)
    });
    socket.on('disconnect', () => {
        online--;
        io.sockets.emit('onlineClientChange', online);
    })
});


// functions

const socketDisconnect = (socket) => {
    console.log("socket disconnecting")
    let roomNames = Array.from(socket.rooms);
    console.log(roomNames);
    for (let i = 1; i < roomNames.length; i++) {
        console.log("Roomname = " + String(roomNames[i]));
        if (String(roomNames[i]) != socket.id) {
            io.in(String(roomNames[i])).emit("joinedLeavedNotification", { nickname: socket.nickname, joined: false });
            rooms[String(roomNames[i])].removeSocket(socket, String(roomNames[i]));
            checkIfRoomIsEmpty(String(roomNames[i]));
            updateWaitingScreenStatus(String(roomNames[i]));
            console.log(rooms);
            socket.leave(String(roomNames[i]));
            return;
        };
    }
}

const checkIfRoomIsEmpty = (roomCode) => {
    if (rooms[roomCode].sockets.length != 0) return;
    delete rooms[roomCode];
}

const updateWaitingScreenStatus = (roomCode) => {
    let msg = [];
    if (!rooms[roomCode]) return;
    rooms[roomCode].sockets.forEach(socket => {
        let socketNickname = io.sockets.sockets.get(socket.socketId).nickname;
        if (socketNickname)
            if (rooms[roomCode].leader === socket.socketId) msg.push([socketNickname]);
            else msg.push(socketNickname);
    });
    io.in(roomCode).emit("displayUsers", msg);
}

const validateInput = (nickname, roomCode, puzzle) => {
    if (nickname === "") return false; 
    if (!isLetter(nickname.charAt(0))) return false; 
    if (nickname.length < 3) return false; 
    if (roomCode.length != 8) return false; 
    for (let i = 0; i < roomCode.length; i++) if (isNaN(roomCode.charAt(i))) return false; 
    if (puzzle != "3x3" && puzzle != "2x2" && puzzle != "pyraminx") return false; 
    return true;
}
function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
}
function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
}

const isEveryoneFinished = (roomCode) => {
    let temp = true;
    for (let i = 0; i < rooms[roomCode].sockets.length; i++) {
        if (rooms[roomCode].sockets[i].isFinished === false) {
            temp = false;
            break;
        }
    }
    return temp;
}

const generateScramble = (puzzle) => {
    if (puzzle === "3x3") {
        let scrambele = "";
        for (a = y = r = '', x = Math.random; a++ < 22; scrambele += (r + " '2"[0 | x(y = r) * 3] + ' '))
            for (; r == y; r = 'RLUDFB'[0 | x() * 6]);
        return scrambele;
    }
    else if (puzzle === "2x2") {
        let scrambele = "";
        for (a = y = r = '', x = Math.random; a++ < 10; scrambele += (r + " '2"[0 | x(y = r) * 3] + ' '))
            for (; r == y; r = 'RUF'[0 | x() * 3]);
        return scrambele;
    }
    else if (puzzle === "pyraminx") {
        let scrambele = "";
        for (a = y = r = '', x = Math.random; a++ < 9; scrambele += (r + " '"[0 | x(y = r) * 2] + ' '))
            for (; r == y; r = 'BRUL'[0 | x() * 4]);
        for (let i = 0; i < 4; i++) {
            let l = Math.floor(Math.random() * 2);
            scrambele += (l == 1 ? 'brul'[i] + " '"[0 | Math.floor(Math.random() * 2)] : "");
        }
        return scrambele;
    }
}

const doesUsernameAlrdeyExists = (nickname, roomCode) => {
    let socketsInRoom = io.sockets.adapter.rooms[roomCode];
    if (socketsInRoom && socketsInRoom.sockets) {
        for (let clientId in socketsInRoom.sockets) {
            if (io.sockets.connected[clientId].nickname === nickname) {
                return true;
            }
        }
        return false;
    }
}


server.listen(4000, () => { console.log("listening on *:4000"); });