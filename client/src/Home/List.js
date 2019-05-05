import React, { Component } from 'react';
import './List.css'

import Item from './Item.js';

import { Card, Checkbox, Header, Segment, Button, Dropdown } from 'semantic-ui-react';

import axios from 'axios';

class List extends Component {
    constructor(props) {
        super(props);
    }

    //get both top-rated movies and tv at the same time from back-end.

    render() {
        let list = null;
        let data = this.props.data
        if(data != null && data.length > 0) {
            list = data.map((data) =>
                <Item key={data.id} data={data} />
            );
        }

        return (
            <div>
                <Card.Group itemsPerRow={5} centered style={{clear: 'both'}}>
                    {list}
                </Card.Group>
            </div>
        )
    }
}

export default List;