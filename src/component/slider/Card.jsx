import React from 'react';
import { NavLink } from 'react-router-dom';
import './Slider.css';
const Card = ({ list }) => {
  return (
    <>
      <div className="card__box">
        <div className="container">
          <h2 className="text-light">Trending TV</h2>
          <br />
          {list.length == 0 ? (
            <>
              <div className="text-center">
                <p>There is no items</p>
              </div>
            </>
          ) : (
            <>
              <div className="row">
                {list?.map((val, ind) => (
                  <div
                    className="col-lg-3 col-md-4 col-sm-6 col-12 mx-auto mb-3"
                    key={ind}
                  >
                    <NavLink to={`/tv/${val.id}`}>
                      <div className="card">
                        <img
                          src={`https://image.tmdb.org/t/p/w500/${val.poster_path}`}
                          alt=""
                        />
                        <div className="p-2">
                          <h5 className="text-light">{val.original_name}</h5>
                        </div>
                      </div>
                    </NavLink>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Card;
