import React, { useEffect, useState } from 'react';
import './styles.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import movieService from '../../appwrite/movieConfig.js';
import { setMovieData } from '../../store/movieSlice.js';


const MovieCard = ({ data, initStatus, crossCheck = true }) => {
    const { url } = useSelector((state) => state.home);
    const posterUrl = url.poster + data.poster_path;
    const [isChecked, setIsChecked] = useState(initStatus);
    const { status, userData } = useSelector(state => state.auth)
    const { movieData } = useSelector(state => state.movie)
    const movieMode = useSelector(state => state.movie.mode)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const findMovieById = (moviesObject, movieId) => {
        return moviesObject.hasOwnProperty(movieId);
    };

    useEffect(() => {
        if (status && crossCheck) {
            const targetMovieId = data.id;
            if (movieData) {
                const movieExists = findMovieById(movieData.moviesObject, targetMovieId);
                if (movieExists) setIsChecked(true)
            }
        }
    }, [])

    const deleteMovieInStore = () => {
        const oldTotal = movieData.total - 1;
        const oldMovieObject = { ...movieData.moviesObject };
        const movieIdToRemove = data.id;
        if (oldMovieObject.hasOwnProperty(movieIdToRemove)) {
            delete oldMovieObject[movieIdToRemove];
            dispatch(setMovieData({ total: oldTotal, moviesObject: oldMovieObject }))
        }

    }

    const deleteMovieDocFromAppwrite = () => {
        setIsChecked(false)

        const slug = crossCheck ? movieData.moviesObject[data.id].slug : data.$id;

        console.log("movieCard :: DMDFA :: crosscheck ", crossCheck, " :: slug ", slug);
        movieService.deleteMovieDoc(slug)
            .then((isDeleted) => {

                console.log("MovieCard :: deletmovieDocFA :: response", isDeleted)
                deleteMovieInStore()
            })
    }

    const addMovieInStore = (movie) => {
        console.log("add movie in store :: movie data ", movie)
        const oldTotal = movieData.total + 1;
        const oldMovieObject = { ...movieData.moviesObject };
        oldMovieObject[movie.id] = {
            id: movie.id,
            slug: movie.$id
        }
        dispatch(setMovieData({ total: oldTotal, moviesObject: oldMovieObject }))
    }

    const addMovieDocInAppwrite = () => {
        setIsChecked(true)
        movieService.createMovieDoc({
            title: data.title,
            poster_path: data.poster_path,
            id: data.id,
            user_id: userData.$id
        }).then((movie) => {

            console.log("create doc response : ", movie)
            addMovieInStore(movie);
        })
    }

    const handleCheckboxToggle = () => {
        if (status) {
            if (isChecked) {
                movieMode ? deleteMovieDocFromAppwrite() : console.log("Please Change the Mode");
            } else {
                !movieMode ? addMovieDocInAppwrite() : console.log("Please Change the Mode");
            }
        } else {
            navigate('/login')
        }
    };

    return (
        <div className=" w-48 relative">
            <div className="w-auto">
                <img className="rounded-xl" src={posterUrl} alt={data.poster_path} />
            </div>
            <p className="truncate text-center mt-3 text-lg font-serif dark:text-zinc-300">
                {data.title}
            </p>
            <div className="checkbox-wrapper-10  absolute bottom-7 ml-3 ">
                <input
                    className="tgl tgl-flip"
                    id={`cb${data.id}`}
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxToggle}
                />
                <label
                    className="tgl-btn"
                    data-tg-off="UnWatched"
                    data-tg-on="Watched"
                    htmlFor={`cb${data.id}`}
                ></label>
            </div>
        </div>
    );
};

export default MovieCard;
