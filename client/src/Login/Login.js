import React, { Component } from 'react';

import { Grid, Header, Form, Message, Button, Segment, CommentActions, Label } from 'semantic-ui-react';

import { connect } from 'react-redux';

import { loginUser } from '../actions/authentication';

import { withRouter } from 'react-router-dom'

import classnames from 'classnames';

import _ from 'lodash';

import './Login.css';
//not vertically centered, fix!


//FIX CLIENT-SIDE VALIDATION, SUCH AS EMPTY FIELDS!!!!!!!
class Login extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.auth)
        if(this.props.auth.isAuthenticated) this.props.history.push('/');
        
        this.state = {
            username: '',
            password: '',
            errors: {}
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
        let error = e.target.value.trim().length === 0 ? _.startCase(e.target.name) + ' is required' : null;

        this.setState({
            [e.target.name]: e.target.value,
            errors: {
                ...this.state.errors,
                [e.target.name]: error
            }
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = {
            username: this.state.username,
            password: this.state.password
        }
        this.props.loginUser(user, this.props.history);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    render() {
        const { errors } = this.state;
        return (
            <Grid textAlign='center' style={{ height: '80vh'}}>
                <Grid.Column style={{ maxWidth: '450px', top: '20%' }}>
                    <Header as="h2">
                        Log in to your account
                    </Header>
                    <Form onSubmit={this.handleSubmit}>
                        <Segment>
                            <Form.Field>
                                <Form.Input name='username' icon='user' iconPosition='left' fluid placeholder='Username' onChange={this.handleInputChange} error={errors.username ? true : false} />
                            </Form.Field>
                            <Form.Field>
                                <Form.Input name='password' icon='lock' iconPosition='left' fluid placeholder='Password' onChange={this.handleInputChange} error={errors.password ? true : false} type='password' />
                                <label style={{textAlign: 'left', color: 'red'}}>{errors.username}</label>
                                <label style={{textAlign: 'left', color: 'red'}}>{errors.password}</label>
                            </Form.Field>
                            <Button color='blue' fluid size='large'>Login</Button>                            
                        </Segment>
                    </Form>
                </Grid.Column>
              </Grid>
            )
        }
    }

const mapStateToProps = (state) => {
    return {
        errors: state.errors,
        auth: state.auth
    }
}

// const mapDispatchToProps = (dispatch, state) => { 
//     return {
//         loginUser: () => dispatch(loginUser)
//     }
// }

export default connect(mapStateToProps, { loginUser })(withRouter(Login));