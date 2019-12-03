const React = require('react')

export class Timer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      time: 60,
      isOn: this.props.timerStarted,
      start: 0
    }

    this.startTimer = this.startTimer.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
    this.resetTimer = this.resetTimer.bind(this)

  }

  startTimer() {
    this.setState({
      isOn: true,
      //time: this.state.time,
      //start: Date.now() - this.state.time
    })
    
    this.timer = setInterval(() => {
        this.setState({
            time: this.state.time - 1
        })

        if(this.state.time === 0){
            this.stopTimer();
        }

    }, 1000);
  }

  stopTimer() {
    this.setState({isOn: false})
    clearInterval(this.timer)
  }

  resetTimer() {
    this.setState({time: 60, isOn: false})
  }

  render() {
    // let start = (!this.state.isOn) ?
    //   <button onClick={this.startTimer}>start</button> :
    //   null

    // let stop = (this.state.time === 0 || !this.state.isOn) ?
    //   null :
    //   <button onClick={this.stopTimer}>stop</button>

    // let resume = (this.state.time === 0 || this.state.isOn) ?
    //   null :
    //   <button onClick={this.startTimer}>resume</button>

    // let reset = (this.state.time === 0 || this.state.isOn) ?
    //   null :
    //   <button onClick={this.resetTimer}>reset</button>
    
   
    //this can't be right, find another way to start the timer 
    if(this.props.startTimer && !this.state.isOn){
        this.startTimer();
    }

    return(
      <div>
        <h3>timer: {this.state.time}</h3>
        {/* {start}
        {resume}
        {stop}
        {reset} */}
      </div>
    )
  }
}

export default Timer;