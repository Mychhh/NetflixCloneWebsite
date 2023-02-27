import React, { useState, useEffect } from 'react'
import axios from './axios';
import './Row.css'
const baseurl = 'https://image.tmdb.org/t/p/original'

function Row({ title, fetchUrl }) {
    const [movies, setMovies] = useState([]);

    // A snippet of code which runs based on a specific condition/variable

    useEffect(() => {
        //
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    console.log(movies)

    return (
        <div className='row'>
            <h2>{title}</h2>
            <div className="row__posters">
                {/* several row_poster */}

                {movies.map(movie => (
                    <img
                        className='row__poster'
                        src={`${baseurl}${movie.poster_path}`}
                        alt={movie.name}
                    />
                ))}

            </div>
            {/* container -> poster */}
        </div>
    )
}

export default Row