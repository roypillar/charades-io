import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import Teams from './Teams'
import {SOCKET_IO_SERVER_URL} from '../../remote/addresses';
import io from "socket.io-client";

class Game extends Component {

    constructor(props) {
        super(props);
        console.log(this.props);
        if (this.props.location.state) //if we have been redirected (normal control flow)
            this.state = {
                socket: null,
                roomId: this.props.match.params.id,
                userName: this.props.location.state.userName,
                gameName: this.props.location.state.gameName,
                teams: {
                    team1: ['shoshi'],
                    team2: ['gigi']
                },
                redirect: false,
                cameFrom: this.props.location.state.cameFrom,
                error: null
            }
        else //otherwise, we will be redirected back to home screen.
            this.state = {
                redirect: true,
                error: 'you haven\'t been assigned a username yet.'
            };
        
            
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

    setRoomId = (roomId) => {
        this.setState({roomId: roomId});
        console.log("setRoomId was called, room id: " + this.state.roomId);
    }

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

        const userName = this.state.userName;
        let roomId = this.state.roomId;
        const cameFrom = this.state.cameFrom;
        const gameName = this.state.gameName;

        const socket = io(SOCKET_IO_SERVER_URL);
        this.setState({socket: socket});
        

        socket.on('connect', function () {
            console.log('camefrom',cameFrom);
            
            if(cameFrom === 'create'){
                socket.emit('create_room', userName, gameName);
            }
            else if(cameFrom === 'join'){
                socket.emit('join_room', userName, roomId);
            }
        });

        //update the access code to the the one provided by server
        //might change in the future when we want to encrypt or hash
        socket.on('room_created', this.setRoomId);

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

        socket.on('player_joined_team', (data) => {
            console.log('data from server : ',data);
            this.setState({teams: data})
        })

        
    }


    onJoinTeam(teamNumber) {
        //notify server
        this.state.socket.emit('join_team',this.state.userName,teamNumber);
        //listen to server saying 'added this guy' and then 

        //this.state.socket.emit('join_team',this.state.userName, this.state.roomId);
    }

    render() {
        return (
            <div>
                {this.renderRedirect()}
                <h1>{this.state.gameName}</h1>
                <h3>Access code: {this.state.roomId}</h3>
                <Teams  onJoinTeam={this.onJoinTeam.bind(this)} teams={this.state.teams}/>
            </div>
        );
    }
}

export default Game;