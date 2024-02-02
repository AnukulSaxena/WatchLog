import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import movieServicex from '../../express/movieConfig'
import { setMovieData } from '../../store/movieSlice'
export default function Protected({ children, authentication = true }) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)
    const { mediaType } = useSelector(state => state.home)
    const dispatch = useDispatch()
    useEffect(() => {
        if (authStatus) {
            movieServicex.getSingleWatched()
                .then((res) => {
                    if (res) dispatch(setMovieData(res))
                    else dispatch(setMovieData({
                        movieId: [],
                        tvId: []
                    }))
                })

        }

        if (authentication && authStatus !== authentication) {
            navigate("/login")
            // } else if (!authentication && authStatus !== authentication) {
            //     navigate("/")
        }
        setLoader(false)
    }, [authStatus, navigate, authentication, mediaType])

    return loader ? <h1>Loading...</h1> : <>{children}</>
}
