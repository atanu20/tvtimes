import React, { useEffect, useState } from 'react';
import 'swiper/swiper.min.css';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Error from './pages/Error';

import './App.css';

import ProtectedRoute from './component/protected/ProtectedRoute';
import NavBar from './component/header/NavBar';
import Footer from './component/footer/Footer';
import Movie from './pages/movie/Movie';
import MovieDet from './pages/movie/MovieDet';
import Tv from './pages/tv/Tv';
import TvDet from './pages/tv/TvDet';
import BookShow from './pages/bookshow/BookShow';
import { selectlang } from './data/languge';
import LoginU from './pages/auth/LoginU';
import Register from './pages/auth/Register';
import SeatSelect from './pages/bookshow/SeatSelect';
import UActivate from './pages/auth/UActivate';
import axios from 'axios';
import { apilink } from './data/fdata';
import Cookies from 'js-cookie';
import DashBoard from './pages/dashboard/DashBoard';

const App = () => {
  const tvtokon = Cookies.get('_tvtimes_access_user_tokon_');
  const [langu, setLangu] = useState('hi');
  const [isAuthenticated, setIsAuthenticated] = useState(
    JSON.parse(localStorage.getItem('_tvtimes_access_user_login'))
  );

  const [myData, setMyData] = useState([]);

  useEffect(async () => {
    const res = await axios.get(`${apilink}/auth/isVerify`, {
      headers: {
        Authorization: tvtokon,
      },
    });
    // console.log(res.data.userInfo.name);
    if (!res.data.success) {
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
      setMyData(res.data.userInfo);
    }
  }, []);

  return (
    <>
      <NavBar
        isAuthenticated={isAuthenticated}
        selectlang={selectlang}
        langu={langu}
        setLangu={setLangu}
        userName={myData?.name}
      />
      <Switch>
        <Route exact path="/login" component={LoginU} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/">
          <Home lang={langu} />
        </Route>
        <Route exact path="/movie">
          <Movie lang={langu} />
        </Route>
        <Route exact path="/movie/:movId" component={MovieDet} />
        <Route exact path="/tv">
          <Tv lang={langu} />
        </Route>
        <Route exact path="/tv/:tvId" component={TvDet} />
        <Route exact path="/user/activate/:activetoken" component={UActivate} />

        {/* <ProtectedRoute exact path="/bookshow/:id" component={BookShow} /> */}
        <ProtectedRoute exact path="/dashboard">
          <DashBoard userdata={myData} />
        </ProtectedRoute>
        <ProtectedRoute exact path="/bookshow/:id" component={BookShow} />
        <ProtectedRoute exact path="/bookshow/:id/:hashId">
          <SeatSelect userdata={myData} />
        </ProtectedRoute>

        <Route component={Error} />
      </Switch>
      <Footer />
    </>
  );
};

export default App;
