import React, { Component } from 'react';


export class Team extends Component {
    
    state = {
        teamNumber: this.props.teamNumber,
        players: this.props.players
    }
    


    componentDidUpdate(prevProps) {
        
        if (prevProps.players !== this.props.players) {
          this.setState({players: this.props.players});
        }
      }

    renderPlayers() {
        const players = this.state.players;
        if(players.len !== 0){
            return (
                <ul>
                    {players.map((player)=> (<li key={player}>{player}</li>))}
                </ul>
            );
        }
    }


    render() {
        return (
            <div style={this.teamStyle}>
                <h2 style={{marginBottom: 0}}>Team {this.state.teamNumber}</h2>
                <button onClick={this.props.onJoinTeam.bind(this,this.state.teamNumber)}>Join team</button>
                
                    {this.renderPlayers()}
                
            </div>
        )
    }

    teamStyle = {
        margin: '1rem 1rem 0 1rem',
        float: 'left' 
    }
}

export default Team
