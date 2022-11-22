import React from 'react';
import { NavLink } from 'react-router-dom';
import './Home.css';
import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useEffect } from 'react';
import axios from 'axios';
import { API_KEY, API_URL } from '../../data/fdata';
import { useState } from 'react';
import TopRate from '../../component/slider/TopRate';
import Play from '../../component/slider/Play';
import Card from '../../component/slider/Card';

const Home = ({ lang }) => {
  SwiperCore.use([Autoplay]);

  const [movieItems, setMovieItems] = useState([]);
  const [topItems, setTopItems] = useState([]);
  const [playmovieItems, setPlayMovieItems] = useState([]);
  const [tvmovieItems, setTvMovieItems] = useState([]);
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);
  useEffect(() => {
    getAllBanar();
    getAllTop();
    getAllPlaying();
    getAllpopulartv();
  }, [lang]);

  const getAllBanar = async () => {
    //api.themoviedb.org/3/discover/movie?api_key=33bb8436c172b0643a6db970caa59640&language=hi-IN&region=IN&sort_by=popularity.desc&page=2&with_original_language=hi
    https: try {
      // const res = await axios.get(`${API_URL}/movie/popular?api_key=${API_KEY}&page=${Math.floor(
      //     Math.random() * 3 + 1
      //   )}`
      // );
      const res = await axios.get(
        `${API_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&with_original_language=${lang}&page=${Math.floor(
          Math.random() * 10 + 1
        )}`
      );
      // console.log('ok');
      // console.log(res.data);
      // console.log('no');
      // console.log(res.data.results);
      setMovieItems(res.data.results.slice(0, 15));
    } catch {
      console.log('error');
    }
  };

  const getAllTop = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/movie/top_rated?api_key=${API_KEY}&page=${Math.floor(
          Math.random() * 2 + 1
        )}&with_original_language=${lang}`
      );
      // console.log('ok');
      // console.log(res.data);
      // console.log('no');
      // console.log(res.data.results);
      setTopItems(res.data.results);
    } catch {
      console.log('error');
    }
  };
  // now_playing

  const getAllPlaying = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/movie/now_playing?api_key=${API_KEY}&page=${Math.floor(
          Math.random() * 10 + 1
        )}`
      );
      // console.log('ok');
      // console.log(res.data);
      // console.log('no');
      // console.log(res.data.results);
      setPlayMovieItems(res.data.results);
    } catch {
      console.log('error');
    }
  };

  const getAllpopulartv = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/tv/popular?api_key=${API_KEY}&page=${Math.floor(
          Math.random() * 10 + 1
        )}&with_original_language=${lang}`
      );
      // console.log('ok');
      // console.log(res.data);
      // console.log('no');
      // console.log(res.data.results);
      setTvMovieItems(res.data.results.slice(0, 8));
    } catch {
      console.log('error');
    }
  };
  return (
    <>
      <div className="home__banar">
        {movieItems.length == 0 ? (
          <> </>
        ) : (
          <>
            <Swiper
              modules={[Autoplay]}
              grabCursor={true}
              slidesPerView={1}
              loop={true}
              autoplay={{ delay: 3000, disableOnInteraction: false }}

              // onSwiper={(swiper) => console.log(swiper)}
            >
              {movieItems?.map((val, ind) => {
                // setCurrentMovieItems(ind);
                return (
                  <SwiperSlide key={ind}>
                    {({ isActive }) => (
                      <div
                        className="home__banar__bg"
                        style={{
                          background: `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url('https://image.tmdb.org/t/p/original/${val.poster_path}')`,
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat',
                          backgroundSize: 'cover',
                        }}
                      >
                        <div className="container">
                          <div className="row">
                            <div className="col-lg-7 col-md-8 col-sm-12 col-12 ">
                              <h1
                                // className={
                                //   1 == 1 ?
                                // }
                                className={`${
                                  isActive
                                    ? 'hero__title hero__active'
                                    : 'hero__title'
                                }`}
                              >
                                {val.original_title}
                              </h1>
                              {val.overview && (
                                <p
                                  className={`${
                                    isActive
                                      ? 'hero__par hero__active__2'
                                      : 'hero__par'
                                  }`}
                                >
                                  {val.overview.slice(0, 150)}...
                                </p>
                              )}
                              <p></p>
                              <div
                                className={`${
                                  isActive
                                    ? 'two_btn hero__active__3'
                                    : 'two_btn'
                                }`}
                              >
                                <NavLink
                                  to={`/movie/${val.id}`}
                                  className="btn-red mr-2"
                                >
                                  Watch Trailer
                                </NavLink>
                                <NavLink
                                  to={`/bookshow/${val.id}`}
                                  className="btn-outline"
                                >
                                  Book Show
                                </NavLink>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </>
        )}

        <div className="hero__movie__slider">
          {movieItems.length == 0 ? (
            <></>
          ) : (
            <>
              <Swiper
                modules={[Autoplay]}
                grabCursor={true}
                spaceBetween={10}
                slidesPerView={'auto'}
                loop={true}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
              >
                {movieItems?.map((val, ind) => (
                  <SwiperSlide key={ind}>
                    <NavLink to={`/movie/${val.id}`}>
                      <div className="hero__slider">
                        <img
                          src={`https://image.tmdb.org/t/p/w500/${val.poster_path}`}
                          alt=""
                        />

                        <div className="hero__icon__div">
                          <i className="fa fa-play-circle"></i>
                        </div>
                      </div>
                    </NavLink>
                  </SwiperSlide>
                ))}
              </Swiper>
            </>
          )}
        </div>
      </div>
      <TopRate text="Top Rated Movies" link="movie" list={topItems} />
      <Card list={tvmovieItems} />
      <Play list={playmovieItems} />
    </>
  );
};

export default Home;
