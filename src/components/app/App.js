import React, {Component} from 'react';
import {Spin, Alert} from "antd";
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
    isLoading: true,
    isError: false
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
      isLoading: false
    })
  }
  
  updateMovies = () => {
    this.apiServices.getMoviesBySearch("return").then(this.onMoviesLoaded).catch(this.onError);
  }


  render() {
    
    const {moviesList, isLoading, isError} = this.state;
    
    const hasData = !isLoading && !isError;
    
    const errorMessage = isError ? <Alert type="error" message="Error" description="The movie can not be uploaded" showIcon/> : null
    const spinner = isLoading ? <Spin tip="Loading... Please wait" size="large"/> : null
    const content = hasData ? <MoviesList moviesList={moviesList} /> : null
    
    return (
      <div className="app">
        <h1 className="visually-hidden">Movies App</h1>
        {spinner}
        {errorMessage}
        {content}
      </div>
    );
  }
}
