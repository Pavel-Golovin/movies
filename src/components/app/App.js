import React from 'react';
import './app.css';
import { format } from 'date-fns';
import picture from './poster.png';

const App = () => {
  
  const appsTitle = `Movies App`;
  const date = new Date('3.5.2020');
  const annotation = `A former basketball all-star, who has lost
    his wife and family foundation in a struggle with addiction
    attempts to regain his soul  and salvation by becoming
    the coach of a disparate ethnically mixed high ...`;
  
  return (
    <div className="app">
      <h1 className="visually-hidden">{appsTitle}</h1>
      <ul className="app__list movies">
        <li className="movies__item">
          <article className="film-card">
            <div className="film-card__poster">
              <img className="film-card__poster-img" src={picture} alt="This is poster"/>
            </div>
            <div className="film-card__info">
              <div className="film-card__rating">
                <h2 className="film-card__title">The way back</h2>
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
              <p className="film-card__annotation">{annotation}</p>
            </div>
          </article>
        </li>
        <li className="movies__item">
          <article className="film-card">
            <div className="film-card__poster">
              <img className="film-card__poster-img" src={picture} alt="This is poster"/>
            </div>
            <div className="film-card__info">
              <div className="film-card__rating">
                <h2 className="film-card__title">The way back</h2>
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
              <p className="film-card__annotation">{annotation}</p>
            </div>
          </article>
        </li>
        <li className="movies__item">
          <article className="film-card">
            <div className="film-card__poster">
              <img className="film-card__poster-img" src={picture} alt="This is poster"/>
            </div>
            <div className="film-card__info">
              <div className="film-card__rating">
                <h2 className="film-card__title">The way back</h2>
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
              <p className="film-card__annotation">{annotation}</p>
            </div>
          </article>
        </li>
      </ul>
    </div>
  );
  
}

export default App;
