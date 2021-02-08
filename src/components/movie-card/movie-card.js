import {format} from "date-fns";
import React from "react";
import PropTypes from "prop-types";
import './movie-card.css';

const MovieCard = (props) => {
  
  // eslint-disable-next-line consistent-return
  const reduceText = (text) => {
    if (text.length <= 150) {
      return text;
    }
    for (let i = 150; i > 0; i--) {
      if ((text.charAt(i) === ' ') && (text.charAt(i - 1) !== ',' || text.charAt(i - 1) !== '.' || text.charAt(i - 1) !== ';')) {
        return `${text.substring(0, i)}...`;
      }
    }
  }
  
  const { releaseDate, title, posterPath, overview } = props;
  
  const date = new Date(releaseDate);
  
  return (
    <article className="film-card">
      <div className="film-card__poster">
        <img className="film-card__poster" src={`https://image.tmdb.org/t/p/w185${posterPath}`} alt="This is poster"/>
      </div>
      <div className="film-card__info">
        <div className="film-card__rating">
          <h2 className="film-card__title">{title}</h2>
        </div>
        
        <p className="film-card__release">{format(date, 'PP')}</p>
        
        <ul className="film-card__genre">
          <li className="film-card__genre-item">
            Action
          </li>
          <li className="film-card__genre-item">
            Drama
          </li>
        </ul>
        <p className="film-card__annotation">{reduceText(overview)}</p>
      </div>
    </article>
  )
}

MovieCard.defaultProps = {
  overview: null
}

MovieCard.propTypes = {
  title: PropTypes.string.isRequired,
  posterPath: PropTypes.string.isRequired,
  overview: PropTypes.string,
  releaseDate: PropTypes.string.isRequired
}

export default MovieCard
