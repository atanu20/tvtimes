import { CircularProgress } from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ButtonList from '../../component/buttonlist/ButtonList';
import { apilink, seatList } from '../../data/fdata';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SeatSelect = ({ userdata }) => {
  // console.log(userdata);
  const tvtokon = Cookies.get('_tvtimes_access_user_tokon_');
  const [butList, setButList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [seatloading, setSeatLoading] = useState(false);
  const [bookedList, setBookedList] = useState([]);
  const [totalSeatList, setTotalSeatList] = useState(seatList);
  const { hashId, id } = useParams();
  const his = useHistory();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);
  const notify = (msg) =>
    toast.dark(msg, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  useEffect(() => {
    getSeatData();
    getUserBookedListbyhashId();
  }, []);

  const getSeatData = async () => {
    setSeatLoading(true);

    const res = await axios.post(
      `${apilink}/api/user/getBookedList`,
      { hashId },
      {
        headers: {
          Authorization: tvtokon,
        },
      }
    );
    // console.log(res.data.list);
    if (res.data.success) {
      setBookedList(res.data.list);
    } else {
      if (res.data.msg == 'Invalid Authentication.') {
        his.push('/login');
      } else {
        notify(res.data.msg);
      }
    }

    setSeatLoading(false);
  };
  const getUserBookedListbyhashId = async () => {
    const res = await axios.post(
      `${apilink}/api/user/getUserBookedListbyhashId`,
      { hashId },
      {
        headers: {
          Authorization: tvtokon,
        },
      }
    );
    // console.log(res);
    if (res.data.success) {
      if (res.data.list) setButList(res.data.list.seatNo);
    } else {
      if (res.data.msg == 'Invalid Authentication.') {
        his.push('/login');
      } else {
        notify(res.data.msg);
      }
    }
  };
  // console.log(bookedList);

  const onRemoveBut = (val) => {
    if (butList.includes(val)) {
      let ar = butList.filter((va) => va != val);
      setButList(ar);
    }
  };

  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    let cinemaHall = localStorage.getItem('cinemaHall');
    let timeSlot = localStorage.getItem('timeSlot');

    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const data = {
      hashId,
      cinemaHall,
      timeSlot,
      seatNo: butList,
      bookDate: tomorrow,
      movieId: id,
    };
    // console.log(data);
    const res = await axios.post(`${apilink}/api/user/bookseatformovie`, data, {
      headers: {
        Authorization: tvtokon,
      },
    });
    // console.log(res.data);
    if (res.data.success) {
      his.push('/');
    } else {
      if (res.data.msg == 'Invalid Authentication.') {
        his.push('/login');
      } else {
        notify(res.data.msg);
      }
    }
    setLoading(false);
  };

  return (
    <>
      <ToastContainer />
      <div className="book___box">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-8 col-12 mx-auto">
              <div className="card p-3 text-light">
                <form onSubmit={onSave}>
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
                          bookedList={bookedList}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="text-center">
                    {bookedList?.bookedUserDet?.includes(userdata._id) ? (
                      <>You Already booked Your Seat</>
                    ) : (
                      <>
                        <button
                          type="submit"
                          className={
                            loading ? 'dis btn btn-danger' : 'btn btn-danger'
                          }
                          disabled={loading}
                        >
                          Book Now
                        </button>
                      </>
                    )}
                  </div>
                  {loading && (
                    <div className="text-center p-2">
                      <CircularProgress size={45} style={{ color: 'red' }} />
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SeatSelect;
