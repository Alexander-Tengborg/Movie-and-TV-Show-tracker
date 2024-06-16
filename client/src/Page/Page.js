import React, { Component } from 'react';

import axios from 'axios';
import { Container, Image, Loader, Item, Label, Card, Accordion, Icon, Checkbox, Tab, Menu, Button, Header, Modal, List } from 'semantic-ui-react';

import _ from 'lodash';

import Avatar from './avatar.png';

import { getById, getSeasons } from '../api/api';

// import * as api from './api/api';

import './Page.css'

//plex api???

//Fix the 'add/remove to/from watchlist' button/icon.
//use tabs instead of accordions for seasons.
//could also use it for crew/cast

class Page extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {},
            activeIndex: -1, //dont need if i use tabs and panes instead of accordions.
            seasonInfo: {}, //merge this with the data object?
            isLoading: true,
            seasonCount: 0, //merge this with the data, or the seasoninfo object?
            hasSpecials: false,
            seasonsLoading: true,
            watched: {},
            modalIsOpen: false,
            watchlistData: [],
            listsWithItem: [],
            modalLoading: false
        }

        this.searchMovie = this.searchMovie.bind(this);
        this.searchTv = this.searchTv.bind(this);
        this.getSeasons = this.getSeasons.bind(this);
        this.toggleChecked = this.toggleChecked.bind(this);
        this.getWatchlists = this.getWatchlists.bind(this);
        this.onModalOpen = this.onModalOpen.bind(this);
        this.onModalClose = this.onModalClose.bind(this);
        this.addToWatchlist = this.addToWatchlist.bind(this);
        this.removeFromWatchlist = this.removeFromWatchlist.bind(this);
    }

    componentDidMount() {
        if(this.props.match.params.category == 'tv') {
            this.searchTv();
        } else if(this.props.match.params.category == 'movie') {
            this.searchMovie();
        }
        // api.getInfoFromId(this.props.match.params.id); //this is not doing anything yet. Might use redux for api calls, not quite sure yet, since that might not be needed.
    }

    searchMovie() {
        //Reset the page when a new show is searched
        // let url = "https://api.themoviedb.org/3/tv/" + this.props.match.params.id;
        // let query = url + "?api_key=TMDB_API_KEY&append_to_response=credits";
        console.log("Request...");
        console.log(this.props.match.params.id)
        getById(this.props.match.params.category, this.props.match.params.id)
            .then(response => {
                console.log(response.data)
                // console.log(response);
                this.setState({
                    data: { //no need to store the entire response.data object if i'm not going to use all of the data.
                        id: response.data.id,
                        name: response.data.title, //does not work for movies, fix.
                        credits: response.data.credits,
                        poster_path: response.data.poster_path,
                        in_production: response.data.in_production,
                        genres: response.data.genres,
                        overview: response.data.overview,
                        created_by: response.data.created_by,
                        number_of_seasons: response.data.number_of_seasons,
                        releaseDate: response.data.release_date,
                    },
                    isLoading: false,
                })
            }
        );
    }

    searchTv() {
        //Reset the page when a new show is searched
        // let url = "https://api.themoviedb.org/3/tv/" + this.props.match.params.id;
        // let query = url + "?api_key=TMDB_API_KEY&append_to_response=credits";
        console.log("Request...");
        console.log(this.props.match.params.id)
        getById(this.props.match.params.category, this.props.match.params.id)
            .then(response => {
                // console.log(response);
                this.setState({
                    data: { //no need to store the entire response.data object if i'm not going to use all of the data.
                        id: response.data.id,
                        name: response.data.name, //does not work for movies, fix.
                        credits: response.data.credits,
                        poster_path: response.data.poster_path,
                        in_production: response.data.in_production,
                        overview: response.data.overview,
                        genres: response.data.genres,
                        created_by: response.data.created_by,
                        number_of_seasons: response.data.number_of_seasons,
                        releaseDate: response.data.first_air_date,
                        last_air_date: response.data.last_air_date,
                        // hasSpecials: response.data.seasons[0] === 0 ? true : false
                    },
                    isLoading: false,
                })
                this.getSeasons();
            }
        );
      }

      //The TMDB API only lets you get 20 seasons at a time, so incase something (such as simpsons) has more than 20 seasons, multiple calls has to be made.
      //Not too hard to fix this, but it's not high priority.
      //Also, sometimes there's a 'Specials' season, which, if it exists, can be seen in data.seasons[0]. In TMDB, the season_number is 0, meaning that if
      //you want to get it from their api, using append_to_resonse, you use 'seasons/0'. This would be easy to implement, but I don't know if I should,
      //considering how there's documentaries and such in there aswell. I don't want them to be 'tracked', since then people couldn't completely (100%)
      //finish watching a tv show, unless they watch all documentaries aswell. 
      //I could add the 'Specials' season, but make it so it doesn't track it. Could be cumbersome, since it sometimes include 'actual episodes'
      //(although, they're still specials, so it should still work) ; see Sherlock
      //But doing this could cause problems, since certain shows, such as Doctor Who, has a very large number of these 'Specials'. Doctor who has 149 of
      //them, which would be way too many. It does however seem like the 'non episode Specials' does not have any cast, so I could filter out those with
      //empty casts. Will test.

    getSeasons() {
        let seasons = (this.state.hasSpecials) ? "season/0," : "";
        let seasonCount = (seasons === "") ? 0 : 1;
        // axios.get("/api/").then(response => console.log(response));
        if(this.state.data.number_of_seasons > 20) console.log("CAN ONLY GET 20 SEASONS AT A TIME.");

        for(var i = 1; i <= this.state.data.number_of_seasons; i++) {
            seasons += "season/" + i + ",";
        }
        
        // let url = "https://api.themoviedb.org/3/tv/" + this.state.data.id;
        // let query = url + "?api_key=TMDB_API_KEY&append_to_response=" + seasons;
        console.log("Request...");
        // console.log(seasons);
        getSeasons(this.props.match.params.id, seasons)
            .then(response => {
                console.log(response)
                let data = {};
                seasonCount += response.data.number_of_seasons;
                console.log("season count:" + seasonCount);
                // console.log("Season Count: " + seasonCount)
                // console.log(response.data);
                let tempEp = this.state.hasSpecials ? seasonCount - 1: seasonCount;
                for(var i = this.state.hasSpecials ? 0 : 1; i <= tempEp; i++) {;
                    let curSeasonNum = (this.state.hasSpecials) ? i : i;
                    // console.log(curSeasonNum + ":");
                    // console.log(response.data['season/' + curSeasonNum]);
                    data[i] = (response.data['season/' + curSeasonNum]);
                    let seasonInfo = {}
                    // console.log(curSeasonNum);
                    if(response.data['season/' + curSeasonNum].episodes) {

                        // console.log(response.data['season/' + curSeasonNum].episodes)
                        // for(var j = 1; j <= response.data['season/' + curSeasonNum].episodes.length; j++) {
                        //     seasonInfo[j] = false //inefficient to initalize the watched status of every episode by default.
                        // }
                        
                        this.setState({
                            watched: {
                                ...this.state.watched,
                                [curSeasonNum]: {}
                            },
                            seasonsLoading: false
                        });
                    }
                }

                // console.log(data);

                if(data[0] && data[0].season_number === 0) {
                    data[0].episodes = data[0].episodes.filter((episode) => episode.crew.length != 0); //filters out all 'Specials' Without actors.
                }

                // console.log(data[0]);
                console.log(data);
                this.setState({
                    seasonInfo: data,
                    seasonCount
                });
            }
        );
    }

    handleClick = (e, titleProps) => {
        const { index } = titleProps;
        const { activeIndex } = this.state;
        const newIndex = activeIndex === index ? -1 : index;

        this.setState({
            activeIndex: newIndex
        });
    }

    //stops the seasons' accordion from going down when the checkbox is clicked
    stopPropagation(e) {
        e.stopPropagation();
    }

    saveInfo() {
        // api.saveInfo();
    }

    //currently all episodes get initialized as false, which I am pretty sure causes performance issues, especially with tv shows that has a lot of episodes,
    //such as 24 and one piece. Maybe I should instead not initialize them at all?
    toggleChecked(seasonNum, episodeNum) {
        this.setState({
            watched: {
                ...this.state.watched,
                [seasonNum]: {
                    ...this.state.watched[seasonNum],
                    [episodeNum]: !this.state.watched[seasonNum][episodeNum]
                }
            }
        })
        console.log(seasonNum + " " + episodeNum);
    }

    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
    //indeterminate?
    toggleSeason(e, seasonNum) { // fix binding to checkbox
        e.stopPropagation();
        e.preventDefault(); //not needed?
        console.log(e.type)
        if(e.type !== 'click' && e.type !== 'mouseup') return;
        console.log(e.type);
        let data = this.state.watched[seasonNum];
        let status = true;
        //fix a better solution for this: (running the same loop twice);
        Object.keys(data).map(key => {
            if(this.state.watched[seasonNum][key] != false) status = false;
        });

        // console.log("season number tog: " + seasonNum);
        for(var i = 1; i <= this.state.seasonInfo[seasonNum].episodes.length; i++) {
            data[i] = status;
        }
        
        console.log(seasonNum);
        console.log(this.state.watched);

        this.setState({
            watched: {
                ...this.state.watched,
                data
            }
        })
        // console.log("toggle entire season: " + seasonNum);
    }

    getWatchlists() {
        axios.get('/api/watchlist/all')
            .then((response) => {
                this.setState({
                    watchlistData: response.data
                })
                this.getWatchlistsWithItem(response.data)
            })
    }

    getWatchlistsWithItem(watchlistData) {
        let watchlistIds = watchlistData.map((watchlist) => {
            return watchlist._id
        })

        let params = {
            id: this.state.data.id,
            category: this.props.match.params.category,
            watchlistIds
        }

        axios.post('/api/watchlist/getItems/', params)
            .then((response) => {
                let data = [];
                if(response.data.length > 0) {
                    data = response.data.map((result) => {
                        return result.watchlistId;
                    })
                }

                this.setState({
                    listsWithItem: data,
                    modalLoading: false
                })
            })
    }

    onModalOpen() {
        this.getWatchlists()
        this.setState({
            modalIsOpen: true,
            modalLoading: true
        })
    }

    onModalClose() {
        this.setState({
            modalIsOpen: false
        })
    }

    addToWatchlist(event, watchlistId) {

        let target = event.target;

        target.disabled = true

        let data = this.state.data;
        let params = {
            id: data.id,
            category: this.props.match.params.category,
            name: data.name,
            posterPath: data.poster_path,
            releaseDate: data.releaseDate,
            overview: data.overview,
            watchlistId
        }

        axios.post('/api/watchlist/addItem/', params)
        .then((response) => {
            if(response.data.response) {
                target.disabled = false; //do i need to do this??
                this.setState({
                    listsWithItem: [
                        ...this.state.listsWithItem,
                        watchlistId
                    ]
                })
            }
        })
    }

    removeFromWatchlist(event, watchlistId) {

        let target = event.target;

        target.disabled = true

        let data = this.state.data;
        let params = {
            id: data.id,
            category: this.props.match.params.category,
            watchlistId
        }

        axios.post('/api/watchlist/removeItem/', params)
        .then((response) => {
            if(response.data.response) {
                target.disabled = false; //do i need to do this??

                let index = this.state.listsWithItem.indexOf(watchlistId)

                let arr = this.state.listsWithItem;
                arr.splice(index, 1)

                this.setState({
                    listsWithItem: arr
                })
            }
        })
    }

    //HIDE CREW/CAST IF EMPTY!!!!
    //DONT RENDER ANYTHING UNTIL PAGE HAS LOADED (EX, PRODUCTION SHOWS UP AS NOT IN PRODUCTION WHILE LOADING)
    //AND ADD LOADING SPINNY THING WHILE LOADING DATA
    render() {

        if(this.state.isLoading) {
            return <Loader active size='large'>Loading</Loader>
        }
        
        let imgSrc = this.state.data.poster_path === null ? null : "http://image.tmdb.org/t/p/w300" + this.state.data.poster_path;
        let production = this.state.data.in_production === true ? <Label color='green'>In Production</Label> : <Label color='red'>Not In Production</Label>
        let genres = this.state.data.genres === null ? null : this.state.data.genres.map((genre) => 
            <Label key={genre.name}>{genre.name}</Label>
        )
        
        let cast = this.state.data.credits === null ? null : this.state.data.credits.cast.map((actor) => 
            <Card key={actor.id} style={{width: 180}} centered>
                <Image src={actor.profile_path === null ? Avatar : "http://image.tmdb.org/t/p/w200" + actor.profile_path} style={{height: 250}} />
                <Card.Content>
                    <Card.Header>{actor.name}</Card.Header>
                    <Card.Meta>as {actor.character}</Card.Meta>
                </Card.Content>
            </Card>
        )

        let crew = null;
        let created_by = (this.state.data.created_by == null) ? [] : this.state.data.created_by;
        if(this.state.data.credits != null) {
            crew = this.state.data.credits.crew.concat(created_by).map((crew, i) => 
            <Card key={crew.credit_id} style={{width: 180}} centered> 
                <Image src={crew.profile_path === null ? Avatar : "http://image.tmdb.org/t/p/w200" + crew.profile_path} style={{height: 250}} />
                <Card.Content>
                    <Card.Header>{crew.name}</Card.Header>
                    <Card.Meta>{crew.department === null ? "Creator" : crew.department}</Card.Meta>
                </Card.Content>
            </Card>
            )
        }
        let panes = this.state.data.number_of_seasons === null || //use tabs instead of accordion? (have issues with the onclick/onchange events),
                      this.state.data.number_of_seasons === 0 ? null : Object.keys(this.state.seasonInfo).map((seasonNum) => {
                      const seasonTab = 
                        <Tab.Pane>
                            <Item.Group divided>
                                {/* {console.log(this.state.seasonInfo)} */}
                                {this.state.seasonInfo[seasonNum].episodes.map((episode) => (
                                    <Item key={seasonNum + episode.name}>
                                        <Item.Content>
                                            <Item.Header style={{width: '100%'}}>
                                                Episode {episode.episode_number}: {episode.name} 
                                                <Checkbox key={episode.name} style={{float: 'right' /* dont use float */}} onChange={() => this.toggleChecked(seasonNum, episode.episode_number)} checked={this.state.watched[seasonNum][episode.episode_number]}/>
                                                {/* Fix binding to the checkbox above */}
                                            </Item.Header>
                                            <Item.Meta>
                                            <Icon name='star' color='yellow' />
                                            {episode.vote_average} ({episode.vote_count})
                                            </Item.Meta>
                                            <Item.Description>
                                                {episode.overview}
                                            </Item.Description>
                                        </Item.Content>
                                    </Item>
                                ))}
                                </Item.Group>
                        </Tab.Pane>

                        const menuItem =
                                <Menu.Item key={this.state.seasonInfo[seasonNum].name}>
                                    {this.state.seasonInfo[seasonNum].name}
                                    {/* Fix it so that the checkbox gets checked when each individual episode's box gets checked */}
                                    {/* bind so checkbox can either be checked, unchecked or indeterminate */}
                                    <Checkbox /*key={this.state.seasonInfo[seasonNum].name}*/ style={{float: 'right'}} onClick={(e) => {this.toggleSeason(e, seasonNum)}} />
                                </Menu.Item>

                        return  { menuItem: menuItem, render: () => seasonTab }
                      }
                    );

        let modal = <Modal centered={false} open={this.state.modalIsOpen} onClose={this.onModalClose} trigger={<Button onClick={this.onModalOpen}>Add to watchlist</Button>}>
                        <Modal.Header>Add {this.state.data.name} to a watchlist</Modal.Header>
                        <Modal.Content>
                            <Modal.Description>
                                {this.state.modalLoading && <Loader className='workaround' active size='medium'></Loader>}
                                <List divided relaxed>
                                    {!this.state.modalLoading && !_.isEmpty(this.state.watchlistData) && this.state.watchlistData.map((watchlist, i) => {
                                        return  <List.Item key={watchlist._id}>
                                                    <List.Content  floated='right'>
                                                    {/* {console.log(watchlist._id + ' ' + this.state.listsWithItem.includes(watchlist._id))} */}
                                                        { !this.state.listsWithItem.includes(watchlist._id) && <List.Header><Button color='green' onClick={(e) => this.addToWatchlist(e, watchlist._id)}>Add</Button></List.Header>}
                                                        { this.state.listsWithItem.includes(watchlist._id) && <List.Header><Button color='red' onClick={(e) => this.removeFromWatchlist(e, watchlist._id)}>Remove</Button></List.Header>}
                                                    </List.Content>
                                                    <List.Content>
                                                        <List.Header><h2>{watchlist.name}</h2></List.Header>
                                                    </List.Content>
                                                </List.Item>
                                    })}
                                </List>
                            </Modal.Description>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button onClick={this.onModalClose} primary>
                                Done <Icon name='right chevron' />
                            </Button>
                        </Modal.Actions>
                    </Modal>

        return (
            <Container>
                <Item.Group>
                <Item>
                    <Item.Image src={imgSrc} size="medium"/>
                    <Item.Content>
                        <Item.Header>
                            {/* check square          green*/}
                            <h1>{this.state.data.name}</h1>
                            {modal}
                            <Item.Meta>
                            {production}
                            
                            </Item.Meta>
                        </Item.Header>
                        <Item.Meta>
                            {this.props.match.params.category == 'tv' &&  'Air Date: ' + this.state.data.releaseDate + ' - Last Air Date: ' + this.state.data.last_air_date}
                            {this.props.match.params.category == 'movie' &&  'Release Date: ' + this.state.data.releaseDate}
                            <br />
                            {genres}
                        </Item.Meta>
                        <Item.Description>
                            {this.state.data.overview}
                        </Item.Description>
                        <Item.Extra>
                            <Accordion styled>
                            <div>
                                <Accordion.Title active={this.state.activeIndex === 0} index={0} onClick={this.handleClick}>
                                    <Icon name='dropdown' />
                                    Cast
                                </Accordion.Title>
                                <Accordion.Content active={this.state.activeIndex === 0}>
                                    <Card.Group>
                                        {cast}
                                    </Card.Group>
                                </Accordion.Content>
                                </div>
                                {this.state.data.credits.crew && <div><Accordion.Title active={this.state.activeIndex === 1} index={1} onClick={this.handleClick}>
                                    <Icon name='dropdown' />
                                    Crew
                                </Accordion.Title>
                                <Accordion.Content active={this.state.activeIndex === 1}>
                                    <Card.Group>
                                        {crew}
                                    </Card.Group>
                                </Accordion.Content></div>}
                            </Accordion>
                        </Item.Extra>
                    </Item.Content>
                </Item>
                {/* <button onClick={this.saveInfo}>Save</button> */}
                    {(this.props.match.params.category == 'tv' && !this.props.seasonsLoading) && <Tab menu={{ fluid: true, tabular: true, vertical: true, pointing: true, className: 'wrapper' }} panes={panes} />}
                </Item.Group>
            </Container>
        );
    }
}

export default Page;