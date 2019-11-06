import React from 'react';

import Welcome from './welcome';


const Home = (props) => {

    let error='';

    if(props.location.state && props.location.state.error)
        error = props.location.state.error;
    
    return ( 
        <div>
            <Welcome error={error}/>
        </div>
     );
}

 
export default Home;