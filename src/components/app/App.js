import React, {Component} from 'react';
import {Spin, Alert} from "antd";
import { debounce } from 'lodash';
import 'antd/dist/antd.css';
import ApiServices from '../../services/api-services';
import MoviesList from "../movies-list";
import Search from "../search/search";
import './app.css';

export default class App extends Component {
  
  apiServices = new ApiServices();
  
  state = {
    moviesList: [],
    isLoading: false,
    isError: false,
    hasData: false
  }
  
  onError = () => {
    this.setState({
      isLoading: false,
      isError: true
    });
  }
  
  onMoviesLoaded = (movies) => {
    this.setState({
      moviesList: movies.results,
      isLoading: false,
      hasData: true
    })
  }
  
  onSearchHandler = debounce((query) => {
    if (query === "") {
      this.setState({
        isLoading: false,
        isError: false,
        hasData: false
      })
    } else {
      this.setState({
        isLoading: true,
        isError: false
      })
      this.updateMovies(query);
    }
  }, 500);
  
  updateMovies = (query) => {
    this.apiServices.getMoviesBySearch(query).then(this.onMoviesLoaded).catch(this.onError);
  }

  render() {
    
    const {moviesList, isLoading, isError, hasData} = this.state;
    
    const isValidData = hasData && !isLoading && !isError;
    
    const errorMessage = isError ? <Alert type="error" message="Error" description="The movie can not be uploaded" showIcon/> : null
    const spinner = isLoading ? <Spin tip="Loading... Please wait" size="large"/> : null
    const content = (isValidData) ? <MoviesList moviesList={moviesList} /> : null
    
    return (
      <div className="app">
        <h1 className="visually-hidden">Movies App</h1>
        <Search
          onSearch={this.onSearchHandler}
        />
        {spinner}
        {errorMessage}
        {content}
      </div>
    );
  }
}
