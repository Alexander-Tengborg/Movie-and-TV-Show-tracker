import React, { Component } from 'react';
import './List.css'

import Item from './Item.js';

import { Card, Checkbox, Header, Segment, Button } from 'semantic-ui-react';

import axios from 'axios';

class List extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                tv: null,
                movie: null
            },
            tvActive: true,
            movieActive: false
        }
    }

    //get both top-rated movies and tv at the same time from back-end.
    componentDidMount() {
        axios.get('https://api.themoviedb.org/3/tv/top_rated?api_key=e7c932bbbb81168a709224970c15e1a7')
            .then((response) => {
                // console.log(response.data)
                this.setState({
                    data: {
                        tv: response.data
                    }
                })
                this.getTopMovies();
            });
    }

    getTopMovies() {
        axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=e7c932bbbb81168a709224970c15e1a7')
            .then((response) => {
                // console.log(response.data)
                this.setState({
                    data: {
                        ...this.state.data,
                        movie: response.data
                    }
                })
            });
    }

    changeCategory(category) {
        //fix, no need for both tvActive and 
        console.log(this.state.data);
        if(category == 'tv' && !this.state.tvActive) {
            this.setState({
                tvActive: true,
                movieActive: false
            })
        } else if(category == 'movie' && !this.state.movieActive) {
            this.setState({
                tvActive: false,
                movieActive: true
            })
        }
    }

    render() {
        let list = null;
        let data = this.state.tvActive ? this.state.data.tv : this.state.data.movie
        let category = this.state.tvActive ? 'tv' : 'movie';
        if(data != null && data.results.length > 0) {
            console.log(data);
            list = data.results.slice(0,14).map((data) =>
                <Item category={category} key={data.id} data={data} />
            );
        }
        
        return (
            <div>
                <Segment basic>
                    <Header as='h2' style={{display: 'inline'}}>{this.props.title}</Header>
                    <Header as='h4' style={{display: 'inline', marginLeft: '30px', float: 'right'}}>    
                        <Button attached='left' compact primary={this.state.tvActive} secondary={!this.state.tvActive} onClick={() => this.changeCategory('tv')}>Tv</Button>
                        <Button attached='right' compact primary={this.state.movieActive} secondary={!this.state.movieActive} onClick={() => this.changeCategory('movie')}>Movie</Button>
                    </Header>
                </Segment>
                <Card.Group itemsPerRow={7} centered>
                    {list}
                </Card.Group>
            </div>
        )
    }
}

export default List;