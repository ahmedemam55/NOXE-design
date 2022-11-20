import React from 'react';
import {  useContext } from 'react';
import { MediaContext } from '../../MadiaContext';

export default function Tvshows() {
  let baseImgUrl = 'http://image.tmdb.org/t/p/original/';
  let { trendingPepole } = useContext(MediaContext)

  return (
    <>
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
