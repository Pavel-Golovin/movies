import React from 'react';
import PropTypes from 'prop-types';
import MovieCard from '../movie-card';
import './movies-list.css';

const MoviesList = (props) => {
  const { moviesList } = props;
  const elements = moviesList.map((movie) => (
    <li className="movies__item" key={movie.id}>
      <MovieCard movie={movie} />
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
