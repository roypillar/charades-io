import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import FormFields from './formfields';

class JoinGame extends Component {
    state = {
        redirect:false,
        formData: {
            accessCode: {
                element: 'input',
                value: '',
                label: 'true',
                labelText: 'Access code',
                validation: {
                    required:true,
                    maxLength:14
                },
                valid: false,
                touched: false,
                validationMessage: '',
                config: {
                    name: 'access_code_input',
                    type: 'text',
                    placeholder: 'Access code'
                }
            },

            userName: {
                element: 'input',
                value: '',
                label: 'true',
                labelText: 'User name',
                validation: {
                    required:true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                config: {
                    name: 'user_name_input',
                    type: 'text',
                    placeholder: 'Your name'
                }
            }
        }
    };

    submitForm = (e) => {
        e.preventDefault();
        let dataToSubmit = {};

        for(let key in this.state.formData){
            if(!this.state.formData[key].valid)
                return;
            dataToSubmit[key] = this.state.formData[key].value;
        }

        const username = dataToSubmit.userName;
        const roomId = dataToSubmit.accessCode;


        this.setState((state) => {
            return {redirect: true,
                    username,
                    roomId};
        });
    
    }

    // changeHandler = (e) => {
    //     switch (e.target.id) {
    //         case "game_name":
    //             break;
    //         case "user_name":
    //             break;
    //         default:
    //             break;
    //     }
    //     return;
    // }

    updateForm = (newState) => {
        this.setState({formData: newState});
    }

    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to={{
            pathname : `/${this.state.roomId}`,
            state: {
                userName: this.state.username,
                roomId: this.state.roomId,
                // cameFrom: this.props.location.state.title.split(' ')[0].toLowerCase()//i.e "join" or "create"
                cameFrom: 'join'
            }}} />
        }
      }

      renderError() {
        if (!this.props.location || !this.props.location.state.error) 
            return null;
        const error = this.props.location.state.error;
        if (error !== '') {
            console.log('rendering error');
            this.props.location.state.error = ''
            return <div className='cheekyError'>{error}</div>
        }
        return null;
    }


    render() {
        return (
            <div>
                {this.renderRedirect()}
                {this.renderError()}
                <h3>
                    {this.props.title}
                </h3>
                <form onSubmit={this.submitForm}>
                    <FormFields
                        formData={this.state.formData}
                        change={(newState) => this.updateForm(newState)}
                        />
                        {/* // blur={(newState) => this.updateForm(newState)}/> */}
                    <button type="submit">Join Game</button>
                </form>

            </div>
        );
    }
}

export default JoinGame;