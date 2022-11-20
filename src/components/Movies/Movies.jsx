import React from 'react';
import {  useContext } from 'react';
import { MediaContext } from '../../MadiaContext';

export default function Movies() {
  let baseImgUrl = 'http://image.tmdb.org/t/p/original/';
  let { trendingMovies } = useContext(MediaContext)

  return (
    <>
      <div className='row'>
        <div className='col-md-4 py-5 ' >
          <div className='brdr w-25 my-3'></div>
          <h2 className=" h3my-2">Trendind<br /> movies<br /> To Watch Now</h2>
          <p className='secondColor text-muted'>Most watched movies by day</p>
          <div className='brdr my-3'></div>

        </div>
        {trendingMovies.map((movie, index) => (
          <div className='col-md-2 my-3' key={index}>
            <div>
              <img className='w-100 mb-2' src={baseImgUrl + movie.poster_path} />
              <h5>{movie.title}</h5>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
