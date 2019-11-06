import React, {Component} from 'react';

import {Link} from 'react-router-dom';

class Welcome extends Component {

    constructor(props){
        super(props);
        this.state = { error:this.props.error }
    }

    //this is stupid:
    renderError() {
        if(!this.state.error)
            return null;


        //TODO: why?
        // if (!this.props.location) 
        //     return null;

        // const error = this.props.location.state.error;
        //TODO: short animation of error and then this.state.error = null
        const error = this.state.error;
        console.log('rendering error');
        // this.props.location.state.error = ''
        return <div className='cheekyError'>{error}</div>
    
}

    render() {
        return (
            <div>
                <h3>
                    charades ya'll
                </h3>
                {this.renderError()}
                <div style={{
                    "display": "flex"
                }}>
                    <Link
                        to={{
                        pathname: '/create-game',
                        state: {
                            title: 'Create Game'
                        }
                    }}>Create game</Link>

                    <Link
                        to={{
                        pathname: '/join-game',
                        state: {
                            title: 'Join Game'
                        }
                    }}>Join game</Link>

                </div>
            </div>
        );
    }
}

export default Welcome;