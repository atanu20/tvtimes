import React, { useEffect } from 'react';
import { useState } from 'react';
import { API_KEY, API_URL } from '../../data/fdata';
import '../movie/Movie.css';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const Tv = ({ lang }) => {
  const [keyword, setKeyword] = useState('');
  const [movieItems, setMovieItems] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);
  useEffect(() => {
    getAllTop();
  }, [lang]);

  const getAllTop = async () => {
    try {
      // const res = await axios.get(
      //   `${API_URL}/tv/popular?api_key=${API_KEY}&page=${Math.floor(
      //     Math.random() * 10 + 1
      //   )}`
      // );
      const res = await axios.get(
        `${API_URL}/discover/tv?api_key=${API_KEY}&sort_by=popularity.desc&with_original_language=${lang}&page=${Math.floor(
          Math.random() * 5 + 1
        )}`
      );
      // console.log(res);

      setMovieItems(res.data.results);
    } catch {
      console.log('error');
    }
  };

  const onSub = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.get(
        `${API_URL}/search/tv?api_key=${API_KEY}&query=${keyword}`
      );
      console.log(res);

      setMovieItems(res.data.results);
    } catch {
      console.log('error');
    }
    setLoading(false);
  };
  return (
    <>
      <div className="category__det__box">
        <div className="container">
          <h2 className="text-light">Find Your Best TV Series</h2>
          <br />
          <form class="Signup__form" id="newsletter" onSubmit={onSub}>
            <input
              required
              id="search"
              type="text"
              placeholder="Enter Keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button form="newsletter" type="submit" class="Signup__button">
              Search
            </button>
          </form>
          <br />
          <br />
          {loading && (
            <div className="text-center">
              <CircularProgress className="text-light" size={45} />
              <p className="text-light">Loading...</p>
            </div>
          )}
          <div className="category__grid">
            {movieItems.length == 0 ? (
              <></>
            ) : (
              <>
                {movieItems.map((val, ind) => {
                  let img = `https://image.tmdb.org/t/p/w500/${val.poster_path}`;
                  return (
                    <>
                      <NavLink to={`/tv/${val.id}`}>
                        <div
                          className="category__card"
                          style={{
                            backgroundImage: `url(${img})`,
                          }}
                        >
                          <div className="card__hover">
                            <NavLink to={`/tv/${val.id}`} className="btn-red">
                              <i className="fa fa-play "></i>
                            </NavLink>
                          </div>
                        </div>
                        <p className="text-light">{val.original_name}</p>
                      </NavLink>
                    </>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Tv;
