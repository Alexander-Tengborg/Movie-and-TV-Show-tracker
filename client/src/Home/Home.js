import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';

import './Home.css';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <div>
                    <h1>Top Rated</h1>
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