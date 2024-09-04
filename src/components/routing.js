import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/landing';
import LoginPage from '../pages/login';
import SingupPage from '../pages/signup';
import Header from './Header'
import Footer from './Footer';
// import ForgotPasswordPage from '../pages/forgotpassword';
import PropertyPage from '../pages/property';
import ProfilePage from '../pages/profile';
import ProtectedRoute from './protectedRoute';
import NotFoundPage from '../pages/404/404';

export default function Routing() {
  return (
      <div>
          <BrowserRouter>
          <Header/>
              <Routes>
                  <Route exact path='/' Component={LandingPage} />
                  <Route path='/login' Component={LoginPage} />        
                  <Route path='/signup' Component={SingupPage} />
                  {/* <Route path='/forgotpassword' Component={ForgotPasswordPage} /> */}
                  <Route Component={ProtectedRoute}>
                  <Route path='/property' Component={PropertyPage} />
                  <Route path='/profile' Component={ProfilePage} />
                  </Route>
                  <Route path="*" Component={NotFoundPage} />
              </Routes>
              <Footer />
          </BrowserRouter>
      </div>
  )
}
