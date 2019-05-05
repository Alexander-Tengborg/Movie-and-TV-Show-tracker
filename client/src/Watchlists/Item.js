import React, { Component } from 'react';
import './Item.css'

import { Image, Card } from 'semantic-ui-react';

import { Link } from 'react-router-dom';

class Item extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let imgSrc = this.props.data.posterPath == null ? null : "http://image.tmdb.org/t/p/w300" + this.props.data.posterPath;
        let title = this.props.data.name;
        let release = "Released: " + this.props.data.releaseDate; //Aired: for tv?

        return (
            <Card color='red' style={{minWidth: 200, maxWidth: 250}}>
                <Image src={imgSrc} style={{height: 300}} />
                <Card.Content>
                    <Card.Header>
                        <Link to={`/${this.props.data.category}/${this.props.data.id}`}>{title}</Link>
                    </Card.Header>
                    <Card.Meta>
                        {release}
                    </Card.Meta>
                    {/* <Card.Description>
                        {this.props.data.overview} use this??
                    </Card.Description> */}

                </Card.Content>
                {/*}<Card.Content extra>
                </Card.Content>{*/}
            </Card>

        )
    }
}

export default Item;