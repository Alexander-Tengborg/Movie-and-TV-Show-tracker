import React, { Component } from 'react';
import { Menu, Container, Input, Dropdown, Header as SHeader, Popup } from 'semantic-ui-react';
//SHeader is just a temporary fix....
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import * as actions from '../actions';

import { withRouter } from 'react-router-dom';

const options = [
    {
      key: 'tv', 
      text: 'TV Shows',
      value: 'tv'
    },
    {
      key: 'movie',
      text: 'Movies',
      value: 'movie'
    }
  ];

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
          category: 'tv'
        }

        this.search = this.search.bind(this);
        this.categoryChange = this.categoryChange.bind(this);
    }

    search(event) {
      if((event.keyCode === undefined || event.keyCode === 13) && this.props.input.trim() !== '') {
        this.props.startSearch();
        this.props.history.push(`/search/${this.state.category}/${this.props.input}/1`) //fix???????
      }
    }

    categoryChange(event, data) {
      this.setState({
        category: data.value
      });
    }

    render() {
        return (
            <Menu>
            <Container>
              <Menu.Item>
                {/*<Image size="small" src="https://www.robinwieruch.de/img/page/logo.svg" />*/}
                <SHeader as="h2"><Link to="/">------------.net</Link></SHeader> {/* FIX SHEADER! */}
              </Menu.Item>
              <Menu.Menu position="right">
                <Menu.Item>
                  {/*ADD TWO WAY BINDING TO THE DROPDOWN THING!!!!!!*/}
                  {/* the code/props in <Input/> is a mess, pls fix */}
                  <Input 
                    labelPosition="left"
                    label={ /* PROVIDE FEEDBACK IF USER SEARCHES WHILE INPUT BAR IS EMPTY, use popup?*/
                      <Dropdown 
                        defaultValue="tv"
                        options={options}
                        onChange={this.categoryChange}
                      />
                    } 
                    icon={
                      {
                        name: 'search', 
                        link: true, 
                        onClick: this.search
                        // onClick: this.searchTmdb  dispatch redux api call, change route
                      }
                    } 
                    onChange={this.props.setInput} 
                    onKeyDown={this.search}
                    // onKeyDown={this.onKeyDown} //
                    value={this.props.input}
                    placeholder="Search here..." 
                  />
                </Menu.Item>
                <Menu.Item as="a" name="login">
                  Login
                </Menu.Item>
                <Menu.Item as="a" name="register">
                  Register
                </Menu.Item>
              </Menu.Menu>
            </Container>
          </Menu>
        );
    }
}

const mapStateToProps = (state) => {
  return {
    input: state.input.query
  }
}

const mapDispatchToProps = (dispatch, state) => {
  return {
    setInput: (input) => dispatch(actions.setInput(input)),
    startSearch: () => dispatch(actions.startSearch())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));