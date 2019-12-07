

class Room{
    constructor(roomId){
        this.roomId = roomId;
        this.cardPool = new Set();
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

    addCard(note){
        this.cardPool.add(note);
        return this.cardPool.size;
    }

    drawCard(){
        let rand = Math.floor(Math.random() *  this.cardPool.size + 1);
        const cards = this.cardPool;
        console.log("rand: " + rand);
        console.log('cards amount: ' + this.cardPool.size);
        const cardIt = this.cardPool.values();
        let card = '';

        if(cards.size > 0){
            while(rand > 0){
                card = cardIt.next();
                rand--;
            }

            this.cardPool.delete(card.value);
            return card.value;
        }

        else{
            return null;
        }
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