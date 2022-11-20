import { Component, useState } from 'react';
import Home from './components/Home/Home';
import People from './components/People/People';
import Contacts from './components/Contacts/Contacts';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { Navigate, Routes, Route, useNavigate } from 'react-router-dom'
import Notfound from './components/Notfound/Notfound';
import Movies from './components/Movies/Movies';
import Tvshows from './components/Tvshows/Tvshows';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';
import { MediaContextProvider } from './MadiaContext';
import Moviedetails from './components/Moviedetails/Moviedetails';




export default function App() {
  const [userData, setUserData] = useState(null);
  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('userToken')) {
      getUserData();
    }
  }, [])

  function getUserData() {
    let decodedToken = jwtDecode(localStorage.getItem('userToken'));
    setUserData(decodedToken);
  }

  useEffect(() => { console.log(userData) }, [userData])

  function logOut() {

    localStorage.removeItem('userToken');
    setUserData(null);
    navigate('/login');
  }

  function ProtectedRoute({ children }) {
    if (!localStorage.getItem('userToken')) {
      return <Navigate to={'/login'} />
    }
    else {
      return children;
    }
  }
  return (<>
    <Navbar userData={userData} logOut={logOut} />
    <div className='container'>
      <MediaContextProvider>
        <Routes>

          <Route path='/' element={<Home />} ></Route>
          <Route path='home' element={<Home />}></Route>
          <Route path='movies' element={<Movies />} ></Route>
          <Route path='tvshows' element={<Tvshows />} ></Route>
          <Route path='people' element={<People />} ></Route>
          <Route path='moviedetails' element={<Moviedetails />} >
            <Route path=':id' element={<Moviedetails />} ></Route>
          </Route>
          <Route path='login' element={<Login getUserData={getUserData} />} />
          <Route path='register' element={<Register />} />
          <Route path='*' element={<Notfound />} />
        </Routes>
      </MediaContextProvider>
    </div>
    <Footer />
  </>);


}
