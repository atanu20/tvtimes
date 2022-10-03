import { CircularProgress } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { useHistory, useParams } from 'react-router-dom';
import ButtonList from '../../component/buttonlist/ButtonList';

import { apilink, seatList } from '../../data/fdata';
import crypto from 'crypto-js';
import { stateList } from '../../data/stateList';
import './BookShow.css';

const BookShow = () => {
  const [place, setPlace] = useState('');
  const [state, setState] = useState('');
  const [cinemaList, setCinemaList] = useState([]);
  const [butList, setButList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [totalSeatList, setTotalSeatList] = useState(seatList);
  const { id } = useParams();
  const his = useHistory();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);
  const [cinemaHall, setCinemaHall] = useState('');
  const [timeSlot, setTimeSlot] = useState('');

  const onSub = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log('ok');
    try {
      const res = await axios.post(`${apilink}/google`, {
        place,
        state,
      });
      // console.log(res.data);
      if (res.data.success) {
        setCinemaList(res.data.list);
        // console.log(res.data.list);
      } else {
        console.log(res.data.err);
      }
    } catch {
      console.log('error');
    }

    setLoading(false);
  };
  const onBookShow = async (e) => {
    e.preventDefault();
    setLoading(true);
    localStorage.setItem('cinemaHall', cinemaHall);
    localStorage.setItem('timeSlot', timeSlot);
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    // console.log(tomorrow.toLocaleDateString());
    let msg =
      id +
      '&' +
      cinemaHall +
      '&' +
      timeSlot +
      '&' +
      tomorrow.toLocaleDateString();

    let hash = crypto.MD5(msg).toString();

    his.push(`/bookshow/${id}/${hash}`);

    setLoading(false);
  };
  // const onRemoveBut = (val) => {
  //   if (butList.includes(val)) {
  //     let ar = butList.filter((va) => va != val);
  //     setButList(ar);
  //   }
  // };

  return (
    <>
      <div className="book___box">
        <div className="container">
          <div className="row">
            {cinemaList.length == 0 ? (
              <>
                <div className="col-lg-6 col-md-7 col-12 mx-auto">
                  <div className="card p-3 text-light">
                    <h3 className="text-center pb-3 logo_header">
                      Search NearBy Cinema Hall
                    </h3>
                    <br />
                    <form onSubmit={onSub} className="">
                      <div class="form-group">
                        <input
                          type="text"
                          placeholder="Enter Place Details (City name)"
                          class="form-control"
                          name="place"
                          value={place}
                          onChange={(e) => setPlace(e.target.value)}
                          required
                          autoComplete="off"
                        />
                      </div>

                      <div class="form-group">
                        <select
                          class="form-control"
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                          required
                        >
                          <option value="" selected hidden>
                            --choose state--
                          </option>
                          {stateList?.map((val, ind) => (
                            <option key={ind} value={val.state}>
                              {val.state}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="text-center">
                        <button
                          type="submit"
                          className={
                            loading ? 'dis btn btn-danger' : 'btn btn-danger'
                          }
                          disabled={loading}
                        >
                          Search
                        </button>
                      </div>
                      {loading && (
                        <div className="text-center p-2">
                          <CircularProgress
                            size={45}
                            style={{ color: 'red' }}
                          />
                        </div>
                      )}
                    </form>
                  </div>
                </div>
              </>
            ) : (
              <div className="col-lg-6 col-md-8 col-12 mx-auto">
                <div className="card p-3 text-light">
                  <form onSubmit={onBookShow} className="">
                    <div class="form-group">
                      <select
                        class="form-control"
                        value={cinemaHall}
                        onChange={(e) => setCinemaHall(e.target.value)}
                        required
                      >
                        <option value="" selected hidden>
                          --Choose Cinema Hall--
                        </option>
                        {cinemaList?.map((val, ind) => (
                          <option key={ind} value={val.name}>
                            {val.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div class="form-group">
                      <select
                        class="form-control"
                        value={timeSlot}
                        onChange={(e) => setTimeSlot(e.target.value)}
                        required
                      >
                        <option value="" selected hidden>
                          --Choose Time Slot--
                        </option>
                        <option value="9am-12am">9Am - 12Am</option>
                        <option value="1pm-4pm">1Pm - 4Pm</option>
                        <option value="5pm-8pm">5Pm - 8Pm</option>
                      </select>
                    </div>
                    {/* {cinemaHall.length > 0 && timeSlot.length > 0 && (
                      <>
                        <div className=" mb-3">
                          <p>Choose your Seat No:</p>
                          <div className="button__grid">
                            {butList.map((v) => {
                              return (
                                <>
                                  <button
                                    className="delete__button"
                                    onClick={() => onRemoveBut(v)}
                                    type="button"
                                  >
                                    <span>{v}</span>
                                  </button>
                                </>
                              );
                            })}
                          </div>
                          <br />
                          <div className="button__grid">
                            {totalSeatList?.map((val, ind) => (
                              <ButtonList
                                key={ind}
                                no={val.no}
                                butList={butList}
                                setButList={setButList}
                              />
                            ))}
                          </div>
                        </div>
                      </>
                    )} */}

                    <div className="text-center">
                      <button
                        type="submit"
                        className={
                          loading ? 'dis btn btn-danger' : 'btn btn-danger'
                        }
                        disabled={loading}
                      >
                        Save and Next
                      </button>
                    </div>
                    {loading && (
                      <div className="text-center p-2">
                        <CircularProgress size={45} style={{ color: 'red' }} />
                      </div>
                    )}
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BookShow;
