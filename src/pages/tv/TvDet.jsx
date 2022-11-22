import React, { useEffect } from 'react';
import { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { API_KEY, API_URL } from '../../data/fdata';
import '../movie/Movie.css';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import TopRate from '../../component/slider/TopRate';

const TvDet = () => {
  const { tvId } = useParams();
  const [movie, setMovie] = useState({});
  const [moviecredits, setMovieCredits] = useState([]);
  const [moviereco, setMovieReco] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);
  useEffect(() => {
    getMoiveById();
    getCreditsById();
    getrecommended();
  }, [tvId]);
  const getMoiveById = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/tv/${tvId}?api_key=${API_KEY}`);
      // console.log(res);

      setMovie(res.data);
    } catch {
      console.log('error');
    }
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };
  const getCreditsById = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/tv/${tvId}/credits?api_key=${API_KEY}`
      );
      // console.log(res);

      setMovieCredits(res.data.cast);
    } catch {
      console.log('error');
    }
  };

  const getrecommended = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/tv/${tvId}/similar?api_key=${API_KEY}`
      );
      // console.log(res);

      setMovieReco(res.data.results);
    } catch {
      console.log('error');
    }
  };

  return (
    <>
      <div className="category__det__box">
        <div className="container">
          {!loading ? (
            <>
              <div className="row">
                <div className="col-lg-4 col-md-5 col-12 mx-auto mb-3">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
                    alt=""
                    className="single__img"
                  />
                  <br />
                  {/* <div className="text-center">
                    <NavLink to={`/bookshow/${movie?.id}`} className="btn-red">
                      Book Show
                    </NavLink>
                  </div> */}
                </div>
                <div className="col-lg-8 col-md-7 col-12 mx-auto mb-3 text-light">
                  <div className="dflex">
                    <h3 className="">{movie?.original_name} </h3>
                    <div className="pl-2">
                      <span class="badge badge-success">
                        {' '}
                        {Number(movie?.vote_average).toFixed(1)}{' '}
                        <i className="fa fa-star"></i>
                      </span>
                    </div>
                  </div>
                  <br />
                  <p>{movie?.overview}</p>

                  {movie.genres && (
                    <div>
                      {movie?.genres?.slice(0, 5).map((val, ind) => {
                        return (
                          <>
                            <span key={ind} class="badge badge-danger">
                              {val.name}
                            </span>{' '}
                            &nbsp;
                          </>
                        );
                      })}
                    </div>
                  )}
                  <div className="casts__box">
                    <h4>Casts</h4>
                    <div className="casts">
                      {moviecredits?.slice(0, 10)?.map((val, ind) => {
                        let img = `https://image.tmdb.org/t/p/w500/${val.profile_path}`;
                        return (
                          <>
                            <div className="casts__item" key={ind}>
                              <div
                                className="casts__item__img"
                                style={{ backgroundImage: `url(${img})` }}
                              ></div>
                              <p className="casts__item__name">
                                {val.original_name}
                              </p>
                            </div>
                          </>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <SkeletonTheme baseColor="#0f0f0f" highlightColor="#444">
                <div className="row">
                  <div className="col-lg-4 col-md-5 col-12 mx-auto mb-3">
                    <Skeleton height={450} />

                    {/* <div className="text-center">
                      <Skeleton height={35} width={100} />
                    </div> */}
                  </div>
                  <div className="col-lg-8 col-md-7 col-12 mx-auto mb-3 text-light">
                    <div className="dflex">
                      <h3 className="">
                        <Skeleton height={35} width={150} />{' '}
                      </h3>
                      <div className="pl-2">
                        <Skeleton height={35} width={50} />
                      </div>
                    </div>
                    <br />
                    <p>
                      <Skeleton height={35} />
                      <Skeleton height={35} />
                    </p>

                    {movie.genres && (
                      <div className="d-flex">
                        {movie?.genres?.slice(0, 5).map((val, ind) => {
                          return (
                            <>
                              <Skeleton
                                className="mr-2"
                                height={35}
                                width={75}
                              />
                            </>
                          );
                        })}
                      </div>
                    )}
                    <div className="casts__box">
                      <h4>
                        <Skeleton height={35} width={70} />
                      </h4>
                      <div className="casts">
                        {moviecredits?.slice(0, 10)?.map((val, ind) => {
                          // let img = `https://image.tmdb.org/t/p/w500/${val.profile_path}`;
                          return (
                            <>
                              <div className="casts__item" key={ind}>
                                <Skeleton height={120} width={90} />
                              </div>
                            </>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </SkeletonTheme>
            </>
          )}
        </div>

        <TopRate text="Similar Tv Show" link="tv" list={moviereco} />
      </div>
    </>
  );
};

export default TvDet;
