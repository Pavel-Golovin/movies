import React, {Component} from 'react';
import {Spin, Alert, Pagination} from "antd";
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
    hasData: false,
    page: null,
    search: null,
    totalResults: null
  }
  
  onError = () => {
    this.setState({
      isLoading: false,
      isError: true
    });
  }
  
  onMoviesLoaded = ({results, page, total_results: totalResults}) => {
    this.setState({
      moviesList: results,
      isLoading: false,
      hasData: true,
      page,
      totalResults
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
        isError: false,
        search: query
      })
      this.updateMovies(query);
    }
  }, 500);
  
  onPaginationChange = (page) => {
    const { search } = this.state;
    this.setState({
      isLoading: true,
      isError: false,
      page
    })
  
    this.updateMovies(search, page)
  }
  
  updateMovies = (query, page = 1) => {
    this.apiServices.getMoviesBySearch(query, page).then(this.onMoviesLoaded).catch(this.onError);
  }

  render() {
    
    const {moviesList, isLoading, isError, hasData, page, totalResults} = this.state;
    
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
        <section className="movies">
          {spinner}
          {errorMessage}
          {content}
        </section>
        {isValidData && (
          <Pagination
            current={page}
            total={totalResults}
            pageSize={20}
            showSizeChanger={false}
            onChange={this.onPaginationChange}
          />
        )}
      </div>
    );
  }
}
