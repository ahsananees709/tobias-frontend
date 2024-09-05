import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import LandingPage from '../pages/landing';
import LoginPage from '../pages/login';
import SignupPage from '../pages/signup';
import Header from './Header';
import Footer from './Footer';
// import ForgotPasswordPage from '../pages/forgotpassword';
import PropertyPage from '../pages/property';
import ProfilePage from '../pages/profile';
import ProtectedRoute from './protectedRoute';
import NotFoundPage from '../pages/404/404';

function Routing() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path='/'
            element={
              <>
                <Helmet>
                  <title>Home</title>
                </Helmet>
                <LandingPage />
              </>
            }
          />
          <Route
            path='/login'
            element={
              <>
                <Helmet>
                  <title>Login</title>
                </Helmet>
                <LoginPage />
              </>
            }
          />
          <Route
            path='/signup'
            element={
              <>
                <Helmet>
                  <title>Signup</title>
                </Helmet>
                <SignupPage />
              </>
            }
          />
          {/* <Route
            path='/forgotpassword'
            element={
              <>
                <Helmet>
                  <title>Forgot Password</title>
                </Helmet>
                <ForgotPasswordPage />
              </>
            }
          /> */}
          <Route
            element={<ProtectedRoute />}
          >
            <Route
              path='/property'
              element={
                <>
                  <Helmet>
                    <title>Properties</title>
                  </Helmet>
                  <PropertyPage />
                </>
              }
            />
            <Route
              path='/profile'
              element={
                <>
                  <Helmet>
                    <title>Profile</title>
                  </Helmet>
                  <ProfilePage />
                </>
              }
            />
          </Route>
          <Route
            path="*"
            element={
              <>
                <Helmet>
                  <title>404 Not Found</title>
                </Helmet>
                <NotFoundPage />
              </>
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default Routing;
