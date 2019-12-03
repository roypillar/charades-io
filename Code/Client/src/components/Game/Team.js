import React, { Component } from 'react';


export class Team extends Component {
    

    renderPlayers() {
        const players = this.props.players;
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
                <h2 style={{marginBottom: 0}}>Team {this.props.teamNumber}</h2>
                <button onClick={() => this.props.onJoinTeam(this.props.teamNumber)}>Join team</button>
                
                    {this.renderPlayers()}
                
            </div>
        )
    }

    teamStyle = {
        margin: '1rem 1rem 0 1rem',
        float: 'left' 
    }
}

export default Team;
