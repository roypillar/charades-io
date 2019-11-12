

export function setUpSocketHandlers(component) {

    const {socket, cameFrom, userName, gameName, roomId} = component.state;
    console.log(component.state);
    
    socket.on('connect', function () {
        console.log('camefrom',cameFrom);
        
        if(cameFrom === 'create'){
            socket.emit('create_room', userName, gameName);
        }
        else if(cameFrom === 'join'){
            socket.emit('join_room', userName, roomId);
        }
    });

    socket.on('room_created', component.setRoomId);

    socket.on('some_error', (error) => {
        console.log('got error',error);
        component.setState({
            error,
            redirect:true
        })
    })

    socket.on('get_message', function (data) {
        console.log('Incoming message:', data);
    });

    socket.on('player_joined_team', (data) => {
        console.log('data from server : ',data);
        component.setState({teams: data})
    });
}

