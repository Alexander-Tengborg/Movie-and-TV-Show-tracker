import React, { Component } from 'react';
import { Menu, Container, Input, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const options = [
    {
      key: 'tv', 
      text: 'TV Shows',
      value: 'tv'
    },
    {
      key: 'mov',
      text: 'Movies',
      value: 'mov'
    }
  ];

class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Menu>
            <Container>
              <Menu.Item>
                {/*<Image size="small" src="https://www.robinwieruch.de/img/page/logo.svg" />*/}
                <Header as="h2"><Link to="/">TVShowThing.net</Link></Header>
              </Menu.Item>
              <Menu.Menu position="right">
                <Menu.Item>
                  {/*ADD TWO WAY BINDING TO THE DROPDOWN THING!!!!!!*/}
                  {/* the code/props in <Input/> is a mess, pls fix */}
                  <Input 
                    labelPosition="left"
                    label={
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
                        onClick: this.searchTmdb
                      }
                    } 
                    onChange={this.props.handleChange} 
                    onKeyDown={this.onKeyDown} 
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

export default Header;