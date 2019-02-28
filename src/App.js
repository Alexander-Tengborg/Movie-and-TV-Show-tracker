import React, { Component, Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';

import Header from './Header/Header';
import Page from './Page';
import Home from './Home/Home';
import Search from './Search/Search';
import Footer from './Footer/Footer';

import TabTest from './TabTest'; //This is just for testing

import Page1 from './Page1'; //This is just for testing

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
                <Route exact path="/" component={Home} />

{/* The current routing goes /s/category/query/page. Example: /s/tv/sherlock/1 Not sure if i want to use this. might use something such as /search?c=tv&q=sherlock&page=1, or  /search/tv/?q=sherlock&page=1, or /tv/search/?q=sherlock&page=1*/}

                <Route exact path="/s/:category/:query/:page" component={Search} /> 
                <Route exact path="/search/:category/:query/:page" component={Search} /> 
                <Route exact path="/page/:id" component={Page} />
                <Route exact path="/page1/:id" component={Page1} /> {/*This is just for testing*/}
                <Route exact path="/tab" component={TabTest} /> {/*This is just for testing*/}
              </Switch>
          </Container>
          <Footer />
        </Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
