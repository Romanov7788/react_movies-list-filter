import './App.scss';
import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import moviesFromServer from './api/movies.json';

function getPreparedGoods(movies, { query }) {
  let preparedGoods = [...movies];

  if (query) {
    const normalizedQuery = query.trim().toLowerCase();

    preparedGoods = preparedGoods.filter(
      movie => movie.title.trim().toLowerCase().includes(normalizedQuery)
    || movie.description.trim().toLowerCase().includes(normalizedQuery),
    );
  }

  return preparedGoods;
}

export const App = () => {
  const [query, setQuery] = useState('');

  const visibleMovies = getPreparedGoods(moviesFromServer, { query });

  return (
    <div className="page">
      <div className="page-content">
        <div className="box">
          <div className="field">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="search-query" className="label">
              Search movie
            </label>

            <div className="control">
              <input
                type="text"
                onChange={(event) => {
                  setQuery(event.target.value);
                }}
                id="search-query"
                className="input"
                placeholder="Type search word"
              />
            </div>
          </div>
        </div>

        <MoviesList movies={visibleMovies} />
      </div>

      <div className="sidebar">Sidebar goes here</div>
    </div>
  );
};
