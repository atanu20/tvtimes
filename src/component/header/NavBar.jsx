import React, { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './NavBar.css';
import DehazeIcon from '@mui/icons-material/Dehaze';
import CloseIcon from '@mui/icons-material/Close';
import Avatar from 'react-avatar';
import Cookies from 'js-cookie';
const headerNav = [
  {
    display: 'Home',
    path: '/',
  },
  {
    display: 'Movies',
    path: '/movie',
  },
  {
    display: 'TV Series',
    path: '/tv',
  },
];
const NavBar = ({ userName, isAuthenticated, selectlang, langu, setLangu }) => {
  const { pathname } = useLocation();
  const headerRef = useRef(null);
  const [navstatus, setNavStatus] = useState(false);

  useEffect(() => {
    const shrinkHeader = () => {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        headerRef.current.classList.add('shrink');
      } else {
        headerRef.current.classList.remove('shrink');
      }
    };
    window.addEventListener('scroll', shrinkHeader);
    return () => {
      window.removeEventListener('scroll', shrinkHeader);
    };
  }, []);
  const active = headerNav.findIndex((e) => e.path === pathname);
  const logout = () => {
    Cookies.remove('_tvtimes_access_user_tokon_');
    localStorage.removeItem('_tvtimes_access_user_login');
    console.clear();
    window.location.href = '/login';
  };
  //   console.log(active);
  return (
    <>
      <div ref={headerRef} className="header">
        <div className="header__wrap container">
          <NavLink to="/" className="logo_header">
            <i className="fa fa-play-circle-o"></i> Tv
            <span>Times</span>{' '}
          </NavLink>
          <div className="desktop__nav__box">
            <div className="nav__items">
              {headerNav?.map((val, i) => {
                return (
                  <NavLink
                    key={i}
                    to={val.path}
                    className={`${
                      i === active
                        ? 'nav__item nav__item__active'
                        : 'nav__item '
                    }`}
                  >
                    {val.display}
                  </NavLink>
                );
              })}
              <div class="">
                <select
                  class="nav_select"
                  onChange={(e) => setLangu(e.target.value)}
                  value={langu}
                >
                  {selectlang?.map((val, ind) => {
                    return (
                      <>
                        <option key={ind} value={val.code}>
                          {val.name}
                        </option>
                      </>
                    );
                  })}
                </select>
              </div>
              {isAuthenticated ? (
                <>
                  <NavLink to="/dashboard" className="avtar_icon">
                    {/* <Avatar
                      name={userName?.split(' ')[0]}
                      size={35}
                      round={true}
                    /> */}
                    {userName?.split(' ')[0].substring(0, 1)}
                  </NavLink>
                </>
              ) : (
                <NavLink to="/register" className="btn-outline">
                  Register
                </NavLink>
              )}
            </div>
          </div>
          <div className="mobile__nav__box">
            <div className="d-flex">
              <select
                class="mobie_nav_select"
                onChange={(e) => setLangu(e.target.value)}
                value={langu}
              >
                {selectlang?.map((val, ind) => {
                  return (
                    <>
                      <option key={ind} value={val.code}>
                        {val.name}
                      </option>
                    </>
                  );
                })}
              </select>
              <DehazeIcon
                className="bar_icon"
                onClick={() => setNavStatus(true)}
              />
            </div>

            {navstatus && (
              <>
                <div className="mobile__navbar">
                  <div className="p-3">
                    <CloseIcon
                      className="bar_icon"
                      onClick={() => setNavStatus(false)}
                    />
                  </div>
                  <hr className="bg-light" />
                  <div className="pl-3">
                    <ul>
                      {headerNav?.map((val) => (
                        <li>
                          <NavLink to={val.path} className="mobile__nav__item">
                            {val.display}
                          </NavLink>
                        </li>
                      ))}

                      {isAuthenticated ? (
                        <>
                          <li className="mt-5">
                            <NavLink to="/dashboard" className="btn-red">
                              {userName?.split(' ')[0]}
                            </NavLink>
                          </li>
                          <li
                            className="mt-4 logout_btn"
                            onClick={() => logout()}
                          >
                            Logout
                          </li>
                        </>
                      ) : (
                        <li className="mt-5">
                          <NavLink to="/register" className="btn-red">
                            Register
                          </NavLink>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
