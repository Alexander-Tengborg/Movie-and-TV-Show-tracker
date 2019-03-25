import React, { Component } from 'react';
import { Container, Label, Icon } from 'semantic-ui-react';

import List from './List'

import './Home.css';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container> {/* fluid?? */}
                <div>
                    <List title='Top Rated'/>
                    {/* <h1>Top Rated<Label>Last updated 2h ago</Label><Icon name='refresh' inverted loading circular size='tiny'/></h1> */}
                    <h1>Popular</h1>
                    <h1>Upcoming</h1>
                    <h1>Airing This Week</h1>
                    <h1>Airing Today</h1>    
                </div>
            </Container>
        );
    }
}

export default Home;