import React, { useState, useEffect } from 'react'
import axios from '../API/axios';
import '../CSS_Component/Row.css'
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const baseurl = 'https://image.tmdb.org/t/p/original'

function Row({ title, fetchUrl, isLargeRow }) {

    // TMDB API
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState('');

    useEffect(() => {
        //Async await function
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    // React YouTube Dependencies
    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    }

    // movieTrailer is from the movieTrailer dependencies that returns a promise
    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl('');
        } else {
            movieTrailer(null, { tmdbId: movie.id })
                .then((url) => {
                    // console.log("url is " + url);
                    const urlParams = new URLSearchParams(new URL(url).search);
                    // console.log("urlParamsn" + urlParams);
                    setTrailerUrl(urlParams.get("v"));
                })
                .catch((error) => console.log(error));
        }
    }

    return (
        <div className='row'>
            <h2>{title}</h2>
            <div className="row__posters">
                {movies.map(movie => (
                    <img
                        key={movie.id}
                        onClick={() => handleClick(movie)}
                        className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
                        src={`${baseurl}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                        alt={movie.name}
                    />
                ))}

            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default Row