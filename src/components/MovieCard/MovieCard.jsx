import React, { useEffect, useState } from 'react';
import './styles.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import movieService from '../../appwrite/movieConfig.js';
import { setMovieData } from '../../store/movieSlice.js';


const MovieCard = ({ data }) => {
    const { url } = useSelector((state) => state.home);
    const posterUrl = url.poster + data.poster_path;
    const [isChecked, setIsChecked] = useState(false);
    const { status, userData } = useSelector(state => state.auth)
    const { movieData } = useSelector(state => state.movie)
    const movieMode = useSelector(state => state.movie.mode)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const findMovieById = (moviesObject, movieId) => {
        return moviesObject.hasOwnProperty(movieId);
    };

    useEffect(() => {
        if (status) {
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
            setIsChecked(prev => !prev)
        }
    }

    const deleteMovieDocFromAppwrite = () => {
        const { slug } = movieData.moviesObject[data.id]
        movieService.deleteMovieDoc(slug)
            .then((isDeleted) => {
                deleteMovieInStore()
            })
    }

    const addMovieInStore = (movie) => {
        const oldTotal = movieData.total + 1;
        const oldMovieObject = { ...movieData.moviesObject };
        oldMovieObject[movie.movie_id] = {
            title: movie.title,
            poster_url: movie.poster_url,
            movie_id: movie.movie_id,
            user_id: movie.user_id,
            slug: movie.$id
        }
        dispatch(setMovieData({ total: oldTotal, moviesObject: oldMovieObject }))
    }

    const addMovieDocInAppwrite = () => {
        setIsChecked(prev => !prev)
        movieService.createMovieDoc({
            title: data.title,
            poster_url: data.poster_path,
            movie_id: data.id,
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
        <div className=" w-40 h-80 relative  rounded-xl">

            <div className="w-auto">

                <img className=" rounded-xl" src={posterUrl} alt={data.poster_path} />
            </div>
            <p className="truncate absolute bottom-8 w-11/12 ml-2 text-xl  dark:text-neutral-400">
                {data.title || data.name}
            </p>
            <p className=" text-sm ml-2 absolute w-11/12 bottom-2 dark:text-neutral-500">
                {data.release_date}
            </p>
            <div className="checkbox-wrapper-10 absolute bottom-16 ml-3 ">
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
