import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { apilink } from '../../data/fdata';
import './DashBoard.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DashboradList from './DashboradList';
const DashBoard = ({ userdata }) => {
  const tvtokon = Cookies.get('_tvtimes_access_user_tokon_');
  const [booked, setBooked] = useState([]);
  const his = useHistory();
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
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);
  useEffect(() => {
    getMyBooked();
  }, []);
  const getMyBooked = async () => {
    const res = await axios.get(
      `${apilink}/api/user/getMyBooked`,

      {
        headers: {
          Authorization: tvtokon,
        },
      }
    );
    console.log(res.data);
    if (res.data.success) {
      setBooked(res.data.list);
    } else {
      if (res.data.msg == 'Invalid Authentication.') {
        his.push('/login');
      } else {
        notify(res.data.msg);
      }
    }
  };
  const logout = () => {
    Cookies.remove('_tvtimes_access_user_tokon_');
    localStorage.removeItem('_tvtimes_access_user_login');
    console.clear();
    window.location.href = '/login';
  };
  return (
    <>
      <ToastContainer />
      <div className="dash__box">
        <div className="container">
          <h3 className="text-light">
            Hi <span className="text-red">{userdata?.name?.split(' ')[0]}</span>{' '}
          </h3>
          <button className="btn btn-primary" onClick={() => logout()}>
            Logout
          </button>
          <br />
          <br />
          <div className="row">
            {booked?.map((val, ind) => {
              return (
                <>
                  <DashboradList key={ind} data={val} />
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
