import { format } from 'date-fns';
import React, { Component } from 'react';
import { Rate } from 'antd';
import PropTypes from 'prop-types';
import { GenreConsumer } from '../genre-context';
import ApiRate from '../../services/api-rate';
import reduceText from '../../utils/reduce-text';
import './movie-card.css';
import noPoster from '../../images/no-poster.png';

export default class MovieCard extends Component {
  static propTypes = {
    sessionId: PropTypes.string.isRequired,
    updateRatedMovie: PropTypes.func.isRequired,
    movie: PropTypes.shape({
      id: PropTypes.number,
      poster_path: PropTypes.string,
      title: PropTypes.string,
      release_date: PropTypes.string,
      overview: PropTypes.string,
      rating: PropTypes.number,
      vote_average: PropTypes.number,
      genre_ids: PropTypes.arrayOf(PropTypes.number),
    }).isRequired,
  };

  apiRate = new ApiRate();

  // eslint-disable-next-line consistent-return
  setClassNameToMark = (voteAverage) => {
    if (voteAverage < 3) {
      return 'film-card__mark film-card__mark--lows';
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

  onRateChange = (rateValue) => {
    const { movie, sessionId, updateRatedMovie } = this.props;
    this.apiRate.postRateMovie(movie.id, sessionId, rateValue).then(() => updateRatedMovie(movie.id, movie, rateValue));
  };

  render() {
    const {
      // movie,
      movie: {
        release_date: releaseDate,
        title,
        poster_path: posterPath,
        overview,
        genre_ids: genreIds,
        vote_average: voteAverage,
      },
    } = this.props;

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
                <p className="film-card__annotation">{reduceText(overview)}</p>
                <Rate className="film-card__stars" count="10" allowHalf onChange={this.onRateChange} />
              </div>
            </article>
          );
        }}
      </GenreConsumer>
    );
  }
}
