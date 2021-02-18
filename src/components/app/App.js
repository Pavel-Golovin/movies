import React, { Component } from 'react';
import { Spin, Alert, Pagination, Tabs } from 'antd';
import { debounce } from 'lodash';
import 'antd/dist/antd.css';
import ApiAuthentication from '../../services/api-authentication';
import ApiGenre from '../../services/api-genre';
import ApiSearch from '../../services/api-search';
import { GenreProvider } from '../genre-context';
import MoviesList from '../movies-list';
import Search from '../search/search';
import './app.css';

export default class App extends Component {
  apiAuthentication = new ApiAuthentication();

  apiGenre = new ApiGenre();

  apiSearch = new ApiSearch();

  state = {
    moviesList: [],
    isLoading: false,
    isError: false,
    hasData: false,
    page: null,
    search: null,
    totalResults: null,
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

  onMoviesLoaded = ({ results, page, total_results: totalResults }) => {
    this.setState({
      moviesList: results,
      isLoading: false,
      hasData: true,
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
        hasData: false,
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
    const { search } = this.state;
    this.setState({
      isLoading: true,
      isError: false,
      textError: null,
      page,
    });

    this.updateMovies(search, page);
  };

  updateMovies = (query, page = 1) => {
    this.apiSearch.getMoviesBySearch(query, page).then(this.onMoviesLoaded).catch(this.onError);
  };

  onTabToggle = (activeTab) => {
    if (activeTab === 'Rated') {
      this.setState({ isTabRated: true });
    } else {
      this.setState({ isTabRated: false });
    }
  };

  render() {
    const {
      moviesList,
      isLoading,
      isError,
      hasData,
      page,
      totalResults,
      textError,
      sessionId, // eslint-disable-line
      genresObj,
      isTabRated,
    } = this.state;

    const { TabPane } = Tabs;

    const isValidData = hasData && !isLoading && !isError;
    const errorMessage = isError ? <Alert type="error" message="Error" description={textError} showIcon /> : null;
    const spinner = isLoading ? <Spin tip="Loading... Please wait" size="large" /> : null;
    const content = isValidData ? <MoviesList moviesList={moviesList} /> : null;

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
