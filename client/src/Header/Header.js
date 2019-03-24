import React, { Component } from 'react';
import { Menu, Container, Input, Dropdown, Header as SHeader, Popup } from 'semantic-ui-react';
//SHeader is just a temporary fix....
import { Link } from 'react-router-dom';

import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { logoutUser } from '../actions/authentication';

//MAKE IT SO THAT IT CANT SEARCH WHEN IT IS NULL OR EMPTY!

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
          category: 'tv',
          input: this.getParam('q') == null ? '' : this.getParam('q')
        }

        this.search = this.search.bind(this);
        this.setInput = this.setInput.bind(this);
        this.categoryChange = this.categoryChange.bind(this);
    }

    getParam(param) {
      return new URLSearchParams(this.props.location.search).get(param);
    }

    search(event) {
      if((event.keyCode === undefined || event.keyCode === 13) && this.state.input.trim() !== '') {
        this.props.history.push(`/${this.state.category}/search?q=${this.state.input}&p=1`) //fix???????
      }
    }

    componentDidUpdate() {
      if(this.props.history.location.pathname === '/login') {
        this.props.history.push('/');
      }
    }

    setInput(event) {
      this.setState({
        input: event.target.value
      });
    }

    categoryChange(event, data) {
      this.setState({
        category: data.value
      });
    }

    render() {
      if(!this.props.auth.isAuthenticated) return null;
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
                  onChange={this.setInput} 
                  onKeyDown={this.search}
                  // onKeyDown={this.onKeyDown} //
                  value={this.state.input}
                  placeholder='Search here...' 
                />
              </Menu.Item>

                <Dropdown item text={'Signed in as ' + this.props.auth.user.username}>
                    <Dropdown.Menu>
                    {/* <Dropdown.Header>User options</Dropdown.Header> */}
                    <Dropdown.Item text='Profile' disabled />
                    <Dropdown.Item text='Settings' disabled />
                    <Dropdown.Item text='Watchlists' />
                    <Dropdown.Divider />
                    <Dropdown.Item text='Logout' onClick={() => this.props.logoutUser(this.props.history)}/>
                  </Dropdown.Menu>
                </Dropdown>
            </Menu.Menu>
          </Container>
        </Menu>
      );
    }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

// const mapDispatchToProps = (dispatch, state) => {
//   return {
//     logoutUser: () => dispatch(logoutUser)
//   }
// }

export default connect(mapStateToProps, { logoutUser })(withRouter(Header));