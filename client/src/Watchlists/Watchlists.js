import React, { Component } from 'react';
import { Container, Label, Icon, Divider, Dropdown, Segment, Button, Loader, Input, Card } from 'semantic-ui-react';

import axios from 'axios';

import _ from 'lodash';

import ListItem from './Item';

import './Watchlists.css';

class Watchlists extends Component {
    constructor(props) {
        super(props);

        this.state = {
            watchlists: [],
            selectedList: '',
            listData: [],
            isLoading: false
        }

        this.getWatchlist = this.getWatchlist.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onAddItem = this.onAddItem.bind(this);
    }

    componentDidMount() {
        axios.get('/api/watchlist/all')
            .then((response) => {
                console.log(response.data);
                this.setState({
                    watchlists: response.data
                })
            });
    }

    getWatchlist(listId) {
        axios.get(`/api/watchlist/${listId}`)
        .then((response) => {
            console.log(response.data)
            this.setState({
                isLoading: false,
                listData: (response.data) ? response.data : []
            })
        });
    }

    onChange(event, data) {
        this.setState({
            isLoading: true,
            selectedList: data.value
        })
        this.getWatchlist(data.value);
    }

    onAddItem(event, data) {
        axios.get(`/api/watchlist/create/${data.value}`)
        .then((response) => {
            console.log(response.data)
            let data = this.state.watchlists;
            data.push(response.data)
            this.setState({
                isLoading: false,
                watchlists: data
            })
        });

    }

    render() {

        let options = this.state.watchlists.map((watchlist) => {
            return {
                value: watchlist._id,
                text: watchlist.name,
                name: watchlist.name,
            }
        })

        const loader = <Loader active size='large'>Loading</Loader>
        const posterPrefix = 'http://image.tmdb.org/t/p/w200/';
        let list = null;
        if(!_.isEmpty(this.state.listData)) {
            list = this.state.listData.map((item) => {
                // console.log(item);
                return <ListItem key={item._id} data={item}/>
            })
        }
        console.log(this.state.listData)
        return (
            <Container> {/* fluid?? */}
                <Dropdown
                    placeholder='Select or create a new Watchlist'
                    search
                    selection
                    fluid
                    allowAdditions
                    options={options}
                    value={this.state.selectedList}
                    onAddItem={this.onAddItem}
                    onChange={this.onChange}
                />
                {this.state.isLoading && loader}
                {!this.state.isLoading && this.state.selectedList == '' && <h1>Please select a list or create a new one!</h1>}
                {!this.state.isLoading && this.state.selectedList != '' && _.isEmpty(this.state.listData) && <h1>The selected list is empty!</h1>}
                {!this.state.isLoading && this.state.selectedList != '' && !_.isEmpty(this.state.listData) && <Card.Group itemsPerRow={5} centered style={{marginTop: '20px'}}>{list}</Card.Group>}
            </Container>
        );
    }
}

export default Watchlists;