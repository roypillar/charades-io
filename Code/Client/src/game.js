import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

import {SOCKET_IO_SERVER_URL} from './remote/addresses';
import io from "socket.io-client";

class Game extends Component {

    constructor(props) {
        super(props);
        console.log(this.props);
        if (this.props.location.state) //if we have been redirected (normal control flow)
            this.state = {
                roomId: this.props.match.params.id,
                userName: this.props.location.state.userName,
                gameName: this.props.location.state.gameName,
                redirect: false,
                cameFrom: this.props.location.state.cameFrom,
                error: null
            }
        else //otherwise, we will be redirected back to home screen.
            this.state = {
                redirect: true,
                error: 'you haven\'t been assigned a username yet.'
            };
        
            console.log("rid"+this.state.roomId);
            
    }

    renderRedirect() {
        if (this.state.redirect) {
            return (<Redirect
                to={{
                pathname: '/',
                state: {
                    error: this.state.error
                }
            }}/>)
        }

        return null;
    }

    // renderError() {
    //     if (this.state.error === null) 
    //         return null;

    //     console.log('redirecting due to server error');
    //     return <div className='cheekyError'>{this.state.error}</div>
    // }

    componentWillUnmount() {
        if (!this.state.redirect){
            this.state.socket.disconnect();
            console.log(`${this.state.userName} has disconnected from room ${this.state.roomId}`);
        }
        else //pretty sure this is wrong: if we are kicking this guy out of here, he has no socket anyway
            console.log("game component unmounting");
    }

    componentDidMount() {
        if(this.state.redirect)
            return;

        console.log(this.props.match.params);
        

        const userName = this.state.userName;
        const roomId = this.state.roomId;
        const cameFrom = this.state.cameFrom;

        const socket = io(SOCKET_IO_SERVER_URL);
        this.setState({socket: socket});

        socket.on('connect', function () {
            console.log('camefrom',cameFrom);
            if(cameFrom === 'create'){
                socket.emit('create_room', userName, roomId);
                // console.log(`${username} has created and joined room ${roomId}`);
            }
            else if(cameFrom === 'join'){
                socket.emit('join_room', userName, roomId);
                // console.log(`${username} has joined room ${roomId}`);
            }
        });


        socket.on('some_error', (error) => {
            console.log('got error',error);
            this.setState({
                error,
                redirect:true
            })
        })

        socket.on('get_message', function (data) {
            console.log('Incoming message:', data);
        });
    }

    render() {
        return (
            <div>
                {this.renderRedirect()}
                <h1>{this.state.roomId}</h1>
                
            </div>
        );
    }
}

export default Game;