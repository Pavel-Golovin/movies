import React from 'react';
import PropTypes from 'prop-types';
import MovieCard from '../movie-card';
import './movies-list.css';

const MoviesList = (props) => {
  // eslint-disable-line arrow-body-style

  const { moviesList } = props;

  // eslint-disable-next-line no-unused-vars
  const elements = moviesList.map(({ id, title, poster_path: posterPath, release_date: releaseDate, overview }) => (
    <li className="movies__item" key={id}>
      <MovieCard title={title} posterPath={posterPath} overview={overview} releaseDate={releaseDate} />
    </li>
  ));

  return <ul className="app__list movies">{elements}</ul>;
};

MoviesList.defaultProps = {
  moviesList: [],
};

MoviesList.propTypes = {
  moviesList: PropTypes.arrayOf(PropTypes.object),
};

export default MoviesList;
