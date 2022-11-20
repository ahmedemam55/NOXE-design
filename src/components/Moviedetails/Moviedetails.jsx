import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { Axios, axios } from 'axios';
import { useState, useEffect } from 'react';

export default function Moviedetails() {
  let baseImgUrl = 'http://image.tmdb.org/t/p/original/';
  let [searchParams, setSearchParams] = useSearchParams();
  let [details, setDetails] = useState({});
  let currentId = searchParams.get("id");

  async function getMovieDetails() {
    let { data } =await axios.get(`https://api.themoviedb.org/3/movie/${currentId}?api_key=f1aca93e54807386df3f6972a5c33b50&language=en-US`);
    setDetails(data);
    console.log(data)
  }

  useEffect(() => {
    getMovieDetails();
  }, []);



  return (<>
    <div className='row'>
      <div className='col-md-4'>
        <img className='w-100' src={baseImgUrl + details.poster_path} alt="" />
      </div>
      <div className='col-md-8'>
        <h6>{details.overview}</h6>
      </div>
    </div>
  </>)
}
