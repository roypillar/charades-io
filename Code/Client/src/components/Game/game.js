import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Teams from './Teams.js'
import Timer from './Timer.js'
import { SOCKET_IO_SERVER_URL } from '../../remote/addresses';
import io from "socket.io-client";
import { setupSocketHandlers } from "../socket/socketHandlers.js";

class Game extends Component {

    constructor(props) {
        super(props);
        
        const socket = io(SOCKET_IO_SERVER_URL);
        
        this.handleNoteChange = this.handleNoteChange.bind(this)
        this.onJoinTeam = this.onJoinTeam.bind(this)
        this.submitNote = this.submitNote.bind(this)
        this.startGame = this.startGame.bind(this)
        this.draw = this.draw.bind(this)

        if (this.props.location.state){ //if we have been redirected (normal control flow)
            this.state = {
                socket: socket,
                roomId: this.props.match.params.id,
                userName: this.props.location.state.userName,
                gameName: this.props.location.state.gameName,
                started: false,
                startTimer: false,
                team: false,
                teams: {
                    team1: [],
                    team2: []
                },
                card: '',
                redirect: false,
                cameFrom: this.props.location.state.cameFrom,
                error: null
            }

            
        }

        else //otherwise, we will be redirected back to home screen.
            this.state = {
                redirect: true,
                error: 'you haven\'t been assigned a username yet.'
            };
    }

    setRoomId = (roomId) => {
        this.setState({roomId: roomId});
        console.log("setRoomId was called, room id: " + this.state.roomId);
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
        
        setupSocketHandlers(this);
    }

    onJoinTeam(teamNumber) {
        //notify server
        this.state.socket.emit('join_team',teamNumber);
    }

    handleNoteChange(e){
        e.preventDefault();
        this.setState({card: e.target.value});
    }

    submitNote(e){
        e.preventDefault();
        const card = this.state.card;
        this.state.socket.emit('new_card', card);
        
        //clear input field
        this.setState({card: ''});
    }

    startGame(e){
        e.preventDefault();
        this.setState({started: true});
        this.state.socket.emit('start_game');
    }
    
    draw(e){
        e.preventDefault();
        this.state.socket.emit('draw', (newCard) => {
            this.setState({card: newCard});
        });
    }

    renderGame() {
        if(!this.state.started){
            return (
                <div>
                    <Teams  teams={this.state.teams} onJoinTeam={this.onJoinTeam.bind(this)} />

                    <form onSubmit={this.submitNote.bind(this)}>
                        <input name="card" value={this.state.card} placeholder="new card" onChange={this.handleNoteChange}/>
                        <button type="submit">Submit</button>
                    </form>
                    <button type="button" onClick={this.startGame}>Start</button> 
                </div>
            )
        }

        else{
            //this should only render to the current mimer
            return (
                <div>
                    <h1>game phase</h1>
                    <Timer startTimer={this.state.startTimer}></Timer>
                    <h2>Mime this:</h2>
                    <h2>{this.state.card}</h2>
                    <button type="button" onClick={this.draw}>Draw</button>
                </div>
            )

            //TODO: render differently for teamates, opposite team
            
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