import React, { useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import axios from 'axios';
import { apilink } from '../../data/fdata';
function ProtectedRoute({ component: Component, ...restOfProps }) {
  const tvtokon = Cookies.get('_tvtimes_access_user_tokon_');
  const [isAuthenticated, setIsAuthenticated] = useState(
    JSON.parse(localStorage.getItem('_tvtimes_access_user_login'))
  );

  // console.log(typeof isAuthenticated);

  useEffect(async () => {
    const res = await axios.get(`${apilink}/auth/isVerify`, {
      headers: {
        Authorization: tvtokon,
      },
    });
    // console.log(res.data);
    if (!res.data.success) {
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
  }, []);
  // console.log(isAuthenticated);
  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

export default ProtectedRoute;
