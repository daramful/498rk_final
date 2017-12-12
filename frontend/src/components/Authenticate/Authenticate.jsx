import React, { Component } from 'react'
import { Button, Card, Image, Input, Form, Modal } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styles from './Authenticate.scss'

class Authenticate extends Component {

    render() {

            return(
                <div className="unauthorized">
                    <Card className="olive card">
                        <div className="unauthorized_text">
                            <h1>You must log in before you can see this page</h1>
                            <a href="/auth/spotify" className="loginButton">
                                    <Button className="ui olive button">
                                        Log in with Spotify
                                    </Button>
                                </a>
                        </div>
                    </Card>
                </div>
            )
        
    }
}

export default Authenticate
