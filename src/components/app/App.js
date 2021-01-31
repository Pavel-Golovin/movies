import React, {Component} from 'react';
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
    moviesList: []
  }
  
  updateMovies = () => {
    this.apiServices.getMoviesBySearch("return").then((res) => {
      this.setState({
        moviesList: res.results
      })
    })
  }


  render() {
    
    const {moviesList} = this.state;
    
    return (
      <div className="app">
        <h1 className="visually-hidden">Movies App</h1>
        <MoviesList
          moviesList={moviesList}
        />
      </div>
    );
  }
  
}

