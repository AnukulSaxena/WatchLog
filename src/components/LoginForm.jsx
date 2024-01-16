import React, { useState } from 'react'
import { Input, Button } from './index.js'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../appwrite/auth.js'
import { useDispatch } from 'react-redux'
import { login as authLogin } from '../store/authSlice.js'
import movieService from '../appwrite/movieConfig.js'
import { setMovieData } from '../store/movieSlice.js'

function SignupForm() {
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("");
    const navigate = useNavigate()

    const getMovieData = (userData) => {
        movieService.getMovieDocs(userData.$id)
            .then(response => {
                const moviesObject = response.documents.reduce((acc, movie) => {
                    acc[movie.movie_id] = {
                        title: movie.title,
                        poster_url: movie.poster_url,
                        movie_id: movie.movie_id,
                        user_id: movie.user_id,
                        slug: movie.$id
                    };
                    return acc;
                }, {});
                dispatch(setMovieData({ total: response.total, moviesObject }));
            }).then(() => {
                dispatch(authLogin(userData.$id))
            })
            .then(() => {
                navigate("/")
            })
    }

    const login = async (data) => {
        try {
            setError("");
            const session = await authService.loginAccount(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                getMovieData(userData)
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className='mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10'>
            <div className=' w-full text-lg text-center mb-5'>
                Log in to Your Account
            </div>
            {error && <div className=' w-full text-red-500 text-center'>{error}</div>}
            <div>
                <form onSubmit={handleSubmit(login)}>
                    <div className=' space-y-5 '>
                        <Input
                            label="Email"
                            placeholder="Enter Your Email : "
                            type="email"
                            {
                            ...register("email", {
                                required: true,
                            })}
                        />
                        <Input
                            label="Password"
                            placeholder="Enter Your Password : "
                            type="password"
                            {
                            ...register("password", {
                                required: true,
                            })
                            }
                        />
                        <Button
                            type="submit"
                            className=' w-full'
                        >
                            Login
                        </Button>
                    </div>
                </form>
                <p className="mt-2 text-center text-base text-black/60">
                    Don't have an Account ?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default SignupForm