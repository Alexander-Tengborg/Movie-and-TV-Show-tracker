import React, { Component } from 'react';
import './List.css'

import Item from './Item.js';

import { Card, Checkbox, Header, Segment } from 'semantic-ui-react';

import axios from 'axios';

class List extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null
        }
    }

    componentDidMount() {
        axios.get('https://api.themoviedb.org/3/tv/top_rated?api_key=e7c932bbbb81168a709224970c15e1a7')
            .then((response) => {
                // console.log(response.data)
                this.setState({
                    data: response.data
                })
            });
    }

    render() {
        let list = null;
        if(this.state.data != null && this.state.data.results.length > 0) {
            console.log(this.state.data);
            list = this.state.data.results.slice(0,12).map((data) =>
                <Item category='tv' key={data.id} data={data} />
            );
        }
        
        return (
            <div>
                <Segment basic>
                <Header as='h2'>{this.props.title}</Header>
                    <span>Tv</span><Checkbox toggle/>Movie
                </Segment>
                <Card.Group itemsPerRow={6}>
                    {list}
                </Card.Group>
            </div>
        )
    }
}

export default List;