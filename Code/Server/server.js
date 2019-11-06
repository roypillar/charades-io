const express = require('express');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    console.log("received connection");
    res.send({"message": "hey chico"});
});

app.get('/:id', function(req, res) {

});
  
connections = [];
roomConnections = new Map(); 

//TODO check this
const checkAvailableUsername = (roomId, userName) => {
    roomConnections[roomId].forEach(socket => {
        if(socket.userName === userName)
            return true;
    });
    return false;
}

io.sockets.on('connection', function (socket) {
    connections.push(socket);
    console.log(`new connection: ${connections.length} connections`);


    // TODO  userName == null => guy came via url
    socket.on('create_room',function(userName, gameName){
        socket.userName = userName;
        socket.gameName = gameName;

        // if(roomConnections[roomId] !== null){
        //     socket.emit('error','A room with that name already exists'); 
        //     return;
        // }
        const roomId = Math.random().toString(36).substring(2, 15);
        socket.roomId = roomId;
        socket.join(roomId);//TODO: randomize here
        roomConnections[roomId]= new Set();
        roomConnections[roomId].add(socket);

        console.log(`user ${userName} has created and joined room ${roomId}`);

    });

    socket.on('join_room',function(userName, roomId){

        if(!checkAvailableUsername(roomId, userName))
        {
            socket.emit('some_error','A user with the same username already exists in this room.'); 
            return;
        }

        socket.userName = userName;
        socket.roomId = roomId;
        console.log(userName);
        console.log(roomId)
        if(!roomConnections[roomId]){
            socket.emit('some_error','There is no such room.'); 
            console.log(`${userName} tried to join non existant room ${roomId}, emitting error`);
            return;
        }       

        socket.join(roomId);
        roomConnections[roomId].add(socket);

        console.log(`user ${userName} has joined room ${roomId}`);
    })

    //todo : prevent creation of same name rooms, same users

    socket.on('disconnect', function (data) {
        
        console.log(`user ${socket.userName} disconnected`);
        //TODO: why though?:

        roomConnections[socket.roomId].delete(socket);
        socket.userName = null;
        socket.roomId = null;
        socket.gameName = null;
        


        connections.splice(connections.indexOf(socket),1);
        console.log(`disconnection: ${connections.length} connections`);
    })
});


server.listen(port);
console.log("server running");
