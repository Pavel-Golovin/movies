import { format } from 'date-fns';
import React, { Component } from 'react';
import { Rate } from 'antd';
import PropTypes from 'prop-types';
import { GenreConsumer } from '../genre-context';
import './movie-card.css';
import noPoster from '../../images/no-poster.png';

export default class MovieCard extends Component {
  // eslint-disable-next-line consistent-return
  reduceText = (text) => {
    if (text.length <= 100) {
      return text;
    }
    for (let i = 100; i > 0; i--) {
      if (
        text.charAt(i) === ' ' &&
        (text.charAt(i - 1) !== ',' || text.charAt(i - 1) !== '.' || text.charAt(i - 1) !== ';')
      ) {
        return `${text.substring(0, i)}...`;
      }
    }
  };

  // eslint-disable-next-line consistent-return
  setClassNameToMark = (voteAverage) => {
    if (voteAverage < 3) {
      return 'film-card__mark film-card__mark--low';
    }
    if (voteAverage < 5) {
      return 'film-card__mark film-card__mark--middle';
    }
    if (voteAverage < 7) {
      return 'film-card__mark film-card__mark--high';
    }
    if (voteAverage >= 7) {
      return 'film-card__mark film-card__mark--top';
    }
  };

  render() {
    const { releaseDate, title, posterPath, overview, genreIds, voteAverage } = this.props;

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
                <h2 className="film-card__title">{title}</h2>
                <span className={this.setClassNameToMark(voteAverage)}>{voteAverage}</span>
                <p className="film-card__release">{formattedReleaseDate}</p>
                <ul className="film-card__genre">{genresItems}</ul>
                <p className="film-card__annotation">{this.reduceText(overview)}</p>
                <Rate className="film-card__stars" count="10" allowHalf />
              </div>
            </article>
          );
        }}
      </GenreConsumer>
    );
  }
}

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
  voteAverage: PropTypes.number.isRequired,
};
