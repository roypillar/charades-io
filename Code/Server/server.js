const Room = require('./Room.js');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const port = process.env.PORT || 5000;
const shortid = require('shortid');


  
connections = [];
rooms = new Map();


//TODO check this
const checkAvailableUsername = (roomId, userName) => {
    rooms[roomId].forEach(socket => {
        if (socket.userName === userName)
            return false;
    });
    return true;
}

io.sockets.on('connection', onConnect)

function onConnect(socket) {
    connections.push(socket);
    console.log(`new connection: ${connections.length} connections`);

    // Create room request
    // TODO  userName == null => guy came via url
    socket.on('create_room', function (userName, gameName) {
        socket.userName = userName;
        socket.gameName = gameName;

        // create unique room id
        const roomId = shortid.generate();
        socket.roomId = roomId;
        //join the room so the server can broadcast to all the room's participants
        socket.join(roomId);
        rooms.set(roomId, new Room(roomId));

        socket.emit('room_created', socket.roomId);
    });

    socket.on('join_room', function (userName, roomId) {

        if (!checkAvailableUsername(roomId, userName)) {
            console.log("USERNAME: " + userName);
            socket.emit('some_error', 'A user with the same username already exists in this room.');
            return;
        }

        socket.userName = userName;
        socket.roomId = roomId;

        //check room availability
        if (rooms.has(roomId)) {
            socket.emit('some_error', 'There is no such room.');
            console.log(`${userName} tried to join non existant room ${roomId}, emitting error`);
            return;
        }

        socket.join(roomId);

        console.log(`user ${userName} has joined game: ${gameName}. roomId: ${roomId}`);
    })


    socket.on('join_team', (teamNum) => {
        const teamKey = 'team' + teamNum;
        let room = rooms.get(socket.roomId);
        room.joinTeam(socket.userName,teamKey);

        // broadcast to all the clients in the room of the change 
        io.to(socket.roomId).emit('player_joined_team', room.getAllPlayers());
    });

    //todo : prevent creation of same name rooms, same users

    socket.on('disconnect', function (data) {

        console.log(`user ${socket.userName} disconnected`);
        //TODO: why though?:

        rooms.delete(socket.roomId);
        socket.userName = null;
        socket.roomId = null;
        socket.gameName = null;

        connections.splice(connections.indexOf(socket), 1);
        console.log(`disconnection: ${connections.length} connections`);
    })

    socket.on('new_note', function (note) {
        let noteNum = rooms.get(socket.roomId).addNote(note);
        console.log("noteNUm " + noteNum);
    })
};



server.listen(port);
console.log("server running");