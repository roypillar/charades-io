const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const port = process.env.PORT || 5000;
const shortid = require('shortid');
  
connections = [];
roomConnections = new Map();
mockData = {
    team1: [],
    team2: []
};


//TODO check this
const checkAvailableUsername = (roomId, userName) => {
    roomConnections[roomId].forEach(socket => {
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
        roomConnections[roomId] = new Set([socket]);

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
        if (!roomConnections[roomId]) {
            socket.emit('some_error', 'There is no such room.');
            console.log(`${userName} tried to join non existant room ${roomId}, emitting error`);
            return;
        }

        socket.join(roomId);
        roomConnections[roomId].add(socket);

        console.log(`user ${userName} has joined game: ${gameName}. roomId: ${roomId}`);
    })


    socket.on('join_team', (teamNum) => {
        const teamKey = 'team' + teamNum;

        mockData[teamKey].push(socket.userName);
        
        // broadcast to all the clients in the room of the change 
        io.to(socket.roomId).emit('player_joined_team', mockData);
        
    });

    //todo : prevent creation of same name rooms, same users

    socket.on('disconnect', function (data) {

        console.log(`user ${socket.userName} disconnected`);
        //TODO: why though?:

        roomConnections[socket.roomId].delete(socket);
        socket.userName = null;
        socket.roomId = null;
        socket.gameName = null;

        connections.splice(connections.indexOf(socket), 1);
        console.log(`disconnection: ${connections.length} connections`);
    })
};



server.listen(port);
console.log("server running");