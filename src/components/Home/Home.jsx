import React from 'react';
import {  useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MediaContext } from '../../MadiaContext';

export default function Home() {
  let baseImgUrl = 'http://image.tmdb.org/t/p/original/';
  let { trendingMovies } = useContext(MediaContext);
  let { trendingTvShows } = useContext(MediaContext);
  let { trendingPepole } = useContext(MediaContext);

  let navigate =useNavigate();
  function goToDetails(id){
navigate({
  pathname:'/moviedetails',
  search:`?id=${id}`
})
  }
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
          <div onClick={()=>goToDetails(movie.id)} className='col-md-2 my-3' key={index}>
            <div>
              <img className='w-100 mb-2' src={baseImgUrl + movie.poster_path} />
              <h5>{movie.title}</h5>
            </div>
          </div>
        ))}
      </div>


      <div className='row'>
        <div className='col-md-4 py-5 ' >
          <div className='brdr w-25 my-3'></div>
          <h2 className=" h3my-2">Trendind<br /> Tv Shows<br /> To Watch Now</h2>
          <p className='secondColor text-muted'>Most watched tv shows</p>
          <div className='brdr my-3'></div>

        </div>
        {trendingTvShows.map((tv, index) => (
          <div className='col-md-2 my-3' key={index}>
            <div>
              <img className='w-100 mb-2' src={baseImgUrl + tv.poster_path} />
              <h5>{tv.name}</h5>
            </div>
          </div>
        ))}
      </div>


      <div className='row'>
        <div className='col-md-4 py-5 ' >
          <div className='brdr w-25 my-3'></div>
          <h2 className=" h3my-2">Trendind<br /> Pepole<br /> To Watch Now</h2>
          <p className='secondColor text-muted'>Most watched pepole by day</p>
          <div className='brdr my-3'></div>

        </div>
        {trendingPepole.map((person, index) => (
          <div className='col-md-2 my-3' key={index}>
            <div>
              <img className='w-100 mb-2' src={baseImgUrl + person.profile_path} />
              <h5>{person.name}</h5>
            </div>
          </div>
        ))}
      </div>
      
    </>
  )
}
