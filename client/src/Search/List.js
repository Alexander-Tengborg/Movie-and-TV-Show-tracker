import React, { Component } from 'react';
import './List.css'

import Item from './Item.js';

import { Card } from 'semantic-ui-react';

class List extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let list = null;
        if(this.props.data != null && this.props.data.length > 0) {
            console.log(this.props.data);
            list = this.props.data.map((data) =>
                <Item category={this.props.category} key={data.id} data={data} />
            );
        }
        
        return (
            <Card.Group doubling centered itemsPerRow={4}>
                {list}
            </Card.Group>
        )
    }
}

export default List;