import React from 'react';
import PropTypes from 'prop-types';
import MovieCard from '../movie-card';
import './movies-list.css';

const MoviesList = (props) => {
  const { moviesList, sessionId, updateRatedMovie } = props;
  const elements = moviesList.map((movie) => (
    <li className="movies__item" key={movie.id}>
      <MovieCard movie={movie} moviesList={moviesList} sessionId={sessionId} updateRatedMovie={updateRatedMovie} />
    </li>
  ));
  return <ul className="app__list movies">{elements}</ul>;
};

MoviesList.defaultProps = {
  moviesList: [],
  sessionId: '',
};

MoviesList.propTypes = {
  moviesList: PropTypes.arrayOf(PropTypes.object),
  sessionId: PropTypes.string,
  updateRatedMovie: PropTypes.func.isRequired,
};

export default MoviesList;
