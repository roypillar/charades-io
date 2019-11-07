import React, { Component } from 'react'
import Team from './Team'

export class Teams extends Component {

    render() {
        const players1 = this.props.teams.team1;
        const players2 = this.props.teams.team2;
        return (
            <div style={this.teamsStyle}>
                <Team teamNumber='1' players={players1} onJoinTeam={this.props.onJoinTeam}/>
                <Team teamNumber='2' players={players2} onJoinTeam={this.props.onJoinTeam} />
            </div>
        )
    }


    teamsStyle = {
        display : 'block',
        overflow: 'hidden'
    }
}

export default Teams
