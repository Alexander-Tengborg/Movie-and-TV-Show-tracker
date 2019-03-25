import React, { Component } from 'react';
import { Container, Label, Icon, Divider } from 'semantic-ui-react';

import List from './List'

import './Home.css';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    //Do one call to the back-end, to get all of the data?
    //Instead of having to do it once for each

    render() {
        return (
            <Container> {/* fluid?? */}
                <div>
                    <List title='Top Rated' />
                    {/* <h1>Top Rated<Label>Last updated 2h ago</Label><Icon name='refresh' inverted loading circular size='tiny'/></h1> */}
                    <Divider />
                    <List title='Popular' />
                    <List title='Top Rated' />
                    <List title='Latest' />
                    {/* <h1>Popular</h1>
                    <h1>Upcoming</h1>
                    <h1>Airing This Week</h1>
                    <h1>Airing Today</h1>     */}
                </div>
            </Container>
        );
    }
}

export default Home;