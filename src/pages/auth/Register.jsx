import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router';
import './Auth.css';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import { apilink } from '../../data/fdata';
import validator from 'validator';
import { useAlert } from 'react-alert';
import crypto from 'crypto-js';

const Register = () => {
  const alert = useAlert();

  const [name, setName] = useState('');

  const [email, setEmail] = useState('');
  const [npassword, setNPassword] = useState('');
  const [cpassword, setCPassword] = useState('');

  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [coll, setColl] = useState(false);

  const [msg, setMsg] = useState('');
  const his = useHistory();

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  const onSub = async (e) => {
    // alert.show('hi');
    e.preventDefault();
    setLoading(true);

    // console.log(isvalidname1);

    if (npassword.length < 7) {
      setStatus(true);
      setMsg('Password should be more than 6 characters');
    } else if (npassword !== cpassword) {
      setStatus(true);
      setMsg('Both Password not matched');
    } else {
      const data = {
        name,
        email,
        password: npassword,
      };
      const res = await axios.post(`${apilink}/api/user/register`, data);
      console.log(res);
      if (res.data.success) {
        setStatus(true);
        setMsg(res.data.msg);
        setColl(true);
        setEmail('');

        setName('');
        setNPassword('');
        setCPassword('');
      } else {
        setStatus(true);
        setMsg(res.data.msg);
        setColl(false);
      }
    }

    setLoading(false);
  };

  return (
    <>
      <div className="auth">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 col-md-7 col-12 mx-auto">
              <div className="card p-3 text-light">
                {status ? (
                  <>
                    <div
                      className={
                        coll
                          ? 'alert alert-success alert-dismissible'
                          : 'alert alert-warning alert-dismissible'
                      }
                    >
                      <button
                        type="button"
                        className="close"
                        data-dismiss="alert"
                        onClick={() => setStatus(false)}
                      >
                        &times;
                      </button>
                      {msg}
                    </div>
                  </>
                ) : null}

                <h3 className="text-center pb-3 logo_header">
                  <i className="fa fa-play-circle-o"></i> Tv
                  <span>Times</span>
                </h3>
                <br />
                <form onSubmit={onSub} className="">
                  <div className="form-group ">
                    <input
                      type="text"
                      placeholder="Enter Name"
                      className="form-control"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group ">
                    <input
                      type="email"
                      placeholder="Enter Email"
                      className="form-control"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group ">
                    <input
                      type="password"
                      placeholder="Enter Password"
                      className="form-control"
                      name="lname"
                      value={npassword}
                      onChange={(e) => setNPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      className="form-control"
                      name="cpassword"
                      value={cpassword}
                      onChange={(e) => setCPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="text-box">
                    <p
                      onClick={() => his.push('/login')}
                      style={{ cursor: 'pointer' }}
                    >
                      Already Have an Account?
                    </p>
                    <p></p>
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className={
                        loading ? 'dis btn btn-danger' : 'btn btn-danger'
                      }
                      disabled={loading}
                    >
                      Register Now
                    </button>
                  </div>
                  {loading && (
                    <div className="text-center p-2">
                      <CircularProgress size={45} />
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

export default Register;
