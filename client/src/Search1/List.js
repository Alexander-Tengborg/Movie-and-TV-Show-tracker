import React, { Component, Fragment } from 'react';
import './List.css'

import Item from './Item.js';

import _ from 'lodash';

import { Card } from 'semantic-ui-react';

class List extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let list = null;
        // console.log("data: ")
        // console.log(this.props.data)
        if(this.props.data != null && !_.isEmpty(this.props.data)) {
            list = this.props.data.map((obj) => {
                return <Fragment>
                {obj.map((data) => {
                    return <Item category={this.props.category} key={data.id} data={data} />
                })}
                </Fragment>
            })
        }
        
        return (
            <Card.Group doubling centered itemsPerRow={4}>
                {list}
            </Card.Group>
        )
    }
}

export default List;