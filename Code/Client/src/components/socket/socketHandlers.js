

export function setupSocketHandlers(component) {

    const {socket, cameFrom, userName, gameName, roomId} = component.state;
    
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

    socket.on('players_update', (data) => {
        component.setState({teams: data});
    });

    socket.on('game_started', () =>{
        component.setState({started: true});
    });

    socket.on('timer_start', () => {
        component.setState({startTimer: true})
    });
}

