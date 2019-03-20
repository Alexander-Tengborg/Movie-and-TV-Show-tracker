import React, { Component } from 'react';

import { Grid, Header, Form, Message, Button, Segment } from 'semantic-ui-react';

import './Login.css';

class Login extends Component {
    render() {
        return (
            <div>
                {/* <style>
                    {`
                        body > div,
                        body > div > div,
                        body > div > div > div.login-form {
                            height: 100%;
                        }
                    `}
                </style> */}

                <Grid textAlign='center' style={{ height: '100%'}}>
                    <Grid.Column style={{ maxWidth: '450px' }}>
                        <Header as="h2">
                            Log in to your account
                        </Header>
                        <Form>
                            <Segment>
                                <Form.Input icon='user' iconPosition='left' fluid placeholder='Username'/>
                                <Form.Input icon='lock' iconPosition='left' fluid type='password' placeholder='Password' />
                                <Button color='blue' fluid size='large'>Login</Button>                            
                            </Segment>
                        </Form>
                        <Message>
                            Sign up here
                        </Message>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export default Login;