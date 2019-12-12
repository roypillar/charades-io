const React = require('react')

export class Timer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      time: 60,
      isOn: false,
      start: 0,
      mimer: false
    }

    this.startTimer = this.startTimer.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
    this.resetTimer = this.resetTimer.bind(this)

  }

  startTimer() {
    this.setState({isOn: true})
    
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
    console.log('STOP TIMER')
    clearInterval(this.timer)
  }

  resetTimer() {
    this.setState({time: 60, isOn: false})
  }

  componentDidUpdate(prevProps){

    if(this.props.startTimer !== prevProps.startTimer){
      this.startTimer();
    }
  }

  render() {

    // let stop = (this.state.time === 0 || !this.state.isOn) ?
    //   null :
    //   <button onClick={this.stopTimer}>stop</button>

    // let resume = (this.state.time === 0 || this.state.isOn) ?
    //   null :
    //   <button onClick={this.startTimer}>resume</button>

    // let reset = (this.state.time === 0 || this.state.isOn) ?
    //   null :
    //   <button onClick={this.resetTimer}>reset</button>
    
    //TODO: this is bad, when timer reaches zero, startTimer() is called again
    //this can't be right, find another way to start the timer 

    return(
      <div>
        <h3>timer: {this.state.time}</h3>
      </div>
    )
  }
}

export default Timer;