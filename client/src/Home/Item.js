import React, { Component } from 'react';
import './Item.css'

import { Image, Card } from 'semantic-ui-react';

import { Link } from 'react-router-dom';

class Item extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let imgSrc = this.props.data.poster_path == null ? null : "http://image.tmdb.org/t/p/w300" + this.props.data.poster_path;
        let title = this.props.category == "tv" ? this.props.data.name : this.props.data.title;
        let release = this.props.category == "tv" ? "Aired: " + this.props.data.first_air_date : "Released: " + this.props.data.release_date; //fix this and above.
        // console.log(title)
        let description = this.props.data.overview;
        if(description.length > 200) { 
            description = description.substring(0, 200);
            if(description.slice(-1) == " ") {
                description = description.substring(0, description.length - 1); //Fix, the lengths of each description can get really varied
            }

            description += "...";
        }
        return (
            <Card color='red' style={{minWidth: 120, maxWidth: 200}}>
                <Image src={imgSrc} style={{height: 220}} />
                <Card.Content>
                    <Card.Header>
                        <Link to={`/${this.props.category}/${this.props.data.id}`}>{title}</Link>
                    </Card.Header>
                    <Card.Meta>
                        {release}
                    </Card.Meta>
                </Card.Content>
                {/*}<Card.Content extra>
                </Card.Content>{*/}
            </Card>

        )
    }
}

export default Item;