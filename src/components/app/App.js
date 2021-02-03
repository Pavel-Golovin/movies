import React, {Component} from 'react';
import {Spin} from "antd";
import 'antd/dist/antd.css';
import ApiServices from '../../services/api-services';
import MoviesList from "../movies-list";
import './app.css';

export default class App extends Component {
  
  apiServices = new ApiServices();
  
  constructor() {
    super();
    this.updateMovies();
  }
  
  state = {
    moviesList: [],
    isLoading: true
  }
  
  onMoviesLoaded = (movies) => {
    this.setState({
      moviesList: movies.results,
      isLoading: false
    })
  }
  
  updateMovies = () => {
    this.apiServices.getMoviesBySearch("return").then(this.onMoviesLoaded);
  }


  render() {
    
    const {moviesList, isLoading} = this.state;
    
    const spinner = isLoading ? <Spin tip="Loading... Please wait" size="large"/> : null
    const content = !isLoading ? <MoviesList moviesList={moviesList} /> : null
    
    return (
      <div className="app">
        <h1 className="visually-hidden">Movies App</h1>
        {spinner}
        {content}
      </div>
    );
  }
  
}

