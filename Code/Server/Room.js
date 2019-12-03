class Room{
    constructor(roomId){
        this.roomId = roomId;
        this.notePool = [];
        this.roundNumber = 0;
        //maybe in the future create a Team class to enable games with more than 2 teams
        this.teams = {
            team1: {
                players: [],
                score: 0,
                roundScore: 0,
                isPlaying: true,
                nextPlayerUp: false,
            },
            team2: {
                players: [],
                score: 0,
                roundScore: 0,
                isPlaying: true,
                nextPlayerUp: false,
            }
        };
        
    }

    gameStart(){
        
    }

    isAvailableName(userName){
        for(let team in this.teams){
            if(this.teams[team].players.includes(userName)){
                return false;
            }
        }

        return true;
    }

    getAllPlayers(){
        return {team1: this.teams.team1.players, team2: this.teams.team2.players}
    }

    addNote(note){
        this.notePool.push(note);
        return this.notePool.length;
    }

    joinTeam(userName, teamString){
        for(let team in this.teams){
            const index = this.teams[team].players.indexOf(userName);
            if (index > -1) {
                this.teams[team].players.splice(index, 1);
            } 
        }
        this.teams[teamString].players.push(userName);
    }

    

}

module.exports = Room;