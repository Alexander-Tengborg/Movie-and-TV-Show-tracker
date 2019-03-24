import React, { Component } from 'react';

import _ from 'lodash';

import axios from 'axios';

import './Search.css';
import { Loader, Grid, Pagination } from 'semantic-ui-react';
import List from './List';

import { search, searchTv, searchMovie } from '../api/api';

//USE ENUMS FOR MOVIE/TV?

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {}, //move to redux
            curPage: this.getParam(this.props, 'p'),
            totalPages: 0,
            isSearching: true
        }
        //console.log('ayy: ' + this.state.curPage);

        this.searchTmdb = this.searchTmdb.bind(this);
        this.searchTmdbPage = this.searchTmdbPage.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
    }

    getParam(props, param) {
      return new URLSearchParams(props.location.search).get(param);
    }
  //Use the following link while getting tv show/movie details, so i also can show the actors (and possibly writers)
  //https://api.themoviedb.org/3/tv/19885?api_key=e7c932bbbb81168a709224970c15e1a7&append_to_response=credits

  //Get shows that are recommendations????? (could use similar instead, but not as good...)
  //https://api.themoviedb.org/3/tv/19885?api_key=e7c932bbbb81168a709224970c15e1a7&append_to_response=recommendations

  //Get reviews? meh?
  //https://api.themoviedb.org/3/tv/19885?api_key=e7c932bbbb81168a709224970c15e1a7&append_to_response=reviews

  //Get external IDs (mostly so that I can link to the imdb page)
  //https://api.themoviedb.org/3/tv/19885?api_key=e7c932bbbb81168a709224970c15e1a7&append_to_response=external_ids


    //Currently it it only searching for movies when the component MOUNTS, so when it goes from one component to this component, or when the page refreshes.
    //This means that you cant search for anything else if you're on the search page. Obviously it shouldn't be like this. One way to fix this would be to -
    //start the search when the search button (or enter, when input is focused) is pressed. This would set the 'isLoading' state in the store to true, and would -
    //also return the resulting data in the store. When the component mounts, it will check the isLoading state/prop, and if it is false (which it will be, when -
    //the search wasn't made by the input bar; such as from a page refresh), it starts a new search. 

    componentDidMount() {
        this.searchTmdb()
    }

    componentDidUpdate(prevProps) {
        if(prevProps.input === this.props.input && prevProps.isSearching === false && this.props.isSearching === true) {
            // this.searchTmdb();
        }

        if(this.getParam(prevProps, 'q') !== this.getParam(this.props, 'q') || prevProps.match.params.category !== this.props.match.params.category) {
            this.searchTmdb();
        }
    }

    //If no results are found.. show something?
  searchTmdb() {
    //Reset the page when a new show is searched
    // let url = "https://api.themoviedb.org/3/search/" + this.props.match.params.category;
    // let query = url + "?api_key=e7c932bbbb81168a709224970c15e1a7&query=" + this.getParam(this.props, 'q') + "&page=" + this.state.curPage;
    console.log("Searching for: " + this.getParam(this.props, 'q'));
    this.setState({
      data: {},
      isSearching: true
    })

    search(this.props.match.params.category, this.getParam(this.props, 'q'), this.state.curPage)
      .then(response => {
        //this.props.finishedSearch();
        let newData = {...this.state.data};
        newData[this.state.curPage] = response.data.results; //response.data.results.filter((item) => item.poster_path !== null) //Get rid off this, since a lot of items does not have posters. Create a placeholder one, like I did with credit images.
        this.setState({
            data: newData,
            totalPages: response.data.total_pages,
            isSearching: false
        })
      }
    );
  }

  //Merge with above function.
  //Also, if page > 1 is selected, and the page is refreshed, the <Pagination> elements will still say that the page is 1
  searchTmdbPage() {
       //Reset the page when a new show is searched
      //  let url = "https://api.themoviedb.org/3/search/" + this.props.match.params.category;
      //  let query = url + "?api_key=e7c932bbbb81168a709224970c15e1a7&query=" + this.getParam(this.props, 'q') + "&page=" + this.state.curPage;
       console.log("Request...");
       this.setState({
         isSearching: true
       })
       search(this.props.match.params.category, this.getParam(this.props, 'q'), this.state.curPage)
         .then(response => {
        // this.props.finishedSearch();
           let newData = {...this.state.data};
           newData[this.state.curPage] = response.data.results; //response.data.results.filter((item) => item.poster_path !== null)  //Get rid off this, since a lot of items does not have posters. Create a placeholder one, like I did with credit images.
            this.setState({
            data: newData,
            isSearching: false
         })});
  }
    onPageChange(event, { activePage }) {
        console.log("Page changed");
        this.setState({
          curPage: activePage
        }, () => {
          if(_.isEmpty(this.state.data[this.state.curPage])) {
            this.searchTmdbPage();
          }
          console.log(activePage);
        });
        this.props.history.push(`/${this.props.match.params.category}/search?q=${this.getParam(this.props, 'q')}&p=${activePage}`);
      }
    
      //fix a movie and tv component. this.props.match.params.category decides which one should be rendered.
    render() {
        const isDisabled = (this.state.totalPages > 0) ? false : true; 

        //The pagination is too large/wide for smaller phones
        const pagination =  <Grid centered  style={{margin: 15}}>
                              <Pagination activePage={this.state.curPage}
                                disabled={isDisabled}
                                onPageChange={this.onPageChange}
                                siblingRange={2}
                                totalPages={this.state.totalPages}
                              />
                            </Grid>

        const loader = <Loader active size='large'>Loading</Loader>
        return (
            <div>
                {this.state.isSearching && loader}
                {!_.isEmpty(this.state.data) && pagination}
                <List category={this.props.match.params.category} data={this.state.data[this.state.curPage]} />
                {!_.isEmpty(this.state.data) && pagination}
            </div>
        );
    }
}

// export default connect(mapStateToProps, mapDispatchToProps)(Search);
export default Search;