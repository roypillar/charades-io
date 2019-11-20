import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Teams from './Teams'
import { SOCKET_IO_SERVER_URL } from '../../remote/addresses';
import io from "socket.io-client";
import { setUpSocketHandlers } from "../../io/io.js";
import FormFields from '../Home/formfields';

class Game extends Component {

    constructor(props) {
        super(props);
        
        const socket = io(SOCKET_IO_SERVER_URL);
        
        if (this.props.location.state) //if we have been redirected (normal control flow)
            this.state = {
                socket: socket,
                roomId: this.props.match.params.id,
                userName: this.props.location.state.userName,
                gameName: this.props.location.state.gameName,
                started: false,
                teams: {
                    team1: [],
                    team2: []
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
        
        setUpSocketHandlers(this);
    }


    onJoinTeam(teamNumber) {
        //notify server
        this.state.socket.emit('join_team',teamNumber);
    }

    
    submitNote(e){
        e.preventDefault();
        console.log(e);

    }

    renderGame() {
        if(!this.state.started){
            return (
                <div>
                    <Teams  onJoinTeam={this.onJoinTeam.bind(this)} teams={this.state.teams}/>
                    <form onSubmit={this.submitNote}>
                        <input name="noteInput" placeholder="new note"></input>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            )
        }
        else{
            //TODO render game phase
        }
    }

    render() {
        return (
            <div>
                {this.renderRedirect()}
                <h1>{this.state.gameName}</h1>
                <h3>Access code: {this.state.roomId}</h3>
                {this.renderGame()}
            </div>
        );
    }
}

export default Game;