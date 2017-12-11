import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Button, Input, Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import axios from 'axios'

import styles from './styles.scss'

class Signup extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            user: {
                password: '',
                email: ''
            },
        };

        this.processForm = this.processForm.bind(this);
        this.changeUser = this.changeUser.bind(this);
    }
    /*

    componentDidMount() {
        axios.get('/profile').then( (res) => {
            this.setState({
                email: res.data.user.email,
                password: res.data.user.password,
                isLoggedIn: true,
            })
        }).catch( (err) => {
            this.setState({
                isLoggedIn: false,
                userInfo: [],
                email: "",
                password: ""
            })
        });
    }

    onSubmit(event) {
        event.preventDefault();

        const email = this.state.user.email;
        const password = this.state.user.password;
    }
    */

    processForm(event) {
        event.preventDefault();

        const email = encodeURIComponent(this.state.user.email);
        const password = encodeURIComponent(this.state.user.password);
        const formData = `email=${email}&password=${password}`;

        const xhr = new XMLHttpRequest();
        xhr.open('post', '/auth/signup');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.responseType='json';
        xhr.addEventListener('load', () => {
            if(xhr.status === 200) {
                message: 'Successfully signed up!';
                this.context.router.history.replace('/login');
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
            <form className="Signup" action="post" onSubmit={this.processForm}>
                <Card className="Signup__content">
                    <div>
                        <h1>Signup</h1>
                        <Input label="Email" onChange={this.changeUser} />
                        <br/><br/>
                        <Input label="Password" onChange={this.changeUser} />
                        <br/><br/>

                        <p>{this.state.message}</p>
                        <Button type="submit" label="Sign Up" primary/>
                        <Button className="ui inverted small green button"><a href="/auth/spotify">Signup with Spotify</a></Button>
                        <h4>Already have an account yet? Click <Link to="/signup">here</Link> to Register!</h4>

                        <Link to="/dashboard"><p>Go to Dashboard</p></Link>
                    </div>
                </Card>
            </form>
        )
    }
}

/*
Signup.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
}
*/

Signup.contextTypes = {
    router: PropTypes.object.isRequired
};

export default Signup;
