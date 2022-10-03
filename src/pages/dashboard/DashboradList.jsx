import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_KEY, API_URL } from '../../data/fdata';

const DashboradList = ({ data }) => {
  const [movie, setMovie] = useState({});
  useEffect(async () => {
    if (data?.movieId) {
      const res = await axios.get(
        `${API_URL}/movie/${data?.movieId}?api_key=${API_KEY}`
      );
      setMovie(res.data);
    }
  }, [data?.movieId]);
  return (
    <>
      <div className="col-lg-3 col-md-4 col-sm-6 col-12  mb-3">
        <div className="card">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
            alt=""
          />
          <div className="p-2 text-light">
            <p className="pmb">{data?.cinemaHall}</p>
            <span>
              {new Date(data?.bookDate).toLocaleDateString()} {data?.timeSlot}
            </span>
            <p className="pmt">Seat No: &nbsp;{data?.seatNo.toString()} </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboradList;
