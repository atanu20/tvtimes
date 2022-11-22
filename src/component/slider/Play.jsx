import React from 'react';
import './Slider.css';
import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { NavLink } from 'react-router-dom';

const Play = ({ list }) => {
  SwiperCore.use([Autoplay]);
  return (
    <>
      <div className="top__rate">
        {list.length == 0 ? (
          <>
            <div className="text-center">
              <p>There is no items</p>
            </div>
          </>
        ) : (
          <>
            <div className="container">
              <h2>Popular Movies</h2>
              <br />
              <Swiper
                modules={[Autoplay]}
                grabCursor={true}
                spaceBetween={10}
                slidesPerView={'auto'}
                loop={true}
                //   autoplay={{ delay: 3000 }}
              >
                {list?.map((val, ind) => {
                  return (
                    <SwiperSlide key={ind}>
                      <NavLink
                        to={`/movie/${val.id}`}
                        className="top_rate_nav_link"
                      >
                        <div className="top__slider">
                          <img
                            src={`https://image.tmdb.org/t/p/w500/${val.poster_path}`}
                            alt=""
                          />
                          <div className="top__icon__div">
                            <NavLink
                              to={`/movie/${val.id}`}
                              className="btn-red"
                            >
                              <i className="fa fa-play "></i>
                            </NavLink>
                          </div>
                        </div>
                      </NavLink>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Play;
