import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Input, Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import axios from 'axios'

import Auth from '../modules/Auth';

import styles from './styles.scss'

class Login extends Component {

    constructor(props, context) {
        super(props, context);

        const storedMessage = localStorage.getItem('successMessage');
        let successMessage = '';

        if(storedMessage) {
            successMessage = storedMessage;
            localStorage.removeItem('successMessage');
        }

        this.state = {
            successMessage,
            user: {
                password: '',
                email: ''
            },
        }

        this.processForm = this.processForm.bind(this);
        this.changeUser = this.changeUser.bind(this);
    }

    processForm(event) {
        event.preventDefault();

        const email = encodeURIComponent(this.state.user.email);
        const password = encodeURIComponent(this.state.user.password);
        const formData = `email=${email}&password=${password}`;

        const xhr = new XMLHttpRequest();
        xhr.open('post', '/auth/login');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if(xhr.status === 200) {
                message: 'Successfully signed up!';
                Auth.authenticateUser(xhr.response.token);
                this.context.router.history.replace('/dashboard');
                this.setState({
                    isLoggedIn: true
                })
            }
            else {
                this.setState({
                    message: 'Unable to sign up'
                });
            }
        });
        xhr.send(formData);
    }

    changeUser(event) {
        const field = event.target.name;
        const user = this.state.user;
        user[field] = event.target.value;

        this.setState({
            user
        });
    }

    render() {
        return(
            <form className="Login" action="post" onSubmit={this.processForm}>
                <Card className="Login__content">
                    <div>
                        <h1>Login</h1>
                        <Input label="Email" onChange={this.changeuser} />
                        <br/><br/>
                        <Input label="Password" onChange={this.changeUser} />
                        <br/><br/>

                        <p>{this.state.message}</p>
                        <Button type="submit" label="Log In" primary/>
                        <Button className="ui inverted small green button"><a href="/auth/spotify">Login with Spotify</a></Button>
                        <h4>No account yet? Click <Link to="/signup">here</Link> to Register!</h4>

                        <Link to="/dashboard"><p>Go to Dashboard</p></Link>
                    </div>
                </Card>
            </form>
        )
    }
}

/*
Login.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    successMessage: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired
}
*/

Login.contextTypes = {
    router: PropTypes.object.isRequired
};

export default Login
