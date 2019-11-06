import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import FormFields from './formfields';

class CreateGame extends Component {
    state = {
        redirect:false,
        formData: {
            gameName: {
                element: 'input',
                value: '',
                label: 'true',
                labelText: 'Game name',
                validation: {
                    required:true,
                    maxLength:14
                },
                valid: false,
                touched: false,
                validationMessage: '',
                config: {
                    name: 'game_name_input',
                    type: 'text',
                    placeholder: 'Game name'
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
        const gameName = dataToSubmit.gameName;


        this.setState((state) => {
            return {redirect: true,
                    username,
                    gameName};
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
                // cameFrom: this.props.location.state.title.split(' ')[0].toLowerCase()//i.e "join" or "create"
                cameFrom: 'create'
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
                    <button type="submit">Create Game</button>
                </form>

            </div>
        );
    }
}

export default CreateGame;