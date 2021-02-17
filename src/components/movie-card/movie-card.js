import { format } from 'date-fns';
import React from 'react';
import PropTypes from 'prop-types';
import { GenreConsumer } from '../genre-context';
import './movie-card.css';
import noPoster from '../../images/no-poster.png';

const MovieCard = (props) => {
  // eslint-disable-next-line consistent-return
  const reduceText = (text) => {
    if (text.length <= 150) {
      return text;
    }
    for (let i = 150; i > 0; i--) {
      if (
        text.charAt(i) === ' ' &&
        (text.charAt(i - 1) !== ',' || text.charAt(i - 1) !== '.' || text.charAt(i - 1) !== ';')
      ) {
        return `${text.substring(0, i)}...`;
      }
    }
  };

  const { releaseDate, title, posterPath, overview, genreIds } = props;

  const formattedReleaseDate = releaseDate ? format(new Date(releaseDate), 'MMMM d, yyyy') : '';
  const posterImg = posterPath ? `https://image.tmdb.org/t/p/w185${posterPath}` : noPoster;

  return (
    <GenreConsumer>
      {(genresObj) => {
        const genresItems = genreIds.map((id) => (
          <li key={id} className="film-card__genre-item">
            {genresObj[id]}
          </li>
        ));

        return (
          <article className="film-card">
            <div className="film-card__poster">
              <img className="film-card__poster-img" src={posterImg} alt="This is poster" />
            </div>
            <div className="film-card__info">
              <div className="film-card__rating">
                <h2 className="film-card__title">{title}</h2>
              </div>

              <p className="film-card__release">{formattedReleaseDate}</p>

              <ul className="film-card__genre">{genresItems}</ul>
              <p className="film-card__annotation">{reduceText(overview)}</p>
            </div>
          </article>
        );
      }}
    </GenreConsumer>
  );
};

MovieCard.defaultProps = {
  overview: null,
  posterPath: null,
};

MovieCard.propTypes = {
  title: PropTypes.string.isRequired,
  posterPath: PropTypes.string,
  overview: PropTypes.string,
  releaseDate: PropTypes.string.isRequired,
  genreIds: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default MovieCard;
