import React, { Component } from 'react';
import { Container, Label, Icon, Divider, Dropdown, Segment, Button, Loader } from 'semantic-ui-react';

import axios from 'axios';

import List from './List'

import './Home.css';

let options = [
    {
        key: 'top_rated',
        text: 'Top Rated',
        value: 'top_rated'
    },
    {
        key: 'popular',
        text: 'Popular',
        value: 'popular'
    },
    {
        key: 'upcoming',
        text: 'Upcoming',
        value: 'upcoming'
    }
]

let keyToVal = {
    'top_rated': 'Top Rated',
    'popular': 'Popular',
    'upcoming': 'Upcoming'
}

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {},
            currentType: options[0].key,
            currentCategory: 'tv',
            isLoading: true,
            tvActive: true
        }

        this.onChange = this.onChange.bind(this);
        this.changeCategory = this.changeCategory.bind(this);
    }

    componentDidMount() {
        axios.get('/api/featured/all')
            .then((response) => {
                let data = {};
                console.log(data);

                response.data.map((item) => {
                    if(!data[item.type]) data[item.type] = {}
                    if(!data[item.type][item.category]) data[item.type][item.category] = []
                    data[item.type][item.category].push(item);
                })
                console.log(data);
                this.setState({
                    data: data,
                    isLoading: false
                })
            });
    }

    changeCategory(category) {
        //fix, no need for both tvActive and 
        // console.log(this.state.data);
        if(category == 'tv' && this.state.tvActive || category == 'movie' && !this.state.tvActive) return;
        this.setState({
            tvActive: !this.state.tvActive,
            currentCategory: category
        })
    }

    onChange(event, data) {
        let type = data.value;
        let category = this.state.currentCategory;
        let tvActive = true;
        if(!this.state.data[type][this.state.currentCategory]) {
            category = category != 'tv' ? 'tv' : 'movie';
            tvActive = category == 'tv' ? true : false;
        }

        this.setState({
            currentType: type,
            tvActive: tvActive,
            currentCategory: category
        })
    }

    render() {
        let currentType = this.state.currentType;
        let currentCategory = this.state.currentCategory;

        const loader = <Loader active size='large'>Loading</Loader>

        if(this.state.isLoading) return loader;
        return (
            <Container> {/* fluid?? */}
                <div>
                    <Segment basic>
                        <Dropdown options={options} style={{float: 'left', display: 'inline', fontSize: '20px'}} value={this.state.currentType} onChange={this.onChange}></Dropdown>
                        <div style={{float: 'right'}}>
                            <Button attached='left' compact disabled={!this.state.data[currentType]['tv']} primary={this.state.tvActive} secondary={!this.state.tvActive} onClick={() => this.changeCategory('tv')}>Tv</Button>
                            <Button attached='right' compact disabled={!this.state.data[currentType]['movie']} primary={!this.state.tvActive} secondary={this.state.tvActive} onClick={() => this.changeCategory('movie')}>Movie</Button>
                        </div>
                    </Segment>
                    { !this.state.isLoading && <List data={this.state.data[currentType][currentCategory]} />}
                    {/* <h1>Top Rated<Label>Last updated 2h ago</Label><Icon name='refresh' inverted loading circular size='tiny'/></h1> */}
                    {/* <Divider />
                    <List title='Popular' />
                    <List title='Top Rated' />
                    <List title='Latest' /> */}
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