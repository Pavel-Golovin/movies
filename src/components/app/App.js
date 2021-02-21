import React, { Component } from 'react';
import { Spin, Alert, Pagination, Tabs } from 'antd';
import { debounce } from 'lodash';
import 'antd/dist/antd.css';
import ApiAuthentication from '../../services/api-authentication';
import ApiGenre from '../../services/api-genre';
import ApiSearch from '../../services/api-search';
import ApiRate from '../../services/api-rate';
import { GenreProvider } from '../genre-context';
import MoviesList from '../movies-list';
import Search from '../search/search';
import './app.css';

export default class App extends Component {
  /* eslint-disable */
  apiAuthentication = new ApiAuthentication();

  apiGenre = new ApiGenre();

  apiSearch = new ApiSearch();

  apiRate = new ApiRate();

  state = {
    moviesList: [],
    ratedMoviesList: [],
    isLoading: false,
    isError: false,
    page: null,
    search: null,
    totalResults: null,
    totalResultsRated: null,
    textError: null,
    sessionId: null,
    genresObj: null,
    isTabRated: false,
  };

  componentDidMount() {
    this.apiAuthentication.getGuestSessionId().then((sessionId) => this.setState({ sessionId }));
    this.apiGenre.getGenreList().then((genresList) => {
      const genresObj = genresList.reduce((acc, curr) => ({ ...acc, [curr.id]: curr.name }), {});
      this.setState({ genresObj });
    });
  }

  onError = (err) => {
    this.setState({
      isLoading: false,
      isError: true,
      textError: err.message,
    });
  };

  onMoviesLoaded = (movies) => {
    const { results, page, total_results: totalResults } = movies;
    this.setState({
      moviesList: results,
      isLoading: false,
      page,
      totalResults,
    });
  };

  onSearchHandler = debounce((query) => {
    if (query === '') {
      this.setState({
        isLoading: false,
        isError: false,
        textError: null,
      });
    } else {
      this.setState({
        isLoading: true,
        isError: false,
        textError: null,
        search: query,
      });
      this.updateMovies(query);
    }
  }, 500);

  onPaginationChange = (page) => {
    const { search, isTabRated } = this.state;
    this.setState({
      isLoading: true,
      isError: false,
      textError: null,
      page,
    });

    if (isTabRated) {
      this.rateMovies(page);
    } else {
      this.updateMovies(search, page);
    }
  };

  updateMovies = (query, page = 1) => {
    this.apiSearch.getMoviesBySearch(query, page).then(this.onMoviesLoaded).catch(this.onError);
  };

  updateRatedMovie = (id, movie, rating) => {};

  rateMovies = (page = 1) => {
    const { sessionId } = this.state;
    this.apiRate.getRatedMovies(sessionId, page).then((result) => {
      const { results: ratedMoviesList, page, total_results: totalResultsRated } = result;
      this.setState({
        ratedMoviesList,
        page,
        totalResultsRated,
        isTabRated: true,
        isLoading: false,
      });
    });
  };

  onTabToggle = (activeTab) => {
    if (activeTab === 'Rated') {
      this.rateMovies();
    } else {
      this.setState({ isTabRated: false });
    }
  };

  render() {
    const {
      moviesList,
      ratedMoviesList,
      totalResultsRated,
      isLoading,
      isError,
      page,
      totalResults,
      textError,
      sessionId,
      genresObj,
      isTabRated,
    } = this.state;

    const { TabPane } = Tabs;

    const errorMessage = isError ? <Alert type="error" message="Error" description={textError} showIcon /> : null;
    const spinner = isLoading ? <Spin tip="Loading... Please wait" size="large" /> : null;

    const isValidDataSearch = !!moviesList.length && !isLoading && !isError;
    const isValidDataRated = !!ratedMoviesList.length && !isLoading && !isError;
    const content = (!isTabRated ? isValidDataSearch : isValidDataRated) ? (
      <MoviesList
        moviesList={!isTabRated ? moviesList : ratedMoviesList}
        sessionId={sessionId}
        updateRatedMovie={this.updateRatedMovie}
      />
    ) : null;

    return (
      <div className="app">
        <Tabs
          defaultActiveKey="Search"
          size="large"
          activeKey={isTabRated ? 'Rated' : 'Search'}
          onChange={this.onTabToggle}
          centered
        >
          <TabPane tab="Search" key="Search" />
          <TabPane tab="Rated" key="Rated" />
        </Tabs>
        {!isTabRated ? <Search onSearch={this.onSearchHandler} /> : null}
        <section className="movies">
          <GenreProvider value={genresObj}>
            {spinner}
            {errorMessage}
            {content}
          </GenreProvider>
        </section>
        {(!isTabRated ? isValidDataSearch : isValidDataRated) && (
          <Pagination
            current={page}
            total={!isTabRated ? totalResults : totalResultsRated}
            pageSize={20}
            showSizeChanger={false}
            onChange={this.onPaginationChange}
          />
        )}
      </div>
    );
  }
}
