import React from 'react'
import './App.css';
import Routing from './components/routing';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
 
 
  return (
    <>
      <Routing /> 
      <ToastContainer/>
    </>

  );
}

export default App;
