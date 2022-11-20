import {  createContext } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import React from 'react'
import { useNavigate } from 'react-router-dom';


export let MediaContext = createContext([]);

export function MediaContextProvider(props) {

  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTvShows, setTrendingTvShows] = useState([]);
  const [trendingPepole, settrendingPepole] = useState([]);


  async function getTrendingItems(mediaType,callback) {
    let { data } = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=c636ed7787cc302d96bf88ccf334e0d8`)
    callback(data.results);

  }
  useEffect(() => {
    getTrendingItems("movie",setTrendingMovies);
    getTrendingItems("tv",setTrendingTvShows);
    getTrendingItems("person",settrendingPepole);

  }, [])





    return <MediaContext.Provider value={{ trendingMovies, trendingTvShows, trendingPepole }}>

        {props.children}

    </MediaContext.Provider>
}