import React, { Component, Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';

import Header from './Header/Header';
import Page from './Page/Page';
import Home from './Home/Home';
import Search from './Search/Search';
import Watchlists from './Watchlists/Watchlists';
import Footer from './Footer/Footer';

import NotFound from './NotFound';

import SecureRoute from './SecureRoute';

import Login from './Login/Login';
import setAuthToken from './setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authentication';
import jwt_decode from 'jwt-decode';
import store from './store';

import { connect } from 'react-redux';

if(localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  }
}

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <Header/>
          <Container fluid={true}>
              <Switch>
                <SecureRoute exact path='/' component={Home} />

{/* The current routing goes /s/category/query/page. Example: /s/tv/sherlock/1 Not sure if i want to use this. might use something such as /search?c=tv&q=sherlock&page=1, or  /search/tv/?q=sherlock&page=1, or /tv/search/?q=sherlock&page=1*/}

                {/* <SecureRoute exact path='/s/:category/:query/:page' component={Search} />  */}
                {/* <SecureRoute exact path='/search/:category/:query/:page' component={Search} />  */}
                <SecureRoute exact path='/:category/search' component={Search} /> 
                <SecureRoute exact path='/:category/:id' component={Page} />
      
                <SecureRoute exact path='/watchlists' component={Watchlists} />
                {/* <Route exact path='/register' /> Don't know if I'll use this. */}
                <Route exact path='/login' component={Login} />

                <SecureRoute exact path='*' component={NotFound} />
              </Switch>
          </Container>
          <Footer />
        </Fragment>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(App);
